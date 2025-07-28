# -------------------- 빌드 스테이지 (Builder) --------------------
# React 앱을 빌드하기 위해 Node.js 이미지를 사용
FROM node:18-slim AS builder

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json 파일들을 먼저 복사
COPY package*.json ./

# 모든 의존성 설치
RUN npm install

# 프로젝트 소스코드 전체 복사
COPY . .

# React 앱 빌드 실행!
# "npm run build"는 'dist' 폴더에 최종 HTML/CSS/JS 파일들을 생성합니다.
RUN npm run build


# --------------------  최종 스테이지 (Final) --------------------
# 정적 파일을 서빙하기 위해 Nginx 웹 서버 이미지를 사용
FROM nginx:stable-alpine

# 1단계(builder)에서 생성된 빌드 결과물('dist' 폴더 안의 모든 파일)을
# Nginx가 기본적으로 파일을 서빙하는 폴더인 '/usr/share/nginx/html'로 복사합니다.
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# (선택사항) Nginx가 80번 포트를 사용한다고 명시
EXPOSE 80

# Nginx 서버를 실행
# 이 명령어는 Nginx 이미지에 기본으로 포함되어 있습니다.
CMD ["nginx", "-g", "daemon off;"]