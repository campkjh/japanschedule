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

function loadStoredLodgings() {
  try {
    return JSON.parse(localStorage.getItem("japanScheduleLodgings") || "{}");
  } catch {
    return {};
  }
}

const defaultLodgings = {
  osaka: {
    name: "오사카 코코네 하우스 난바점",
    address: "오사카 코코네 하우스 난바점",
    switchAt: "2026-06-05T00:00",
  },
  kyoto: {
    name: "교토 우메코지 카덴쇼",
    address: "교토 우메코지 카덴쇼",
    switchAt: "2026-06-07T10:20",
  },
};

const storedLodgings = loadStoredLodgings();

const lodgingState = {
  stays: {
    osaka: { ...defaultLodgings.osaka, ...(storedLodgings.osaka || {}) },
    kyoto: { ...defaultLodgings.kyoto, ...(storedLodgings.kyoto || {}) },
  },
  activeKey: "osaka",
};

const QR_STORAGE_KEY = "japanScheduleVisitJapanQrs";
const qrState = {
  items: [],
  storageMode: "checking",
  pendingImage: null,
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
    title: "도톤보리 · 덴덴타운 · 신세카이 · 이즈미사노 불꽃축제 · 교토 이동",
    items: [
      {
        time: "09:00~10:20",
        title: "아침 준비",
        note: "외출 준비",
      },
      {
        time: "10:20~10:40",
        title: "숙소 체크아웃",
        note: "오사카 코코네 하우스 난바점 체크아웃",
      },
      {
        time: "10:40~11:30",
        title: "아침 식사",
        note: "지도 링크의 식당에서 아침 식사",
        mapUrl: "https://maps.app.goo.gl/T9dHXWdo4bKjGRc17",
      },
      {
        time: "11:30~11:50",
        title: "플라잉재팬 난바 짐 보관",
        note: "난바역 플라잉재팬 난바 짐보관센터에 캐리어 위탁 (오후 9시까지 운영). 찾아가는 영상: https://sites.google.com/flyingjp.com/tourist",
        mapUrl: "https://maps.app.goo.gl/dTLymsibxedGm2gC9",
      },
      {
        time: "11:50~12:30",
        title: "도톤보리 2일차 구경",
        note: "도톤보리 주변 추가 구경",
      },
      {
        time: "12:30~12:40",
        title: "덴덴타운 전기상가로 이동",
        note: "도톤보리에서 덴덴타운 방향",
      },
      {
        time: "12:40~13:00",
        title: "덴덴타운 구경",
        note: "전기상가 둘러보기",
      },
      {
        time: "13:00~13:50",
        title: "Kopimal coffee",
        note: "레트로 카페, 느낌 좋은 곳",
        mapUrl: "https://maps.app.goo.gl/f2Mf4jBAQQpSWAGaA",
      },
      {
        time: "13:50~14:00",
        title: "카페에서 식당으로 이동",
        note: "점심 식사 장소로 이동",
        mapQuery: "규카츠 토미타 오사카",
      },
      {
        time: "14:00~14:40",
        title: "점심 식사 - 규카츠 토미타",
        note: "규카츠 점심",
        mapUrl: "https://maps.app.goo.gl/75nQHk4VZktHfQGEA",
      },
      {
        time: "14:40~15:00",
        title: "신세카이로 이동",
        note: "신세카이 방향으로 이동",
      },
      {
        time: "15:00~15:40",
        title: "신세카이 구경",
        note: "츠텐카쿠 주변 산책",
      },
      {
        time: "15:40~16:20",
        title: "메가돈키, 마츠모토 키요시 쇼핑",
        note: "메가돈키호테와 마츠모토 키요시에서 쇼핑",
      },
      {
        time: "16:20~16:40",
        title: "숙소로 이동",
        note: "휴식 전 복귀",
      },
      {
        time: "16:40~18:00",
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
        mapUrl: "https://maps.app.goo.gl/utT7gqsheEm9k3dW9",
      },
      {
        time: "20:10~20:50",
        title: "난바역 플라잉재팬에서 짐 회수",
        note: "난카이 특급 타고 난바역 플라잉재팬 짐보관센터로 이동해 캐리어 회수",
      },
      {
        time: "20:50~22:10",
        title: "난바에서 교토역 이동",
        note: "교토역으로 이동",
      },
      {
        time: "22:10~22:30",
        title: "교토 우메코지 카덴쇼 체크인 및 저녁 식사 - 츠지야 우메코지기타점",
        note: "체크인 후 츠지야 우메코지기타점에서 식사",
        mapUrl: "https://maps.app.goo.gl/wRkrSRUtMfmQKcUi7",
      },
    ],
  },
  {
    date: "6월 7일",
    title: "교토 · 기온 · 기요미즈데라 · 후시미 이나리 · 가이세키",
    items: [
      {
        time: "10:30~11:30",
        title: "아침 준비 및 조식",
        note: "숙소에서 아침 식사",
      },
      {
        time: "11:30~11:50",
        title: "교토역으로 이동",
        note: "숙소에서 교토역",
      },
      {
        time: "11:50~12:40",
        title: "점심 식사 - 但馬屋PREMIUM 京都駅八条口店",
        note: "스키야키 점심",
        mapUrl: "https://maps.app.goo.gl/qdsYwBsZRoCwFSob6",
      },
      {
        time: "12:40~13:00",
        title: "교토역에서 기온시조역으로 이동",
        note: "기온시조역 방향",
      },
      {
        time: "13:00~13:40",
        title: "Cafe Yoshiko",
        note: "가모강 바로 앞 느낌 좋은 카페",
      },
      {
        time: "13:40~14:00",
        title: "니시키 텐만구 ~ 폰토초 공원쪽 구경",
        note: "교토 중심 산책",
      },
      {
        time: "14:00~14:30",
        title: "기요미즈데라 인력거 체험",
        note: "2인 약 30분, 대략 1만엔",
      },
      {
        time: "14:30~15:10",
        title: "니넨자카, 산넨자카, 기요미즈데라 구경",
        note: "기요미즈데라 주변 산책",
      },
      {
        time: "15:10~15:30",
        title: "교토 스타벅스",
        note: "유명한 교토 스벅 방문",
        mapUrl: "https://maps.app.goo.gl/4AZk8MNjZGitU7U96",
      },
      {
        time: "15:30~15:50",
        title: "후시미 이나리 신사로 이동",
        note: "무리라면 패스 가능",
      },
      {
        time: "15:50~16:30",
        title: "후시미 이나리 신사 구경",
        note: "철도샷 포인트 포함",
      },
      {
        time: "16:30~17:10",
        title: "숙소로 이동",
        note: "교토 숙소로 복귀",
        mapQuery: "교토 우메코지 카덴쇼",
      },
      {
        time: "17:10~19:00",
        title: "체크인, 휴식, 온천",
        note: "숙소에서 쉬기",
      },
      {
        time: "19:00~20:00",
        title: "저녁 가이세키 식사",
        note: "숙소에서 가이세키 식사로 일정 마무리",
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
  "숙소 체크아웃": "오사카 코코네 하우스 난바점",
  "플라잉재팬 난바 짐 보관": "Flying Japan Namba Luggage Storage",
  "난바역 플라잉재팬에서 짐 회수": "Flying Japan Namba Luggage Storage",
  "난바에서 교토역 이동": "교토역",
  "신세카이로 이동": "신세카이 오사카",
  "신세카이 구경": "신세카이 오사카",
  "덴덴타운 전기상가로 이동": "덴덴타운 오사카",
  "덴덴타운 구경": "덴덴타운 오사카",
  "Kopimal coffee": "Kopimal coffee Osaka",
  "점심 식사 - 규카츠 토미타": "규카츠 토미타 오사카",
  "도톤보리 2일차 구경": "도톤보리 오사카",
  "메가돈키, 마츠모토 키요시 쇼핑": "메가 돈키호테 신사이바시",
  "이즈미사노시로 이동": "린쿠 마블 비치 이즈미사노",
  "이즈미사노시 린쿠 마블 비치 불꽃축제": "린쿠 마블 비치 이즈미사노",
  "교토 우메코지 카덴쇼 체크인 및 저녁 식사 - 츠지야 우메코지기타점":
    "츠지야 우메코지기타점 교토",
  "아침 준비 및 조식": "교토 우메코지 카덴쇼",
  "교토역으로 이동": "교토역",
  "점심 식사 - 但馬屋PREMIUM 京都駅八条口店": "但馬屋PREMIUM 京都駅八条口店",
  "교토역에서 기온시조역으로 이동": "기온시조역",
  "Cafe Yoshiko": "Cafe Yoshiko Kyoto",
  "니시키 텐만구 ~ 폰토초 공원쪽 구경": "니시키 텐만구 교토",
  "기요미즈데라 인력거 체험": "기요미즈데라 교토",
  "니넨자카, 산넨자카, 기요미즈데라 구경": "니넨자카 산넨자카 기요미즈데라",
  "교토 스타벅스": "스타벅스 교토 니넨자카 야사카 차야",
  "후시미 이나리 신사로 이동": "후시미 이나리 신사",
  "후시미 이나리 신사 구경": "후시미 이나리 신사",
  "체크인, 휴식, 온천": "교토 우메코지 카덴쇼",
  "저녁 가이세키 식사": "교토 우메코지 카덴쇼",
  "돈키호테 쇼핑": "돈키호테 교토역",
  "간사이국제공항으로 이동": "간사이국제공항",
  "간사이국제공항 도착": "간사이국제공항",
};

const tabButtons = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");
const qrList = document.querySelector("[data-qr-list]");
const qrAddButton = document.querySelector("[data-add-qr-image]");
const qrFileInput = document.querySelector("[data-qr-file-input]");
const qrStatus = document.querySelector("[data-qr-status]");
const qrStorageMode = document.querySelector("[data-qr-storage-mode]");
const qrLabelDialog = document.querySelector("[data-qr-label-dialog]");
const qrLabelForm = document.querySelector("[data-qr-label-form]");
const qrLabelPreview = document.querySelector("[data-qr-label-preview]");
const qrLabelCancel = document.querySelector("[data-qr-label-cancel]");
const qrViewDialog = document.querySelector("[data-qr-view-dialog]");
const qrViewImage = document.querySelector("[data-qr-view-image]");
const qrViewLabel = document.querySelector("[data-qr-view-label]");
const qrViewClose = document.querySelector("[data-qr-view-close]");
const itineraryList = document.querySelector("[data-itinerary-list]");
const flightForm = document.querySelector("[data-flight-form]");
const editFlight = document.querySelector("[data-edit-flight]");
const cancelFlight = document.querySelector("[data-cancel-flight]");
const lodgingForm = document.querySelector("[data-lodging-form]");
const lodgingRoute = document.querySelector("[data-open-lodging-route]");
const floatingLodgingRoute = document.querySelector("[data-floating-lodging-route]");
const floatingLodgingName = document.querySelector("[data-floating-lodging-name]");
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
  updateFloatingLodgingButton();
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

function renderQrList() {
  qrList.replaceChildren();

  if (qrState.items.length === 0) {
    const empty = document.createElement("article");
    empty.className = "empty-qr-card";
    empty.textContent = "저장된 QR이 아직 없어요. + 버튼으로 캡쳐본을 추가하세요.";
    qrList.append(empty);
    return;
  }

  qrState.items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "saved-qr-card";

    const figure = document.createElement("button");
    figure.type = "button";
    figure.className = "saved-qr-thumb";
    figure.setAttribute("aria-label", `${item.label} 크게 보기`);
    const image = document.createElement("img");
    image.src = item.payload;
    image.alt = `${item.label} QR 캡쳐본`;
    image.loading = "lazy";
    figure.append(image);
    figure.addEventListener("click", () => openQrViewer(item));

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

    const actions = document.createElement("div");
    actions.className = "qr-card-actions";

    const view = document.createElement("button");
    view.className = "ghost-button";
    view.type = "button";
    view.textContent = "크게 보기";
    view.addEventListener("click", () => openQrViewer(item));

    const remove = document.createElement("button");
    remove.className = "ghost-button danger-button";
    remove.type = "button";
    remove.textContent = "삭제";
    remove.addEventListener("click", () => deleteQrItem(item.id));

    actions.append(view, remove);
    body.append(title, meta, actions);
    card.append(figure, body);
    qrList.append(card);
  });
}

