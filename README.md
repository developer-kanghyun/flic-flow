# Movie Net Project

1. 프로젝트 개요

MovieNet은 흩어져 있는 영화 및 TV 시리즈 정보를 한곳에 모아, 사용자가 구독 중인 OTT 서비스(넷플릭스, 디즈니플러스 등)에 따라 콘텐츠를 맞춤형으로 탐색하고 추천받는 지능형 콘텐츠 디스커버리 웹 애플리케이션입니다. '신작', '인기', '장르' 등 직관적인 태그와 필터를 통해 원하는 콘텐츠를 쉽고 빠르게 발견하고, '찜하기' 기능으로 자신만의 시청 목록을 관리하는 개인화된 경험을 제공합니다.

2. 프로젝트 목표

기술적 성장: React, Vite, TypeScript 기반의 모던 웹 개발 스택을 활용하여 복합적인 필터링 로직, 외부 API 연동, 전역 상태 관리 등 실용적인 심화 기술 역량을 확보합니다.

차별화된 포트폴리오: 다층적인 사용자 맞춤형 필터링과 정렬 기능을 갖춘 완성도 높은 웹 애플리케이션을 제작하여, 문제 해결 능력과 기술적 깊이를 증명하는 핵심 포트폴리오로 활용합니다.

사용자 중심 경험: 사용자가 최소한의 노력으로 원하는 콘텐츠를 '발견'하고, 개인의 시청 취향을 효과적으로 관리할 수 있는 직관적이고 만족도 높은 UI/UX를 구축합니다.

3. 주요 기능 및 API 연동 전략
   기능명 상세 설명 UI/UX 핵심 API 연동 전략
   콘텐츠 태그 필터링 및 정렬 '신작', '인기', '드라마', '애니메이션' 등 주요 태그를 제공. 태그 클릭 시, 현재 활성화된 모든 필터(OTT, 장르)와 조합하여 인기순으로 자동 정렬된 결과를 보여줌. 상단에 TagBar 컴포넌트 배치 엔드포인트: /discover/movie, /discover/tv <br> • 인기: sort_by=popularity.desc <br> • 신작: sort_by=primary_release_date.desc <br> • 장르 태그: with_genres=${장르ID}
OTT 플랫폼 필터링	사용자가 구독 중인 OTT 플랫폼을 선택하여 콘텐츠를 필터링.	OttFilterAccordion 컴포넌트 내에 OTT 로고 이미지를 배치. 선택 시 컬러, 비선택 시 흑백 처리.	엔드포인트: /discover/*, /search/* <br> • 필수 파라미터: with_watch_providers=${ID목록}, watch_region=KR
   장르 필터링 영화/TV 시리즈의 세부 장르를 선택하여 필터링. GenreList 컴포넌트에서 장르 목록을 제공. 엔드포인트: /discover/\* <br> • 파라미터: with_genres=${ID목록} <br> • 초기 데이터: /genre/movie/list, /genre/tv/list 호출
'찜하기' (Wishlist)	관심 있는 콘텐츠를 로그인 없이 브라우저에 저장하고, 별도의 페이지나 모달에서 관리.	각 MovieCard 위에 WishlistButton (하트 아이콘 등) 배치.	• 저장소: LocalStorage 사용 <br> • 데이터 로딩: 찜한 ID 목록으로 /movie/${id} 또는 /tv/${id} API를 병렬 호출(Promise.all)하여 최신 정보 로드
   통합 키워드 검색 현재 활성화된 모든 필터(태그, OTT, 장르) 상태를 유지하면서 키워드 검색 수행. 상단 네비게이션 바에 검색창(Input) 배치. 1. 검색: /search/movie, /search/tv로 키워드 검색. <br> 2. 후처리: 반환된 결과 목록을 클라이언트 단에서 현재 활성화된 필터 조건(OTT, 장르)으로 재필터링. <br> (※ API 제약으로 인한 후처리 방식 채택)
4. 기술 스택 및 개발 환경

프레임워크 / 라이브러리: React 19

개발 서버 및 번들러: Vite

프로그래밍 언어: TypeScript

외부 API: The Movie Database (TMDB) API v3

상태 관리: Zustand

클라이언트 사이드 저장소: LocalStorage (찜하기 기능 구현용)

스타일링: Styled-components

코드 품질 관리: ESLint, Prettier

5. 개발 로드맵 (단계별 목표)

1단계: 환경 설정 및 API 모듈화 (Foundation)

Vite를 사용하여 React + TypeScript 프로젝트 생성 및 기본 도구 설정.

API 클라이언트 모듈(api.ts) 구현: axios 기반으로 API 기본 URL, 키, 공통 파라미터(language=ko-KR, watch_region=KR)를 중앙에서 관리하는 요청 함수 구현.

앱 실행 시 /genre/movie/list와 /genre/tv/list를 호출하여 장르 데이터를 전역 상태에 저장.

2단계: 핵심 UI 컴포넌트 개발 (Component)

TagBar, OttFilterAccordion, GenreList 등 필터링 관련 UI 컴포넌트 개발.

콘텐츠 정보를 표시할 MovieCard와 찜하기 버튼 WishlistButton 컴포넌트 개발.

메인 페이지 레이아웃 구성.

3단계: 통합 필터링 로직 구현 (Core Logic)

Zustand/Redux를 사용하여 사용자의 모든 필터 선택(activeTag, selectedOtts, selectedGenres 등)을 전역 상태로 관리.

전역 상태가 변경될 때마다 useEffect를 통해 /discover/movie 또는 /discover/tv 요청에 필요한 파라미터를 동적으로 조합하는 로직 구현.

API 호출 결과를 받아와 화면에 렌더링.

4단계: 부가 기능 구현 (Features)

찜하기: WishlistButton 클릭 시 영화 ID를 LocalStorage에 저장/삭제하고, 전역 상태와 동기화하는 로직 구현. 찜 목록 페이지 개발.

통합 검색: 검색어 입력 시 /search/\* API를 호출하고, 반환된 결과를 클라이언트 단에서 전역 필터 상태와 비교하여 후처리 필터링하는 로직 구현.

5단계: 고도화 및 최적화 (Polish & Ship)

전체적인 디자인 시스템을 적용하여 UI/UX 완성도 향상.

성능 최적화: React-Query/SWR 도입을 검토하여 API 데이터 캐싱, 로딩/에러 상태 관리 간소화. 무한 스크롤 또는 페이지네이션 구현.

반응형 웹 디자인 적용 및 최종 테스트.

프로젝트 빌드 및 배포.

## Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [Styled Components](https://styled-components.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd movie-net
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

This will start the application on `http://localhost:5173` by default.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run preview`: Serves the production build locally for preview.
