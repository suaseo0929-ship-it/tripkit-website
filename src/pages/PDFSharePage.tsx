import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaDownload, FaShare, FaCopy, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const ShareContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem;
`;

const ShareCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
`;

const ShareTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 2rem;
`;

const PreviewSection = styled.div`
  background: #f8fafc;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const PreviewTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const ScheduleTable = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  background: #667eea;
  color: white;
  padding: 1rem;
  font-weight: 600;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 1rem;
`;

const TableRow = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 1rem;
  background: white;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: #667eea;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 2px solid #667eea;
  
  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const SocialButton = styled.button`
  background: white;
  border: 2px solid #e2e8f0;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  &.facebook {
    color: #1877f2;
    &:hover {
      background: #1877f2;
      color: white;
      border-color: #1877f2;
    }
  }
  
  &.twitter {
    color: #1da1f2;
    &:hover {
      background: #1da1f2;
      color: white;
      border-color: #1da1f2;
    }
  }
  
  &.instagram {
    color: #e4405f;
    &:hover {
      background: #e4405f;
      color: white;
      border-color: #e4405f;
    }
  }
`;

const mockSchedule = [
  { day: 'Day 1', place: '성산일출봉', time: '06:00' },
  { day: 'Day 1', place: '만장굴', time: '10:00' },
  { day: 'Day 1', place: '흑돼지 맛집', time: '12:00' },
  { day: 'Day 2', place: '한라산 등반', time: '08:00' },
  { day: 'Day 2', place: '제주 올레길', time: '14:00' },
  { day: 'Day 3', place: '성산일출봉 카페', time: '09:00' }
];

const PDFSharePage: React.FC = () => {
  const handleDownloadPDF = () => {
    console.log('PDF 다운로드');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다!');
  };

  const handleSocialShare = (platform: string) => {
    console.log(`${platform} 공유`);
  };

  return (
    <ShareContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ShareCard>
          <ShareTitle>여행 일정 공유</ShareTitle>
          
          <PreviewSection>
            <PreviewTitle>일정 미리보기</PreviewTitle>
            <ScheduleTable>
              <TableHeader>
                <div>일차</div>
                <div>장소</div>
                <div>시간</div>
              </TableHeader>
              {mockSchedule.map((item, index) => (
                <TableRow key={index}>
                  <div>{item.day}</div>
                  <div>{item.place}</div>
                  <div>{item.time}</div>
                </TableRow>
              ))}
            </ScheduleTable>
          </PreviewSection>
          
          <ActionButtons>
            <PrimaryButton onClick={handleDownloadPDF}>
              <FaDownload />
              PDF 파일로 저장
            </PrimaryButton>
            <SecondaryButton onClick={handleCopyLink}>
              <FaCopy />
              링크 복사
            </SecondaryButton>
          </ActionButtons>
          
          <SocialButtons>
            <SocialButton 
              className="facebook"
              onClick={() => handleSocialShare('facebook')}
            >
              <FaFacebook />
            </SocialButton>
            <SocialButton 
              className="twitter"
              onClick={() => handleSocialShare('twitter')}
            >
              <FaTwitter />
            </SocialButton>
            <SocialButton 
              className="instagram"
              onClick={() => handleSocialShare('instagram')}
            >
              <FaInstagram />
            </SocialButton>
          </SocialButtons>
        </ShareCard>
      </motion.div>
    </ShareContainer>
  );
};

export default PDFSharePage;









