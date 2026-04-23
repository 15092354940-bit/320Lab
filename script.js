// Firebase 配置 - 需要替换为你自己的配置
const firebaseConfig = {
  apiKey: "AIzaSyAq5o0BHzzLyCcrp7epVJYnVniPztqY3xM",
  authDomain: "lab-47a39.firebaseapp.com",
  databaseURL: "https://lab-47a39-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lab-47a39",
  storageBucket: "lab-47a39.firebasestorage.app",
  messagingSenderId: "757983198580",
  appId: "1:757983198580:web:b727a849f1dd4f0f890021"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const instrumentsSeed = [
  { id: "ecs-01", name: "1号电化学工作站", alias: "紫外那台", category: "电化学", location: "实验室", rules: "默认按时段预约；如需长时间测试，建议提前备注实验类型与预计时长。", quantity: 1, quantityDisplay: "1台" },
  { id: "ecs-02", name: "2号电化学工作站", alias: "RDE那台", category: "电化学", location: "实验室", rules: "涉及 RDE 测试时，请同步确认旋转圆盘电极是否可用。", quantity: 1, quantityDisplay: "1台" },
  { id: "ecs-03", name: "3号电化学工作站", alias: "液相色谱那台", category: "电化学", location: "实验室", rules: "如需联用液相色谱，请分别预约工作站与液相色谱。", quantity: 1, quantityDisplay: "1台" },
  { id: "hplc-01", name: "液相色谱", alias: "独立设备", category: "分析", location: "实验室", rules: "建议填写样品体系、流动相信息与预计使用时长。", quantity: 1, quantityDisplay: "1台" },
  { id: "rde-01", name: "旋转圆盘电极", alias: "RDE附件", category: "电化学附件", location: "实验室", rules: "建议与 2号电化学工作站联动预约，避免附件与主机时间错位。", quantity: 1, quantityDisplay: "1套" },
  { id: "oil-bath-high-01", name: "高温油浴锅1", alias: "高温油浴", category: "加热", location: "实验室", rules: "适用于高温油浴实验，请预约时备注目标温度与预计使用时长。", quantity: 1, quantityDisplay: "1台" },
  { id: "oil-bath-high-02", name: "高温油浴锅2", alias: "高温油浴", category: "加热", location: "实验室", rules: "适用于高温油浴实验，请预约时备注目标温度与预计使用时长。", quantity: 1, quantityDisplay: "1台" },
  { id: "oil-bath-low-01", name: "低温油浴锅", alias: "低温油浴", category: "加热", location: "实验室", rules: "适用于低温油浴实验，请预约时备注目标温度与预计使用时长。", quantity: 1, quantityDisplay: "1台" },
  { id: "heating-mantle-01", name: "加热套", alias: "加热装置", category: "加热", location: "实验室", rules: "涉及回流或长时间加热时，建议同步预约通风橱回流系统。", quantity: 1, quantityDisplay: "1台" },
  { id: "oven-01", name: "1号烘箱", alias: "烘箱", category: "热处理", location: "实验室", rules: "请备注温度区间与预计结束时间。", quantity: 1, quantityDisplay: "1台" },
  { id: "oven-02", name: "2号烘箱", alias: "烘箱", category: "热处理", location: "实验室", rules: "请备注温度区间与预计结束时间。", quantity: 1, quantityDisplay: "1台" },
  { id: "hotplate-new-01", name: "新搅拌加热台", alias: "搅拌加热", category: "加热", location: "实验室", rules: "适合短时加热与搅拌实验，建议填写样品类型和温度范围。", quantity: 1, quantityDisplay: "1台" },
  { id: "muffle-small-01", name: "小马弗炉", alias: "热处理设备", category: "热处理", location: "实验室", rules: "请填写升温程序与最高温度。", quantity: 1, quantityDisplay: "1台" },
  { id: "n2-furnace-01", name: "氮气炉", alias: "气氛炉", category: "热处理", location: "实验室", rules: "需填写气氛、温度程序与保温时长。", quantity: 1, quantityDisplay: "1台" },
  { id: "o2-cylinder-01", name: "氧气瓶", alias: "气体资源", category: "气体", location: "实验室", rules: "建议记录压力余量与关联实验装置。", quantity: 1, quantityDisplay: "1瓶" },
  { id: "fume-reflux-01", name: "通风橱回流系统", alias: "回流装置", category: "合成装置", location: "实验室", rules: "建议与加热套或油浴锅联动预约，防止装置与热源时间冲突。", quantity: 1, quantityDisplay: "1套" }
];

const bookingsSeed = [
  { id: 1, instrumentId: "ecs-01", user: "Lin", date: "2026-04-23", slot: "09:00-11:00", purpose: "CV 与 EIS 测试" },
  { id: 2, instrumentId: "ecs-02", user: "Wang", date: "2026-04-23", slot: "14:00-16:00", purpose: "RDE 极化曲线测试" },
  { id: 3, instrumentId: "hplc-01", user: "Zhao", date: "2026-04-24", slot: "10:00-12:00", purpose: "产物定量分析" }
];

const userColorPalette = [
  { card: "user-red-card", badge: "user-red-badge", subtle: "user-red-subtle" },
  { card: "user-orange-card", badge: "user-orange-badge", subtle: "user-orange-subtle" },
  { card: "user-amber-card", badge: "user-amber-badge", subtle: "user-amber-subtle" },
  { card: "user-emerald-card", badge: "user-emerald-badge", subtle: "user-emerald-subtle" },
  { card: "user-sky-card", badge: "user-sky-badge", subtle: "user-sky-subtle" },
  { card: "user-blue-card", badge: "user-blue-badge", subtle: "user-blue-subtle" },
  { card: "user-violet-card", badge: "user-violet-badge", subtle: "user-violet-subtle" },
  { card: "user-pink-card", badge: "user-pink-badge", subtle: "user-pink-subtle" }
];

const weekCalendarRows = Array.from({ length: 24 }, (_, index) => {
  const start = `${String(index).padStart(2, "0")}:00`;
  const end = index === 23 ? "24:00" : `${String(index + 1).padStart(2, "0")}:00`;
  return `${start}-${end}`;
});

const calendarWeekHeaders = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

const state = {
  bookings: [...bookingsSeed],
  query: "",
  category: "all",
  selectedInstrument: "ecs-01",
  date: "2026-04-23",
  startTime: "09:00",
  endTime: "11:00",
  user: "Lin",
  purpose: "样品测试",
  message: "",
  calendarView: "week",
  showDaySchedule: false
};

const els = {
  searchInput: document.getElementById("searchInput"),
  categorySelect: document.getElementById("categorySelect"),
  instrumentList: document.getElementById("instrumentList"),
  infoName: document.getElementById("infoName"),
  infoAlias: document.getElementById("infoAlias"),
  infoMeta: document.getElementById("infoMeta"),
  infoRules: document.getElementById("infoRules"),
  userInput: document.getElementById("userInput"),
  dateInput: document.getElementById("dateInput"),
  startTimeInput: document.getElementById("startTimeInput"),
  endTimeInput: document.getElementById("endTimeInput"),
  purposeInput: document.getElementById("purposeInput"),
  statusBox: document.getElementById("statusBox"),
  reserveBtn: document.getElementById("reserveBtn"),
  toggleScheduleBtn: document.getElementById("toggleScheduleBtn"),
  dayScheduleWrap: document.getElementById("dayScheduleWrap"),
  dayScheduleList: document.getElementById("dayScheduleList"),
  dayBookingList: document.getElementById("dayBookingList"),
  messageBox: document.getElementById("messageBox"),
  calendarTitle: document.getElementById("calendarTitle"),
  calendarContainer: document.getElementById("calendarContainer"),
  weekBtn: document.getElementById("weekBtn"),
  monthBtn: document.getElementById("monthBtn")
};

function cn(...arr) {
  return arr.filter(Boolean).join(" ");
}

function getUserColorClasses(user) {
  const normalized = (user || "").trim() || "default";
  const hash = Array.from(normalized).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return userColorPalette[hash % userColorPalette.length];
}

function isValidTimeValue(value) {
  return /^(([01]\d|2[0-3]):([0-5]\d)|24:00)$/.test(value);
}

function toMinutes(value) {
  if (!isValidTimeValue(value)) return Number.NaN;
  if (value === "24:00") return 24 * 60;
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

function parseRange(slot) {
  const [start, end] = slot.split("-");
  return [toMinutes(start), toMinutes(end)];
}

function overlaps(a, b) {
  const [a1, a2] = parseRange(a);
  const [b1, b2] = parseRange(b);
  if ([a1, a2, b1, b2].some(Number.isNaN)) return false;
  return Math.max(a1, b1) < Math.min(a2, b2);
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekDates(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  const currentDay = date.getDay();
  const offset = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(date);
  monday.setDate(date.getDate() + offset);
  return Array.from({ length: 7 }, (_, index) => {
    const next = new Date(monday);
    next.setDate(monday.getDate() + index);
    return next;
  });
}

function getMonthDates(dateString) {
  const baseDate = new Date(`${dateString}T00:00:00`);
  const monthStart = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  const monthStartDay = monthStart.getDay();
  const offset = monthStartDay === 0 ? -6 : 1 - monthStartDay;
  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() + offset);
  return Array.from({ length: 42 }, (_, index) => {
    const next = new Date(gridStart);
    next.setDate(gridStart.getDate() + index);
    return next;
  });
}

function formatWeekLabel(date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatWeekday(date) {
  const labels = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return labels[date.getDay()];
}

function isSameMonth(dateA, dateB) {
  return dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth();
}

function validCase(input, expected) {
  return { name: `validTime(${input}) === ${expected}`, ok: isValidTimeValue(input) === expected };
}

function overlapCase(a, b, expected) {
  return { name: `overlaps(${a}, ${b}) === ${expected}`, ok: overlaps(a, b) === expected };
}

function runSelfTests() {
  const cases = [
    validCase("00:00", true),
    validCase("09:30", true),
    validCase("24:00", true),
    validCase("24:01", false),
    validCase("25:00", false),
    overlapCase("09:00-11:00", "10:00-12:00", true),
    overlapCase("09:00-11:00", "11:00-12:00", false)
  ];

  cases.forEach((item) => {
    if (!item.ok) {
      console.error("Self-test failed:", item.name);
    }
  });
}

function getCategories() {
  return ["all", ...new Set(instrumentsSeed.map((item) => item.category))];
}

function getCurrentInstrument() {
  return instrumentsSeed.find((item) => item.id === state.selectedInstrument) || null;
}

function getSlot() {
  return `${state.startTime}-${state.endTime}`;
}

function getInvalidTimeRange() {
  if (!isValidTimeValue(state.startTime) || !isValidTimeValue(state.endTime)) return true;
  return toMinutes(state.startTime) >= toMinutes(state.endTime);
}

function getFilteredInstruments() {
  return instrumentsSeed.filter((item) => {
    const hitQuery = [item.name, item.alias, item.location, item.category].join(" ").toLowerCase().includes(state.query.toLowerCase());
    const hitCategory = state.category === "all" || item.category === state.category;
    return hitQuery && hitCategory;
  });
}

function getDayBookings() {
  return state.bookings
    .filter((booking) => booking.instrumentId === state.selectedInstrument && booking.date === state.date)
    .sort((a, b) => parseRange(a.slot)[0] - parseRange(b.slot)[0]);
}

function getOverlappingBookings() {
  if (getInvalidTimeRange()) return [];
  return getDayBookings().filter((booking) => overlaps(booking.slot, getSlot()));
}

function getConflict() {
  const currentInstrument = getCurrentInstrument();
  if (!currentInstrument) return null;
  const overlapping = getOverlappingBookings();
  return overlapping.length >= currentInstrument.quantity ? overlapping[0] || null : null;
}

function getWeeklyColumns() {
  return getWeekDates(state.date).map((weekDate) => {
    const key = formatDateKey(weekDate);
    return {
      key,
      label: formatWeekLabel(weekDate),
      weekday: formatWeekday(weekDate),
      items: state.bookings
        .filter((booking) => booking.instrumentId === state.selectedInstrument && booking.date === key)
        .sort((a, b) => parseRange(a.slot)[0] - parseRange(b.slot)[0])
    };
  });
}

function getMonthlyGrid() {
  const monthDates = getMonthDates(state.date);
  const currentCalendarDate = new Date(`${state.date}T00:00:00`);

  return monthDates.map((monthDate) => {
    const key = formatDateKey(monthDate);
    return {
      key,
      label: monthDate.getDate(),
      isCurrentMonth: isSameMonth(monthDate, currentCalendarDate),
      isSelectedDate: key === state.date,
      items: state.bookings
        .filter((booking) => booking.instrumentId === state.selectedInstrument && booking.date === key)
        .sort((a, b) => parseRange(a.slot)[0] - parseRange(b.slot)[0])
    };
  });
}

function renderCategories() {
  const categories = getCategories();
  els.categorySelect.innerHTML = categories
    .map((item) => `<option value="${item}">${item === "all" ? "全部" : item}</option>`)
    .join("");
  els.categorySelect.value = state.category;
}

function renderInstrumentList() {
  const list = getFilteredInstruments();
  els.instrumentList.innerHTML = list
    .map((item) => `
      <button class="instrument-item ${state.selectedInstrument === item.id ? "active" : ""}" data-id="${item.id}">
        <div class="instrument-item-top">
          <div>
            <div class="instrument-name">${item.name}</div>
            <div class="instrument-alias">${item.alias}</div>
            <div class="instrument-meta">${item.category} · ${item.quantityDisplay}</div>
          </div>
          <span class="tag">可预约</span>
        </div>
      </button>
    `)
    .join("");

  els.instrumentList.querySelectorAll(".instrument-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedInstrument = btn.dataset.id;
      state.message = "";
      render();
    });
  });
}

