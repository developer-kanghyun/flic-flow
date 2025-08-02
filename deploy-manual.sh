#!/bin/bash

# Flic Flow 수동 배포 스크립트
# GitHub Actions에서 Docker Hub로 푸시된 이미지를 서버에 배포

echo "🚀 Flic Flow 수동 배포 시작..."

# Docker Hub에서 최신 이미지 가져오기
echo "📦 최신 이미지를 Docker Hub에서 가져오는 중..."
docker pull YOUR_DOCKERHUB_USERNAME/flic-flow:latest

# 기존 컨테이너 중지 및 삭제
echo "🛑 기존 컨테이너 중지 및 삭제..."
docker stop flic-flow-container 2>/dev/null || echo "실행 중인 컨테이너가 없습니다."
docker rm flic-flow-container 2>/dev/null || echo "삭제할 컨테이너가 없습니다."

# 새 컨테이너 실행
echo "▶️ 새 컨테이너 실행..."
docker run -d \
  -p 127.0.0.1:8080:80 \
  --name flic-flow-container \
  --restart=unless-stopped \
  YOUR_DOCKERHUB_USERNAME/flic-flow:latest

# 컨테이너 상태 확인
echo "✅ 배포 완료! 컨테이너 상태 확인:"
docker ps | grep flic-flow-container

# 이전 이미지 정리
echo "🧹 이전 이미지 정리..."
docker image prune -f

echo "🎉 배포가 완료되었습니다!"
echo "📍 애플리케이션은 http://localhost:8080 에서 실행 중입니다."