function openQrViewer(item) {
  if (!qrViewDialog) return;
  qrViewImage.src = item.payload;
  qrViewImage.alt = `${item.label} QR 캡쳐본`;
  qrViewLabel.textContent = item.label;
  qrViewDialog.showModal();
}

async function readImageAsDataUrl(file) {
  const maxDim = 1400;
  const quality = 0.9;
  const bitmap = await createImageBitmap(file);
  const ratio = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * ratio);
  const height = Math.round(bitmap.height * ratio);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();
  return canvas.toDataURL("image/jpeg", quality);
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

async function saveQrItem(payload, label) {
  if (!payload) {
    setQrStatus("저장할 이미지가 없어요.");
    return;
  }

  const trimmedLabel = (label || "").trim() || "Visit Japan QR";
  const item = {
    id: createQrId(),
    label: trimmedLabel,
    payload,
    createdAt: new Date().toISOString(),
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
      setQrStatus(`"${trimmedLabel}" 캡쳐본을 Vercel DB에 저장했어요.`);
      renderQrList();
      return;
    } catch {
      setQrStorageMode("local");
    }
  }

  qrState.items = [item, ...qrState.items.filter((current) => current.id !== item.id)];
  setStoredQrItems(qrState.items);
  setQrStatus(`"${trimmedLabel}" 캡쳐본을 이 기기에 저장했어요.`);
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

