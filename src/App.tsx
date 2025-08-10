import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TravelTestPage from './pages/TravelTestPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import MyTripBookPage from './pages/MyTripBookPage';
import PDFSharePage from './pages/PDFSharePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

const AppContainer = styled.div`
  min-height: 100vh;
  font-family: 'Noto Sans KR', sans-serif;
`;

const MainContent = styled.main`
  padding-top: 80px;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/travel-test" element={<TravelTestPage />} />
            <Route path="/destination/:id" element={<DestinationDetailPage />} />
            <Route path="/my-trip-book" element={<MyTripBookPage />} />
            <Route path="/pdf-share" element={<PDFSharePage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;









