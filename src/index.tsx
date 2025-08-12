// 🚨 동적 흐름 테스트 패널
import React, { useState, useMemo } from 'react';

const TestPanel = ({ answers, filteredQuestions }: any) => (
  <div style={{
    position: 'fixed',
    top: '10px',
    left: '10px',
    background: 'red',
    color: 'white',
    padding: '15px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 'bold',
    zIndex: 9999,
    border: '3px solid yellow',
    maxWidth: '300px'
  }}>
    🚨 동적 흐름 테스트! 🚨<br/>
    답변: {JSON.stringify(answers)}<br/>
    domestic 선택: {Object.values(answers).includes('domestic') ? 'YES' : 'NO'}<br/>
    총 질문: {filteredQuestions?.length || 20}개<br/>
    스킵된 질문: {Object.values(answers).includes('domestic') ? '10,11,19,20' : '없음'}
  </div>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);