function renderInstrumentInfo() {
  const current = getCurrentInstrument();
  if (!current) return;
  els.infoName.textContent = current.name;
  els.infoAlias.textContent = current.alias;
  els.infoMeta.textContent = `${current.location} / ${current.quantityDisplay}`;
  els.infoRules.textContent = current.rules;
}

function renderStatusBox() {
  const conflict = getConflict();
  const invalidTimeRange = getInvalidTimeRange();

  els.statusBox.className = "status-box";

  if (conflict) {
    els.statusBox.classList.add("error");
    els.statusBox.textContent = `当前时间段存在冲突：${conflict.date} ${conflict.slot}`;
    return;
  }

  if (invalidTimeRange) {
    els.statusBox.classList.add("warning");
    els.statusBox.textContent = "请输入正确的 24 小时制时间。";
    return;
  }

  els.statusBox.textContent = `当前可预约时间段：${getSlot()}`;
}

function renderMessage() {
  els.messageBox.textContent = state.message || "";
}

function createBookingCard(booking) {
  const color = getUserColorClasses(booking.user);
  return `
    <div class="booking-card ${color.card}">
      <div class="booking-head">
        <div>
          <div class="booking-time">${booking.slot}</div>
          <div class="booking-user ${color.subtle}">${booking.user}</div>
        </div>
        <div class="booking-actions">
          <span class="tag ${color.badge}">已预约</span>
          <button class="btn btn-secondary small-btn cancel-btn" data-id="${booking.id}">取消预约</button>
        </div>
      </div>
      <div class="booking-purpose">${booking.purpose}</div>
    </div>
  `;
}

