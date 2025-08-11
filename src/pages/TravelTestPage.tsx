import React, { useState, useEffect } from 'react';
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

const QuestionSubtitle = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 1rem;
  font-style: italic;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-grow: 1;
`;

const OptionButton = styled(motion.button)<{ $selected?: boolean; $multiple?: boolean }>`
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

  ${props => props.$multiple && `
    &::before {
      content: '☐';
      margin-right: 0.5rem;
      font-size: 1.2rem;
    }
    
    ${props.$selected && `
      &::before {
        content: '☑';
      }
    `}
  `}
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
  score: { [key: string]: number };
}

interface Question {
  id: number;
  question: string;
  subtitle?: string;
  type: 'single' | 'multiple';
  condition?: {
    skipIf?: string[];  // 이 값들이 선택되면 질문 스킵
    showIf?: string[];  // 이 값들이 선택되면 질문 보여줌
  };
  options: Option[];
}

// 기존 20개 질문 + 동적 흐름 적용
const allQuestions: Question[] = [
  {
    id: 1,
    question: "어떤 범위의 여행을 원하시나요?",
    type: 'single',
    options: [
      { id: 'domestic', text: "국내 여행 (한국 내)", score: { domestic: 5 } },
      { id: 'asia', text: "아시아 (가까운 해외)", score: { international: 3, asia: 5 } },
      { id: 'global', text: "전 세계 어디든 (장거리 포함)", score: { international: 5, adventure: 3 } },
      { id: 'both', text: "국내외 상관없이 좋은 곳이면", score: { flexible: 5 } }
    ]
  },
  {
    id: 2,
    question: "누구와 함께 여행하시나요?",
    type: 'single',
    options: [
      { id: 'solo', text: "혼자서 (나홀로 여행)", score: { solo: 5, freedom: 3 } },
      { id: 'couple', text: "연인/배우자와 둘이서", score: { couple: 5, romantic: 4 } },
      { id: 'family_kids', text: "아이와 함께 가족여행", score: { family: 5, safe: 4 } },
      { id: 'family_parents', text: "부모님과 함께", score: { family: 5, comfort: 4 } },
      { id: 'friends', text: "친구들과 함께", score: { group: 5, fun: 4 } }
    ]
  },
  {
    id: 3,
    question: "여행 예산은 어느 정도 생각하고 계시나요?",
    type: 'single',
    options: [
      { id: 'budget', text: "50만원 이하 (가성비 중시)", score: { budget: 5, domestic: 2 } },
      { id: 'moderate', text: "50-150만원 (적당한 수준)", score: { moderate: 5 } },
      { id: 'premium', text: "150-300만원 (편안한 여행)", score: { premium: 5, comfort: 3 } },
      { id: 'luxury', text: "300만원 이상 (럭셔리 여행)", score: { luxury: 5, international: 2 } }
    ]
  },
  {
    id: 4,
    question: "여행 기간은 보통 얼마나 되나요?",
    type: 'single',
    options: [
      { id: 'short', text: "1-2일 (짧고 굵게)", score: { domestic: 3, quick: 5 } },
      { id: 'weekend', text: "3-4일 (주말 여행)", score: { moderate: 5 } },
      { id: 'week', text: "5-7일 (일주일 정도)", score: { international: 3, relaxed: 4 } },
      { id: 'long', text: "8일 이상 (장기 여행)", score: { international: 5, adventure: 3 } }
    ]
  },
  {
    id: 5,
    question: "어떤 숙소를 선호하시나요?",
    type: 'single',
    options: [
      { id: 'hotel', text: "호텔 (편안하고 서비스 좋은)", score: { comfort: 5, premium: 2 } },
      { id: 'resort', text: "리조트 (휴양 중심)", score: { relaxed: 5, luxury: 3 } },
      { id: 'pension', text: "펜션/민박 (현지 분위기)", score: { local: 5, budget: 2 } },
      { id: 'hostel', text: "게스트하우스/호스텔 (가성비)", score: { budget: 5, social: 3 } }
    ]
  },
  {
    id: 6,
    question: "여행지에서 주로 어떻게 이동하시나요?",
    type: 'single',
    options: [
      { id: 'public', text: "대중교통 (지하철, 버스)", score: { budget: 3, local: 4 } },
      { id: 'rental', text: "렌터카 (자유로운 이동)", score: { freedom: 5, adventure: 2 } },
      { id: 'taxi', text: "택시/우버 (편리함 중시)", score: { comfort: 5, premium: 2 } },
      { id: 'walking', text: "도보 중심 (천천히 둘러보기)", score: { slow: 5, nature: 3 } }
    ]
  },
  {
    id: 7,
    question: "하루에 몇 시간 정도 활동하고 싶으신가요?",
    type: 'single',
    options: [
      { id: 'relaxed', text: "4-6시간 (여유롭게)", score: { relaxed: 5, comfort: 3 } },
      { id: 'moderate', text: "6-8시간 (적당히)", score: { moderate: 5 } },
      { id: 'active', text: "8-10시간 (알차게)", score: { active: 5, adventure: 2 } },
      { id: 'intense', text: "10시간 이상 (빡빡하게)", score: { intense: 5, adventure: 4 } }
    ]
  },
  {
    id: 8,
    question: "현지 음식에 대한 태도는?",
    type: 'single',
    options: [
      { id: 'conservative', text: "익숙한 음식 위주", score: { safe: 5, comfort: 2 } },
      { id: 'mixed', text: "현지식과 익숙한 음식 반반", score: { moderate: 5 } },
      { id: 'adventurous', text: "현지 음식 적극적으로 도전", score: { adventure: 5, local: 4 } },
      { id: 'extreme', text: "이상한 음식도 다 먹어보기", score: { adventure: 5, extreme: 3 } }
    ]
  },
  {
    id: 9,
    question: "여행 계획을 어떻게 세우시나요?",
    type: 'single',
    options: [
      { id: 'detailed', text: "시간별로 상세하게", score: { planned: 5, safe: 2 } },
      { id: 'outline', text: "큰 틀만 잡고", score: { moderate: 5 } },
      { id: 'flexible', text: "가서 정하기", score: { freedom: 5, adventure: 3 } },
      { id: 'spontaneous', text: "계획 없이 즉흥적으로", score: { spontaneous: 5, adventure: 4 } }
    ]
  },
  // 🔥 국내 여행자는 스킵되는 질문
  {
    id: 10,
    question: "언어 소통에 대한 부담은?",
    type: 'single',
    condition: { skipIf: ['domestic'] }, // 국내 여행 선택시 스킵
    options: [
      { id: 'anxious', text: "언어 소통이 큰 부담", score: { domestic: 3, safe: 4 } },
      { id: 'careful', text: "기본 영어나 번역앱으로", score: { moderate: 5 } },
      { id: 'confident', text: "영어로 소통 가능", score: { international: 3, confident: 4 } },
      { id: 'adventurous', text: "몸짓으로도 소통 재미있어", score: { adventure: 5, social: 3 } }
    ]
  },
  // 🔥 국내 여행자는 스킵되는 질문
  {
    id: 11,
    question: "문화 차이에 대한 태도는?",
    type: 'single',
    condition: { skipIf: ['domestic'] }, // 국내 여행 선택시 스킵
    options: [
      { id: 'similar', text: "비슷한 문화권이 편함", score: { safe: 4, asia: 3 } },
      { id: 'curious', text: "약간 다른 문화 흥미로움", score: { moderate: 5, cultural: 2 } },
      { id: 'embrace', text: "완전히 다른 문화 환영", score: { cultural: 5, adventure: 3 } },
      { id: 'extreme', text: "충격적인 문화차이도 OK", score: { extreme: 5, adventure: 4 } }
    ]
  },
  {
    id: 12,
    question: "선호하는 기후는?",
    type: 'single',
    options: [
      { id: 'cool', text: "서늘하고 선선한 날씨", score: { cool: 5, nature: 2 } },
      { id: 'mild', text: "따뜻하고 포근한 날씨", score: { moderate: 5, comfort: 2 } },
      { id: 'hot', text: "뜨겁고 화창한 날씨", score: { tropical: 5, beach: 3 } },
      { id: 'varied', text: "날씨는 크게 상관없음", score: { flexible: 5 } }
    ]
  },
  // 🔥 중복 선택 가능한 질문
  {
    id: 13,
    question: "어떤 활동들을 가장 좋아하시나요?",
    subtitle: "여러 개 선택 가능합니다",
    type: 'multiple',
    options: [
      { id: 'nature', text: "자연 감상, 하이킹, 트래킹", score: { nature: 5, active: 3 } },
      { id: 'culture', text: "박물관, 미술관, 역사 탐방", score: { cultural: 5, learning: 3 } },
      { id: 'food', text: "맛집 탐방, 요리 체험", score: { food: 5, local: 3 } },
      { id: 'leisure', text: "휴양, 스파, 해변에서 휴식", score: { relaxed: 5, beach: 4 } },
      { id: 'adventure', text: "익스트림 스포츠, 모험", score: { adventure: 8, thrill: 5 } },
      { id: 'shopping', text: "쇼핑, 현대적 도시 탐방", score: { urban: 5, modern: 3 } }
    ]
  },
  {
    id: 14,
    question: "쇼핑에 대한 관심도는?",
    type: 'single',
    options: [
      { id: 'no_shopping', text: "쇼핑은 거의 안 함", score: { nature: 2, budget: 2 } },
      { id: 'souvenir', text: "기념품 정도만", score: { moderate: 5 } },
      { id: 'local', text: "현지 특산품 쇼핑", score: { local: 4, cultural: 2 } },
      { id: 'luxury', text: "면세점, 명품 쇼핑", score: { luxury: 4, premium: 3 } }
    ]
  },
  {
    id: 15,
    question: "여행 중 사진/영상 촬영은?",
    type: 'single',
    options: [
      { id: 'minimal', text: "거의 찍지 않음", score: { relaxed: 3, simple: 4 } },
      { id: 'casual', text: "추억용으로 가끔", score: { moderate: 5 } },
      { id: 'active', text: "예쁜 곳은 꼭 찍기", score: { instagram: 4, trendy: 3 } },
      { id: 'intensive', text: "인생샷/브이로그 제작", score: { instagram: 5, trendy: 4 } }
    ]
  },
  {
    id: 16,
    question: "현지인과의 교류는?",
    type: 'single',
    options: [
      { id: 'avoid', text: "최소한으로만", score: { private: 5, safe: 2 } },
      { id: 'limited', text: "필요할 때만", score: { moderate: 5 } },
      { id: 'open', text: "적극적으로 소통", score: { social: 5, cultural: 3 } },
      { id: 'immersive', text: "현지인처럼 살아보기", score: { local: 5, adventure: 4 } }
    ]
  },
  {
    id: 17,
    question: "휴식과 탐험의 비율은?",
    type: 'single',
    options: [
      { id: 'rest_focused', text: "휴식 80% : 탐험 20%", score: { relaxed: 5, comfort: 3 } },
      { id: 'balanced', text: "휴식 50% : 탐험 50%", score: { moderate: 5 } },
      { id: 'explore_focused', text: "휴식 20% : 탐험 80%", score: { active: 5, adventure: 3 } },
      { id: 'adventure_only', text: "탐험 위주, 휴식 최소", score: { adventure: 5, intense: 4 } }
    ]
  },
  {
    id: 18,
    question: "관광지 선호도는?",
    type: 'single',
    options: [
      { id: 'famous', text: "유명한 관광지 위주", score: { popular: 5, safe: 2 } },
      { id: 'mixed', text: "유명한 곳과 숨은 명소 반반", score: { moderate: 5 } },
      { id: 'hidden', text: "숨어있는 명소 위주", score: { hidden: 5, adventure: 2 } },
      { id: 'untouched', text: "아무도 모르는 곳 개척", score: { explorer: 5, adventure: 4 } }
    ]
  },
  // 🔥 국내 여행자는 스킵되는 질문 
  {
    id: 19,
    question: "해외 여행 시 비행시간은?",
    type: 'single',
    condition: { skipIf: ['domestic'] }, // 국내 여행 선택시 스킵
    options: [
      { id: 'short', text: "3시간 이내 (동북아)", score: { asia: 5, comfort: 2 } },
      { id: 'medium', text: "3-6시간 (동남아)", score: { asia: 4, moderate: 3 } },
      { id: 'long', text: "6-12시간 (유럽/미주)", score: { international: 4, adventure: 2 } },
      { id: 'ultra', text: "12시간 이상도 괜찮음", score: { explorer: 5, adventure: 4 } }
    ]
  },
  // 🔥 국내 여행자는 스킵되는 질문
  {
    id: 20,
    question: "번거로운 절차(비자 등)에 대한 태도는?",
    type: 'single',
    condition: { skipIf: ['domestic'] }, // 국내 여행 선택시 스킵
    options: [
      { id: 'avoid', text: "무비자 국가만", score: { simple: 5, asia: 2 } },
      { id: 'easy', text: "간단한 비자는 OK", score: { moderate: 5 } },
      { id: 'complex', text: "복잡한 비자도 상관없음", score: { international: 4, dedicated: 3 } },
      { id: 'extreme', text: "어떤 절차든 감수", score: { explorer: 5, adventure: 3 } }
    ]
  },
  // 🔥 커플 여행자만을 위한 추가 질문
  {
    id: 21,
    question: "커플 여행에서 가장 중요한 것은?",
    subtitle: "연인/배우자와 함께 선택한 분만 답변해주세요",
    type: 'single',
    condition: { showIf: ['couple'] }, // 커플 선택시에만 보여줌
    options: [
      { id: 'romantic_view', text: "로맨틱한 뷰/석양", score: { romantic: 8, nature: 3 } },
      { id: 'luxury_dining', text: "고급 레스토랑", score: { luxury: 5, romantic: 5 } },
      { id: 'private_time', text: "둘만의 프라이빗 시간", score: { private: 8, intimate: 5 } },
      { id: 'photo_spots', text: "커플 인증샷 명소", score: { trendy: 5, memorable: 5 } }
    ]
  },
  // 🔥 가족 여행자만을 위한 추가 질문
  {
    id: 22,
    question: "가족 여행에서 가장 우선순위는?",
    subtitle: "가족과 함께 선택한 분만 답변해주세요",
    type: 'single',
    condition: { showIf: ['family_kids', 'family_parents'] }, // 가족 선택시에만 보여줌
    options: [
      { id: 'safety_first', text: "안전이 최우선", score: { safe: 10, comfort: 3 } },
      { id: 'convenience', text: "편의시설 완비", score: { comfort: 8, family: 5 } },
      { id: 'education', text: "교육적 가치", score: { cultural: 8, learning: 5 } },
      { id: 'fun_together', text: "온 가족이 즐길 수 있는 활동", score: { fun: 8, active: 3 } }
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
    { name: '전주', description: '한국의 맛과 전통', tags: ['전통', '음식', '한옥'], type: 'domestic' }
  ],
  asia: [
    { name: '도쿄', description: '전통과 현대의 완벽한 조화', tags: ['도시', '문화', '쇼핑'], type: 'asia' },
    { name: '발리', description: '신들의 섬에서 누리는 휴양', tags: ['휴양', '자연', '스파'], type: 'asia' },
    { name: '방콕', description: '황금빛 사원과 스트릿푸드', tags: ['문화', '음식', '야시장'], type: 'asia' },
    { name: '싱가포르', description: '깨끗하고 안전한 도시국가', tags: ['도시', '안전', '다양성'], type: 'asia' },
    { name: '교토', description: '일본의 전통미가 살아있는 고도', tags: ['전통', '문화', '사찰'], type: 'asia' }
  ],
  international: [
    { name: '파리', description: '로맨스와 예술의 도시', tags: ['로맨틱', '예술', '문화'], type: 'international' },
    { name: '뉴욕', description: '꿈의 도시, 무한한 가능성', tags: ['도시', '문화', '쇼핑'], type: 'international' },
    { name: '런던', description: '역사와 현대가 공존하는 도시', tags: ['역사', '문화', '박물관'], type: 'international' },
    { name: '로마', description: '영원한 도시의 감동', tags: ['역사', '문화', '유적'], type: 'international' },
    { name: '시드니', description: '자연과 도시가 어우러진 항구도시', tags: ['자연', '도시', '해변'], type: 'international' }
  ]
};

const TravelTestPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string | string[] }>({});
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  // 동적으로 질문 필터링
  useEffect(() => {
    const filterQuestions = () => {
      const allAnswers = Object.values(answers).flat();
      
      const filtered = allQuestions.filter(question => {
        // skipIf 조건 체크
        if (question.condition?.skipIf) {
          const shouldSkip = question.condition.skipIf.some(skipValue => 
            allAnswers.includes(skipValue)
          );
          if (shouldSkip) return false;
        }
        
        // showIf 조건 체크
        if (question.condition?.showIf) {
          const shouldShow = question.condition.showIf.some(showValue => 
            allAnswers.includes(showValue)
          );
          if (!shouldShow) return false;
        }
        
        return true;
      });
      
      setAvailableQuestions(filtered);
      
      // 현재 질문 인덱스 조정
      if (currentQuestionIndex >= filtered.length && filtered.length > 0) {
        setCurrentQuestionIndex(Math.max(0, filtered.length - 1));
      }
    };

    filterQuestions();
  }, [answers, currentQuestionIndex]);

  const handleOptionSelect = (optionId: string) => {
    const currentQuestion = availableQuestions[currentQuestionIndex];
    
    if (currentQuestion.type === 'multiple') {
      const currentAnswers = (answers[currentQuestion.id] as string[]) || [];
      const newAnswers = currentAnswers.includes(optionId)
        ? currentAnswers.filter(id => id !== optionId)
        : [...currentAnswers, optionId];
      
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: newAnswers
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: optionId
      }));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < availableQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const getCurrentAnswers = () => {
    const currentQuestion = availableQuestions[currentQuestionIndex];
    return answers[currentQuestion?.id] || (currentQuestion?.type === 'multiple' ? [] : '');
  };

  const isAnswerSelected = () => {
    const currentAnswers = getCurrentAnswers();
    if (Array.isArray(currentAnswers)) {
      return currentAnswers.length > 0;
    }
    return currentAnswers !== '';
  };

  const getRecommendations = () => {
    const scores: { [key: string]: number } = {};
    
    Object.entries(answers).forEach(([questionId, answerIds]) => {
      const question = allQuestions.find(q => q.id === parseInt(questionId));
      const answerArray = Array.isArray(answerIds) ? answerIds : [answerIds];
      
      answerArray.forEach(answerId => {
        const option = question?.options.find(o => o.id === answerId);
        if (option?.score) {
          Object.entries(option.score).forEach(([key, value]) => {
            scores[key] = (scores[key] || 0) + value;
          });
        }
      });
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

    if (scores.adventure > 20) personalityType = '모험가형 여행자';
    else if (scores.relaxed > 20) personalityType = '휴양형 여행자';
    else if (scores.cultural > 15) personalityType = '문화탐방형 여행자';
    else if (scores.luxury > 15) personalityType = '럭셔리 여행자';
    else if (scores.budget > 15) personalityType = '가성비 여행자';
    else if (scores.romantic > 15) personalityType = '로맨틱 여행자';
    else if (scores.family > 15) personalityType = '가족 중심 여행자';

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

  if (availableQuestions.length === 0) {
    return (
      <TestContainer>
        <TestCard>
          <div>로딩 중...</div>
        </TestCard>
      </TestContainer>
    );
  }

  const currentQuestion = availableQuestions[currentQuestionIndex];
  const currentAnswers = getCurrentAnswers();
  const progress = ((currentQuestionIndex + 1) / availableQuestions.length) * 100;

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
            질문 {currentQuestionIndex + 1} / {availableQuestions.length}
          </QuestionNumber>
          
          <QuestionTitle>{currentQuestion.question}</QuestionTitle>
          
          {currentQuestion.subtitle && (
            <QuestionSubtitle>{currentQuestion.subtitle}</QuestionSubtitle>
          )}
          
          <OptionsContainer>
            <AnimatePresence mode="wait">
              {currentQuestion.options.map((option, index) => {
                const isSelected = Array.isArray(currentAnswers) 
                  ? currentAnswers.includes(option.id)
                  : currentAnswers === option.id;
                
                return (
                  <OptionButton
                    key={option.id}
                    $selected={isSelected}
                    $multiple={currentQuestion.type === 'multiple'}
                    onClick={() => handleOptionSelect(option.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {option.text}
                    {isSelected && currentQuestion.type === 'single' && (
                      <SelectedIcon>
                        <FaCheck />
                      </SelectedIcon>
                    )}
                  </OptionButton>
                );
              })}
            </AnimatePresence>
          </OptionsContainer>
        </div>
        
        <NavigationButtons>
          <NavButton
            onClick={handlePrevious}
            $disabled={currentQuestionIndex === 0}
            disabled={currentQuestionIndex === 0}
          >
            <FaArrowLeft />
            이전
          </NavButton>
          
          <NavButton
            onClick={handleNext}
            $disabled={!isAnswerSelected()}
            disabled={!isAnswerSelected()}
          >
            {currentQuestionIndex === availableQuestions.length - 1 ? '결과 보기' : '다음'}
            <FaArrowRight />
          </NavButton>
        </NavigationButtons>
      </TestCard>
    </TestContainer>
  );
};

export default TravelTestPage;
