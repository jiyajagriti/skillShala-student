// src/model/course.model.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
},
  price: { 
    type: String, 
    required: true 
},
  image: { 
    type: String 
},
  prerequisites: { 
    type: String 
},
  level: { 
    type: String 
},
  includes: { 
    type: String 
},
  duration: { 
    type: String 
}
}, {timestamps: true});

export const Course = mongoose.model("Course", courseSchema);
