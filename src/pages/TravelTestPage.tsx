import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaCheck, FaPlus, FaEdit } from 'react-icons/fa';

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
  max-width: 700px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  text-align: center;
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
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 1rem;
`;

const QuestionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2rem;
  line-height: 1.4;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
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
  }
`;

const CustomInputContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
`;

const CustomInput = styled.input`
  flex: 1;
  padding: 1rem;
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
  padding: 1rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #059669;
    transform: translateY(-2px);
  }
`;

const CustomOptionsList = styled.div`
  margin-top: 1rem;
  text-align: left;
`;

const CustomOptionItem = styled.div`
  background: #f1f5f9;
  padding: 0.75rem;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  border: 2px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    background: #e2e8f0;
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
`;

const ResultTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const ResultDescription = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ResultTags = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const ResultTag = styled.span`
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
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

const questions = [
  {
    id: 1,
    question: "여행할 때 가장 중요한 것은?",
    options: [
      { id: 'a', text: "휴식과 힐링", type: "힐링" },
      { id: 'b', text: "맛집 탐방", type: "맛집" },
      { id: 'c', text: "모험과 새로운 경험", type: "액티비티" },
      { id: 'd', text: "아름다운 사진 촬영", type: "문화" },
      { id: 'custom', text: "직접 입력하기", type: "custom", isCustom: true }
    ]
  },
  {
    id: 2,
    question: "여행지에서 가장 즐기는 활동은?",
    options: [
      { id: 'a', text: "자연 속에서 산책하기", type: "자연" },
      { id: 'b', text: "현지 문화 체험하기", type: "문화" },
      { id: 'c', text: "액티비티 스포츠", type: "액티비티" },
      { id: 'd', text: "쇼핑과 구경", type: "쇼핑" },
      { id: 'custom', text: "직접 입력하기", type: "custom", isCustom: true }
    ]
  },
  {
    id: 3,
    question: "여행 계획을 세울 때 어떻게 하시나요?",
    options: [
      { id: 'a', text: "미리미리 꼼꼼하게 계획", type: "계획형" },
      { id: 'b', text: "대략적인 계획만 세우기", type: "유연형" },
      { id: 'c', text: "현지에서 즉흥적으로 결정", type: "즉흥형" },
      { id: 'd', text: "가이드나 추천에 의존", type: "추천형" },
      { id: 'custom', text: "직접 입력하기", type: "custom", isCustom: true }
    ]
  },
  {
    id: 4,
    question: "어떤 여행 스타일을 선호하시나요?",
    options: [
      { id: 'a', text: "아이와 함께하는 가족 여행", type: "가족형" },
      { id: 'b', text: "부모님과 함께하는 가족 여행", type: "효도형" },
      { id: 'c', text: "커플만의 로맨틱한 여행", type: "커플형" },
      { id: 'd', text: "나홀로 자유로운 여행", type: "솔로형" },
      { id: 'e', text: "친구들과 함께하는 여행", type: "그룹형" },
      { id: 'custom', text: "직접 입력하기", type: "custom", isCustom: true }
    ]
  },
  {
    id: 5,
    question: "여행지에서 가장 기억에 남는 것은?",
    options: [
      { id: 'a', text: "아름다운 자연 경관", type: "자연" },
      { id: 'b', text: "맛있는 현지 음식", type: "맛집" },
      { id: 'c', text: "특별한 체험 활동", type: "체험" },
      { id: 'd', text: "역사적인 장소", type: "역사" },
      { id: 'custom', text: "직접 입력하기", type: "custom", isCustom: true }
    ]
  }
];

const TravelTestPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [customInputs, setCustomInputs] = useState<{ [key: number]: string }>({});
  const [customOptions, setCustomOptions] = useState<{ [key: number]: string[] }>({});
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelect = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionId
    }));
    
    // 커스텀 입력이 아닌 경우 커스텀 입력 초기화
    if (optionId !== 'custom') {
      setCustomInputs(prev => ({
        ...prev,
        [currentQuestion]: ''
      }));
    }
  };

  const handleCustomInputChange = (value: string) => {
    setCustomInputs(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleAddCustom = () => {
    const customValue = customInputs[currentQuestion];
    if (customValue.trim()) {
      const currentCustomOptions = customOptions[currentQuestion] || [];
      
      if (!currentCustomOptions.includes(customValue.trim())) {
        setCustomOptions(prev => ({
          ...prev,
          [currentQuestion]: [...currentCustomOptions, customValue.trim()]
        }));
      }
      
      setCustomInputs(prev => ({
        ...prev,
        [currentQuestion]: ''
      }));
    }
  };

  const handleCustomOptionSelect = (customOption: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: `custom_${customOption}`
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

  const getResult = () => {
    const typeCounts: { [key: string]: number } = {};
    
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = questions.find(q => q.id === parseInt(questionId) + 1);
      
      if (answerId.startsWith('custom_')) {
        // 커스텀 답변인 경우
        const customAnswer = answerId.replace('custom_', '');
        typeCounts[customAnswer] = (typeCounts[customAnswer] || 0) + 1;
      } else {
        // 기본 옵션인 경우
        const option = question?.options.find(o => o.id === answerId);
        if (option && option.type !== 'custom') {
          typeCounts[option.type] = (typeCounts[option.type] || 0) + 1;
        }
      }
    });

    const dominantType = Object.entries(typeCounts).sort(([,a], [,b]) => b - a)[0]?.[0];
    
    return {
      type: dominantType || "균형형",
      description: `${dominantType || "균형"}을 중시하는 여행자입니다.`,
      tags: Object.keys(typeCounts).slice(0, 3)
    };
  };

  const handleStartPlanning = () => {
    navigate('/');
  };

  if (showResult) {
    const result = getResult();
    
    return (
      <TestContainer>
        <TestCard
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ResultContainer>
            <ResultTitle>테스트 결과</ResultTitle>
            <ResultDescription>
              당신의 여행 스타일은 <strong>{result.type}</strong>입니다.
              <br />
              {result.description}
            </ResultDescription>
            <ResultTags>
              {result.tags.map(tag => (
                <ResultTag key={tag}>{tag}</ResultTag>
              ))}
            </ResultTags>
            <ActionButton onClick={handleStartPlanning}>
              추천 여행지 보기
            </ActionButton>
          </ResultContainer>
        </TestCard>
      </TestContainer>
    );
  }

  const currentQ = questions[currentQuestion];
  const selectedOption = answers[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const showCustomInput = selectedOption === 'custom';
  const currentCustomOptions = customOptions[currentQuestion] || [];

  return (
    <TestContainer>
      <TestCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProgressBar>
          <ProgressFill
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </ProgressBar>
        
        <QuestionNumber>
          {currentQuestion + 1} / {questions.length}
        </QuestionNumber>
        
        <QuestionTitle>{currentQ.question}</QuestionTitle>
        
        <OptionsContainer>
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
          
          {showCustomInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <CustomInputContainer>
                <CustomInput
                  type="text"
                  placeholder="원하는 옵션을 입력해주세요..."
                  value={customInputs[currentQuestion] || ''}
                  onChange={(e) => handleCustomInputChange(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustom()}
                />
                <AddCustomButton onClick={handleAddCustom}>
                  <FaPlus />
                  추가
                </AddCustomButton>
              </CustomInputContainer>
              
              {currentCustomOptions.length > 0 && (
                <CustomOptionsList>
                  <div style={{ marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b' }}>
                    추가한 옵션에서 선택:
                  </div>
                  {currentCustomOptions.map((customOption, idx) => (
                    <CustomOptionItem
                      key={idx}
                      onClick={() => handleCustomOptionSelect(customOption)}
                      style={{
                        background: selectedOption === `custom_${customOption}` ? '#667eea' : '#f1f5f9',
                        color: selectedOption === `custom_${customOption}` ? 'white' : '#1e293b',
                        borderColor: selectedOption === `custom_${customOption}` ? '#667eea' : '#e2e8f0'
                      }}
                    >
                      {customOption}
                      {selectedOption === `custom_${customOption}` && (
                        <span style={{ float: 'right' }}>
                          <FaCheck />
                        </span>
                      )}
                    </CustomOptionItem>
                  ))}
                </CustomOptionsList>
              )}
            </motion.div>
          )}
        </OptionsContainer>
        
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