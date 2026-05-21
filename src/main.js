const today = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "full",
  timeZone: "Asia/Seoul",
}).format(new Date());

document.documentElement.dataset.loadedDate = today;
