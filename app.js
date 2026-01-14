// Демо-данные (можно заменить на API)
const vacancies = [
  {
    id: 1,
    type: "vacancy",
    company: "OceanLine",
    rank: "AB",
    vessel: "Bulk Carrier",
    urgency: "ASAP",
    contact: "crew@oceanline.com",
    description: "Нужен матрос AB на Bulk Carrier. Опыт 12+ месяцев, документы в порядке.",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    type: "vacancy",
    company: "BlueTankers",
    rank: "Chief Engineer",
    vessel: "Tanker",
    urgency: "7 days",
    contact: "+40 123 456 789",
    description: "Старший механик на танкер. Ротация 3/3, конкурентная зарплата.",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    type: "vacancy",
    company: "PortOffshore",
    rank: "Second Officer",
    vessel: "Offshore",
    urgency: "ASAP",
    contact: "@port_offshore_hr",
    description: "Второй помощник на офшор. Требуется DP Basic.",
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    type: "vacancy",
    company: "SeaPass",
    rank: "Cook",
    vessel: "Passenger",
    urgency: "14 days",
    contact: "jobs@seapass.com",
    description: "Повар на пассажирское судно. Опыт на лайнерах приветствуется.",
    createdAt: new Date().toISOString()
  }
];

// Простая «авторизация» через localStorage (демо)
const auth = {
  getUser() {
    const raw = localStorage.getItem("sj_user");
    return raw ? JSON.parse(raw) : null;
  },
  login(email, password) {
    const users = JSON.parse(localStorage.getItem("sj_users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem("sj_user", JSON.stringify({ email: found.email, role: found.role }));
      return true;
    }
    return false;
  },
  register(email, password, role) {
    const users = JSON.parse(localStorage.getItem("sj_users") || "[]");
    if (users.some(u => u.email === email)) return false;
    users.push({ email, password, role });
    localStorage.setItem("sj_users", JSON.stringify(users));
    localStorage.setItem("sj_user", JSON.stringify({ email, role }));
    return true;
  },
  logout() {
    localStorage.removeItem("sj_user");
  }
};

const state = {
  search: "",
  rank: "",
  vessel: "",
  urgency: ""
};

function renderVacancies(list) {
  const container = document.getElementById("vacanciesList");
  if (!list.length) {
    container.innerHTML = `<div class="card"><div class="desc">Ничего не найдено. Попробуйте изменить фильтры.</div></div>`;
    return;
  }
  container.innerHTML = list.map(item => `
    <article class="card">
      <div class="card__top">
        <h3>${escapeHtml(item.rank)} — ${escapeHtml(item.company)}</h3>
        <span class="badge ${item.urgency === 'ASAP' ? 'badge--urgent' : ''}">${escapeHtml(item.urgency)}</span>
      </div>
      <div class="meta">Судно: ${escapeHtml(item.vessel)} • Тип: ${item.type === 'vacancy' ? 'Вакансия' : 'Запрос'}</div>
      <div class="desc">${escapeHtml(item.description)}</div>
      <div class="contact">Контакты: ${escapeHtml(item.contact)}</div>
    </article>
  `).join("");
}

function applyFilters() {
  const filtered = vacancies.filter(v => {
    const matchesSearch =
      !state.search ||
      [v.rank, v.company, v.vessel, v.description].some(field =>
        field.toLowerCase().includes(state.search.toLowerCase())
      );
    const matchesRank = !state.rank || v.rank === state.rank;
    const matchesVessel = !state.vessel || v.vessel === state.vessel;
    const matchesUrgency = !state.urgency || v.urgency === state.urgency;
    return matchesSearch && matchesRank && matchesVessel && matchesUrgency;
  });
  renderVacancies(filtered);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function bindFilters() {
  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.search = e.target.value.trim();
    applyFilters();
  });
  document.getElementById("rankSelect").addEventListener("change", (e) => {
    state.rank = e.target.value;
    applyFilters();
  });
  document.getElementById("vesselSelect").addEventListener("change", (e) => {
    state.vessel = e.target.value;
    applyFilters();
  });
  document.getElementById("urgencySelect").addEventListener("change", (e) => {
    state.urgency = e.target.value;
    applyFilters();
  });
  document.getElementById("resetFilters").addEventListener("click", () => {
    state.search = "";
    state.rank = "";
    state.vessel = "";
    state.urgency = "";
    document.getElementById("searchInput").value = "";
    document.getElementById("rankSelect").value = "";
    document.getElementById("vesselSelect").value = "";
    document.getElementById("urgencySelect").value = "";
    applyFilters();
  });
}

function toggleModal(id, show) {
  const el = document.getElementById(id);
  el.classList.toggle("hidden", !show);
}

function bindAuthUI() {
  const loginBtn = document.getElementById("openLogin");
  const registerBtn = document.getElementById("openRegister");
  const logoutBtn = document.getElementById("logoutBtn");
  const addOfferBtn = document.getElementById("openAddOffer");

  loginBtn.addEventListener("click", () => toggleModal("loginModal", true));
  registerBtn.addEventListener("click", () => toggleModal("registerModal", true));
  logoutBtn.addEventListener("click", () => {
    auth.logout();
    updateAuthState();
  });

  // Закрытие модалок по кнопке data-close
  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".modal").forEach(m => m.classList.add("hidden"));
    });
  });

  // Вход
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;
    const ok = auth.login(email, password);
    if (!ok) {
      alert("Неверный email или пароль.");
      return;
    }
    toggleModal("loginModal", false);
    updateAuthState();
  });

  // Регистрация
  document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;
    const role = form.role.value;
    if (password.length < 6) {
      alert("Пароль должен быть не менее 6 символов.");
      return;
    }
    const ok = auth.register(email, password, role);
    if (!ok) {
      alert("Пользователь с таким email уже существует.");
      return;
    }
    toggleModal("registerModal", false);
    updateAuthState();
  });

  // Добавить предложение — только для авторизованных
  addOfferBtn.addEventListener("click", () => {
    const user = auth.getUser();
    if (!user) {
      alert("Чтобы оставить предложение, войдите или зарегистрируйтесь.");
      toggleModal("loginModal", true);
      return;
    }
    toggleModal("addOfferModal", true);
  });

  // Сабмит предложения
  document.getElementById("addOfferForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const user = auth.getUser();
    if (!user) {
      alert("Требуется вход.");
      return;
    }
    const payload = {
      id: Date.now(),
      type: form.type.value,
      company: form.company.value.trim(),
      rank: form.rank.value.trim(),
      vessel: form.vessel.value.trim(),
      urgency: form.urgency.value,
      contact: form.contact.value.trim(),
      description: form.description.value.trim(),
      createdAt: new Date().toISOString(),
      author: user.email
    };
    // В демо добавляем в локальный массив (в реале — отправка на сервер)
    vacancies.unshift(payload);
    toggleModal("addOfferModal", false);
    form.reset();
    applyFilters();
    alert("Предложение опубликовано.");
  });
}

function updateAuthState() {
  const user = auth.getUser();
  const loginBtn = document.getElementById("openLogin");
  const registerBtn = document.getElementById("openRegister");
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    loginBtn.classList.add("hidden");
    registerBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
  } else {
    loginBtn.classList.remove("hidden");
    registerBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
  }
}

// Закрытие модалок по клику вне контента
document.addEventListener("click", (e) => {
  const modal = e.target.closest(".modal");
  if (modal && !e.target.closest(".modal__content")) {
    modal.classList.add("hidden");
  }
});

function init() {
  bindFilters();
  bindAuthUI();
  updateAuthState();
  applyFilters();
}

document.addEventListener("DOMContentLoaded", init);
