import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const EnrollForm = () => {
  const { id } = useParams();
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err.message);
      }
    };
    fetchCourse();
  }, [id]);

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      // 1️⃣ Load Razorpay SDK
      const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("Failed to load Razorpay SDK. Please check your connection.");
        setLoading(false);
        return;
      }

      // 2️⃣ Create order on backend
      const orderRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/payment/order`,
        { amount: course.price },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("skillshala-token")}`,
          },
        }
      );

      const { id: order_id, amount, currency } = orderRes.data.data;

      // 3️⃣ Configure Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Test/Live Key ID
        amount: amount.toString(),
        currency,
        name: "SkillShala",
        description: `Enroll in ${course.title}`,
        order_id,
        handler: async function (response) {
          try {
            // 4️⃣ Verify payment on backend
            await axios.post(
              `${import.meta.env.VITE_API_URL}/api/v1/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("skillshala-token")}`,
                },
              }
            );

            // 5️⃣ Enroll the user after successful payment
            await axios.post(
              `${import.meta.env.VITE_API_URL}/api/v1/enroll`,
              { courseId: course._id },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("skillshala-token")}`,
                },
              }
            );

            await refreshUser();
            alert("🎉 Payment successful & enrolled!");
            navigate("/your-courses");
          } catch (err) {
            console.error("Payment verification failed", err);
            alert("❌ Payment verification failed");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 6️⃣ Open Razorpay Checkout
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("❌ Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  if (!course) return <p>Loading course...</p>;

  if (user?.enrolledCourses?.includes(course._id)) {
    return <p className="text-green-600 text-center mt-10">✅ Already Enrolled</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Enroll in {course.title}</h2>
      <p className="text-gray-700 mb-2">Price: ₹{course.price}</p>
      <button
        onClick={handlePayment}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay & Enroll"}
      </button>
    </div>
  );
};

export default EnrollForm;
