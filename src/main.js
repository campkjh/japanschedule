const flightState = {
  outbound: {
    departureDateTime: "2026-06-05T09:00",
    arrivalDateTime: "2026-06-05T11:00",
    fromCode: "ICN",
    fromName: "인천국제공항",
    toCode: "KIX",
    toName: "간사이국제공항",
  },
  return: {
    departureDateTime: "2026-06-08T13:00",
    arrivalDateTime: "2026-06-08T15:00",
    fromCode: "KIX",
    fromName: "간사이국제공항",
    toCode: "ICN",
    toName: "인천국제공항",
  },
};

function loadStoredLodging() {
  try {
    return JSON.parse(localStorage.getItem("japanScheduleLodging") || "{}");
  } catch {
    return {};
  }
}

const lodgingState = {
  name: "오사카 코코네 하우스 난바점",
  address: "오사카 코코네 하우스 난바점",
  ...loadStoredLodging(),
};

const QR_STORAGE_KEY = "japanScheduleVisitJapanQrs";
const qrState = {
  items: [],
  storageMode: "checking",
  scanStream: null,
  scanFrame: null,
  detector: null,
};

const itineraryDays = [
  {
    date: "6월 5일",
    title: "오사카 도착 · 난바 · 오사카성 · 우메다",
    items: [
      {
        time: "09:00",
        title: "인천국제공항 보딩",
        note: "간사이국제공항으로 출발 준비",
      },
      {
        time: "11:00",
        title: "간사이국제공항 도착",
        note: "입국 후 수하물 찾기 동선으로 이동",
      },
      {
        time: "11:00~11:40",
        title: "수하물 찾기 및 이미그레이션",
        note: "입국 심사와 수하물 수령",
      },
      {
        time: "11:40~12:00",
        title: "교통카드 발급 및 특급권 예매",
        note: "스이카/이코카 카드 발급, 라피트 또는 하루카 익스프레스 예매 후 탑승",
      },
      {
        time: "12:00~13:10",
        title: "간사이국제공항에서 난카이 난바 이동",
        note: "공항에서 난바로 이동. 이동 방법은 참고 링크 확인",
        extraLinks: [
          {
            label: "공항→난바 이동 방법",
            url: "https://blog.naver.com/hangeuland/224292528219",
          },
        ],
      },
      {
        time: "13:10~13:30",
        title: "난카이 난바에서 숙소 도보 이동",
        note: "오사카 코코네 하우스 난바점으로 이동",
      },
      {
        time: "13:30~13:50",
        title: "짐 보관",
        note: "숙소에 짐 맡기기",
      },
      {
        time: "13:50~14:30",
        title: "늦은 점심 - 스시로 도톤보리점",
        note: "회전초밥. 문어 튀김, 치즈 튀김, 광어지느러미 초밥 추천",
        mapUrl: "https://maps.app.goo.gl/VBYzbD1CUHuF6EYL8",
      },
      {
        time: "14:30~15:20",
        title: "도톤보리 구경",
        note: "첫날 난바 주변 산책",
      },
      {
        time: "15:20~15:50",
        title: "오사카성으로 이동",
        note: "도톤보리에서 오사카성 방향",
      },
      {
        time: "15:50~16:40",
        title: "오사카성 구경",
        note: "니시노마루 정원. 더우면 공원 전기차 추천. 주요 거점 배차 약 10분, 대인 300엔",
      },
      {
        time: "16:40~17:00",
        title: "기타하마로 이동",
        note: "오사카성에서 카페로 이동",
      },
      {
        time: "17:00~17:40",
        title: "기타하마 레트로 카페",
        note: "나카노시마 장미원 뷰. 만석이면 노스쇼어 대안 추천",
        mapUrl: "https://maps.app.goo.gl/vbxFJQ2SKyE1s31w9",
        extraLinks: [
          {
            label: "노스쇼어",
            query: "노스쇼어 기타하마 오사카",
            url: "https://maps.app.goo.gl/JcxftFSeHN64dNPq8",
          },
        ],
      },
      {
        time: "17:40~18:10",
        title: "우메다 스카이로 이동",
        note: "노을 시간 맞춰 이동",
      },
      {
        time: "18:10~19:00",
        title: "우메다 스카이 노을뷰",
        note: "전망대에서 일몰 감상",
      },
      {
        time: "19:00~19:20",
        title: "저녁 식당으로 이동",
        note: "야키니쿠 하나미치로 이동",
      },
      {
        time: "19:20~20:40",
        title: "저녁 식사 - 야키니쿠 하나미치",
        note: "첫날 저녁",
        mapUrl: "https://maps.app.goo.gl/Pt79KTG7kzExaVAX6",
      },
      {
        time: "20:40~21:10",
        title: "숙소로 이동",
        note: "오사카 코코네 하우스 난바점 복귀",
      },
    ],
  },
  {
    date: "6월 6일",
    title: "신세카이 · 덴덴타운 · 난바 · 이즈미사노 불꽃축제",
    items: [
      {
        time: "09:00~10:20",
        title: "아침 준비",
        note: "외출 준비",
      },
      {
        time: "10:20~10:40",
        title: "아침 식사 장소로 이동",
        note: "숙소에서 이동",
      },
      {
        time: "10:40~11:30",
        title: "아침 식사 - 무겐라멘 난바 본점",
        note: "무겐라멘 난바 본점에서 아침 식사",
        mapQuery: "무겐라멘 난바 본점",
        mapUrl: "https://maps.app.goo.gl/T9dHXWdo4bKjGRc17",
      },
      {
        time: "11:30~11:50",
        title: "신세카이로 이동",
        note: "신이마미야에키마에 방향",
      },
      {
        time: "11:50~12:20",
        title: "신세카이 구경",
        note: "츠텐카쿠 주변 산책",
      },
      {
        time: "12:20~12:50",
        title: "덴덴타운 전기상가로 이동",
        note: "신세카이에서 덴덴타운 방향",
      },
      {
        time: "12:50~13:20",
        title: "덴덴타운 구경",
        note: "전기상가 둘러보기",
      },
      {
        time: "13:20~14:10",
        title: "Kopimal coffee",
        note: "레트로 카페",
        mapUrl: "https://maps.app.goo.gl/f2Mf4jBAQQpSWAGaA",
      },
      {
        time: "14:10~14:20",
        title: "카페에서 식당으로 이동",
        note: "점심 식사 장소로 이동",
        mapQuery: "규카츠 토미타 오사카",
      },
      {
        time: "14:20~15:20",
        title: "점심 식사 - 규카츠 토미타",
        note: "규카츠 점심",
        mapUrl: "https://maps.app.goo.gl/75nQHk4VZktHfQGEA",
      },
      {
        time: "15:40~16:00",
        title: "난바파크스에서 도톤보리 이동",
        note: "난바 일대 산책",
      },
      {
        time: "16:00~16:30",
        title: "도톤보리 2일차",
        note: "도톤보리 주변 추가 구경",
      },
      {
        time: "16:30~16:50",
        title: "숙소로 이동",
        note: "휴식 전 복귀",
      },
      {
        time: "16:50~18:00",
        title: "휴식",
        note: "숙소에서 쉬기",
      },
      {
        time: "18:00~19:00",
        title: "이즈미사노시로 이동",
        note: "숙소에서 린쿠 마블 비치 방향",
      },
      {
        time: "19:00~20:10",
        title: "이즈미사노시 린쿠 마블 비치 불꽃축제",
        note: "해변 불꽃축제 관람",
      },
      {
        time: "20:10~20:20",
        title: "저녁 식당으로 이동",
        note: "Yutaro Sushi로 이동",
        mapQuery: "Yutaro Sushi Izumisano",
      },
      {
        time: "20:20~21:20",
        title: "저녁 식사 - Yutaro Sushi",
        note: "이즈미사노 저녁",
        mapUrl: "https://maps.app.goo.gl/utT7gqsheEm9k3dW9",
      },
      {
        time: "21:20~22:20",
        title: "숙소로 이동",
        note: "오사카 숙소 복귀",
      },
    ],
  },
  {
    date: "6월 7일",
    title: "교토 이동 · 기온 · 기요미즈데라 · 후시미 이나리",
    items: [
      {
        time: "09:00~10:20",
        title: "아침 준비 및 체크아웃",
        note: "오사카 숙소 체크아웃",
      },
      {
        time: "10:20~11:40",
        title: "교토로 출발",
        note: "에키벤토로 아침 해결 후 교토역 도착. 난바에서 교토로 갈 때 우메다는 무조건 피하기. 우메다는 오사카역과 붙어 있고 너무 복잡해서 길 잃기 쉬우니 일반 한큐라인 또는 JR 추천",
      },
      {
        time: "11:40~12:40",
        title: "점심 식사 - 但馬屋PREMIUM 京都駅八条口店",
        note: "스키야키 점심",
        mapUrl: "https://maps.app.goo.gl/qdsYwBsZRoCwFSob6",
      },
      {
        time: "12:40~13:00",
        title: "택시 이동 및 짐 보관",
        note: "교토우메코지카덴교 쪽으로 이동 후 짐 보관",
      },
      {
        time: "13:00~13:30",
        title: "기온시조역으로 이동",
        note: "숙소에서 기온시조역 방향",
      },
      {
        time: "13:30~14:10",
        title: "Cafe Yoshiko",
        note: "가모강 바로 앞 카페",
      },
      {
        time: "14:10~14:40",
        title: "니시키 텐만구에서 폰토초 공원쪽 구경",
        note: "교토 중심 산책",
      },
      {
        time: "14:40~15:10",
        title: "기요미즈데라 인력거 체험",
        note: "2인 약 30분, 대략 1만엔",
      },
      {
        time: "15:10~15:50",
        title: "니넨자카, 산넨자카, 기요미즈데라 구경",
        note: "기요미즈데라 주변 산책",
      },
      {
        time: "15:50~16:10",
        title: "교토 스타벅스",
        note: "유명한 교토 스타벅스 방문",
        mapUrl: "https://maps.app.goo.gl/4AZk8MNjZGitU7U96",
      },
      {
        time: "16:10~16:30",
        title: "후시미 이나리 신사로 이동",
        note: "무리라면 패스 가능",
      },
      {
        time: "16:30~17:10",
        title: "후시미 이나리 신사 구경",
        note: "철도샷 포인트 포함",
      },
      {
        time: "17:10~17:50",
        title: "숙소로 이동",
        note: "교토 숙소로 복귀",
        mapQuery: "교토 우메코지 카덴쇼",
      },
      {
        time: "17:50~19:00",
        title: "체크인, 휴식, 온천",
        note: "숙소에서 쉬기",
      },
      {
        time: "19:00~20:00",
        title: "저녁 식사 - 츠지야 우메코지기타점",
        note: "교토 일정 마무리",
        mapUrl: "https://maps.app.goo.gl/wRkrSRUtMfmQKcUi7",
      },
    ],
  },
  {
    date: "6월 8일",
    title: "교토역 · 쇼핑 · 간사이국제공항",
    items: [
      {
        time: "07:30~08:30",
        title: "짐 싸기 및 숙소 아침식사",
        note: "귀국 준비",
      },
      {
        time: "08:30~08:50",
        title: "교토역으로 이동",
        note: "숙소에서 교토역 방향",
      },
      {
        time: "08:50~09:20",
        title: "돈키호테 쇼핑",
        note: "마지막 쇼핑",
        mapUrl: "https://maps.app.goo.gl/pJU2cmYU2GtA8P4x8",
      },
      {
        time: "09:20~11:00",
        title: "간사이국제공항으로 이동",
        note: "하루카 익스프레스로 단번에 이동하는지 확인. 도카이도 본선과 오사카 순환선 경로 주의",
        extraLinks: [
          {
            label: "교토→간사이공항 이동 방법",
            url: "https://blog.naver.com/hgg0e824/224019023955",
          },
        ],
      },
      {
        time: "11:00",
        title: "간사이국제공항 도착",
        note: "출국 최소 2시간 전 공항 도착 권장. 하루카 익스프레스 약 80분, 리무진 버스 약 90분",
      },
    ],
  },
];