qrAddButton?.addEventListener("click", () => {
  qrFileInput?.click();
});

qrFileInput?.addEventListener("change", async () => {
  const file = qrFileInput.files?.[0];
  qrFileInput.value = "";

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    setQrStatus("이미지 파일만 추가할 수 있어요.");
    return;
  }

  try {
    const dataUrl = await readImageAsDataUrl(file);
    qrState.pendingImage = dataUrl;
    if (qrLabelPreview) qrLabelPreview.src = dataUrl;
    if (qrLabelForm) qrLabelForm.elements.qrLabel.value = "";
    qrLabelDialog?.showModal();
    setTimeout(() => qrLabelForm?.elements.qrLabel.focus(), 60);
  } catch {
    setQrStatus("이미지를 불러오지 못했어요. 다른 파일을 선택해주세요.");
  }
});

qrLabelCancel?.addEventListener("click", () => {
  qrState.pendingImage = null;
  qrLabelDialog?.close();
});

qrLabelForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const label = qrLabelForm.elements.qrLabel.value;
  const image = qrState.pendingImage;
  qrState.pendingImage = null;
  qrLabelDialog?.close();
  if (image) {
    await saveQrItem(image, label);
  }
});

qrViewClose?.addEventListener("click", () => qrViewDialog?.close());
qrViewDialog?.addEventListener("click", (event) => {
  if (event.target === qrViewDialog) qrViewDialog.close();
});

