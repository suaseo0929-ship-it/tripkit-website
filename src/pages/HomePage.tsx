import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBrain, FaGlobeAsia, FaMapMarkedAlt, FaHeart, FaUsers, FaLeaf, FaStar, FaCheck, FaArrowRight } from 'react-icons/fa';

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const HeroDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 3rem;
  opacity: 0.8;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  background: white;
  color: #667eea;
  padding: 1.5rem 3rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.3rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  }
`;

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: #f8fafc;
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #667eea;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const StatsSection = styled.div`
  background: white;
  padding: 4rem 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled.div`
  padding: 1.5rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #64748b;
  font-weight: 500;
`;

const BenefitsSection = styled.section`
  padding: 6rem 2rem;
  background: white;
`;

const BenefitsList = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
`;

const BenefitItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 15px;
  border-left: 5px solid #667eea;
`;

const BenefitIcon = styled.div`
  background: #667eea;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const BenefitText = styled.div`
  font-size: 1.2rem;
  color: #1e293b;
  font-weight: 500;
`;

const DestinationsPreview = styled.section`
  padding: 6rem 2rem;
  background: #f8fafc;
`;

const DestinationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const DestinationCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const DestinationImage = styled.div<{ $bgColor: string }>`
  height: 150px;
  background: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
`;

const DestinationContent = styled.div`
  padding: 1.5rem;
`;

const DestinationName = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
`;

const DestinationDescription = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const features = [
  {
    icon: <FaBrain />,
    title: '20가지 정밀 진단',
    description: '당신의 여행 성향, 예산, 선호도를 정확히 분석하여 완벽한 매칭을 제공합니다.'
  },
  {
    icon: <FaGlobeAsia />,
    title: '전 세계 여행지',
    description: '국내 숨겨진 명소부터 해외 핫플레이스까지, 당신만을 위한 특별한 여행지를 추천합니다.'
  },
  {
    icon: <FaMapMarkedAlt />,
    title: '맞춤 일정 제공',
    description: '단순 추천이 아닌 구체적인 일정과 코스, 예산 가이드까지 모든 것을 제공합니다.'
  }
];

const benefits = [
  '개인 맞춤형 20가지 정밀 질문으로 정확한 성향 파악',
  '국내외 1000+ 여행지 데이터베이스 기반 추천',
  '예산별, 기간별, 테마별 세분화된 맞춤 코스',
  '실제 여행자 리뷰와 평점이 반영된 신뢰할 수 있는 정보',
  '여행 전 준비부터 현지 팁까지 완벽한 가이드 제공'
];

const sampleDestinations = [
  { name: '제주도', desc: '자연과 힐링의 완벽한 조화', bgColor: 'linear-gradient(135deg, #74b9ff, #0984e3)' },
  { name: '교토', desc: '전통과 현대가 어우러진 문화의 도시', bgColor: 'linear-gradient(135deg, #fd79a8, #e84393)' },
  { name: '발리', desc: '신들의 섬에서 즐기는 휴양', bgColor: 'linear-gradient(135deg, #fdcb6e, #e17055)' },
  { name: '파리', desc: '로맨스와 예술의 도시', bgColor: 'linear-gradient(135deg, #a29bfe, #6c5ce7)' },
];

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>나만의 완벽한 여행을 찾아보세요</HeroTitle>
            <HeroSubtitle>
              AI 기반 정밀 진단으로 찾는 맞춤형 여행지
            </HeroSubtitle>
            <HeroDescription>
              20가지 세심한 질문을 통해 당신의 여행 DNA를 분석하고,<br />
              전 세계에서 가장 완벽한 여행지를 추천해드립니다.
            </HeroDescription>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CTAButton to="/travel-test">
              <FaBrain />
              나의 여행 DNA 진단받기
              <FaArrowRight />
            </CTAButton>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle>왜 TripKit을 선택해야 할까요?</SectionTitle>
          <SectionSubtitle>
            단순한 추천이 아닌, 과학적 분석 기반의 완벽한 매칭 시스템
          </SectionSubtitle>
          
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>

          <StatsSection>
            <StatsGrid>
              <StatItem>
                <StatNumber>20+</StatNumber>
                <StatLabel>정밀 진단 질문</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>1000+</StatNumber>
                <StatLabel>추천 여행지</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>50+</StatNumber>
                <StatLabel>국가별 데이터</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>98%</StatNumber>
                <StatLabel>만족도</StatLabel>
              </StatItem>
            </StatsGrid>
          </StatsSection>
        </FeaturesContainer>
      </FeaturesSection>

      <BenefitsSection>
        <FeaturesContainer>
          <SectionTitle>TripKit만의 특별한 혜택</SectionTitle>
          <SectionSubtitle>
            정밀한 진단부터 완벽한 여행 계획까지, 모든 것을 한 번에
          </SectionSubtitle>
          
          <BenefitsList>
            {benefits.map((benefit, index) => (
              <BenefitItem
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BenefitIcon>
                  <FaCheck />
                </BenefitIcon>
                <BenefitText>{benefit}</BenefitText>
              </BenefitItem>
            ))}
          </BenefitsList>
        </FeaturesContainer>
      </BenefitsSection>

      <DestinationsPreview>
        <FeaturesContainer>
          <SectionTitle>어떤 여행지를 추천받을 수 있나요?</SectionTitle>
          <SectionSubtitle>
            당신의 성향에 따라 이런 특별한 여행지들을 만날 수 있어요
          </SectionSubtitle>
          
          <DestinationGrid>
            {sampleDestinations.map((destination, index) => (
              <DestinationCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <DestinationImage $bgColor={destination.bgColor}>
                  {destination.name}
                </DestinationImage>
                <DestinationContent>
                  <DestinationName>{destination.name}</DestinationName>
                  <DestinationDescription>{destination.desc}</DestinationDescription>
                </DestinationContent>
              </DestinationCard>
            ))}
          </DestinationGrid>
        </FeaturesContainer>
      </DestinationsPreview>
    </HomeContainer>
  );
};

export default HomePage;