const itineraryMapQueries = {
  "인천국제공항 보딩": "인천국제공항 제1터미널",
  "간사이국제공항 도착": "간사이국제공항",
  "간사이국제공항에서 난카이 난바 이동": "난카이 난바역",
  "난카이 난바에서 숙소 도보 이동": "오사카 코코네 하우스 난바점",
  "짐 보관": "오사카 코코네 하우스 난바점",
  "늦은 점심 - 스시로 도톤보리점": "스시로 도톤보리점 오사카",
  "도톤보리 구경": "도톤보리 오사카",
  "오사카성으로 이동": "오사카성 니시노마루 정원",
  "오사카성 구경": "오사카성 니시노마루 정원",
  "기타하마로 이동": "기타하마 오사카",
  "기타하마 레트로 카페": "기타하마 레트로 오사카",
  "우메다 스카이로 이동": "우메다 스카이 빌딩",
  "우메다 스카이 노을뷰": "우메다 스카이 빌딩",
  "저녁 식당으로 이동": "야키니쿠 하나미치 오사카",
  "저녁 식사 - 야키니쿠 하나미치": "야키니쿠 하나미치 오사카",
  "숙소로 이동": "오사카 코코네 하우스 난바점",
  "아침 식사 - 무겐라멘 난바 본점": "무겐라멘 난바 본점",
  "신세카이로 이동": "신세카이 오사카",
  "신세카이 구경": "신세카이 오사카",
  "덴덴타운 전기상가로 이동": "덴덴타운 오사카",
  "덴덴타운 구경": "덴덴타운 오사카",
  "Kopimal coffee": "Kopimal coffee Osaka",
  "점심 식사 - 규카츠 토미타": "규카츠 토미타 오사카",
  "난바파크스에서 도톤보리 이동": "난바파크스 오사카",
  "도톤보리 2일차": "도톤보리 오사카",
  "이즈미사노시로 이동": "린쿠 마블 비치 이즈미사노",
  "이즈미사노시 린쿠 마블 비치 불꽃축제": "린쿠 마블 비치 이즈미사노",
  "저녁 식사 - Yutaro Sushi": "Yutaro Sushi Izumisano",
  "교토로 출발": "교토역",
  "점심 식사 - 但馬屋PREMIUM 京都駅八条口店": "但馬屋PREMIUM 京都駅八条口店",
  "택시 이동 및 짐 보관": "교토 우메코지 카덴쇼",
  "기온시조역으로 이동": "기온시조역",
  "Cafe Yoshiko": "Cafe Yoshiko Kyoto",
  "니시키 텐만구에서 폰토초 공원쪽 구경": "니시키 텐만구 교토",
  "기요미즈데라 인력거 체험": "기요미즈데라 교토",
  "니넨자카, 산넨자카, 기요미즈데라 구경": "니넨자카 산넨자카 기요미즈데라",
  "교토 스타벅스": "스타벅스 교토 니넨자카 야사카 차야",
  "후시미 이나리 신사로 이동": "후시미 이나리 신사",
  "후시미 이나리 신사 구경": "후시미 이나리 신사",
  "체크인, 휴식, 온천": "교토 우메코지 카덴쇼",
  "저녁 식사 - 츠지야 우메코지기타점": "츠지야 우메코지기타점 교토",
  "교토역으로 이동": "교토역",
  "돈키호테 쇼핑": "돈키호테 교토역",
  "간사이국제공항으로 이동": "간사이국제공항",
  "간사이국제공항 도착": "간사이국제공항",
};

