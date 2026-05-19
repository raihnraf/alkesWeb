document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const header = document.querySelector('header');

  // Header scroll effect
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on load
  }

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      menuIcon.textContent = isOpen ? 'close' : 'menu';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // Close menu on nav link click
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-item, .mobile-menu-cta');
  mobileMenuItems.forEach((item) => {
    item.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      menuIcon.textContent = 'menu';
      document.body.style.overflow = '';
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      menuIcon.textContent = 'menu';
      document.body.style.overflow = '';
      hamburger.focus();
    }
  });

  // Close menu on click outside
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      menuIcon.textContent = 'menu';
      document.body.style.overflow = '';
    }
  });

  // Active state detection
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-item');
  navLinks.forEach((link) => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath) {
      link.classList.add('active');
    }
    // Product pages: activate "Produk" link when on any /products/* page
    if (
      currentPath.startsWith('/products/') &&
      linkHref === '/products/blue-diode-laser.html'
    ) {
      link.classList.add('active');
    }
    // Home page: activate "Beranda" only on exact /
    if (currentPath === '/' && linkHref === '/') {
      link.classList.add('active');
    }
  });
});
