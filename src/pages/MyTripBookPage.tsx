import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendar, FaMapMarkerAlt, FaClock, FaTrash, FaDownload, FaShare, FaEdit } from 'react-icons/fa';

const BookContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem;
`;

const BookHeader = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const BookTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const BookInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  text-align: center;
`;

const InfoLabel = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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

const ScheduleContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DaySection = styled.div`
  background: white;
  border-radius: 20px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const DayHeader = styled.div`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1.5rem 2rem;
  font-size: 1.3rem;
  font-weight: 600;
`;

const PlaceList = styled.div`
  padding: 2rem;
`;

const PlaceItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 15px;
  margin-bottom: 1rem;
  background: #f8fafc;
  cursor: move;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PlaceImage = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
`;

const PlaceInfo = styled.div`
  flex: 1;
`;

const PlaceName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const PlaceDetails = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #64748b;
`;

const PlaceTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PlaceLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PlaceActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
  
  &:hover {
    background: #e2e8f0;
    color: #1e293b;
  }
`;

const AddPlaceButton = styled.button`
  background: #f1f5f9;
  border: 2px dashed #cbd5e1;
  padding: 1rem;
  border-radius: 15px;
  width: 100%;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e2e8f0;
    border-color: #94a3b8;
  }
`;

const mockTripBook = {
  title: "제주도 3박 4일 여행",
  duration: "3박 4일",
  totalPlaces: 12,
  budget: "500,000원",
  days: [
    {
      day: 1,
      date: "2024-03-15",
      places: [
        {
          id: 1,
          name: "성산일출봉",
          location: "제주시 성산읍",
          time: "06:00",
          type: "관광지"
        },
        {
          id: 2,
          name: "만장굴",
          location: "제주시 조천읍",
          time: "10:00",
          type: "관광지"
        },
        {
          id: 3,
          name: "흑돼지 맛집",
          location: "제주시 관덕로",
          time: "12:00",
          type: "맛집"
        }
      ]
    },
    {
      day: 2,
      date: "2024-03-16",
      places: [
        {
          id: 4,
          name: "한라산 등반",
          location: "제주시 아라동",
          time: "08:00",
          type: "관광지"
        },
        {
          id: 5,
          name: "제주 올레길",
          location: "제주시 애월읍",
          time: "14:00",
          type: "관광지"
        }
      ]
    },
    {
      day: 3,
      date: "2024-03-17",
      places: [
        {
          id: 6,
          name: "성산일출봉 카페",
          location: "제주시 성산읍",
          time: "09:00",
          type: "카페"
        }
      ]
    },
    {
      day: 4,
      date: "2024-03-18",
      places: []
    }
  ]
};

const MyTripBookPage: React.FC = () => {
  const [tripBook, setTripBook] = useState(mockTripBook);

  const handleDeletePlace = (dayIndex: number, placeId: number) => {
    setTripBook(prev => ({
      ...prev,
      days: prev.days.map((day, index) => 
        index === dayIndex 
          ? { ...day, places: day.places.filter(place => place.id !== placeId) }
          : day
      )
    }));
  };

  const handleDownloadPDF = () => {
    console.log('PDF 다운로드');
  };

  const handleShare = () => {
    console.log('공유하기');
  };

  const handleEdit = () => {
    console.log('편집하기');
  };

  return (
    <BookContainer>
      <BookHeader>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <BookTitle>{tripBook.title}</BookTitle>
          
          <BookInfo>
            <InfoItem>
              <InfoLabel>여행 기간</InfoLabel>
              <InfoValue>{tripBook.duration}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>총 장소</InfoLabel>
              <InfoValue>{tripBook.totalPlaces}개</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>예산</InfoLabel>
              <InfoValue>{tripBook.budget}</InfoValue>
            </InfoItem>
          </BookInfo>
          
          <ActionButtons>
            <ActionButton onClick={handleDownloadPDF}>
              <FaDownload />
              PDF 다운로드
            </ActionButton>
            <ActionButton onClick={handleShare}>
              <FaShare />
              공유하기
            </ActionButton>
            <ActionButton onClick={handleEdit}>
              <FaEdit />
              편집하기
            </ActionButton>
          </ActionButtons>
        </motion.div>
      </BookHeader>

      <ScheduleContainer>
        {tripBook.days.map((day, dayIndex) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
          >
            <DaySection>
              <DayHeader>
                Day {day.day} - {day.date}
              </DayHeader>
              <PlaceList>
                {day.places.map((place, placeIndex) => (
                  <PlaceItem
                    key={place.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: placeIndex * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <PlaceImage>
                      {place.name.slice(0, 2)}
                    </PlaceImage>
                    <PlaceInfo>
                      <PlaceName>{place.name}</PlaceName>
                      <PlaceDetails>
                        <PlaceTime>
                          <FaClock />
                          {place.time}
                        </PlaceTime>
                        <PlaceLocation>
                          <FaMapMarkerAlt />
                          {place.location}
                        </PlaceLocation>
                      </PlaceDetails>
                    </PlaceInfo>
                    <PlaceActions>
                      <IconButton onClick={() => handleDeletePlace(dayIndex, place.id)}>
                        <FaTrash />
                      </IconButton>
                    </PlaceActions>
                  </PlaceItem>
                ))}
                <AddPlaceButton>
                  + 장소 추가하기
                </AddPlaceButton>
              </PlaceList>
            </DaySection>
          </motion.div>
        ))}
      </ScheduleContainer>
    </BookContainer>
  );
};

export default MyTripBookPage;









