// src/seedCourses.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Course } from "./model/course.model.js";
import { DB_NAME } from "./constants.js";

dotenv.config();

const MONGODB_URI = `${process.env.MONGODB_URI}/${DB_NAME}`;


const courses = [
  {
    title: "Frontend Development",
    image: "/frontend.png",
    prerequisites: "Basic HTML & CSS knowledge",
    level: "Beginner",
    includes: "Hands-on labs, quizzes",
    duration: "4 weeks",
    price: "₹1,999",
  },
  {
    title: "Database Essentials",
    image: "/database.png",
    prerequisites: "Basic programming understanding",
    level: "Intermediate",
    includes: "SQL practice, assignments",
    duration: "6 weeks",
    price: "₹2,499",
  },
  {
    title: "React Crash Course",
    image: "/react.png",
    prerequisites: "HTML, CSS, JavaScript",
    level: "Intermediate",
    includes: "Projects, challenges",
    duration: "3 weeks",
    price: "₹1,499",
  },
  {
    title: "Cloud Basics",
    image: "/cloud.png",
    prerequisites: "No prior experience",
    level: "Beginner",
    includes: "Hands-on with AWS",
    duration: "2 weeks",
    price: "₹999",
  },
];

const seedCourses = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    await Course.deleteMany(); // Clears old data
    await Course.insertMany(courses);
    console.log("✅ Courses seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedCourses();
