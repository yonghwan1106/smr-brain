# SMR-BRAIN

**i-SMR 지능형 AI 에이전트 통합운영 플랫폼**

> SMR-Based Reactive AI Network - 4대 AI 에이전트 협업 기반 i-SMR 자율운영 시스템

![Next.js](https://img.shields.io/badge/Next.js-15.0.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)

## 📋 프로젝트 개요

SMR-BRAIN은 한국수력원자력 i-SMR(혁신형 소형모듈원자로)의 자율운영을 위한 AI 에이전트 통합 플랫폼 프로토타입입니다.

### 🎯 핵심 기능

| 에이전트 | 기능 | 기술 |
|---------|------|------|
| **Monitor Agent** | 실시간 이상 탐지 | Bi-LSTM Autoencoder |
| **Predict Agent** | AI 예측정비 | Digital Twin + ML |
| **Assist Agent** | 운전원 지원 | LLM + RAG |
| **Optimize Agent** | 협조운전 최적화 | Multi-Agent RL (A3C) |

## 🖥️ 스크린샷

### 통합 대시보드
- 4개 모듈 실시간 상태 모니터링
- AI 에이전트 현황 및 협업 플로우
- 알림 패널

### Monitor Agent
- 수천 개 센서 실시간 분석
- 이상 탐지 및 알림
- 트렌드 차트

### Predict Agent
- 잔여수명(RUL) 예측
- 정비 일정 캘린더
- AI 예측정비 권고

### Assist Agent
- 자연어 질의응답 챗봇
- 절차서/규제문서 검색
- RAG 기반 정확한 응답

### Optimize Agent
- 다중모듈 출력 분배 최적화
- 전력 수요 예측
- 경제급전 시뮬레이션

## 🚀 시작하기

### 요구사항

- Node.js 18.17 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/yonghwan1106/smr-brain.git
cd smr-brain

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📁 프로젝트 구조

```
smr-brain/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 대시보드 (홈)
│   ├── monitor/           # Monitor Agent 페이지
│   ├── predict/           # Predict Agent 페이지
│   ├── assist/            # Assist Agent 페이지
│   └── optimize/          # Optimize Agent 페이지
├── components/
│   ├── layout/            # 레이아웃 컴포넌트
│   ├── dashboard/         # 대시보드 컴포넌트
│   ├── monitor/           # 모니터 관련 컴포넌트
│   ├── predict/           # 예측 관련 컴포넌트
│   ├── assist/            # 어시스트 관련 컴포넌트
│   └── optimize/          # 최적화 관련 컴포넌트
├── lib/
│   ├── mock-data.ts       # 목업 데이터
│   ├── types.ts           # TypeScript 타입 정의
│   └── utils.ts           # 유틸리티 함수
└── public/                # 정적 파일
```

## 🛠️ 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date**: date-fns

## 📊 목업 데이터

프로토타입은 실제와 유사한 목업 데이터를 사용합니다:

- **센서 데이터**: 4개 모듈 × 6종 센서 × 8개 위치 = 192개 센서
- **모듈 데이터**: Module 1~4 (각 170MW)
- **RUL 예측**: 6개 핵심 기기
- **정비 일정**: 4건의 예정/진행 중 정비
- **챗봇 시나리오**: 5개 키워드 응답

## 🎨 디자인 시스템

### 컬러 팔레트

| 에이전트 | 색상 | HEX |
|---------|------|-----|
| Monitor | Blue | #3B82F6 |
| Predict | Green | #10B981 |
| Assist | Purple | #8B5CF6 |
| Optimize | Amber | #F59E0B |

### 상태 색상

- 정상 (Normal): #10B981
- 경고 (Warning): #F59E0B
- 위험 (Danger): #EF4444

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 👤 제작자

**박용환**

- 2025 한국수력원자력 대국민 혁신 아이디어 공모전 출품작

---

⚛️ **SMR-BRAIN**: 한수원 i-SMR의 글로벌 경쟁력을 AI로 완성합니다.
