# 📋 개발 컨벤션 가이드

> **Docsify**를 사용하여 구축된 사내 개발팀을 위한 개발 방법론과 코딩 컨벤션 가이드

## 🎯 주요 구성 요소

### 1. Convention (코딩 컨벤션)

#### 프론트엔드 컨벤션

- **파일**: `convention/frontend.md`
- **내용**:
  - Vue.js 코드 컨벤션 가이드
  - 네이밍 규칙, 포맷팅 규칙
  - 컴포넌트 구조 및 통신 방법
  - JavaScript 코딩 관례
  - 자동화 도구 활용법

#### 백엔드 컨벤션

- **파일**: `convention/backend.md`
- **내용**:
  - Java & Spring 코드 컨벤션 가이드
  - 도메인 기반 패키지 구조 (Package by Domain)
  - 디자인 패턴 적용 가이드
  - 코드 품질 자동화 도구 (jspecify, spotless, Lombok 등)
  - Vue.js + Spring Boot 통합 방법

#### Database 가이드

- **파일**: `convention/database.md`
- **내용**:
  - MySQL & PostgreSQL 설치방법
  - DB 데이터 정의와 테이블 설계 방법
  - DB 기본 문법 및 쿼리 작성
  - DB 정규화, 쿼리 튜닝 성능 최적화

### 2. Kong Gateway

#### Kong Configuration

- **파일**: `kong/config/` (19개 설정 파일)
- **내용**:
  - Kong Gateway의 모든 설정 옵션
  - General, Hybrid Mode, Nginx, Datastore 등
  - DNS Resolver, Admin SMTP, Developer Portal 등
  - 각 설정별 상세 설명과 기본값 제공

#### Kong Entities

- **파일**: `kong/entities/` (9개 엔티티 파일)
- **내용**:
  - Service, Route, Consumer, Plugin 등
  - Kong Gateway의 핵심 엔티티 설명
  - API 구조 및 사용법 가이드

#### Kong Security

- **파일**: `kong/securities/` (6개 보안 파일)
- **내용**:
  - Certificate, CA Certificate, Vaults 등
  - Kong Gateway 보안 설정 가이드
  - SSL/TLS 인증서 관리

### 3. Git

#### Git 전략

- **파일**: `git/strategy.md`
- **내용**:
  - Git Flow와 GitHub Flow 브랜치 전략 비교
  - 각 전략의 장단점 및 적용 시나리오
  - 팀 협업을 위한 브랜치 관리 방법론

#### Pull Request 가이드

- **파일**: `git/pr.md`
- **내용**:
  - GitHub Pull Request 생성 및 관리 방법
  - Fork부터 Merge까지의 전체 워크플로우
  - 코드 리뷰 프로세스 및 협업 방법

#### CI/CD 설정

- **파일**: `git/ci-cd.md`
- **내용**:
  - Jenkins를 활용한 CI/CD 파이프라인 구축
  - Windows 환경에서의 Jenkins 설치 및 설정
  - GitHub 연동 및 자동화 워크플로우 구성

### 4. Migration (마이그레이션)

#### Vue2 → Vue3 마이그레이션

- **파일**: `migration/vue-migration.md`
- **내용**:
  - Vue2에서 Vue3로의 전환을 위한 체계적인 가이드
  - Element UI → Element Plus 마이그레이션 포함
  - 단계별 작업 순서와 우선순위 제시
  - 라이브러리별 마이그레이션 매트릭스
  - 품질 관리 및 체크리스트

### 5. Setting (개발 환경)

#### VSCode 설정

- **파일**: `vscode-setting.md`
- **내용**:
  - VS Code 개발 환경 설정 가이드
  - 필수 확장 프로그램 및 설정
  - 팀 협업을 위한 통일된 개발 환경 구축

## 🚀 기술적 특징

- **Docsify** 기반 정적 문서 사이트
- 로컬에서도 실행 가능하도록 설정 완료
- 체계적인 마이그레이션 프로세스 제공
- 실무 중심의 구체적인 예시와 코드 포함
- 품질 관리 및 자동화 도구 활용법 제시

## 📖 사용 방법

### 로컬에서 실행하기

**Node.js 사용**:

```bash
npm i
npm start
```

브라우저에서 `http://localhost:3000` 접속

---

> 이 프로젝트는 **개발팀의 일관성 있는 코드 작성과 효율적인 마이그레이션을 위한 실무 가이드북**의 역할을 하고 있습니다.
