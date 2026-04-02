document.addEventListener('DOMContentLoaded', () => {
// --- 1. УМНЫЙ СЛАЙДЕР С ПРЕДЗАГРУЗКОЙ ---
  const heroImg = document.querySelector('.hero-slide img');
  const slides = ['images/hero1.webp', 'images/hero2.webp', 'images/hero3.webp'];
  let currentSlide = 0;

  if (heroImg) {
    // Предзагрузка: заставляем браузер скачать все картинки заранее
    slides.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    setInterval(() => {
      // 1. Сначала плавно скрываем старую картинку
      heroImg.style.opacity = 0;

      setTimeout(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        
        // 2. Меняем путь, когда картинка невидима
        heroImg.src = slides[currentSlide];

        // 3. Ждем крошечную долю секунды и проявляем
        heroImg.onload = () => {
          heroImg.style.opacity = 1;
        };
        
        // Резервный запуск (если onload не сработал или картинка в кэше)
        setTimeout(() => { heroImg.style.opacity = 1; }, 50);
        
      }, 500); // Половина секунды на исчезновение
    }, 5000); // Менять каждые 5 секунд
  }

  // 2. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ (Для секций и элементов)
  const revealElements = document.querySelectorAll('section, .reveal-element');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  }, { threshold: 0.2 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. ЗВЕЗДЫ В ИНТРО (Секция .intro-stars)
  const introStarsContainer = document.querySelector('.intro-stars');
  if (introStarsContainer) {
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.style.position = 'absolute';
      star.style.width = star.style.height = `${Math.random() * 3 + 1}px`;
      star.style.background = 'white';
      star.style.borderRadius = '50%';
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.opacity = Math.random();
      star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite alternate`;
      introStarsContainer.appendChild(star);
    }
  }

  // 4. КНОПКА "ENTER" (Скрытие интро-экрана)
  const enterBtn = document.getElementById('enter-btn');
  const introOverlay = document.getElementById('intro');
  if (enterBtn && introOverlay) {
    enterBtn.addEventListener('click', () => {
      introOverlay.style.transition = 'opacity 0.8s';
      introOverlay.style.opacity = 0;
      setTimeout(() => {
        introOverlay.style.display = 'none';
      }, 800);
    });
  }

  // 5. ГАЛЕРЕЯ (Увеличение картинок при клике)
  const gallery = document.querySelector('.gallery-scroll');
  if (gallery) {
    gallery.addEventListener('click', e => {
      if (e.target.tagName === 'IMG') {
        const overlay = document.createElement('div');
        overlay.style = `
          position:fixed; top:0; left:0; width:100%; height:100%;
          background:rgba(0,0,0,0.9); display:flex; align-items:center;
          justify-content:center; z-index:9999; cursor:pointer;
        `;
        const img = document.createElement('img');
        img.src = e.target.src;
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        overlay.appendChild(img);
        overlay.onclick = () => overlay.remove();
        document.body.appendChild(overlay);
      }
    });
  }

  // 6. ЧАСТИЦЫ (Particles)
  const particlesContainer = document.querySelector('.particles-container');
  if (particlesContainer) {
    for (let i = 0; i < 100; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.style.left = Math.random() * window.innerWidth + 'px';
      p.style.top = Math.random() * window.innerHeight + 'px';
      p.style.animationDuration = (5 + Math.random() * 5) + 's';
      particlesContainer.appendChild(p);
    }
  }

  // 7. ВТОРОЕ ЗВЕЗДНОЕ ПОЛЕ (Starfield)
  const starfield = document.querySelector('.starfield');
  if (starfield) {
    for (let i = 0; i < 100; i++) {
      const s = document.createElement('div');
      s.classList.add('star');
      s.style.left = Math.random() * window.innerWidth + 'px';
      s.style.top = Math.random() * window.innerHeight + 'px';
      const size = 1 + Math.random() * 3;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.animationDuration = (1 + Math.random() * 3) + 's';
      starfield.appendChild(s);
    }
  }

  // 8. ДОБАВЛЕНИЕ СТИЛЕЙ ДЛЯ АНИМАЦИИ (Twinkle)
  if (!document.getElementById('twinkle-style')) {
    const style = document.createElement('style');
    style.id = 'twinkle-style';
    style.innerHTML = `
      @keyframes twinkle {
        0% { transform: scale(0.5); opacity: 0.3; }
        100% { transform: scale(1.2); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

});
