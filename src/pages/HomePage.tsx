import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaHeart, FaUsers, FaLeaf, FaUtensils, FaCamera, FaUserFriends, FaEdit, FaPlus } from 'react-icons/fa';

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 2rem;
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
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  background: white;
  color: #667eea;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  border: 2px solid white;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: #667eea;
    transform: translateY(-3px);
  }
`;

const TravelStyleSection = styled.section`
  padding: 5rem 2rem;
  background: #f8fafc;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #1e293b;
`;

const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const StyleCard = styled(motion.div)<{ $isCustom?: boolean }>`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: ${props => props.$isCustom ? '2px dashed #667eea' : 'none'};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const StyleIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #667eea;
`;

const StyleTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
`;

const StyleDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const CustomInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const CustomInput = styled.input`
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  
  &:focus {
    border-color: #667eea;
  }
`;

const AddCustomButton = styled.button`
  background: #10b981;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: #059669;
    transform: translateY(-2px);
  }
`;

const KeywordSection = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const KeywordGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const KeywordCard = styled(motion.div)<{ $selected?: boolean }>`
  background: ${props => props.$selected ? '#667eea' : '#f1f5f9'};
  color: ${props => props.$selected ? 'white' : '#1e293b'};
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const RecommendationSection = styled.section`
  padding: 5rem 2rem;
  background: #f8fafc;
`;

const DestinationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const DestinationCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const DestinationImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 700;
`;

const DestinationContent = styled.div`
  padding: 1.5rem;
`;

const DestinationTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
`;

const DestinationDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const DestinationTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #e2e8f0;
  color: #475569;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const travelStyles = [
  {
    id: 'family-kids',
    title: '아이와 함께',
    description: '아이들이 좋아할 만한 장소와 활동을 중심으로 한 여행',
    icon: <FaUsers />
  },
  {
    id: 'family-parents',
    title: '부모님과 함께',
    description: '부모님이 편안하게 즐길 수 있는 여유로운 여행',
    icon: <FaUserFriends />
  },
  {
    id: 'couple',
    title: '커플 여행',
    description: '로맨틱하고 특별한 추억을 만들 수 있는 여행',
    icon: <FaHeart />
  },
  {
    id: 'solo',
    title: '나홀로',
    description: '자유롭고 독립적인 여행을 즐길 수 있는 코스',
    icon: <FaMapMarkedAlt />
  },
  {
    id: 'group',
    title: '친구들과',
    description: '함께 즐기고 추억을 나눌 수 있는 여행',
    icon: <FaUsers />
  },
  {
    id: 'custom',
    title: '직접 입력하기',
    description: '원하는 여행 스타일을 직접 입력해보세요',
    icon: <FaEdit />,
    isCustom: true
  }
];

const keywords = [
  '자연', '액티비티', '힐링', '맛집', '역사', '체험', '쇼핑', '문화'
];

const destinations = [
  {
    id: 1,
    name: '제주도',
    description: '자연과 힐링을 동시에 즐길 수 있는 아름다운 섬',
    tags: ['자연', '힐링', '맛집']
  },
  {
    id: 2,
    name: '부산',
    description: '바다와 도시의 매력을 모두 느낄 수 있는 곳',
    tags: ['맛집', '문화', '액티비티']
  },
  {
    id: 3,
    name: '강릉',
    description: '아름다운 해안선과 맛있는 커피를 즐길 수 있는 곳',
    tags: ['힐링', '맛집', '자연']
  }
];

const HomePage: React.FC = () => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedTravelStyle, setSelectedTravelStyle] = useState<string>('');
  const [customTravelStyle, setCustomTravelStyle] = useState<string>('');
  const [customStyles, setCustomStyles] = useState<string[]>([]);

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword) 
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleTravelStyleClick = (styleId: string) => {
    setSelectedTravelStyle(styleId);
    if (styleId !== 'custom') {
      setCustomTravelStyle('');
    }
  };

  const handleAddCustomStyle = () => {
    if (customTravelStyle.trim() && !customStyles.includes(customTravelStyle.trim())) {
      setCustomStyles(prev => [...prev, customTravelStyle.trim()]);
      setCustomTravelStyle('');
    }
  };

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>나만의 여행을 시작해보세요</HeroTitle>
            <HeroSubtitle>
              AI가 추천하는 맞춤형 여행지와 함께 특별한 추억을 만들어보세요
            </HeroSubtitle>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CTAButtons>
              <PrimaryButton to="/travel-test">여행 성향 진단하기</PrimaryButton>
              <SecondaryButton to="/travel-test">직접 선택하기</SecondaryButton>
            </CTAButtons>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <TravelStyleSection>
        <SectionTitle>어떤 여행을 원하시나요?</SectionTitle>
        <StyleGrid>
          {travelStyles.map((style, index) => (
            <StyleCard
              key={style.id}
              $isCustom={style.isCustom}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleTravelStyleClick(style.id)}
            >
              <StyleIcon>{style.icon}</StyleIcon>
              <StyleTitle>{style.title}</StyleTitle>
              <StyleDescription>{style.description}</StyleDescription>
              
              {style.isCustom && selectedTravelStyle === 'custom' && (
                <CustomInputContainer>
                  <CustomInput
                    type="text"
                    placeholder="원하는 여행 스타일을 입력하세요..."
                    value={customTravelStyle}
                    onChange={(e) => setCustomTravelStyle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCustomStyle()}
                  />
                  <AddCustomButton onClick={handleAddCustomStyle}>
                    <FaPlus />
                    추가하기
                  </AddCustomButton>
                  {customStyles.length > 0 && (
                    <div style={{ marginTop: '1rem', textAlign: 'left' }}>
                      <strong>추가된 스타일:</strong>
                      {customStyles.map((style, idx) => (
                        <div key={idx} style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#f1f5f9', borderRadius: '8px' }}>
                          {style}
                        </div>
                      ))}
                    </div>
                  )}
                </CustomInputContainer>
              )}
            </StyleCard>
          ))}
        </StyleGrid>
      </TravelStyleSection>

      <KeywordSection>
        <SectionTitle>관심 있는 키워드를 선택하세요</SectionTitle>
        <KeywordGrid>
          {keywords.map((keyword, index) => (
            <KeywordCard
              key={keyword}
              $selected={selectedKeywords.includes(keyword)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleKeywordClick(keyword)}
            >
              {keyword}
            </KeywordCard>
          ))}
        </KeywordGrid>
      </KeywordSection>

      <RecommendationSection>
        <SectionTitle>추천 여행지</SectionTitle>
        <DestinationGrid>
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <DestinationImage>
                {destination.name}
              </DestinationImage>
              <DestinationContent>
                <DestinationTitle>{destination.name}</DestinationTitle>
                <DestinationDescription>{destination.description}</DestinationDescription>
                <DestinationTags>
                  {destination.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </DestinationTags>
              </DestinationContent>
            </DestinationCard>
          ))}
        </DestinationGrid>
      </RecommendationSection>
    </HomeContainer>
  );
};

export default HomePage;