function bindCancelButtons(scope) {
  scope.querySelectorAll(".cancel-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      state.bookings = state.bookings.filter((item) => item.id !== id);
      state.message = "预约已取消。";
      render();
    });
  });
}

function renderDayBookings() {
  const dayBookings = getDayBookings();

  if (dayBookings.length === 0) {
    const empty = `<div class="empty-text">所选日期暂无预约记录，可直接预约。</div>`;
    els.dayBookingList.innerHTML = empty;
    els.dayScheduleList.innerHTML = `<div class="empty-text">当日暂无预约。</div>`;
    return;
  }

  els.dayBookingList.innerHTML = dayBookings.map(createBookingCard).join("");
  els.dayScheduleList.innerHTML = dayBookings.map(createBookingCard).join("");
  bindCancelButtons(els.dayBookingList);
  bindCancelButtons(els.dayScheduleList);
}

function renderDayScheduleVisibility() {
  els.dayScheduleWrap.classList.toggle("hidden", !state.showDaySchedule);
  els.toggleScheduleBtn.textContent = state.showDaySchedule ? "收起当日排程" : "查看当日排程";
}

function renderWeekCalendar() {
  const weeklyColumns = getWeeklyColumns();

  const weeklyGrid = weekCalendarRows.map((timeSlot) => ({
    timeSlot,
    cells: weeklyColumns.map((column) => ({
      dateKey: column.key,
      items: column.items.filter((booking) => overlaps(booking.slot, timeSlot))
    }))
  }));

  els.calendarContainer.innerHTML = `
    <div class="week-wrap">
      <div class="week-grid">
        <div class="week-header">
          <div class="week-header-cell">时间</div>
          ${weeklyColumns.map((column) => `
            <div class="week-header-cell">
              <div class="week-header-title">${column.weekday}</div>
              <div class="week-header-sub">${column.label}</div>
            </div>
          `).join("")}
        </div>

        ${weeklyGrid.map((row, rowIndex) => `
          <div class="week-row ${rowIndex !== weeklyGrid.length - 1 ? "" : ""}">
            <div class="week-time-cell">${row.timeSlot}</div>
            ${row.cells.map((cell) => `
              <div class="week-cell">
                ${cell.items.length === 0
                  ? `<div class="week-empty"></div>`
                  : cell.items.map((booking) => {
                      const color = getUserColorClasses(booking.user);
                      return `
                        <div class="calendar-block ${color.card}">
                          <div class="calendar-block-time">${booking.slot}</div>
                          <div>${booking.user}</div>
                          <div>${booking.purpose}</div>
                        </div>
                      `;
                    }).join("")
                }
              </div>
            `).join("")}
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderMonthCalendar() {
  const currentInstrument = getCurrentInstrument();
  const monthlyGrid = getMonthlyGrid();

  const selectedDateBookings = state.bookings
    .filter((booking) => booking.instrumentId === state.selectedInstrument && booking.date === state.date)
    .sort((a, b) => parseRange(a.slot)[0] - parseRange(b.slot)[0]);

  els.calendarContainer.innerHTML = `
    <div class="month-layout">
      <div class="month-wrap">
        <div class="month-grid">
          <div class="month-header">
            ${calendarWeekHeaders.map((item) => `<div class="month-header-cell">${item}</div>`).join("")}
          </div>

          <div class="month-body">
            ${monthlyGrid.map((cell) => `
              <button
                class="month-cell ${!cell.isCurrentMonth ? "other-month" : ""} ${cell.isSelectedDate ? "selected" : ""}"
                data-date="${cell.key}"
              >
                <div class="month-cell-top">
                  <div class="month-day">${cell.label}</div>
                  ${cell.items.length > 0 ? `<div class="month-count">${cell.items.length}</div>` : ""}
                </div>

                <div class="month-booking-list">
                  ${
                    cell.items.length === 0
                      ? `<div class="month-empty"></div>`
                      : cell.items.slice(0, 3).map((booking) => {
                          const color = getUserColorClasses(booking.user);
                          return `
                            <div class="month-mini-card ${color.card}">
                              <div><strong>${booking.slot}</strong></div>
                              <div>${booking.user}</div>
                            </div>
                          `;
                        }).join("")
                  }
                  ${cell.items.length > 3 ? `<div class="month-more">另有 ${cell.items.length - 3} 条预约</div>` : ""}
                </div>
              </button>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="detail-panel">
        <h3 class="detail-title">${currentInstrument ? currentInstrument.name : ""} · ${state.date} 详细预约</h3>
        ${
          selectedDateBookings.length === 0
            ? `<div class="empty-text">当日暂无预约记录。</div>`
            : selectedDateBookings.map(createBookingCard).join("")
        }
      </div>
    </div>
  `;

  els.calendarContainer.querySelectorAll(".month-cell").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.date = btn.dataset.date;
      render();
    });
  });

  const detailPanel = els.calendarContainer.querySelector(".detail-panel");
  if (detailPanel) {
    bindCancelButtons(detailPanel);
  }
}

function renderCalendar() {
  els.calendarTitle.textContent = state.calendarView === "week" ? "当周仪器预约情况" : "当月仪器预约情况";
  els.weekBtn.className = cn("btn", state.calendarView === "week" ? "btn-primary" : "btn-secondary");
  els.monthBtn.className = cn("btn", state.calendarView === "month" ? "btn-primary" : "btn-secondary");

  if (state.calendarView === "week") {
    renderWeekCalendar();
  } else {
    renderMonthCalendar();
  }
}

function renderForm() {
  els.searchInput.value = state.query;
  els.categorySelect.value = state.category;
  els.userInput.value = state.user;
  els.dateInput.value = state.date;
  els.startTimeInput.value = state.startTime;
  els.endTimeInput.value = state.endTime;
  els.purposeInput.value = state.purpose;
}

function handleReserve() {
  const currentInstrument = getCurrentInstrument();

  if (!currentInstrument || !state.user.trim() || !state.purpose.trim()) {
    state.message = "请先填写完整的预约人和用途信息。";
    renderMessage();
    return;
  }

  if (getInvalidTimeRange()) {
    state.message = "预约失败：请输入正确的 24 小时制时间，且结束时间需晚于开始时间。支持 24:00 作为结束时间。";
    renderMessage();
    renderStatusBox();
    return;
  }

  const conflict = getConflict();
  if (conflict) {
    state.message = `预约失败：当前时间段与 ${conflict.user} 的 ${conflict.slot} 冲突。`;
    renderMessage();
    renderStatusBox();
    return;
  }

  state.bookings.push({
    id: Date.now(),
    instrumentId: state.selectedInstrument,
    user: state.user.trim(),
    date: state.date,
    slot: getSlot(),
    purpose: state.purpose.trim()
  });

  state.message = "预约成功，当前时间段已为你锁定。";
  render();
}

function bindEvents() {
  els.searchInput.addEventListener("input", (e) => {
    state.query = e.target.value;
    renderInstrumentList();
  });

  els.categorySelect.addEventListener("change", (e) => {
    state.category = e.target.value;
    renderInstrumentList();
  });

  els.userInput.addEventListener("input", (e) => {
    state.user = e.target.value;
  });

  els.dateInput.addEventListener("change", (e) => {
    state.date = e.target.value;
    render();
  });

  els.startTimeInput.addEventListener("input", (e) => {
    state.startTime = e.target.value.trim();
    renderStatusBox();
  });

  els.endTimeInput.addEventListener("input", (e) => {
    state.endTime = e.target.value.trim();
    renderStatusBox();
  });

  els.purposeInput.addEventListener("input", (e) => {
    state.purpose = e.target.value;
  });

  els.reserveBtn.addEventListener("click", handleReserve);

  els.toggleScheduleBtn.addEventListener("click", () => {
    state.showDaySchedule = !state.showDaySchedule;
    renderDayScheduleVisibility();
  });

  els.weekBtn.addEventListener("click", () => {
    state.calendarView = "week";
    renderCalendar();
  });

  els.monthBtn.addEventListener("click", () => {
    state.calendarView = "month";
    renderCalendar();
  });
}

function render() {
  renderForm();
  renderInstrumentList();
  renderInstrumentInfo();
  renderStatusBox();
  renderDayBookings();
  renderDayScheduleVisibility();
  renderMessage();
  renderCalendar();
}

function init() {
  runSelfTests();
  renderCategories();
  bindEvents();
  render();
}

init();
