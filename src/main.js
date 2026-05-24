const flightState = {
  outbound: {
    departureDateTime: "2026-06-10T09:30",
    arrivalDateTime: "2026-06-10T11:50",
    fromCode: "ICN",
    fromName: "인천국제공항",
    toCode: "KIX",
    toName: "간사이국제공항",
  },
  return: {
    departureDateTime: "2026-06-14T18:20",
    arrivalDateTime: "2026-06-14T20:15",
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
  name: "",
  address: "",
  ...loadStoredLodging(),
};

const tabButtons = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");
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

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === target);
    });
  });
});

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
setInterval(updateFlightView, 60000);