const tabButtons = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");
const qrList = document.querySelector("[data-qr-list]");
const qrManualForm = document.querySelector("[data-qr-manual-form]");
const qrStartScan = document.querySelector("[data-start-qr-scan]");
const qrStopScan = document.querySelector("[data-stop-qr-scan]");
const qrVideo = document.querySelector("[data-qr-video]");
const qrStatus = document.querySelector("[data-qr-status]");
const qrStorageMode = document.querySelector("[data-qr-storage-mode]");
const itineraryList = document.querySelector("[data-itinerary-list]");
const flightForm = document.querySelector("[data-flight-form]");
const editFlight = document.querySelector("[data-edit-flight]");
const cancelFlight = document.querySelector("[data-cancel-flight]");
const lodgingForm = document.querySelector("[data-lodging-form]");
const lodgingRoute = document.querySelector("[data-open-lodging-route]");
const search = document.querySelector("[data-search]");
const phrases = document.querySelectorAll("[data-phrase-list] article");

const displayDateTime = new Intl.DateTimeFormat("ko-KR", {
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Seoul",
});

const fullDateTime = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Seoul",
});

function activateTab(target) {
  tabButtons.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.tab === target);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === target);
  });

  localStorage.setItem("japanScheduleActiveTab", target);
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tab);
  });
});

