// ============================================
// THEME TOGGLE
// ============================================
const themeBtn = document.getElementById('themeBtn');
const navToggle = document.getElementById('navToggle');
const navbar = document.getElementById('navbar');
const topbar = document.getElementById('topbar');

// Load theme preference
const preferredTheme = localStorage.getItem('theme');
if (preferredTheme) {
  document.documentElement.setAttribute('data-theme', preferredTheme);
  themeBtn.textContent = preferredTheme === 'dark' ? 'Mode Terang' : 'Mode Gelap';
}

// Toggle theme
themeBtn.addEventListener('click', () => {
  const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
  themeBtn.textContent = nextTheme === 'dark' ? 'Mode Terang' : 'Mode Gelap';
});

// ============================================
// MOBILE NAVIGATION
// ============================================
navToggle.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

const navLinks = document.querySelectorAll('.nav a:not(.theme-btn)');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('open');
  });
});

// ============================================
// PROJECT FILTERING
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Filter projects
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        // Trigger animation
        setTimeout(() => {
          card.style.animation = 'none';
          setTimeout(() => {
            card.style.animation = '';
          }, 10);
        }, 10);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

const validateEmail = (email) => {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
};

const clearError = (input, errorElement) => {
  input.classList.remove('error');
  errorElement.textContent = '';
};

const showError = (input, errorElement, message) => {
  input.classList.add('error');
  errorElement.textContent = message;
};

const validateForm = () => {
  let isValid = true;

  // Validate name
  if (nameInput.value.trim().length < 3) {
    showError(nameInput, document.getElementById('nameError'), 'Nama harus minimal 3 karakter');
    isValid = false;
  } else {
    clearError(nameInput, document.getElementById('nameError'));
  }

  // Validate email
  if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, document.getElementById('emailError'), 'Format email tidak valid');
    isValid = false;
  } else {
    clearError(emailInput, document.getElementById('emailError'));
  }

  // Validate subject
  if (subjectInput.value.trim().length < 5) {
    showError(subjectInput, document.getElementById('subjectError'), 'Subjek harus minimal 5 karakter');
    isValid = false;
  } else {
    clearError(subjectInput, document.getElementById('subjectError'));
  }

  // Validate message
  if (messageInput.value.trim().length < 10) {
    showError(messageInput, document.getElementById('messageError'), 'Pesan harus minimal 10 karakter');
    isValid = false;
  } else {
    clearError(messageInput, document.getElementById('messageError'));
  }

  return isValid;
};

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (validateForm()) {
    // Show success message
    const successMsg = document.getElementById('formSuccess');
    successMsg.textContent = '✓ Pesan berhasil dikirim! Terima kasih telah menghubungi saya.';
    
    // Reset form
    contactForm.reset();
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      successMsg.textContent = '';
    }, 5000);
  }
});

// Clear errors on input
[nameInput, emailInput, subjectInput, messageInput].forEach(input => {
  input.addEventListener('input', () => {
    if (input.classList.contains('error')) {
      const errorId = input.id + 'Error';
      clearError(input, document.getElementById(errorId));
    }
  });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section, .project-card, .tech-item, .testimonial-card, .stat-card').forEach(el => {
  observer.observe(el);
});

// ============================================
// STATS COUNTER ANIMATION
// ============================================
const countUpAnimation = (element, target, duration = 2000) => {
  const start = 0;
  const startTime = Date.now();
  
  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(start + (target - start) * progress);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  animate();
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statCards = entry.target.querySelectorAll('.stat-card');
      statCards.forEach(card => {
        const target = parseInt(card.getAttribute('data-count'));
        const numberElement = card.querySelector('.stat-number');
        countUpAnimation(numberElement, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ============================================
// STICKY HEADER ON SCROLL
// ============================================
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 50) {
    topbar.classList.add('scrolled');
  } else {
    topbar.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop;
});

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offsetTop = target.offsetTop - 80;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
  document.body.style.animation = 'fadeIn 0.5s ease';
});
