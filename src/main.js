document.addEventListener('DOMContentLoaded', () => {
  // 1. Инициализация иконок Lucide
  lucide.createIcons();

  // 2. Логика Хедера (Sticky + Mobile Menu)
  const header = document.querySelector('#header');
  const burger = document.querySelector('#burger');
  const nav = document.querySelector('#nav');

  window.addEventListener('scroll', () => {
      header.classList.toggle('header--scrolled', window.scrollY > 50);
  });

  burger.addEventListener('click', () => {
      nav.classList.toggle('nav--active');
      document.body.style.overflow = nav.classList.contains('nav--active') ? 'hidden' : '';
  });

  document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
          nav.classList.remove('nav--active');
          document.body.style.overflow = '';
      });
  });

  // 3. GSAP Анимации (Hero & Reveals)
  gsap.registerPlugin(ScrollTrigger);

  // Split Text для Hero
  const heroTitle = new SplitType('#hero-title', { types: 'words,chars' });
  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  heroTl.from(heroTitle.chars, { y: 100, opacity: 0, duration: 1, stagger: 0.02 })
        .from('.hero__subtitle', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.hero__actions', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.visual-card', { scale: 0, opacity: 0, duration: 1, stagger: 0.2 }, '-=0.8');

  // Reveal анимация для всех секций
  gsap.utils.toArray('.reveal').forEach((el, i) => {
      gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 40, opacity: 0, duration: 1, delay: i * 0.05, ease: "power3.out"
      });
  });

  // Анимация инноваций (плавающие теги)
  gsap.to('.tech-tag', {
      y: -15, duration: 2, repeat: -1, yoyo: true,
      ease: "power1.inOut", stagger: { each: 0.4, from: "random" }
  });

  // 4. Форма контактов (Валидация + AJAX)
  const contactForm = document.getElementById('contactForm');
  const phoneInput = document.getElementById('phone');
  const captchaLabel = document.getElementById('captcha-label');
  const submitBtn = document.getElementById('submitBtn');

  // Валидация телефона
  phoneInput?.addEventListener('input', (e) => e.target.value = e.target.value.replace(/\D/g, ''));

  // Капча
  let n1 = Math.floor(Math.random() * 10), n2 = Math.floor(Math.random() * 10);
  let correctSum = n1 + n2;
  if(captchaLabel) captchaLabel.textContent = `Сколько будет ${n1} + ${n2}?`;

  contactForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const userAns = parseInt(document.getElementById('captcha-input').value);

      if (userAns !== correctSum) {
          alert('Ошибка в капче!');
          return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Отправка...';

      setTimeout(() => {
          contactForm.reset();
          submitBtn.style.display = 'none';
          document.getElementById('formSuccess').style.display = 'flex';
          lucide.createIcons();
      }, 1500);
  });

  // 5. Cookie Popup
  const cookiePopup = document.getElementById('cookiePopup');
  const acceptBtn = document.getElementById('acceptCookies');

  if (!localStorage.getItem('jentraCookieAccepted')) {
      setTimeout(() => {
          cookiePopup.classList.add('cookie-popup--active');
      }, 2000);
  }

  acceptBtn?.addEventListener('click', () => {
      localStorage.setItem('jentraCookieAccepted', 'true');
      cookiePopup.classList.remove('cookie-popup--active');
  });

  // 6. Параллакс эффект для мыши (Hero & Innovations)
  document.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 60;
      const y = (window.innerHeight / 2 - e.pageY) / 60;
      gsap.to('.visual-card--1, .tech-sphere', { x: x, y: y, duration: 1 });
      gsap.to('.visual-card--2', { x: -x, y: -y, duration: 1 });
  });
});