document.querySelectorAll("[data-copy-text]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copyText || "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent;
      button.textContent = "복사됨";
      button.classList.add("is-copied");
      setTimeout(() => {
        button.textContent = original;
        button.classList.remove("is-copied");
      }, 1400);
    } catch {
      setQrStatus("복사에 실패했어요. 직접 길게 눌러 복사해주세요.");
    }
  });
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

  updateLodgingView();
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

function getActiveLodgingKey(now = new Date()) {
  const kyotoSwitch = parseKoreanTime(defaultLodgings.kyoto.switchAt);
  return now >= kyotoSwitch ? "kyoto" : "osaka";
}

function getActiveLodging(now = new Date()) {
  lodgingState.activeKey = getActiveLodgingKey(now);
  return lodgingState.stays[lodgingState.activeKey];
}

function saveStoredLodgings() {
  localStorage.setItem("japanScheduleLodgings", JSON.stringify(lodgingState.stays));
}

async function openLodgingRoute() {
  const lodging = getActiveLodging();
  const destination = lodging.address.trim();

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

function updateFloatingLodgingButton() {
  const lodging = getActiveLodging();
  const hasDestination = Boolean(lodging.address);
  const isScheduleActive =
    document.querySelector(".tab-panel.is-active")?.dataset.panel === "schedule";

  floatingLodgingRoute.hidden = !hasDestination || !isScheduleActive;
  floatingLodgingRoute.disabled = !hasDestination;
  floatingLodgingName.textContent = lodging.name || "숙소";
}

function updateLodgingView() {
  const previousKey = lodgingState.activeKey;
  const lodging = getActiveLodging();
  const name = lodging.name || "숙소 미등록";
  const address = lodging.address || "숙소 위치를 등록해주세요.";

  document.querySelector("[data-lodging-name]").textContent = name;
  document.querySelector("[data-lodging-address]").textContent = address;
  lodgingRoute.disabled = !lodging.address;
  lodgingRoute.textContent = `${name} 길찾기`;

  const formIsEmpty =
    !lodgingForm.elements.lodgingName.value &&
    !lodgingForm.elements.lodgingAddress.value;

  if (previousKey !== lodgingState.activeKey || formIsEmpty) {
    lodgingForm.elements.lodgingName.value = lodging.name || "";
    lodgingForm.elements.lodgingAddress.value = lodging.address || "";
  }

  updateFloatingLodgingButton();
}

lodgingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const activeKey = getActiveLodgingKey();
  lodgingState.activeKey = activeKey;
  lodgingState.stays[activeKey].name =
    lodgingForm.elements.lodgingName.value.trim() || "숙소";
  lodgingState.stays[activeKey].address = lodgingForm.elements.lodgingAddress.value.trim();

  saveStoredLodgings();
  updateLodgingView();
  openLodgingRoute();
});

lodgingRoute.addEventListener("click", openLodgingRoute);
floatingLodgingRoute.addEventListener("click", openLodgingRoute);

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
