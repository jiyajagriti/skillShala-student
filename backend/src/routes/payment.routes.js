// routes/payment.routes.js
import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import 'dotenv/config';
import Payment from '../model/payment.model.js'; // <-- ensure .js if using ESM
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  throw new Error('Missing Razorpay env vars: RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET');
}

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// ROUTE 1: Create Order  POST /api/payment/order
router.post('/order', protect, async (req, res) => {
  try {
    const { amount } = req.body;

    if (amount == null || isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // INR → paise
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json({ data: order });
  } catch (err) {
    console.error('Order create error:', err);
    return res.status(500).json({ message: 'Something went wrong creating the order' });
  }
});

// ROUTE 2: Verify Payment  POST /api/payment/verify
router.post('/verify', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create the expected signature
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    const isAuthentic = expectedSign === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    // Persist payment (adjust fields to match your Payment schema)
    const payment = new Payment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      status: 'captured', // optional: depends on your schema
    });

    await payment.save();

    // If courseId is provided, enroll the user in the course
    if (courseId && req.user) {
      try {
        console.log('🎯 Attempting to enroll user in course:', { courseId, userId: req.user._id });
        const { User } = await import('../model/user.model.js');
        const { Course } = await import('../model/course.model.js');
        
        const user = await User.findById(req.user._id);
        const course = await Course.findById(courseId);
        
        console.log('👤 User found:', !!user);
        console.log('📚 Course found:', !!course);
        console.log('📋 Current enrolled courses:', user?.enrolledCourses);
        
        if (user && course && !user.enrolledCourses.includes(courseId)) {
          user.enrolledCourses.push(courseId);
          await user.save();
          console.log('✅ User enrolled in course after payment verification');
          console.log('📋 Updated enrolled courses:', user.enrolledCourses);
        } else if (user && user.enrolledCourses.includes(courseId)) {
          console.log('⚠️ User already enrolled in this course');
        }
      } catch (enrollError) {
        console.error('❌ Enrollment error during payment verification:', enrollError);
      }
    } else {
      console.log('❌ Missing courseId or user for enrollment:', { courseId: !!courseId, user: !!req.user });
    }

    return res.status(200).json({ message: 'Payment verified successfully' });
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
