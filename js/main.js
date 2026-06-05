

document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  const handleNavbarScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.classList.add('navbar-hidden');
    } else {
      navbar.classList.remove('navbar-hidden');
    }
    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .footer-nav a');

  const highlightNavLink = () => {
    const scrollPos = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink, { passive: true });
  highlightNavLink();
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPos = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth',
        });
        closeMobileMenu();
      }
    });
  });
  const menuBtn = document.getElementById('navMenuBtn');
  const navLinksEl = document.getElementById('navLinks');

  const closeMobileMenu = () => {
    menuBtn.classList.remove('active');
    navLinksEl.classList.remove('mobile-open');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.classList.contains('active');

    if (isOpen) {
      closeMobileMenu();
    } else {
      menuBtn.classList.add('active');
      navLinksEl.classList.add('mobile-open');
      document.body.style.overflow = 'hidden';
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  let autoSlideInterval;

  const showSlide = (index) => {
    slides.forEach((slide) => {
      slide.style.display = 'none';
      slide.classList.remove('active');
    });
    dots.forEach((dot) => dot.classList.remove('active'));

    slides[index].style.display = 'block';
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  };
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-dot'), 10);
      showSlide(slideIndex);
      resetAutoSlide();
    });
  });
  const startAutoSlide = () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  };

  if (slides.length > 1) {
    startAutoSlide();
  }
  const statNumbers = document.querySelectorAll('.stat-number');
  let statAnimated = false;

  const animateCounters = () => {
    if (statAnimated) return;

    statNumbers.forEach((stat) => {
      const text = stat.textContent;
      const match = text.match(/(\d+)/);
      if (!match) return;

      const target = parseInt(match[1], 10);
      const suffix = text.replace(match[1], '');
      let current = 0;
      const increment = target / 40;
      const duration = 1500;
      const stepTime = duration / 40;

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target + suffix;
          clearInterval(counter);
        } else {
          stat.textContent = Math.floor(current) + suffix;
        }
      }, stepTime);
    });

    statAnimated = true;
  };
  const statsSection = document.querySelector('.about-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    statsObserver.observe(statsSection);
  }
  const heroHeading = document.querySelector('.hero-heading');

  if (heroHeading) {
    window.addEventListener(
      'scroll',
      () => {
        const scrolled = window.scrollY;
        if (scrolled < 600) {
          const opacity = 1 - scrolled / 600;
          const translateY = scrolled * 0.3;
          heroHeading.style.opacity = Math.max(opacity, 0);
          heroHeading.style.transform = `translateY(${translateY}px)`;
        }
      },
      { passive: true }
    );
  }
});
