# TripKit - 여행 계획의 새로운 시작

TripKit은 AI 기반 맞춤형 여행 추천 서비스입니다. 사용자의 여행 성향을 분석하여 개인화된 여행지를 추천하고, 여행 계획을 체계적으로 관리할 수 있는 웹 애플리케이션입니다.

## 🚀 주요 기능

### 1. 여행 성향 진단 테스트
- 8~10문항을 통한 여행 성향 분석
- 4지선다형 질문으로 간편한 테스트
- 결과 기반 맞춤 추천 시스템

### 2. AI 추천 여행지
- 선택한 스타일과 키워드 기반 추천
- 유사도 기반 추천 알고리즘
- 실시간 필터링 및 정렬

### 3. 여행지 상세 정보
- 관광지, 맛집, 숙소 정보 제공
- 사용자 리뷰 및 평점 시스템
- 맞춤형 추천 콘텐츠

### 4. 나의 여행 책자
- 일정별 여행 계획 관리
- 드래그 앤 드롭으로 순서 변경
- PDF 다운로드 및 공유 기능

### 5. 관리자 대시보드
- 사용자 통계 및 분석
- 콘텐츠 관리 시스템
- 실시간 알림 및 모니터링

## 🛠 기술 스택

- **Frontend**: React 18, TypeScript
- **Styling**: Styled Components
- **Animation**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: React Icons

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 14.0.0 이상
- npm 또는 yarn

### 설치 방법

1. 저장소 클론
```bash
git clone [repository-url]
cd tripkit-website
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm start
```

4. 브라우저에서 확인
```
http://localhost:3000
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   └── Header.tsx     # 네비게이션 헤더
├── pages/             # 페이지 컴포넌트
│   ├── HomePage.tsx           # 홈페이지
│   ├── TravelTestPage.tsx     # 여행 성향 테스트
│   ├── DestinationDetailPage.tsx  # 여행지 상세
│   ├── MyTripBookPage.tsx     # 나의 여행 책자
│   ├── PDFSharePage.tsx       # PDF 공유
│   └── AdminDashboardPage.tsx # 관리자 대시보드
├── styles/            # 스타일 관련 파일
├── App.tsx           # 메인 앱 컴포넌트
└── index.tsx         # 앱 진입점
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: #667eea (그라데이션 시작)
- **Secondary**: #764ba2 (그라데이션 끝)
- **Text**: #1e293b (주요 텍스트)
- **Subtext**: #64748b (보조 텍스트)
- **Background**: #f8fafc (배경)

### 타이포그래피
- **Font Family**: Noto Sans KR
- **Weights**: 300, 400, 500, 700

## 🔧 개발 가이드

### 컴포넌트 작성 규칙
- TypeScript 사용
- Styled Components로 스타일링
- Framer Motion으로 애니메이션 추가
- 반응형 디자인 적용

### 상태 관리
- React Hooks 사용
- 로컬 상태는 useState
- 복잡한 상태는 useReducer 고려

### 라우팅
- React Router DOM 사용
- 중첩 라우팅 지원
- 동적 라우팅 구현

## 🚀 배포

### 빌드
```bash
npm run build
```

### 정적 호스팅
빌드된 파일을 Netlify, Vercel, GitHub Pages 등에 배포 가능

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

**TripKit** - 나만의 여행을 시작해보세요! ✈️









