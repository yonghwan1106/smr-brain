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

## 🚀 시작하기

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

## 📁 프로젝트 구조

```
smr-brain/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 대시보드 (홈)
│   ├── monitor/           # Monitor Agent 페이지
│   ├── predict/           # Predict Agent 페이지
│   ├── assist/            # Assist Agent 페이지
│   └── optimize/          # Optimize Agent 페이지
├── components/            # React 컴포넌트
├── lib/                   # 유틸리티 및 목업 데이터
└── public/                # 정적 파일
```

## 🛠️ 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## 👤 제작자

**박용환**

- 2025 한국수력원자력 대국민 혁신 아이디어 공모전 출품작

---

⚛️ **SMR-BRAIN**: 한수원 i-SMR의 글로벌 경쟁력을 AI로 완성합니다.
