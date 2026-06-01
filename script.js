id="jsscr1"
document.addEventListener("DOMContentLoaded", () => {

  // ===== ЭЛЕМЕНТЫ =====
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const form = document.getElementById("formEl");
  const message = document.getElementById("message");

  // ===== BURGER MENU =====
  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("active");
      document.body.classList.toggle("lock");

      // accessibility
      const expanded = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", !expanded);
    });

    // закрытие по клику вне меню
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove("active");
        document.body.classList.remove("lock");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }


  // ===== SMOOTH SCROLL (data-scroll) =====
  document.querySelectorAll("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.scroll;
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ===== SMOOTH SCROLL (nav links) =====
  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }

      // закрытие меню после клика
      nav.classList.remove("active");
      document.body.classList.remove("lock");
      burger.setAttribute("aria-expanded", "false");
    });
  });


  // ===== ACCORDION =====
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(item => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", () => {

      // закрыть все
      accordionItems.forEach(i => i.classList.remove("active"));

      // открыть текущий
      item.classList.toggle("active");

    });
  });


  // ===== FORM VALIDATION =====
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();

      message.textContent = "";

      // базовая проверка
      if (!name || !email) {
        showMessage("Пожалуйста, заполните все поля", "red");
        return;
      }

      // проверка email
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailValid.test(email)) {
        showMessage("Введите корректный email", "red");
        return;
      }

      // имитация отправки
      showMessage("Отправка...", "#000");

      setTimeout(() => {
        showMessage("Заявка успешно отправлена!", "green");
        form.reset();
      }, 1000);
    });
  }


  // ===== ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ =====
  function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
  }

});