function getStoredQrItems() {
  try {
    return JSON.parse(localStorage.getItem(QR_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function setStoredQrItems(items) {
  localStorage.setItem(QR_STORAGE_KEY, JSON.stringify(items));
}

function setQrStatus(message) {
  qrStatus.textContent = message;
}

function setQrStorageMode(mode) {
  qrState.storageMode = mode;
  qrStorageMode.textContent =
    mode === "db" ? "Vercel DB 저장 중" : "로컬 임시 저장 중";
}

function createQrId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `qr-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function drawQr(canvas, payload) {
  if (window.QRCode?.toCanvas) {
    window.QRCode.toCanvas(
      canvas,
      payload,
      {
        errorCorrectionLevel: "M",
        margin: 2,
        scale: 6,
        width: 164,
        color: {
          dark: "#23191c",
          light: "#ffffff",
        },
      },
      (error) => {
        if (error) {
          drawQrFallback(canvas);
        }
      },
    );
    return;
  }

  drawQrFallback(canvas);
}

function drawQrFallback(canvas) {
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#ff7070";
  context.fillRect(18, 18, 46, 46);
  context.fillRect(100, 18, 46, 46);
  context.fillRect(18, 100, 46, 46);
  context.fillStyle = "#23191c";
  context.font = "16px sans-serif";
  context.fillText("QR", 70, 88);
}

function renderQrList() {
  qrList.replaceChildren();

  if (qrState.items.length === 0) {
    const empty = document.createElement("article");
    empty.className = "empty-qr-card";
    empty.textContent = "저장된 QR이 아직 없습니다.";
    qrList.append(empty);
    return;
  }

  qrState.items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "saved-qr-card";

    const canvas = document.createElement("canvas");
    canvas.width = 164;
    canvas.height = 164;
    canvas.setAttribute("aria-label", `${item.label} QR`);

    const body = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = item.label;

    const meta = document.createElement("p");
    meta.textContent = item.createdAt
      ? new Intl.DateTimeFormat("ko-KR", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(item.createdAt))
      : "방금 저장됨";

    const payload = document.createElement("p");
    payload.className = "qr-payload-preview";
    payload.textContent = item.payload;

    const actions = document.createElement("div");
    actions.className = "qr-card-actions";

    const copy = document.createElement("button");
    copy.className = "ghost-button";
    copy.type = "button";
    copy.textContent = "내용 복사";
    copy.addEventListener("click", async () => {
      await navigator.clipboard.writeText(item.payload);
      setQrStatus("QR 내용이 복사됐습니다.");
    });

    const remove = document.createElement("button");
    remove.className = "ghost-button danger-button";
    remove.type = "button";
    remove.textContent = "삭제";
    remove.addEventListener("click", () => deleteQrItem(item.id));

    actions.append(copy, remove);
    body.append(title, meta, payload, actions);
    card.append(canvas, body);
    qrList.append(card);
    drawQr(canvas, item.payload);
  });
}

async function loadQrItems() {
  try {
    const response = await fetch("/api/qrs", {
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("QR DB API is unavailable.");
    }

    const data = await response.json();
    qrState.items = data.items || [];
    setQrStorageMode("db");
  } catch {
    qrState.items = getStoredQrItems();
    setQrStorageMode("local");
  }

  renderQrList();
}

async function saveQrItem(payload, label = "Visit Japan QR") {
  const trimmedPayload = payload.trim();

  if (!trimmedPayload) {
    setQrStatus("저장할 QR 내용이 없습니다.");
    return;
  }

  const existing = qrState.items.find((item) => item.payload === trimmedPayload);
  const item = {
    id: existing?.id || createQrId(),
    label: label.trim() || "Visit Japan QR",
    payload: trimmedPayload,
    createdAt: existing?.createdAt || new Date().toISOString(),
  };

  if (qrState.storageMode === "db") {
    try {
      const response = await fetch("/api/qrs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Failed to save QR to DB.");
      }

      const data = await response.json();
      const saved = data.item || item;
      qrState.items = [
        saved,
        ...qrState.items.filter((current) => current.id !== saved.id),
      ];
      setQrStatus("QR이 Vercel DB에 저장됐습니다.");
      renderQrList();
      return;
    } catch {
      setQrStorageMode("local");
    }
  }

  qrState.items = [item, ...qrState.items.filter((current) => current.id !== item.id)];
  setStoredQrItems(qrState.items);
  setQrStatus("QR이 로컬에 임시 저장됐습니다.");
  renderQrList();
}

async function deleteQrItem(id) {
  if (qrState.storageMode === "db") {
    try {
      await fetch(`/api/qrs?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch {
      setQrStatus("DB 삭제에 실패해서 화면에서만 제거합니다.");
    }
  }

  qrState.items = qrState.items.filter((item) => item.id !== id);
  setStoredQrItems(qrState.items);
  renderQrList();
}

function stopQrScan() {
  if (qrState.scanFrame) {
    cancelAnimationFrame(qrState.scanFrame);
  }

  qrState.scanStream?.getTracks().forEach((track) => track.stop());
  qrState.scanStream = null;
  qrState.scanFrame = null;
  qrVideo.hidden = true;
  qrVideo.srcObject = null;
  qrStartScan.hidden = false;
  qrStopScan.hidden = true;
}

async function scanQrFrame() {
  if (!qrState.detector || !qrState.scanStream) {
    return;
  }

  try {
    const codes = await qrState.detector.detect(qrVideo);

    if (codes.length > 0) {
      const payload = codes[0].rawValue;
      stopQrScan();
      await saveQrItem(payload, "Visit Japan QR");
      setQrStatus("QR을 읽고 같은 QR을 다시 생성했습니다.");
      return;
    }
  } catch {
    setQrStatus("QR을 읽는 중입니다. QR을 화면 중앙에 맞춰주세요.");
  }

  qrState.scanFrame = requestAnimationFrame(scanQrFrame);
}

async function startQrScan() {
  if (!("BarcodeDetector" in window)) {
    setQrStatus("이 브라우저는 QR 카메라 인식을 지원하지 않습니다. 직접 저장을 사용해주세요.");
    return;
  }

  try {
    qrState.detector = new window.BarcodeDetector({ formats: ["qr_code"] });
    qrState.scanStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false,
    });
    qrVideo.srcObject = qrState.scanStream;
    qrVideo.hidden = false;
    qrStartScan.hidden = true;
    qrStopScan.hidden = false;
    await qrVideo.play();
    setQrStatus("QR을 카메라 화면 중앙에 맞춰주세요.");
    scanQrFrame();
  } catch {
    setQrStatus("카메라를 열 수 없습니다. 권한을 확인하거나 직접 저장을 사용해주세요.");
    stopQrScan();
  }
}

qrManualForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveQrItem(
    qrManualForm.elements.qrPayload.value,
    qrManualForm.elements.qrLabel.value,
  );
  qrManualForm.elements.qrPayload.value = "";
});

qrStartScan.addEventListener("click", startQrScan);
qrStopScan.addEventListener("click", () => {
  stopQrScan();
  setQrStatus("스캔을 중지했습니다.");
});

async function openRouteToDestination(destination) {
  let mapUrl = buildMapsUrl(destination);

  try {
    const position = await getCurrentPosition();
    mapUrl = buildMapsUrl(destination, position);
  } catch {
    mapUrl = buildMapsUrl(destination);
  }

  window.location.href = mapUrl;
}

function createMapLink(label, url, destination = "") {
  const link = document.createElement("a");
  link.className = destination ? "map-link route-link" : "map-link";
  if (/이동 방법/.test(label)) {
    link.classList.add("guide-link");
  }
  link.href = url;
  link.textContent = label;
  link.addEventListener("click", () => {
    localStorage.setItem("japanScheduleActiveTab", "schedule");
  });

  if (destination) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openRouteToDestination(destination);
    });
  }

  return link;
}

function getMapQuery(item) {
  return item.mapQuery || itineraryMapQueries[item.title] || "";
}

function getDayDate(dateLabel) {
  const match = dateLabel.match(/(\d+)월\s*(\d+)일/);
  if (!match) {
    return null;
  }

  return {
    month: Number(match[1]) - 1,
    day: Number(match[2]),
  };
}

