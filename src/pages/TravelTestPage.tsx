import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaCheck, FaGlobeAsia, FaMapMarkedAlt, FaPlane, FaHeart, FaStar } from 'react-icons/fa';

const TestContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TestCard = styled(motion.div)`
  background: white;
  border-radius: 30px;
  padding: 3rem;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  text-align: center;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
`;

const QuestionNumber = styled.div`
  font-size: 1rem;
  color: #667eea;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const QuestionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2rem;
  line-height: 1.4;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-grow: 1;
`;

const OptionButton = styled(motion.button)<{ $selected?: boolean }>`
  background: ${props => props.$selected ? '#667eea' : '#f8fafc'};
  color: ${props => props.$selected ? 'white' : '#1e293b'};
  border: 2px solid ${props => props.$selected ? '#667eea' : '#e2e8f0'};
  padding: 1.5rem;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #667eea;
  }
`;

const SelectedIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: white;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavButton = styled.button<{ $disabled?: boolean }>`
  background: ${props => props.$disabled ? '#cbd5e1' : '#667eea'};
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
`;

const ResultContainer = styled.div`
  text-align: center;
  padding: 2rem 0;
`;

const ResultTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const ResultSubtitle = styled.h2`
  font-size: 1.5rem;
  color: #667eea;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const ResultDescription = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const RecommendationsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const RecommendationCard = styled(motion.div)`
  background: #f8fafc;
  border-radius: 15px;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
  }
