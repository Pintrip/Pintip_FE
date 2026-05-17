# 📍 pintip-fe

평범한 장소를 오늘만의 비주류 여행지로 바꿔주는 로컬 여행 앱 **핀트립(PinTrip)**의 프론트엔드 레포입니다.

---

## 🗂 프로젝트 구조

```
pintip-fe/
├── public/                  # 정적 에셋 (이미지, 아이콘 등)
├── src/
│   ├── api/
│   │   └── client.js        # fetch 기반 API 클라이언트 (세션 ID 자동 주입)
│   ├── components/
│   │   ├── BottomSheet.jsx  # 퀘스트 상세 바텀시트 (드래그 닫기 지원)
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Chip.jsx         # 감정 태그 선택 칩
│   │   ├── Header.jsx       # 뒤로가기 + 타이틀 헤더
│   │   ├── QuestDong.jsx    # 진행 중인 동네 표시 배너
│   │   ├── QuestItem.jsx    # 퀘스트 카드 (슬라이더용)
│   │   ├── TextArea.jsx
│   │   └── TextField.jsx
│   ├── pages/
│   │   ├── Landing.jsx          # 랜딩 (세션 복원 / 동네 랜덤 3개 사전 로딩)
│   │   ├── Place_QuestSelect.jsx # 동네 룰렛 + 이미지카드 선택
│   │   ├── SectionCreate.jsx    # 세션 생성 확인 페이지
│   │   ├── Progress_Record.jsx  # 핀트립 진행 현황 + 퀘스트 체크리스트
│   │   ├── Mission.jsx          # 개별 퀘스트 후기 작성
│   │   ├── Review.jsx           # 여행 전체 후기 작성
│   │   └── Completion_Card.jsx  # 핀트립 완료 카드
│   ├── stores/
│   │   └── TicketStore.jsx  # Zustand - 완료 티켓 상태 관리
│   ├── App.jsx
│   ├── App.css
│   ├── index.css            # Tailwind 테마 정의 (컬러, 폰트, 타이포)
│   └── main.jsx
├── .env.production
├── vercel.json              # Vercel 백엔드 프록시 설정
└── vite.config.js
```

---

## 🚀 시작하기

### 사전 요구사항

- Node.js `>=20`
- npm

### 설치 및 실행

```bash
npm install
npm run dev
```

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

---

## 🧭 페이지 흐름

```
Landing
  └─▶ Place_QuestSelect   (동네 룰렛 → 이미지카드 선택)
        └─▶ SectionCreate  (퀘스트 확인 → 세션 생성)
              └─▶ Progress_Record  (핀트립 진행 현황)
                    ├─▶ Mission     (개별 퀘스트 후기 작성)
                    └─▶ Review      (전체 여행 후기 작성)
                          └─▶ Completion_Card  (완료 카드)
```

세션이 이미 존재하면 Landing에서 `/record`로 바로 리다이렉트됩니다.

---

## 🛠 기술 스택

| 분류 | 사용 기술 |
|------|-----------|
| 프레임워크 | React 19 |
| 빌드 | Vite 8 |
| 라우팅 | React Router DOM v6 |
| 상태 관리 | Zustand |
| 스타일 | Tailwind CSS v4 |
| HTTP | axios, fetch (자체 클라이언트) |
| 배포 | Vercel |

---

## 🌐 API 연동

`src/api/client.js`에 fetch 기반 클라이언트가 구현되어 있습니다.  
`localStorage`에 저장된 `sessionId` 또는 `tripSessionId`를 요청마다 `X-Session-Id` 헤더로 자동 주입합니다.

```js
// 사용 예시
import { api } from '../api/client';

const data = await api.get('/trip-sessions');
await api.post('/trip-sessions', { dongId, imageCardId });
await api.put(`/trip-sessions/${sessionId}/quest-reviews/${questId}`, body);
```

### 환경 변수

| 변수 | 설명 |
|------|------|
| `VITE_API_BASE_URL` | API 기본 URL (기본값: `/backend`) |

프로덕션에서는 Vercel의 Rewrite 설정(`vercel.json`)을 통해 `/backend/*` 요청을 백엔드 서버로 프록시합니다.

---

## 🎨 디자인 시스템

`src/index.css`에 Tailwind 커스텀 테마가 정의되어 있습니다.

**컬러**
- `orange-0` ~ `orange-10` : 주요 브랜드 컬러
- `grey-0` ~ `grey-10` : 텍스트 및 배경 계열

**타이포그래피**
- `title`, `headline`, `body`, `caption` 단계별 폰트 사이즈 & 라인헤이트
- 폰트: [Pretendard](https://github.com/orioncactus/pretendard)

---

## 📦 주요 로컬스토리지 키

| 키 | 설명 |
|----|------|
| `sessionId` / `tripSessionId` | 현재 진행 중인 핀트립 세션 ID |
| `randomDongs` | 랜딩에서 사전 로딩한 랜덤 동네 3개 |
| `selectedImageCard` | 선택된 이미지카드 정보 |
| `tripSession` | 생성된 세션 전체 응답 데이터 |
