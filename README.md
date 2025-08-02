# 🎬 Flic Flow

> 흩어져 있는 영화 및 TV 시리즈 정보를 한곳에 모아, 사용자 맞춤형 콘텐츠 디스커버리를 제공하는 지능형 웹 애플리케이션

![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat-square&logo=vite)
![Styled Components](https://img.shields.io/badge/Styled%20Components-6.1.18-DB7093?style=flat-square&logo=styled-components)

## ✨ 주요 기능

### 🎯 스마트한 콘텐츠 발견

- **맞춤형 필터링**: OTT 플랫폼, 장르, 인기도별 다층 필터링
- **실시간 검색**: 통합 키워드 검색으로 영화/TV 시리즈 즉시 검색
- **트렌드 태그**: '신작', '인기', '장르별' 직관적인 콘텐츠 탐색

### 📱 개인화된 사용자 경험

- **찜하기 기능**: 관심 콘텐츠를 개인 위시리스트에 저장
- **상세 정보**: IMDB와 Rotten Tomatoes 평점 제공
- **시청 플랫폼**: 넷플릭스, 왓챠, 디즈니+ 등 OTT 바로가기 링크

### 🎥 풍부한 콘텐츠 정보

- **예고편 재생**: 유튜브 트레일러 모달 재생
- **출연진 정보**: 감독, 주요 배우 프로필 및 역할 정보
- **추천 시스템**: 개인 취향 기반 관련 콘텐츠 추천

## 🏗️ 아키텍처

### 📁 프로젝트 구조

```
src/
├── api/                    # API 통신 모듈
│   ├── tmdbApi.ts         # TMDB API 클라이언트
│   └── genreBasedTrending.ts
├── components/            # 재사용 가능한 UI 컴포넌트
│   ├── movie-hero/        # 영화 히어로 섹션
│   ├── movie-metadata/    # 영화 상세 정보
│   ├── movie-cast/        # 출연진 정보
│   ├── movie-carousel/    # 영화 캐러셀
│   └── ...
├── hooks/                # 커스텀 훅
│   └── useMovieDetail.ts # 영화 상세 데이터 관리
├── pages/                # 페이지 컴포넌트
│   ├── main/             # 메인 페이지
│   ├── detail/           # 상세 페이지
│   └── watch-list/       # 찜 목록 페이지
├── types/                # TypeScript 타입 정의
├── utils/                # 유틸리티 함수
└── stores/               # Zustand 상태 관리
```

### 🔧 핵심 기술 아키텍처

#### **모듈화된 컴포넌트 설계**

- **단일 책임 원칙**: 각 컴포넌트가 명확한 역할 담당
- **재사용성**: 독립적인 컴포넌트로 높은 재사용성 확보
- **성능 최적화**: React.memo로 불필요한 리렌더링 방지

#### **커스텀 훅 패턴**

```typescript
// 비즈니스 로직 분리
const useMovieDetail = (contentId, mediaType) => {
  // 병렬 API 호출, 에러 처리, 로딩 상태 관리
  return { movie, credits, ratings, watchProviders, ... };
};
```

#### **타입 안전성**

- **완전한 TypeScript 적용**: 모든 컴포넌트와 API 인터페이스 타입 정의
- **API 응답 검증**: TMDB API 응답 구조에 맞는 정확한 타입 매핑
- **에러 처리**: 중앙화된 에러 핸들링 시스템

## 🚀 시작하기

### 📋 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### ⚙️ 환경 설정

1. **저장소 클론**

   ```bash
   git clone <repository-url>
   cd flic-flow
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **환경 변수 설정**

   ```bash
   # .env 파일 생성
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_OMDB_API_KEY=your_omdb_api_key
   ```

4. **개발 서버 실행**

   ```bash
   npm run dev
   ```

   애플리케이션이 `http://localhost:5173`에서 실행됩니다.

## 📜 사용 가능한 스크립트

| 명령어            | 설명               |
| ----------------- | ------------------ |
| `npm run dev`     | 개발 서버 시작     |
| `npm run build`   | 프로덕션 빌드 생성 |
| `npm run lint`    | ESLint 코드 검사   |
| `npm run preview` | 빌드된 앱 미리보기 |

## 🛠️ 기술 스택

### **프론트엔드**

- **React 19.1.0**: 최신 React 기능 활용
- **TypeScript 5.8.3**: 완전한 타입 안전성
- **Vite 6.3.5**: 빠른 개발 환경 및 번들링
- **Styled Components 6.1.18**: CSS-in-JS 스타일링

### **상태 관리 & 데이터**

- **Zustand 5.0.6**: 경량 상태 관리 라이브러리
- **Axios 1.11.0**: HTTP 클라이언트
- **React Router 7.5.3**: 클라이언트 사이드 라우팅
- **LocalStorage**: 찜하기 데이터 영구 저장

### **개발 도구**

- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅
- **Babel**: 최신 JavaScript 기능 지원

### **외부 API**

- **TMDB API v3**: 영화/TV 시리즈 데이터
- **OMDB API**: IMDB/Rotten Tomatoes 평점
- **YouTube API**: 예고편 비디오

## 🎯 프로젝트 목표

### **기술적 성장**

- React 19, TypeScript 기반 모던 웹 개발 스택
- 복합적인 필터링 로직과 외부 API 연동 경험
- 전역 상태 관리와 성능 최적화 기술 습득

### **사용자 중심 설계**

- 최소한의 노력으로 원하는 콘텐츠 발견 가능
- 직관적이고 반응성 높은 UI/UX 구현
- 개인 취향 기반 맞춤형 콘텐츠 추천

### **포트폴리오 차별화**

- 완성도 높은 풀스택 웹 애플리케이션
- 실제 서비스 수준의 기능과 성능
- 문제 해결 능력과 기술적 깊이

## 📈 성능 최적화

- **컴포넌트 메모이제이션**: React.memo로 리렌더링 최적화
- **API 요청 최적화**: Promise.all을 통한 병렬 처리
- **이미지 최적화**: 지연 로딩 및 폴백 처리
- **번들 최적화**: Vite의 코드 스플리팅 활용

## 🔒 보안

- **환경 변수**: API 키 등 민감 정보 안전 관리
- **에러 처리**: 중앙화된 에러 핸들링으로 보안 강화
- **타입 검증**: TypeScript로 런타임 에러 방지

---

<div align="center">
  <p>Made by kanghyun</p>
  <p>🎬 매끄러운 영화 탐험의 새로운 경험을 만나보세요!</p>
</div>