function getTimeStart(timeLabel) {
  const match = timeLabel.match(/(\d{1,2}):(\d{2})/);
  if (!match) {
    return null;
  }

  return {
    hour: Number(match[1]),
    minute: Number(match[2]),
  };
}

function getItineraryInterval(dayLabel, item, nextItem) {
  const date = getDayDate(dayLabel);
  const startTime = getTimeStart(item.time);

  if (!date || !startTime) {
    return null;
  }

  const start = new Date(
    2026,
    date.month,
    date.day,
    startTime.hour,
    startTime.minute,
  );

  const rangeEndMatch = item.time.match(/~\s*(\d{1,2}):(\d{2})/);
  let end;

  if (rangeEndMatch) {
    end = new Date(
      2026,
      date.month,
      date.day,
      Number(rangeEndMatch[1]),
      Number(rangeEndMatch[2]),
    );
  } else {
    const nextStartTime = nextItem ? getTimeStart(nextItem.time) : null;

    if (nextStartTime) {
      end = new Date(
        2026,
        date.month,
        date.day,
        nextStartTime.hour,
        nextStartTime.minute,
      );
    }

    if (!end || end <= start) {
      end = new Date(start.getTime() + 30 * 60 * 1000);
    }
  }

  return { start, end };
}

function updateCurrentItineraryHighlight() {
  const now = new Date();

  document.querySelectorAll("[data-itinerary-start]").forEach((article) => {
    const start = Number(article.dataset.itineraryStart);
    const end = Number(article.dataset.itineraryEnd);
    article.classList.toggle("is-current", now.getTime() >= start && now.getTime() < end);
  });
}

function getItineraryEmoji(item) {
  const text = `${item.title} ${item.note}`;

  if (/공항|보딩|항공|출국|귀국/.test(text)) return "✈️";
  if (/수하물|짐|체크아웃|짐싸기/.test(text)) return "🧳";
  if (/라멘/.test(text)) return "🍜";
  if (/스시|초밥|Sushi/.test(text)) return "🍣";
  if (/야키니쿠|규카츠/.test(text)) return "🥩";
  if (/식사|점심|저녁|아침/.test(text)) return "🍽️";
  if (/카페|coffee|스타벅스|Kopimal|Yoshiko/.test(text)) return "☕";
  if (/불꽃/.test(text)) return "🎆";
  if (/오사카성|기요미즈데라|신사|텐만구|니넨자카|산넨자카/.test(text)) return "🏯";
  if (/우메다|노을|전망/.test(text)) return "🌇";
  if (/도톤보리|신세카이|덴덴타운|구경|산책/.test(text)) return "📸";
  if (/쇼핑|돈키호테/.test(text)) return "🛍️";
  if (/온천|휴식|체크인/.test(text)) return "♨️";
  if (/인력거/.test(text)) return "🛺";
  if (/도보/.test(text)) return "🚶";
  if (/이동|출발|역|택시|하루카|라피트|난카이/.test(text)) return "🚆";
  if (/준비/.test(text)) return "🌤️";

  return "📍";
}

