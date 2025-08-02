import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import CertificateTemplate from "../components/CertificateTemplate";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Certificate = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const certRef = useRef();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/courses/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Failed to load course:", err.message);
        // Show user-friendly error message
        alert("Failed to load course details. Please try again.");
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleDownload = async () => {
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#fdfdfd',
        logging: false,
        removeContainer: true,
        foreignObjectRendering: false
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", [297, 210]); // A4 landscape
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Certificate-${course.title}.pdf`);
    } catch (err) {
      console.error("PDF download failed:", err.message);
      alert("Failed to download certificate. Please try again.");
    }
  };

  if (!user || !course) return <p className="text-center mt-10 text-gray-600">Loading certificate...</p>;

  const today = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <div ref={certRef}>
        <CertificateTemplate
          studentName={user.name}
          courseName={course.title}
          completionDate={today}
        />
      </div>

      <button
        onClick={handleDownload}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded shadow"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default Certificate;
