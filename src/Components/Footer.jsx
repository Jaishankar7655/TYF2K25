import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      textAlign: 'center', 
      padding: '20px', 
      marginTop: 'auto',
      backgroundColor: '#f8f9fa',
      color: '#333',
      fontSize: '14px',
      width: '100%',
      backdropFilter: 'blur(10px)',
      background: 'rgba(255, 255, 255, 0.1)',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <p style={{ margin: 0 }}>
        Created and developed with <span style={{ color: 'red' }}>❤️</span> by student Committee (SOC) of Truba group of Institute
      </p>
    </footer>
  );
};

export default Footer;
