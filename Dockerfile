# -------------------- 1단계: 빌드 스테이지 (Builder) --------------------
# React 앱을 빌드하기 위해 Node.js 이미지를 사용
FROM node:18-slim AS builder

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json 파일들을 먼저 복사 (캐시 효율성을 위해)
COPY package*.json ./

# 의존성 설치
RUN npm install

# .env 파일을 포함한 나머지 소스코드 전체 복사
# 이 시점에 .env 파일이 컨테이너 안으로 들어갑니다.
COPY . .

# React 앱 빌드 실행! (이제 컨테이너 안의 .env 파일을 직접 읽어서 빌드함)
RUN npm run build


# -------------------- 2단계: 최종 스테이지 (Final) --------------------
# 정적 파일을 서빙하기 위해 Nginx 웹 서버 이미지를 사용
FROM nginx:stable-alpine

# 1단계(builder)에서 생성된 빌드 결과물을 Nginx의 기본 서빙 폴더로 복사
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# React Router를 위한 Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx가 80번 포트를 사용한다고 명시
EXPOSE 80

# Nginx 서버를 실행
CMD ["nginx", "-g", "daemon off;"]