import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';

const TravelTestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [showResult, setShowResult] = useState(false);

  // 질문 데이터 (조건부 로직 포함)
  const allQuestions = [
    {
      id: 'travel_scope',
      question: "어떤 범위의 여행을 원하시나요?",
      type: 'single',
      required: true,
      options: [
        { id: 'domestic', text: "국내 여행 (한국 내)", score: { domestic: 10 } },
        { id: 'asia', text: "아시아 (가까운 해외)", score: { asia: 10, international: 5 } },
        { id: 'international', text: "전 세계 어디든", score: { international: 10, adventure: 3 } },
        { id: 'flexible', text: "국내외 상관없음", score: { flexible: 5 } }
      ]
    },
    {
      id: 'travel_companion',
      question: "누구와 함께 여행하시나요?",
      type: 'single',
      required: true,
      options: [
        { id: 'solo', text: "혼자서", score: { solo: 10, freedom: 5 } },
        { id: 'couple', text: "연인/배우자와", score: { romantic: 10, couple: 5 } },
        { id: 'family_kids', text: "아이와 함께", score: { family: 10, safe: 8 } },
        { id: 'family_parents', text: "부모님과 함께", score: { comfort: 8, safe: 5 } },
        { id: 'friends', text: "친구들과", score: { social: 10, fun: 8 } }
      ]
    },
    {
      id: 'budget',
      question: "여행 예산은 어느 정도인가요?",
      type: 'single',
      required: true,
      options: [
        { id: 'budget', text: "100만원 이하", score: { budget: 10, domestic: 3 } },
        { id: 'moderate', text: "100-300만원", score: { moderate: 10 } },
        { id: 'premium', text: "300-500만원", score: { premium: 10, comfort: 5 } },
        { id: 'luxury', text: "500만원 이상", score: { luxury: 10, international: 3 } }
      ]
    },
    {
      id: 'duration',
      question: "여행 기간은?",
      type: 'single',
      required: true,
      options: [
        { id: 'short', text: "1-2일", score: { domestic: 5, quick: 10 } },
        { id: 'weekend', text: "3-4일", score: { moderate: 8 } },
        { id: 'week', text: "5-7일", score: { international: 3, relaxed: 5 } },
        { id: 'long', text: "8일 이상", score: { international: 8, adventure: 5 } }
      ]
    },
    {
      id: 'activities',
      question: "어떤 활동들을 좋아하시나요? (중복 선택 가능)",
      type: 'multiple',
      required: true,
      options: [
        { id: 'nature', text: "자연 감상, 하이킹", score: { nature: 8, active: 5 } },
        { id: 'culture', text: "박물관, 역사 탐방", score: { cultural: 8, learning: 5 } },
        { id: 'food', text: "맛집 탐방", score: { food: 8, local: 5 } },
        { id: 'leisure', text: "휴양, 스파", score: { relaxed: 8, luxury: 3 } },
        { id: 'adventure', text: "모험, 액티비티", score: { adventure: 10, active: 8 } },
        { id: 'nightlife', text: "나이트라이프, 쇼핑", score: { urban: 8, social: 5 } }
      ]
    },
    {
      id: 'accommodation',
      question: "선호하는 숙소는?",
      type: 'single',
      required: true,
      options: [
        { id: 'hotel', text: "호텔", score: { comfort: 8, premium: 5 } },
        { id: 'resort', text: "리조트", score: { relaxed: 10, luxury: 8 } },
        { id: 'pension', text: "펜션/민박", score: { local: 8, budget: 3 } },
        { id: 'hostel', text: "게스트하우스", score: { budget: 8, social: 5 } }
      ]
    },
    // 국내 여행자만을 위한 질문
    {
      id: 'domestic_region',
      question: "국내에서 가고 싶은 지역은? (중복 선택 가능)",
      type: 'multiple',
      condition: { includes: ['domestic'] },
      options: [
        { id: 'jeju', text: "제주도", score: { nature: 5, relaxed: 5 } },
        { id: 'busan', text: "부산", score: { urban: 5, food: 3 } },
        { id: 'gangneung', text: "강릉", score: { nature: 3, relaxed: 5 } },
        { id: 'gyeongju', text: "경주", score: { cultural: 8, history: 5 } },
        { id: 'seoul', text: "서울", score: { urban: 8, culture: 5 } }
      ]
    },
    // 해외 여행자만을 위한 질문
    {
      id: 'international_experience',
      question: "해외 여행 경험은?",
      type: 'single',
      condition: { includes: ['asia', 'international'] },
      options: [
        { id: 'first', text: "첫 해외여행", score: { safe: 8, guided: 5 } },
        { id: 'beginner', text: "2-5번 정도", score: { moderate: 5 } },
        { id: 'experienced', text: "자주 다님", score: { adventure: 5, independent: 8 } }
      ]
    },
    {
      id: 'language_comfort',
      question: "언어 소통에 대한 부담은?",
      type: 'single',
      condition: { includes: ['asia', 'international'] },
      options: [
        { id: 'anxious', text: "큰 부담", score: { safe: 8, guided: 5 } },
        { id: 'moderate', text: "번역앱 활용", score: { moderate: 5 } },
        { id: 'confident', text: "영어 가능", score: { independent: 8, adventure: 3 } }
      ]
    },
    // 커플/로맨틱 여행자를 위한 질문
    {
      id: 'romantic_preferences',
      question: "로맨틱한 순간을 위해 중요한 것은? (중복 선택 가능)",
      type: 'multiple',
      condition: { includes: ['couple'] },
      options: [
        { id: 'sunset', text: "아름다운 석양", score: { romantic: 8, nature: 5 } },
        { id: 'dining', text: "근사한 식사", score: { luxury: 5, food: 8 } },
        { id: 'spa', text: "커플 스파", score: { relaxed: 8, luxury: 5 } },
        { id: 'privacy', text: "프라이빗한 공간", score: { private: 8, luxury: 3 } }
      ]
    },
    // 가족 여행자를 위한 질문
    {
      id: 'family_priorities',
      question: "가족 여행에서 가장 중요한 것은?",
      type: 'single',
      condition: { includes: ['family_kids', 'family_parents'] },
      options: [
        { id: 'safety', text: "안전한 환경", score: { safe: 10, comfort: 5 } },
        { id: 'convenience', text: "편의시설", score: { comfort: 10, family: 5 } },
        { id: 'education', text: "교육적 가치", score: { cultural: 8, learning: 8 } },
        { id: 'fun', text: "재미있는 활동", score: { fun: 10, active: 5 } }
      ]
    }
  ];

  // 조건에 따라 보여줄 질문들 필터링
  useEffect(() => {
    const filterQuestions = () => {
      const filtered = allQuestions.filter(question => {
        // 조건이 없으면 항상 포함
        if (!question.condition) return true;
        
        // 조건 체크
        const { includes, excludes } = question.condition;
        const userAnswers = Object.values(answers).flat();
        
        if (includes && !includes.some(item => userAnswers.includes(item))) {
          return false;
        }
        
        if (excludes && excludes.some(item => userAnswers.includes(item))) {
          return false;
        }
        
        return true;
      });
      
      setAvailableQuestions(filtered);
    };

    filterQuestions();
  }, [answers]);

  const handleOptionSelect = (optionId) => {
    const currentQuestion = availableQuestions[currentQuestionIndex];
    
    if (currentQuestion.type === 'multiple') {
      // 다중 선택
      const currentAnswers = answers[currentQuestion.id] || [];
      const newAnswers = currentAnswers.includes(optionId)
        ? currentAnswers.filter(id => id !== optionId)
        : [...currentAnswers, optionId];
      
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: newAnswers
      }));
    } else {
      // 단일 선택
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
    const scores = {};
    
    // 모든 답변을 순회하며 점수 계산
    Object.entries(answers).forEach(([questionId, answerIds]) => {
      const question = allQuestions.find(q => q.id === questionId);
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

    // 여행 스타일 결정
    const topScores = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    let travelStyle = '균형형 여행자';
    let destinations = ['제주도', '부산', '강릉'];
    
    if (scores.adventure > 20) {
      travelStyle = '모험가형 여행자';
      destinations = ['뉴질랜드', '네팔', '아이슬란드'];
    } else if (scores.luxury > 15) {
      travelStyle = '럭셔리 여행자';
      destinations = ['몰디브', '스위스', '두바이'];
    } else if (scores.cultural > 15) {
      travelStyle = '문화탐방형 여행자';
      destinations = ['교토', '로마', '이스탄불'];
    } else if (scores.nature > 15) {
      travelStyle = '자연 힐링형 여행자';
      destinations = ['제주도', '발리', '캐나다'];
    }

    return {
      style: travelStyle,
      destinations,
      scores: topScores
    };
  };

  if (showResult) {
    const result = getRecommendations();
    
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'white',
            borderRadius: '30px',
            padding: '3rem',
            maxWidth: '800px',
            width: '100%',
            textAlign: 'center'
          }}
        >
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>
            🎉 진단 완료!
          </h1>
          <h2 style={{ fontSize: '1.5rem', color: '#667eea', marginBottom: '2rem' }}>
            {result.style}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem' }}>
            당신의 여행 스타일에 맞는 추천 여행지를 찾았어요!
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {result.destinations.map((destination, index) => (
              <div key={index} style={{
                background: '#f8fafc',
                padding: '1.5rem',
                borderRadius: '15px',
                border: '2px solid #e2e8f0'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1e293b' }}>
                  {destination}
                </h3>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1e293b' }}>
              당신의 여행 성향 TOP 3
            </h3>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {result.scores.map(([type, score]) => (
                <span key={type} style={{
                  background: '#667eea',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  {type}: {score}점
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '25px',
              fontWeight: '600',
              fontSize: '1.1rem',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            다시 테스트하기
          </button>
        </motion.div>
      </div>
    );
  }

  if (availableQuestions.length === 0) {
    return <div>로딩 중...</div>;
  }

  const currentQuestion = availableQuestions[currentQuestionIndex];
  const currentAnswers = getCurrentAnswers();
  const progress = ((currentQuestionIndex + 1) / availableQuestions.length) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'white',
          borderRadius: '30px',
          padding: '3rem',
          maxWidth: '800px',
          width: '100%',
          minHeight: '600px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          {/* 진행바 */}
          <div style={{
            width: '100%',
            height: '8px',
            background: '#e2e8f0',
            borderRadius: '4px',
            marginBottom: '2rem',
            overflow: 'hidden'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div style={{
            fontSize: '1rem',
            color: '#667eea',
            marginBottom: '1rem',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            질문 {currentQuestionIndex + 1} / {availableQuestions.length}
            {currentQuestion.type === 'multiple' && (
              <span style={{ fontSize: '0.9rem', color: '#64748b', marginLeft: '1rem' }}>
                (중복 선택 가능)
              </span>
            )}
          </div>
          
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '2rem',
            textAlign: 'center',
            lineHeight: '1.4'
          }}>
            {currentQuestion.question}
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <AnimatePresence mode="wait">
              {currentQuestion.options.map((option, index) => {
                const isSelected = Array.isArray(currentAnswers) 
                  ? currentAnswers.includes(option.id)
                  : currentAnswers === option.id;
                
                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleOptionSelect(option.id)}
                    style={{
                      background: isSelected ? '#667eea' : '#f8fafc',
                      color: isSelected ? 'white' : '#1e293b',
                      border: `2px solid ${isSelected ? '#667eea' : '#e2e8f0'}`,
                      padding: '1.5rem',
                      borderRadius: '15px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'left',
                      position: 'relative',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {option.text}
                    {isSelected && (
                      <span style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'white'
                      }}>
                        <FaCheck />
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            style={{
              background: currentQuestionIndex === 0 ? '#cbd5e1' : '#667eea',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '25px',
              fontWeight: '600',
              cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FaArrowLeft />
            이전
          </button>
          
          <button
            onClick={handleNext}
            disabled={!isAnswerSelected()}
            style={{
              background: !isAnswerSelected() ? '#cbd5e1' : '#667eea',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '25px',
              fontWeight: '600',
              cursor: !isAnswerSelected() ? 'not-allowed' : 'pointer',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {currentQuestionIndex === availableQuestions.length - 1 ? '결과 보기' : '다음'}
            <FaArrowRight />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TravelTestPage;
