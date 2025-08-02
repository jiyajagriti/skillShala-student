import React from "react";

const CertificateTemplate = ({ studentName, courseName, completionDate }) => {
  return (
    <div style={{
      width: '1000px',
      height: '700px',
      margin: '0 auto',
      padding: '40px',
      backgroundColor: '#fdfdfd',
      border: '12px solid #fbbf24',
      borderRadius: '8px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      position: 'relative',
      fontFamily: 'serif',
      minWidth: '1000px',
      minHeight: '700px'
    }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px',
        border: '4px dashed #fcd34d',
        borderRadius: '12px',
        pointerEvents: 'none'
      }}></div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          color: '#1f2937',
          margin: '0'
        }}>
          Certificate of Completion
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#4b5563', 
          marginTop: '8px', 
          fontStyle: 'italic',
          margin: '8px 0 0 0'
        }}>
          This is to certify that
        </p>
      </div>

      <div style={{ textAlign: 'center', margin: '24px 0' }}>
        <h2 style={{ 
          fontSize: '30px', 
          fontWeight: '600', 
          color: '#1e40af',
          textDecoration: 'underline',
          textDecorationColor: '#fbbf24',
          textUnderlineOffset: '8px',
          margin: '0'
        }}>
          {studentName}
        </h2>
      </div>

      <div style={{ textAlign: 'center', margin: '24px 0' }}>
        <p style={{ 
          fontSize: '18px', 
          color: '#374151',
          margin: '0'
        }}>
          has successfully completed the course
        </p>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#1f2937', 
          marginTop: '8px',
          margin: '8px 0 0 0'
        }}>
          {courseName}
        </h3>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '40px',
        right: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px',
        color: '#374151'
      }}>
        <div>
          <p style={{ fontWeight: '500', margin: '0' }}>Date:</p>
          <p style={{ margin: '0' }}>{completionDate}</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <img src="/logo.png" alt="Logo" style={{ width: '80px', margin: '0 auto 8px auto', display: 'block' }} />
          <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#1f2937', margin: '0' }}>SkillShala</p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <p style={{ fontWeight: '500', margin: '0' }}>Authorized Signature</p>
          <div style={{ width: '128px', height: '1px', backgroundColor: '#9ca3af', margin: '4px 0' }} />
          <p style={{ fontStyle: 'italic', margin: '0' }}>Head of Training</p>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate;
