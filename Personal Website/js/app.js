/* =========================
   SPA Router (hash-based)
   ========================= */
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

const views = $$("[data-view]");
const navLinks = $$("[data-route]");
const burger = $(".burger");
const nav = $("#nav");

function setActiveView(name) {
  // 1) Показуємо потрібну секцію, решту ховаємо
  views.forEach(v => v.classList.toggle("is-active", v.dataset.view === name));

  // 2) Підсвічуємо активний пункт меню
  navLinks.forEach(a => a.classList.toggle("is-active", a.dataset.route === name));

  // 3) Закриваємо мобільне меню після кліку
  nav.classList.remove("is-open");
  if (burger) burger.setAttribute("aria-expanded", "false");
}

function getRouteFromHash() {
  // hash виглядає як #resume, #portfolio і т.д.
  const hash = (location.hash || "#home").replace("#", "").trim();
  const exists = views.some(v => v.dataset.view === hash);
  return exists ? hash : "home";
}

window.addEventListener("hashchange", () => setActiveView(getRouteFromHash()));

// Клік по посиланнях меню: просто змінюємо hash
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    // Дозволяємо нормальну поведінку якоря (#route), але робимо UX чистішим
    const route = link.dataset.route;
    if (!route) return;
    // Встановлюємо hash (це тригерить router)
    location.hash = route;
  });
});

/* =========================
   Burger menu
   ========================= */
if (burger) {
  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });
}

/* =========================
   Footer: year + theme toggle (simple)
   ========================= */
$("#year").textContent = String(new Date().getFullYear());

const themeToggle = $("#themeToggle");
let isDark = true;

themeToggle?.addEventListener("click", () => {
  // Простий перемикач: міняємо CSS variables прямо на root.
  // Пізніше можна зробити красиво: збереження в localStorage і плавні переходи.
  const root = document.documentElement;

  isDark = !isDark;

  if (!isDark) {
    root.style.setProperty("--bg", "#f6f7fb");
    root.style.setProperty("--text", "rgba(15,18,24,.92)");
    root.style.setProperty("--muted", "rgba(15,18,24,.66)");
    root.style.setProperty("--line", "rgba(15,18,24,.12)");
    themeToggle.textContent = "Тема: Light";
  } else {
    root.style.setProperty("--bg", "#0b0f14");
    root.style.setProperty("--text", "rgba(255,255,255,.92)");
    root.style.setProperty("--muted", "rgba(255,255,255,.68)");
    root.style.setProperty("--line", "rgba(255,255,255,.12)");
    themeToggle.textContent = "Тема: Dark";
  }
});

/* =========================
   Contact form (demo)
   ========================= */
const form = $("#contactForm");
const note = $("#formNote");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  // Поки що просто показуємо повідомлення.
  // Далі можна підключити PHP (mail) або Telegram-bot / Formspree.
  note.textContent = "Готово. Форма зараз демо — скажи, куди відправляти (email/telegram), і підключимо.";
});