`;

const RecommendationTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const RecommendationDescription = styled.p`
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const RecommendationTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
`;

interface Option {
  id: string;
  text: string;
  type: string;
  score: { [key: string]: number };
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "어떤 범위의 여행을 원하시나요?",
    options: [
      { id: 'domestic', text: "국내 여행 (한국 내)", type: "범위", score: { domestic: 5 } },
      { id: 'asia', text: "아시아 (가까운 해외)", type: "범위", score: { international: 3, asia: 5 } },
      { id: 'global', text: "전 세계 어디든 (장거리 포함)", type: "범위", score: { international: 5, adventure: 3 } },
      { id: 'both', text: "국내외 상관없이 좋은 곳이면", type: "범위", score: { flexible: 5 } }
    ]
  },
  {
    id: 2,
    question: "누구와 함께 여행하시나요?",
    options: [
      { id: 'solo', text: "혼자서 (나홀로 여행)", type: "동행", score: { solo: 5, freedom: 3 } },
      { id: 'couple', text: "연인/배우자와 둘이서", type: "동행", score: { couple: 5, romantic: 4 } },
      { id: 'family_kids', text: "아이와 함께 가족여행", type: "동행", score: { family: 5, safe: 4 } },
      { id: 'family_parents', text: "부모님과 함께", type: "동행", score: { family: 5, comfort: 4 } },
      { id: 'friends', text: "친구들과 함께", type: "동행", score: { group: 5, fun: 4 } }
    ]
  },
  {
    id: 3,
    question: "여행 예산은 어느 정도 생각하고 계시나요?",
    options: [
      { id: 'budget', text: "50만원 이하 (가성비 중시)", type: "예산", score: { budget: 5, domestic: 2 } },
      { id: 'moderate', text: "50-150만원 (적당한 수준)", type: "예산", score: { moderate: 5 } },
      { id: 'premium', text: "150-300만원 (편안한 여행)", type: "예산", score: { premium: 5, comfort: 3 } },
      { id: 'luxury', text: "300만원 이상 (럭셔리 여행)", type: "예산", score: { luxury: 5, international: 2 } }
    ]
  },
  {
    id: 4,
    question: "여행 기간은 보통 얼마나 되나요?",
    options: [
      { id: 'short', text: "1-2일 (짧고 굵게)", type: "기간", score: { domestic: 3, quick: 5 } },
      { id: 'weekend', text: "3-4일 (주말 여행)", type: "기간", score: { moderate: 5 } },
      { id: 'week', text: "5-7일 (일주일 정도)", type: "기간", score: { international: 3, relaxed: 4 } },
      { id: 'long', text: "8일 이상 (장기 여행)", type: "기간", score: { international: 5, adventure: 3 } }
    ]
  },
  {
    id: 5,
    question: "어떤 숙소를 선호하시나요?",
    options: [
      { id: 'hotel', text: "호텔 (편안하고 서비스 좋은)", type: "숙소", score: { comfort: 5, premium: 2 } },
      { id: 'resort', text: "리조트 (휴양 중심)", type: "숙소", score: { relaxed: 5, luxury: 3 } },
      { id: 'pension', text: "펜션/민박 (현지 분위기)", type: "숙소", score: { local: 5, budget: 2 } },
      { id: 'hostel', text: "게스트하우스/호스텔 (가성비)", type: "숙소", score: { budget: 5, social: 3 } }
    ]
  },
  {
    id: 6,
    question: "여행지에서 주로 어떻게 이동하시나요?",
    options: [
      { id: 'public', text: "대중교통 (지하철, 버스)", type: "교통", score: { budget: 3, local: 4 } },
      { id: 'rental', text: "렌터카 (자유로운 이동)", type: "교통", score: { freedom: 5, adventure: 2 } },
      { id: 'taxi', text: "택시/우버 (편리함 중시)", type: "교통", score: { comfort: 5, premium: 2 } },
      { id: 'walking', text: "도보 중심 (천천히 둘러보기)", type: "교통", score: { slow: 5, nature: 3 } }
    ]
  },
  {
    id: 7,
    question: "하루에 몇 시간 정도 활동하고 싶으신가요?",
    options: [
      { id: 'relaxed', text: "4-6시간 (여유롭게)", type: "활동량", score: { relaxed: 5, comfort: 3 } },
      { id: 'moderate', text: "6-8시간 (적당히)", type: "활동량", score: { moderate: 5 } },
      { id: 'active', text: "8-10시간 (알차게)", type: "활동량", score: { active: 5, adventure: 2 } },
      { id: 'intense', text: "10시간 이상 (빡빡하게)", type: "활동량", score: { intense: 5, adventure: 4 } }
    ]
  },
  {
    id: 8,
    question: "현지 음식에 대한 태도는?",
    options: [
      { id: 'conservative', text: "익숙한 음식 위주", type: "음식", score: { safe: 5, comfort: 2 } },
      { id: 'mixed', text: "현지식과 익숙한 음식 반반", type: "음식", score: { moderate: 5 } },
      { id: 'adventurous', text: "현지 음식 적극적으로 도전", type: "음식", score: { adventure: 5, local: 4 } },
      { id: 'extreme', text: "이상한 음식도 다 먹어보기", type: "음식", score: { adventure: 5, extreme: 3 } }
    ]
  },
  {
    id: 9,
    question: "여행 계획을 어떻게 세우시나요?",
    options: [
      { id: 'detailed', text: "시간별로 상세하게", type: "계획", score: { planned: 5, safe: 2 } },
      { id: 'outline', text: "큰 틀만 잡고", type: "계획", score: { moderate: 5 } },
      { id: 'flexible', text: "가서 정하기", type: "계획", score: { freedom: 5, adventure: 3 } },
      { id: 'spontaneous', text: "계획 없이 즉흥적으로", type: "계획", score: { spontaneous: 5, adventure: 4 } }
    ]
  },
  {
    id: 10,
    question: "언어 소통에 대한 부담은?",
    options: [
      { id: 'anxious', text: "언어 소통이 큰 부담", type: "언어", score: { domestic: 3, safe: 4 } },
      { id: 'careful', text: "기본 영어나 번역앱으로", type: "언어", score: { moderate: 5 } },
      { id: 'confident', text: "영어로 소통 가능", type: "언어", score: { international: 3, confident: 4 } },
      { id: 'adventurous', text: "몸짓으로도 소통 재미있어", type: "언어", score: { adventure: 5, social: 3 } }
    ]
  },
  {
    id: 11,
    question: "문화 차이에 대한 태도는?",
    options: [
      { id: 'similar', text: "비슷한 문화권이 편함", type: "문화", score: { safe: 4, asia: 3 } },
      { id: 'curious', text: "약간 다른 문화 흥미로움", type: "문화", score: { moderate: 5, cultural: 2 } },
      { id: 'embrace', text: "완전히 다른 문화 환영", type: "문화", score: { cultural: 5, adventure: 3 } },
      { id: 'extreme', text: "충격적인 문화차이도 OK", type: "문화", score: { extreme: 5, adventure: 4 } }
    ]
  },
  {
    id: 12,
    question: "선호하는 기후는?",
    options: [
      { id: 'cool', text: "서늘하고 선선한 날씨", type: "기후", score: { cool: 5, nature: 2 } },
      { id: 'mild', text: "따뜻하고 포근한 날씨", type: "기후", score: { moderate: 5, comfort: 2 } },
      { id: 'hot', text: "뜨겁고 화창한 날씨", type: "기후", score: { tropical: 5, beach: 3 } },
      { id: 'varied', text: "날씨는 크게 상관없음", type: "기후", score: { flexible: 5 } }
    ]
  },
  {
    id: 13,
    question: "어떤 활동을 가장 좋아하시나요?",
    options: [
      { id: 'nature', text: "자연 감상, 하이킹, 트래킹", type: "활동", score: { nature: 5, active: 3 } },
      { id: 'culture', text: "박물관, 미술관, 역사 탐방", type: "활동", score: { cultural: 5, learning: 3 } },
      { id: 'food', text: "맛집 탐방, 요리 체험", type: "활동", score: { food: 5, local: 3 } },
      { id: 'leisure', text: "휴양, 스파, 해변에서 휴식", type: "활동", score: { relaxed: 5, beach: 4 } }
    ]
  },
  {
    id: 14,
    question: "쇼핑에 대한 관심도는?",
    options: [
      { id: 'no_shopping', text: "쇼핑은 거의 안 함", type: "쇼핑", score: { nature: 2, budget: 2 } },
      { id: 'souvenir', text: "기념품 정도만", type: "쇼핑", score: { moderate: 5 } },
      { id: 'local', text: "현지 특산품 쇼핑", type: "쇼핑", score: { local: 4, cultural: 2 } },
      { id: 'luxury', text: "면세점, 명품 쇼핑", type: "쇼핑", score: { luxury: 4, premium: 3 } }
    ]
  },
  {
    id: 15,
    question: "여행 중 사진/영상 촬영은?",
    options: [
      { id: 'minimal', text: "거의 찍지 않음", type: "기록", score: { relaxed: 3, simple: 4 } },
      { id: 'casual', text: "추억용으로 가끔", type: "기록", score: { moderate: 5 } },
      { id: 'active', text: "예쁜 곳은 꼭 찍기", type: "기록", score: { instagram: 4, trendy: 3 } },
      { id: 'intensive', text: "인생샷/브이로그 제작", type: "기록", score: { instagram: 5, trendy: 4 } }
    ]
  },
  {
    id: 16,
    question: "현지인과의 교류는?",
    options: [
      { id: 'avoid', text: "최소한으로만", type: "교류", score: { private: 5, safe: 2 } },
      { id: 'limited', text: "필요할 때만", type: "교류", score: { moderate: 5 } },
      { id: 'open', text: "적극적으로 소통", type: "교류", score: { social: 5, cultural: 3 } },
      { id: 'immersive', text: "현지인처럼 살아보기", type: "교류", score: { local: 5, adventure: 4 } }
    ]
  },
  {
    id: 17,
    question: "휴식과 탐험의 비율은?",
    options: [
      { id: 'rest_focused', text: "휴식 80% : 탐험 20%", type: "균형", score: { relaxed: 5, comfort: 3 } },
      { id: 'balanced', text: "휴식 50% : 탐험 50%", type: "균형", score: { moderate: 5 } },
      { id: 'explore_focused', text: "휴식 20% : 탐험 80%", type: "균형", score: { active: 5, adventure: 3 } },
      { id: 'adventure_only', text: "탐험 위주, 휴식 최소", type: "균형", score: { adventure: 5, intense: 4 } }
    ]
  },
  {
    id: 18,
    question: "관광지 선호도는?",
    options: [
      { id: 'famous', text: "유명한 관광지 위주", type: "관광지", score: { popular: 5, safe: 2 } },
      { id: 'mixed', text: "유명한 곳과 숨은 명소 반반", type: "관광지", score: { moderate: 5 } },
      { id: 'hidden', text: "숨어있는 명소 위주", type: "관광지", score: { hidden: 5, adventure: 2 } },
      { id: 'untouched', text: "아무도 모르는 곳 개척", type: "관광지", score: { explorer: 5, adventure: 4 } }
    ]
  },
  {
    id: 19,
    question: "해외 여행 시 비행시간은?",
    options: [
      { id: 'short', text: "3시간 이내 (동북아)", type: "거리", score: { asia: 5, comfort: 2 } },
      { id: 'medium', text: "3-6시간 (동남아)", type: "거리", score: { asia: 4, moderate: 3 } },
      { id: 'long', text: "6-12시간 (유럽/미주)", type: "거리", score: { international: 4, adventure: 2 } },
      { id: 'ultra', text: "12시간 이상도 괜찮음", type: "거리", score: { explorer: 5, adventure: 4 } }
    ]
  },
  {
    id: 20,
    question: "번거로운 절차(비자 등)에 대한 태도는?",
    options: [
      { id: 'avoid', text: "무비자 국가만", type: "절차", score: { simple: 5, asia: 2 } },
      { id: 'easy', text: "간단한 비자는 OK", type: "절차", score: { moderate: 5 } },
      { id: 'complex', text: "복잡한 비자도 상관없음", type: "절차", score: { international: 4, dedicated: 3 } },
      { id: 'extreme', text: "어떤 절차든 감수", type: "절차", score: { explorer: 5, adventure: 3 } }
    ]
  }
];

interface Destination {
  name: string;
  description: string;
  tags: string[];
  type: string;
}

interface DestinationGroup {
  domestic: Destination[];
  asia: Destination[];
  international: Destination[];
}

const destinations: DestinationGroup = {
  domestic: [
    { name: '제주도', description: '자연과 휴양의 완벽한 조화', tags: ['자연', '휴양', '드라이브'], type: 'domestic' },
    { name: '부산', description: '바다와 도시의 매력', tags: ['해변', '도시', '맛집'], type: 'domestic' },
    { name: '강릉', description: '커피와 바다의 도시', tags: ['바다', '커피', '휴양'], type: 'domestic' },
    { name: '경주', description: '살아있는 역사 박물관', tags: ['역사', '문화', '유적'], type: 'domestic' },
  ],
  asia: [
    { name: '도쿄', description: '전통과 현대의 완벽한 조화', tags: ['도시', '문화', '쇼핑'], type: 'asia' },
    { name: '발리', description: '신들의 섬에서 누리는 휴양', tags: ['휴양', '자연', '스파'], type: 'asia' },
    { name: '방콕', description: '황금빛 사원과 스트릿푸드', tags: ['문화', '음식', '야시장'], type: 'asia' },
    { name: '싱가포르', description: '깨끗하고 안전한 도시국가', tags: ['도시', '안전', '다양성'], type: 'asia' },
  ],
  international: [
    { name: '파리', description: '로맨스와 예술의 도시', tags: ['로맨틱', '예술', '문화'], type: 'international' },
    { name: '뉴욕', description: '꿈의 도시, 무한한 가능성', tags: ['도시', '문화', '쇼핑'], type: 'international' },
    { name: '런던', description: '역사와 현대가 공존하는 도시', tags: ['역사', '문화', '박물관'], type: 'international' },
    { name: '로마', description: '영원한 도시의 감동', tags: ['역사', '문화', '유적'], type: 'international' },
  ]
};

const TravelTestPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelect = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const getRecommendations = () => {
    const scores: { [key: string]: number } = {};
    
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = questions.find(q => q.id === parseInt(questionId) + 1);
      const option = question?.options.find((o: Option) => o.id === answerId);
      
      if (option?.score) {
        Object.entries(option.score).forEach(([key, value]) => {
          scores[key] = (scores[key] || 0) + value;
        });
      }
    });

    const domesticScore = (scores.domestic || 0);
    const asiaScore = (scores.asia || 0) + (scores.international || 0) * 0.3;
    const internationalScore = (scores.international || 0);

    let travelType: keyof DestinationGroup = 'domestic';
    let personalityType = '균형형 여행자';
    
    if (internationalScore > domesticScore && internationalScore > asiaScore) {
      travelType = 'international';
    } else if (asiaScore > domesticScore) {
      travelType = 'asia';
    }

    if (scores.adventure > 15) personalityType = '모험가형 여행자';
    else if (scores.relaxed > 15) personalityType = '휴양형 여행자';
    else if (scores.cultural > 10) personalityType = '문화탐방형 여행자';
    else if (scores.luxury > 10) personalityType = '럭셔리 여행자';
    else if (scores.budget > 10) personalityType = '가성비 여행자';

    const recommendedDestinations = destinations[travelType] || destinations.domestic;
    
    return {
      type: personalityType,
      description: `당신은 ${personalityType}입니다. ${travelType === 'domestic' ? '국내' : travelType === 'asia' ? '아시아' : '전 세계'} 여행을 추천드려요!`,
      destinations: recommendedDestinations,
      scores
    };
  };

  const handleStartPlanning = () => {
    navigate('/');
  };

  if (showResult) {
    const result = getRecommendations();
    
    return (
      <TestContainer>
        <TestCard
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ResultContainer>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ResultTitle>🎉 진단 완료!</ResultTitle>
              <ResultSubtitle>{result.type}</ResultSubtitle>
              <ResultDescription>{result.description}</ResultDescription>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#1e293b' }}>
                🌟 맞춤 추천 여행지
              </h3>
              <RecommendationsContainer>
                {result.destinations.map((destination, index) => (
                  <RecommendationCard
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <RecommendationTitle>{destination.name}</RecommendationTitle>
                    <RecommendationDescription>{destination.description}</RecommendationDescription>
                    <RecommendationTags>
                      {destination.tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </RecommendationTags>
                  </RecommendationCard>
                ))}
              </RecommendationsContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <ActionButton onClick={handleStartPlanning}>
                상세 여행 계획 세우기
              </ActionButton>
            </motion.div>
          </ResultContainer>
        </TestCard>
      </TestContainer>
    );
  }

  const currentQ = questions[currentQuestion];
  const selectedOption = answers[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <TestContainer>
      <TestCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <ProgressBar>
            <ProgressFill
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </ProgressBar>
          
          <QuestionNumber>
            질문 {currentQuestion + 1} / {questions.length}
          </QuestionNumber>
          
          <QuestionTitle>{currentQ.question}</QuestionTitle>
          
          <OptionsContainer>
            <AnimatePresence mode="wait">
              {currentQ.options.map((option, index) => (
                <OptionButton
                  key={option.id}
                  $selected={selectedOption === option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {option.text}
                  {selectedOption === option.id && (
                    <SelectedIcon>
                      <FaCheck />
                    </SelectedIcon>
                  )}
                </OptionButton>
              ))}
            </AnimatePresence>
          </OptionsContainer>
        </div>
        
        <NavigationButtons>
          <NavButton
            onClick={handlePrevious}
            $disabled={currentQuestion === 0}
            disabled={currentQuestion === 0}
          >
            <FaArrowLeft />
            이전
          </NavButton>
          
          <NavButton
            onClick={handleNext}
            $disabled={!selectedOption}
            disabled={!selectedOption}
          >
            {currentQuestion === questions.length - 1 ? '결과 보기' : '다음'}
            <FaArrowRight />
          </NavButton>
        </NavigationButtons>
      </TestCard>
    </TestContainer>
  );
};

export default TravelTestPage;
