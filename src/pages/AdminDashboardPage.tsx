import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUsers, FaBookOpen, FaEye, FaStar, FaChartLine, FaCog, FaBell } from 'react-icons/fa';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem;
`;

const DashboardHeader = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  margin-bottom: 2rem;
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const HeaderSubtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  margin-bottom: 3rem;
`;

const StatCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 1rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #64748b;
  font-size: 1rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PopularDestinations = styled.div`
  display: grid;
  gap: 1rem;
`;

const DestinationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
`;

const DestinationRank = styled.div`
  background: #667eea;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
`;

const DestinationInfo = styled.div`
  flex: 1;
`;

const DestinationName = styled.div`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const DestinationStats = styled.div`
  font-size: 0.9rem;
  color: #64748b;
`;

const SideSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NotificationItem = styled.div`
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
`;

const NotificationTitle = styled.div`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const NotificationTime = styled.div`
  font-size: 0.8rem;
  color: #64748b;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
`;

const mockStats = [
  {
    icon: <FaUsers />,
    value: '12,847',
    label: '총 사용자 수'
  },
  {
    icon: <FaBookOpen />,
    value: '3,421',
    label: '생성된 여행 책자'
  },
  {
    icon: <FaEye />,
    value: '89,234',
    label: '총 방문 수'
  },
  {
    icon: <FaStar />,
    value: '4.8',
    label: '평균 평점'
  }
];

const mockPopularDestinations = [
  { rank: 1, name: '제주도', visits: 2341, rating: 4.8 },
  { rank: 2, name: '부산', visits: 1892, rating: 4.6 },
  { rank: 3, name: '강릉', visits: 1456, rating: 4.7 },
  { rank: 4, name: '여수', visits: 1234, rating: 4.5 },
  { rank: 5, name: '전주', visits: 987, rating: 4.4 }
];

const mockNotifications = [
  {
    title: '새로운 리뷰 등록',
    time: '5분 전',
    content: '제주도 리뷰가 새로 등록되었습니다.'
  },
  {
    title: '시스템 업데이트',
    time: '1시간 전',
    content: '서버 성능 개선이 완료되었습니다.'
  },
  {
    title: '사용자 문의',
    time: '2시간 전',
    content: '새로운 문의가 접수되었습니다.'
  }
];

const AdminDashboardPage: React.FC = () => {
  const handleManageContent = () => {
    console.log('콘텐츠 관리');
  };

  const handleViewAnalytics = () => {
    console.log('분석 보기');
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeaderTitle>관리자 대시보드</HeaderTitle>
          <HeaderSubtitle>TripKit 서비스 현황을 한눈에 확인하세요</HeaderSubtitle>
        </motion.div>
      </DashboardHeader>

      <StatsGrid>
        {mockStats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <StatIcon>{stat.icon}</StatIcon>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>

      <ContentGrid>
        <MainSection>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SectionTitle>
              <FaChartLine />
              인기 여행지 Top 5
            </SectionTitle>
            <PopularDestinations>
              {mockPopularDestinations.map((destination, index) => (
                <motion.div
                  key={destination.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <DestinationItem>
                    <DestinationRank>{destination.rank}</DestinationRank>
                    <DestinationInfo>
                      <DestinationName>{destination.name}</DestinationName>
                      <DestinationStats>
                        방문: {destination.visits}회 | 평점: {destination.rating}
                      </DestinationStats>
                    </DestinationInfo>
                  </DestinationItem>
                </motion.div>
              ))}
            </PopularDestinations>
          </motion.div>
        </MainSection>

        <SideSection>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <SectionTitle>
              <FaBell />
              최근 알림
            </SectionTitle>
            <NotificationList>
              {mockNotifications.map((notification, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                >
                  <NotificationItem>
                    <NotificationTitle>{notification.title}</NotificationTitle>
                    <div>{notification.content}</div>
                    <NotificationTime>{notification.time}</NotificationTime>
                  </NotificationItem>
                </motion.div>
              ))}
            </NotificationList>
            
            <ActionButtons>
              <ActionButton onClick={handleManageContent}>
                <FaCog />
                콘텐츠 관리
              </ActionButton>
              <ActionButton onClick={handleViewAnalytics}>
                <FaChartLine />
                분석 보기
              </ActionButton>
            </ActionButtons>
          </motion.div>
        </SideSection>
      </ContentGrid>
    </DashboardContainer>
  );
};

export default AdminDashboardPage;











