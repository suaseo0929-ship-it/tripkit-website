import React from 'react';

const TravelTestPage = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold'
    }}>
      {/* 🚨 매우 눈에 띄는 테스트 패널 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        background: 'red',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        zIndex: 9999,
        border: '5px solid yellow',
        boxShadow: '0 0 20px rgba(255, 0, 0, 0.8)'
      }}>
        🚨 TEST VERSION WORKING! 🚨
        <br />
        성공적으로 로드됨!
      </div>
      
      <div style={{
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '40px',
        borderRadius: '20px'
      }}>
        <h1>TripKit 여행 성향 테스트</h1>
        <p>테스트 버전이 정상 작동 중입니다!</p>
      </div>
    </div>
  );
};

export default TravelTestPage;
