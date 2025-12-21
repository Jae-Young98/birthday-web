# 생일 기념 웹 저장소

## Getting Started

프로젝트 구동을 위해 `.env` 환경 변수 설정이 필요해요.

```
BIRTHDAY_NAME_EN=탭에 표시 될 제목
NEXT_PUBLIC_BIRTHDAY_NAME_KO=내부 페이지에 표시 될 이름
```

### 편지 관련

vecel에 배포하기 전 로컬에서 편지를 확인하기 위해선 `src/app/letter/page.tsx`의 `55-61L`을 주석처리 하고, 아래와 같이 사용해주세요.

```javascript
const letters = [["편지"], ["여러 줄", "출력", "출력2"]];
```

```javascript
pnpm install
pnpm dev
```
