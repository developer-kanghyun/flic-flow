#!/bin/bash

# FlicFlow Docker 빌드 및 실행 스크립트

echo "🐳 FlicFlow Docker 빌드 시작..."

# Docker 이미지 빌드
docker build -t flicflow:latest . || {
    echo "❌ Docker 빌드 실패!"
    exit 1
}

echo "✅ Docker 빌드 완료!"

# 기존 컨테이너 중지 및 제거
echo "🧹 기존 컨테이너 정리..."
docker stop flicflow-app 2>/dev/null || true
docker rm flicflow-app 2>/dev/null || true

# 새 컨테이너 실행
echo "🚀 FlicFlow 컨테이너 실행..."
docker run -d \
  --name flicflow-app \
  -p 3000:80 \
  flicflow:latest

echo "🎉 FlicFlow가 http://localhost:3000 에서 실행 중입니다!"
echo "📱 컨테이너 로그 확인: docker logs flicflow-app"
echo "🛑 중지하기: docker stop flicflow-app"