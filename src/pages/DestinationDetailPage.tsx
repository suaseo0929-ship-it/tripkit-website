import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaStar, FaHeart, FaCalendar, FaThermometerHalf, FaBookmark } from 'react-icons/fa';

const DetailContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  position: relative;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DestinationTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const DestinationSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  text-align: center;
`;

const InfoIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const InfoLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
`;

const TabButton = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.$active ? '#667eea' : '#64748b'};
  border-bottom: 3px solid ${props => props.$active ? '#667eea' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #667eea;
  }
`;

const PlaceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const PlaceCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const PlaceImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
`;

const PlaceContent = styled.div`
  padding: 1.5rem;
`;

const PlaceTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
`;

const PlaceDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const PlaceLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const PlaceRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const StarIcon = styled(FaStar)`
  color: #fbbf24;
`;

const AddButton = styled.button`
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

const CustomContentSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const CustomTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
`;

const CustomContent = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const ReviewSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ReviewTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1e293b;
`;

const ReviewCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewAuthor = styled.div`
  font-weight: 600;
  color: #1e293b;
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ReviewText = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const mockDestination = {
  id: 1,
  name: '제주도',
  country: '대한민국',
  description: '자연과 힐링을 동시에 즐길 수 있는 아름다운 섬',
  temperature: '15°C',
  bestTime: '3월-5월, 9월-11월',
  location: '제주특별자치도',
  rating: 4.8,
  customContent: {
    family: '아이와 함께라면 한라산 등반보다는 성산일출봉이나 만장굴 같은 가벼운 코스를 추천해요!',
    couple: '커플이라면 오름 트레킹과 함께 제주 올레길을 걸어보세요. 로맨틱한 추억을 만들 수 있어요.',
    solo: '나홀로 여행자라면 제주의 숨겨진 카페들과 해안도로를 탐방해보세요.',
    group: '친구들과 함께라면 제주 올레길과 함께 현지 맛집 투어를 추천해요!'
  },
  places: {
    attractions: [
      {
        id: 1,
        name: '성산일출봉',
        description: '아름다운 일출을 감상할 수 있는 제주의 대표적인 관광지',
        location: '제주시 성산읍',
        rating: 4.7,
        image: '성산일출봉'
      },
      {
        id: 2,
        name: '만장굴',
        description: '세계자연유산으로 지정된 용암동굴',
        location: '제주시 조천읍',
        rating: 4.5,
        image: '만장굴'
      }
    ],
    restaurants: [
      {
        id: 3,
        name: '흑돼지 맛집',
        description: '제주도 특산품인 흑돼지를 맛볼 수 있는 현지 맛집',
        location: '제주시 관덕로',
        rating: 4.6,
        image: '흑돼지'
      }
    ],
    hotels: [
      {
        id: 4,
        name: '제주 리조트',
        description: '바다 전망을 즐길 수 있는 프리미엄 리조트',
        location: '제주시 중문관광로',
        rating: 4.8,
        image: '리조트'
      }
    ]
  },
  reviews: [
    {
      id: 1,
      author: '김여행',
      rating: 5,
      text: '정말 아름다운 곳이에요! 특히 일출이 환상적이었습니다.'
    },
    {
      id: 2,
      author: '박관광',
      rating: 4,
      text: '자연이 정말 아름다워서 힐링하기 좋았어요.'
    }
  ]
};

const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'attractions' | 'restaurants' | 'hotels'>('attractions');
  const [travelStyle, setTravelStyle] = useState<'family' | 'couple' | 'solo' | 'group'>('family');

  const handleAddToBook = (placeId: number) => {
    // 여행 책자에 추가하는 로직
    console.log('장소를 책자에 추가:', placeId);
  };

  return (
    <DetailContainer>
      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <DestinationTitle>{mockDestination.name}</DestinationTitle>
            <DestinationSubtitle>{mockDestination.description}</DestinationSubtitle>
          </motion.div>
          
          <InfoGrid>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <InfoCard>
                <InfoIcon><FaMapMarkerAlt /></InfoIcon>
                <InfoLabel>위치</InfoLabel>
                <InfoValue>{mockDestination.location}</InfoValue>
              </InfoCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <InfoCard>
                <InfoIcon><FaThermometerHalf /></InfoIcon>
                <InfoLabel>기온</InfoLabel>
                <InfoValue>{mockDestination.temperature}</InfoValue>
              </InfoCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <InfoCard>
                <InfoIcon><FaCalendar /></InfoIcon>
                <InfoLabel>추천 시기</InfoLabel>
                <InfoValue>{mockDestination.bestTime}</InfoValue>
              </InfoCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <InfoCard>
                <InfoIcon><FaStar /></InfoIcon>
                <InfoLabel>평점</InfoLabel>
                <InfoValue>{mockDestination.rating}</InfoValue>
              </InfoCard>
            </motion.div>
          </InfoGrid>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <CustomContentSection>
          <CustomTitle>맞춤 추천 정보</CustomTitle>
          <CustomContent>
            {mockDestination.customContent[travelStyle]}
          </CustomContent>
        </CustomContentSection>

        <TabContainer>
          <TabButton
            $active={activeTab === 'attractions'}
            onClick={() => setActiveTab('attractions')}
          >
            관광지
          </TabButton>
          <TabButton
            $active={activeTab === 'restaurants'}
            onClick={() => setActiveTab('restaurants')}
          >
            맛집
          </TabButton>
          <TabButton
            $active={activeTab === 'hotels'}
            onClick={() => setActiveTab('hotels')}
          >
            숙소
          </TabButton>
        </TabContainer>

        <PlaceGrid>
          {mockDestination.places[activeTab].map((place, index) => (
            <PlaceCard
              key={place.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PlaceImage>{place.image}</PlaceImage>
              <PlaceContent>
                <PlaceTitle>{place.name}</PlaceTitle>
                <PlaceDescription>{place.description}</PlaceDescription>
                <PlaceLocation>
                  <FaMapMarkerAlt />
                  {place.location}
                </PlaceLocation>
                <PlaceRating>
                  <StarIcon />
                  {place.rating}
                </PlaceRating>
                <AddButton onClick={() => handleAddToBook(place.id)}>
                  <FaBookmark />
                  책자에 담기
                </AddButton>
              </PlaceContent>
            </PlaceCard>
          ))}
        </PlaceGrid>

        <ReviewSection>
          <ReviewTitle>사용자 리뷰</ReviewTitle>
          {mockDestination.reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ReviewCard>
                <ReviewHeader>
                  <ReviewAuthor>{review.author}</ReviewAuthor>
                  <ReviewRating>
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </ReviewRating>
                </ReviewHeader>
                <ReviewText>{review.text}</ReviewText>
              </ReviewCard>
            </motion.div>
          ))}
        </ReviewSection>
      </ContentSection>
    </DetailContainer>
  );
};

export default DestinationDetailPage;