function renderItinerary() {
  itineraryList.replaceChildren();

  itineraryDays.forEach((day) => {
    const dayGroup = document.createElement("section");
    dayGroup.className = "day-group";

    const heading = document.createElement("div");
    heading.className = "day-heading";

    const date = document.createElement("span");
    date.textContent = day.date;

    const title = document.createElement("h3");
    title.textContent = day.title;

    heading.append(date, title);
    dayGroup.append(heading);

    day.items.forEach((item, index) => {
      const article = document.createElement("article");
      const interval = getItineraryInterval(day.date, item, day.items[index + 1]);

      if (interval) {
        article.dataset.itineraryStart = interval.start.getTime();
        article.dataset.itineraryEnd = interval.end.getTime();
      }

      const time = document.createElement("time");
      time.textContent = item.time;

      const content = document.createElement("div");
      const itemTitle = document.createElement("h4");
      itemTitle.className = "item-title";

      const emoji = document.createElement("span");
      emoji.className = "item-emoji";
      emoji.textContent = getItineraryEmoji(item);

      const titleText = document.createElement("span");
      titleText.textContent = item.title;

      itemTitle.append(emoji, titleText);

      const note = document.createElement("p");
      note.textContent = item.note;

      content.append(itemTitle, note);

      const mapQuery = getMapQuery(item);

      if (mapQuery || item.mapUrl || item.extraLinks?.length) {
        const actions = document.createElement("div");
        actions.className = "item-actions";

        if (mapQuery) {
          actions.append(createMapLink("길찾기", buildMapsUrl(mapQuery), mapQuery));
        }

        if (item.mapUrl) {
          actions.append(createMapLink("원본 링크", item.mapUrl));
        }

        item.extraLinks?.forEach((link) => {
          if (link.query) {
            actions.append(
              createMapLink(link.label, buildMapsUrl(link.query), link.query),
            );
          }

          if (link.url) {
            actions.append(
              createMapLink(link.query ? `${link.label} 원본` : link.label, link.url),
            );
          }
        });

        content.append(actions);
      }

      article.append(time, content);
      dayGroup.append(article);
    });

    itineraryList.append(dayGroup);
  });

  updateCurrentItineraryHighlight();
}

function parseKoreanTime(value) {
  return new Date(`${value}:00+09:00`);
}

function getActiveFlight(now = new Date()) {
  const outboundDeparture = parseKoreanTime(flightState.outbound.departureDateTime);
  const returnDeparture = parseKoreanTime(flightState.return.departureDateTime);

  if (now < outboundDeparture) {
    return { key: "outbound", label: "출국편", countdownLabel: "출국 탑승까지" };
  }

  if (now < returnDeparture) {
    return { key: "return", label: "귀국편", countdownLabel: "귀국 탑승까지" };
  }

  return { key: "return", label: "귀국편", countdownLabel: "귀국 완료" };
}

function updateCountdown() {
  const now = new Date();
  const active = getActiveFlight(now);
  const flight = flightState[active.key];
  const departure = parseKoreanTime(flight.departureDateTime);
  const diff = departure.getTime() - now.getTime();
  const chip = document.querySelector("[data-flight-countdown]");
  const countdownLabel = document.querySelector("[data-countdown-label]");
  const message = document.querySelector("[data-flight-message]");
  const dateLabel = document.querySelector("[data-flight-date]");
  const activeFlightLabel = document.querySelector("[data-active-flight-label]");

  countdownLabel.textContent = active.countdownLabel;
  activeFlightLabel.textContent = `${active.label} 탑승 예정일`;
  dateLabel.textContent = fullDateTime.format(departure);

  if (diff <= 0) {
    chip.textContent = "여행 완료";
    message.textContent = "귀국편 탑승 시간이 지났습니다.";
    return;
  }

  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  chip.textContent = `D-${days}`;
  message.textContent = `${active.label}까지 ${days}일 ${hours}시간 ${minutes}분 남았습니다.`;
}

function updateFlightCard(flight, label) {
  const departure = parseKoreanTime(flight.departureDateTime);
  const arrival = parseKoreanTime(flight.arrivalDateTime);

  document.querySelector("[data-active-flight-badge]").textContent = label;
  document.querySelector("[data-flight-from-code]").textContent =
    flight.fromCode.toUpperCase();
  document.querySelector("[data-flight-from-name]").textContent = flight.fromName;
  document.querySelector("[data-flight-to-code]").textContent =
    flight.toCode.toUpperCase();
  document.querySelector("[data-flight-to-name]").textContent = flight.toName;
  document.querySelector("[data-flight-departure-time]").textContent =
    displayDateTime.format(departure);
  document.querySelector("[data-flight-arrival-time]").textContent =
    displayDateTime.format(arrival);
}

function updateFlightSummary(key, selector) {
  const flight = flightState[key];
  const departure = parseKoreanTime(flight.departureDateTime);
  const arrival = parseKoreanTime(flight.arrivalDateTime);
  const summary = document.querySelector(selector);

  summary.querySelector("strong").textContent =
    `${flight.fromCode.toUpperCase()} → ${flight.toCode.toUpperCase()}`;
  summary.querySelector("p").textContent =
    `${flight.fromName}에서 ${flight.toName}으로 이동`;
  summary.querySelector("time").textContent =
    `${displayDateTime.format(departure)} - ${displayDateTime.format(arrival)}`;
}

