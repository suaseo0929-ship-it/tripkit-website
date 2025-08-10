import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e0e0e0;
  z-index: 1000;
  padding: 0 2rem;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2563eb;
  text-decoration: none;
  
  &:hover {
    color: #1d4ed8;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  font-weight: ${props => props.$active ? '600' : '400'};
  color: ${props => props.$active ? '#2563eb' : '#666'};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.$active ? '#dbeafe' : '#f3f4f6'};
    color: ${props => props.$active ? '#1d4ed8' : '#333'};
  }
`;

const CTAButton = styled(Link)`
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }
`;

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Nav>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo to="/">TripKit</Logo>
        </motion.div>
        
        <NavLinks>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <NavLink to="/" $active={location.pathname === '/'}>
              홈
            </NavLink>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NavLink to="/travel-test" $active={location.pathname === '/travel-test'}>
              여행 성향 테스트
            </NavLink>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <NavLink to="/my-trip-book" $active={location.pathname === '/my-trip-book'}>
              나의 여행 책자
            </NavLink>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CTAButton to="/travel-test">
              여행 시작하기
            </CTAButton>
          </motion.div>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;









