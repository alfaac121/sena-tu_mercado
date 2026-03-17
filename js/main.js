// Scroll animations via IntersectionObserver
const fadeEls = document.querySelectorAll('.fade-in');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => observer.observe(el));
} else {
  fadeEls.forEach(el => el.classList.add('visible'));
}

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// Team member floating card
const memberCards = document.querySelectorAll('.member-card-link[data-member]');
const memberModal = document.getElementById('memberModal');
const memberModalClose = document.getElementById('memberModalClose');
const memberModalTitle = document.getElementById('memberModalTitle');
const memberModalRole = document.getElementById('memberModalRole');
const memberModalText = document.getElementById('memberModalText');

const memberInfo = {
  freddy: {
    title: 'Freddy Reyes',
    role: 'Desarrollo Web',
    text: 'Encargado del desarrollo web de TMS: estructura de vistas, experiencia de navegación y ajustes visuales de la landing.'
  },
  brahian: {
    title: 'Brahian Alexandre',
    role: 'API / Backend',
    text: 'Responsable de la capa de servicios y backend: endpoints, lógica del sistema e integración con base de datos.'
  },
  juan: {
    title: 'Juan Rondon',
    role: 'Líder Móvil Android',
    text: 'Lidera el módulo móvil: implementación Android, pruebas de app y coordinación de funcionalidades del entorno móvil.'
  },
  omar: {
    title: 'Omar Jordan',
    role: 'Desktop / Godot',
    text: 'Encargado del entorno de escritorio y del prototipo en Godot, además de la integración entre plataformas.'
  },
  valeri: {
    title: 'Valeri',
    role: 'UI/UX y Diseño',
    text: 'Responsable de experiencia de usuario y diseño visual: mockups, consistencia de interfaz y componentes.'
  },
  heidy: {
    title: 'Heidy Calderon',
    role: 'Líder de Documentación',
    text: 'Organiza la documentación del proyecto, evidencias, entregables en PDF y material de soporte del sistema TMS.'
  }
};

function openMemberModal(key) {
  if (!memberModal || !memberModalTitle || !memberModalRole || !memberModalText || !memberInfo[key]) return;
  const info = memberInfo[key];
  memberModalTitle.textContent = info.title;
  memberModalRole.textContent = info.role;
  memberModalText.textContent = info.text;
  memberModal.classList.add('open');
  memberModal.setAttribute('aria-hidden', 'false');
}

function closeMemberModal() {
  if (!memberModal) return;
  memberModal.classList.remove('open');
  memberModal.setAttribute('aria-hidden', 'true');
}

memberCards.forEach(card => {
  card.addEventListener('click', () => {
    const key = card.getAttribute('data-member');
    openMemberModal(key);
  });
});

if (memberModalClose) {
  memberModalClose.addEventListener('click', closeMemberModal);
}

if (memberModal) {
  memberModal.addEventListener('click', (event) => {
    if (event.target === memberModal) closeMemberModal();
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMemberModal();
});
