# Docker 배포 가이드 - 서버 환경 배포용

## 배포 준비사항

1. **환경변수 설정**
   ```bash
   cp .env.example .env
   # .env 파일에서 API 키들을 실제 값으로 설정
   ```

2. **Docker 빌드**
   ```bash
   # 일반 빌드
   docker build -t flic-flow .
   
   # 캐시 문제 발생시 강제 리빌드
   docker build --no-cache -t flic-flow .
   ```

3. **Docker 실행**
   ```bash
   docker run -p 3000:80 flic-flow
   ```

## 해결된 주요 문제들

### 1. TypeScript 경로 해결 문제
- **문제**: Docker 빌드시 `@src/components/header/Header` 모듈을 찾지 못함
- **해결**: components/index.ts에서 절대 경로를 상대 경로로 변경
- **변경사항**: `import { Header } from '@src/components/header/Header'` → `import { Header } from './header/Header'`

### 2. Layout vs Layouts 명명 일관성
- **문제**: App.tsx에서 Layout을 import하지만 components에서는 Layouts로 export
- **해결**: 모든 사용처에서 Layouts로 통일

### 3. 대소문자 구분 문제
- **문제**: Linux 환경에서 폴더명 대소문자 불일치
- **해결**: 상대 경로 사용으로 대소문자 민감도 문제 회피

## Docker 최적화 사항

1. **Multi-stage build**: Node.js 빌드 → Nginx 서빙
2. **Nginx SPA 설정**: React Router 지원을 위한 try_files 설정
3. **정적 자산 캐싱**: CSS, JS, 이미지 파일 캐싱 최적화
4. **Gzip 압축**: 텍스트 기반 파일 압축으로 전송 속도 향상

## 배포 명령어

```bash
# 빌드 테스트
npm run build

# Docker 빌드
docker build -t flic-flow .

# 컨테이너 실행
docker run -d -p 3000:80 --name flic-flow-container flic-flow

# 컨테이너 상태 확인
docker ps

# 로그 확인
docker logs flic-flow-container
```

## 문제 해결 체크리스트

✅ TypeScript 빌드 오류 해결  
✅ 모듈 경로 해결 문제 수정  
✅ Nginx SPA 라우팅 설정  
✅ Docker 멀티스테이지 빌드 최적화  
✅ 환경변수 관리  
✅ 정적 자산 캐싱 설정  

## 서버 환경 배포 시 주의사항

### 1. 시스템 요구사항
- **Docker**: 20.10+ 권장
- **Node.js**: 18+ (빌드용, Docker 내부에서 자동 설치)
- **메모리**: 최소 2GB RAM 권장
- **디스크**: 최소 1GB 여유 공간

### 2. 포트 설정
```bash
# 기본 포트 3000 사용시
docker run -d -p 3000:80 --name flic-flow-container flic-flow

# 다른 포트 사용시 (예: 8080)
docker run -d -p 8080:80 --name flic-flow-container flic-flow
```

### 3. 방화벽 설정
```bash
# Ubuntu/Debian
sudo ufw allow 3000

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload
```

### 4. 서버 환경별 고려사항

#### Ubuntu/Debian 서버
```bash
# Docker 설치
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker

# 사용자를 docker 그룹에 추가
sudo usermod -aG docker $USER
```

#### CentOS/RHEL 서버
```bash
# Docker 설치
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

### 5. 환경변수 보안
- **중요**: .env 파일은 서버에서 직접 생성
- Git에는 .env.example만 포함됨
- API 키는 서버에서만 설정

```bash
# 서버에서 환경변수 설정
cp .env.example .env
nano .env  # 실제 API 키 입력
```

### 6. 자동 재시작 설정
```bash
# 서버 재부팅시 자동 시작
docker run -d --restart=unless-stopped -p 3000:80 --name flic-flow-container flic-flow
```

### 7. 로그 관리
```bash
# 로그 확인
docker logs flic-flow-container

# 실시간 로그 모니터링
docker logs -f flic-flow-container

# 로그 크기 제한
docker run -d --log-opt max-size=10m --log-opt max-file=3 -p 3000:80 --name flic-flow-container flic-flow
```

### 8. 백업 및 모니터링
```bash
# 컨테이너 상태 확인
docker ps
docker stats flic-flow-container

# 이미지 백업
docker save flic-flow > flic-flow-backup.tar

# 이미지 복원
docker load < flic-flow-backup.tar
```

## 배포 전 체크리스트

□ Docker가 설치되고 실행 중인가?  
□ 필요한 포트가 열려있는가?  
□ .env 파일에 실제 API 키가 설정되어 있는가?  
□ 서버 메모리가 충분한가? (최소 2GB)  
□ 방화벽 설정이 완료되었는가?  
□ 도메인/SSL 설정이 필요한가?  

## 트러블슈팅

### Docker 빌드 실패시
```bash
# 빌드 캐시 클리어
docker system prune -a

# 단계별 빌드 로그 확인
docker build --no-cache -t flic-flow .
```

### 컨테이너 실행 실패시
```bash
# 포트 충돌 확인
sudo netstat -tulpn | grep :3000

# 다른 포트로 실행
docker run -d -p 8080:80 --name flic-flow-container flic-flow
```

### API 호출 실패시
- .env 파일의 API 키 확인
- CORS 설정 확인 (도메인 변경시)
- 네트워크 연결 확인

## 주의사항

- 환경변수(.env)는 빌드 시점에 번들에 포함되므로 민감한 정보 주의
- API 키는 클라이언트 사이드에서 노출되므로 CORS 설정 및 도메인 제한 권장
- 프로덕션 환경에서는 HTTPS 설정 필요
- 서버 재부팅시 컨테이너 자동 시작 설정 권장