function updateFlightView() {
  const active = getActiveFlight();
  updateFlightCard(flightState[active.key], active.label);
  updateFlightSummary("outbound", "[data-outbound-summary]");
  updateFlightSummary("return", "[data-return-summary]");
  updateCountdown();
}

function fillFlightForm() {
  const fields = {
    outboundDepartureDateTime: flightState.outbound.departureDateTime,
    outboundArrivalDateTime: flightState.outbound.arrivalDateTime,
    outboundFromCode: flightState.outbound.fromCode,
    outboundFromName: flightState.outbound.fromName,
    outboundToCode: flightState.outbound.toCode,
    outboundToName: flightState.outbound.toName,
    returnDepartureDateTime: flightState.return.departureDateTime,
    returnArrivalDateTime: flightState.return.arrivalDateTime,
    returnFromCode: flightState.return.fromCode,
    returnFromName: flightState.return.fromName,
    returnToCode: flightState.return.toCode,
    returnToName: flightState.return.toName,
  };

  Object.entries(fields).forEach(([name, value]) => {
    flightForm.elements[name].value = value;
  });
}

function readFlightForm(prefix, fallback) {
  return {
    departureDateTime:
      flightForm.elements[`${prefix}DepartureDateTime`].value ||
      fallback.departureDateTime,
    arrivalDateTime:
      flightForm.elements[`${prefix}ArrivalDateTime`].value ||
      fallback.arrivalDateTime,
    fromCode:
      flightForm.elements[`${prefix}FromCode`].value.trim() || fallback.fromCode,
    fromName:
      flightForm.elements[`${prefix}FromName`].value.trim() || fallback.fromName,
    toCode:
      flightForm.elements[`${prefix}ToCode`].value.trim() || fallback.toCode,
    toName:
      flightForm.elements[`${prefix}ToName`].value.trim() || fallback.toName,
  };
}

editFlight.addEventListener("click", () => {
  fillFlightForm();
  flightForm.hidden = false;
  flightForm.elements.outboundDepartureDateTime.focus();
});

cancelFlight.addEventListener("click", () => {
  flightForm.hidden = true;
});

flightForm.addEventListener("submit", (event) => {
  event.preventDefault();

  flightState.outbound = readFlightForm("outbound", flightState.outbound);
  flightState.return = readFlightForm("return", flightState.return);

  updateFlightView();
  flightForm.hidden = true;
});

function buildMapsUrl(destination, position) {
  const params = new URLSearchParams({
    api: "1",
    destination,
    dir_action: "navigate",
    travelmode: "transit",
  });

  if (position) {
    const { latitude, longitude } = position.coords;
    params.set("origin", `${latitude},${longitude}`);
  } else {
    params.set("origin", "Current Location");
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is unavailable."));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      maximumAge: 60000,
      timeout: 6500,
    });
  });
}

async function openLodgingRoute() {
  const destination = lodgingState.address.trim();

  if (!destination) {
    lodgingForm.elements.lodgingAddress.focus();
    return;
  }

  const mapWindow = window.open("about:blank", "_blank");
  let mapUrl = buildMapsUrl(destination);

  try {
    const position = await getCurrentPosition();
    mapUrl = buildMapsUrl(destination, position);
  } catch {
    mapUrl = buildMapsUrl(destination);
  }

  if (mapWindow) {
    mapWindow.location.href = mapUrl;
  } else {
    window.location.href = mapUrl;
  }
}

function updateLodgingView() {
  const name = lodgingState.name || "숙소 미등록";
  const address = lodgingState.address || "숙소 위치를 등록해주세요.";

  document.querySelector("[data-lodging-name]").textContent = name;
  document.querySelector("[data-lodging-address]").textContent = address;
  lodgingRoute.disabled = !lodgingState.address;
}

lodgingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  lodgingState.name =
    lodgingForm.elements.lodgingName.value.trim() || "숙소";
  lodgingState.address = lodgingForm.elements.lodgingAddress.value.trim();

  localStorage.setItem("japanScheduleLodging", JSON.stringify(lodgingState));
  updateLodgingView();
  openLodgingRoute();
});

lodgingRoute.addEventListener("click", openLodgingRoute);

search.addEventListener("input", (event) => {
  const value = event.target.value.trim().toLowerCase();

  phrases.forEach((phrase) => {
    const text = phrase.textContent.toLowerCase();
    const keywords = phrase.dataset.keywords.toLowerCase();
    phrase.hidden = value.length > 0 && !`${text} ${keywords}`.includes(value);
  });
});

updateFlightView();
updateLodgingView();
renderItinerary();
loadQrItems();
activateTab(localStorage.getItem("japanScheduleActiveTab") || "visit");
setInterval(updateFlightView, 60000);
setInterval(updateCurrentItineraryHighlight, 60000);
