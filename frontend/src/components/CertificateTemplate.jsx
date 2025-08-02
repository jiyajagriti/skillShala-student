import React from "react";

const CertificateTemplate = ({ studentName, courseName, completionDate }) => {
  return (
    <div className="w-[1000px] h-[700px] mx-auto p-10 bg-[#fdfdfd] border-[12px] border-yellow-400 shadow-lg relative font-serif">
      <div className="absolute top-5 bottom-5 left-5 right-5 border-4 border-dashed border-yellow-300 rounded-xl pointer-events-none"></div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Certificate of Completion</h1>
        <p className="text-lg text-gray-600 mt-2 italic">This is to certify that</p>
      </div>

      <div className="text-center my-6">
        <h2 className="text-3xl font-semibold text-blue-800 underline decoration-yellow-400 underline-offset-8">
          {studentName}
        </h2>
      </div>

      <div className="text-center my-6">
        <p className="text-lg text-gray-700">has successfully completed the course</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-2">{courseName}</h3>
      </div>

      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center text-sm text-gray-700">
        <div>
          <p className="font-medium">Date:</p>
          <p>{completionDate}</p>
        </div>

        <div className="text-center">
          <img src="./public/logo.png" alt="Logo" className="w-20 mx-auto mb-2" />
          <p className="font-bold text-sm text-gray-800">SkillShala</p>
        </div>

        <div className="text-right">
          <p className="font-medium">Authorized Signature</p>
          <div className="w-32 h-[1px] bg-gray-400 my-1" />
          <p className="italic">Head of Training</p>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate;
