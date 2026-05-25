# Japan Schedule

일본 여행 일정을 정리하기 위한 웹앱 초기 프로젝트입니다.

## Scripts

- `python3 -m http.server 5173`: local static server
- Vercel: static site deployment

## Vercel DB

QR 보관함은 Vercel Marketplace의 Neon Postgres 연결을 사용합니다.

1. Vercel 프로젝트에서 Storage/Marketplace로 Neon Postgres를 추가합니다.
2. Vercel 환경 변수에 `DATABASE_URL`이 연결되어 있는지 확인합니다.
3. 배포 후 `/api/qrs`가 QR 데이터를 저장합니다.

로컬 개발 서버에서는 API가 없을 수 있으므로 QR 데이터가 브라우저 `localStorage`에 임시 저장됩니다.
