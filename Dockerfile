# -------------------- 빌드 스테이지 (Builder) --------------------
# Node.js 18 버전을 빌드 환경으로 사용
FROM node:18-slim AS builder

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json 파일들을 먼저 복사
COPY package*.json ./

# 모든 의존성 설치 (Vite, TypeScript 등 개발용 모듈 포함)
RUN npm install

# 프로젝트 소스코드 전체 복사
# (Vite 설정 파일, 타입스크립트 소스코드 등)
COPY . .

# Vite 빌드 실행! (package.json에 있는 build 스크립트)
# 이 명령어가 'dist' 폴더에 최적화된 최종 결과물을 생성합니다.
RUN npm run build


# -------------------- 최종 스테이지 (Final) --------------------
# 실행 환경으로 더 가벼운 Node.js 이미지를 사용
FROM node:18-slim

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json 파일들을 다시 복사
# (배포 환경에서 필요한 의존성을 파악하기 위함)
COPY package*.json ./

# '배포용(production)' 의존성만 설치
# (Vite, TypeScript 등 빌드에만 필요했던 모듈은 제외되어 용량이 가벼워짐)
RUN npm install --omit=dev

# 1단계(builder)에서 Vite가 빌드한 'dist' 폴더를 통째로 복사
COPY --from=builder /usr/src/app/dist ./dist

# 이 컨테이너는 3000번 포트를 사용한다고 명시
EXPOSE 3000

# 최종적으로 컴파일 및 번들링된 자바스크립트 파일을 실행
# Vite는 보통 dist 폴더 안에 메인 서버 파일을 만듭니다. (e.g., dist/index.js)
# package.json의 'start' 스크립트를 사용하거나, 직접 경로를 지정합니다.
CMD [ "npm", "start" ]