import { renderHome } from './pages/home.js';
import { renderProjects, initProjectsPage } from './pages/projects.js';
import { renderCertificates,initCertificatesPage } from './pages/certificates.js';
import { renderExperience } from './pages/experience.js';

import { initTheme } from './theme.js';

const app = document.getElementById('app');

const routes = {
  '/': { render: renderHome },
  '/projects': { render: renderProjects, init: initProjectsPage },
  '/certificates': { render: renderCertificates, init: initCertificatesPage },
  '/experience': { render: renderExperience },
};

function getRoute() {
  const hash = window.location.hash.slice(1) || '/';
  return hash;
}

function updateActiveLink(path) {
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${path}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

async function router() {
  const path = getRoute();
  const route = routes[path] || routes['/'];

  app.innerHTML = '';
  app.classList.remove('page-enter');
  void app.offsetWidth;

  const content = await route.render();
  app.innerHTML = content;
  app.classList.add('page-enter');

  if (route.init) {
    route.init();
  }

  updateActiveLink(path);
  observeFadeElements();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function observeFadeElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link')) {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  }
});

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

initTheme();
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
