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
const memberModalAvatar = document.getElementById('memberModalAvatar');
const memberModalTitle = document.getElementById('memberModalTitle');
const memberModalRole = document.getElementById('memberModalRole');
const memberModalTags = document.getElementById('memberModalTags');
const memberModalText = document.getElementById('memberModalText');
const memberModalCard = memberModal ? memberModal.querySelector('.member-modal-card') : null;

const memberInfo = {
  freddy: {
    title: 'Freddy Reyes',
    role: 'Desarrollo Web',
    text: 'Encargado del desarrollo web de TMS: estructura de vistas, experiencia de navegacion y ajustes visuales de la landing.',
    tags: ['Frontend', 'Landing'],
    avatar: '/assets/team/freddy-reyes-web.png',
    palette: {
      accent: '#3c73d4',
      text: '#183150',
      textSoft: '#35557a',
      chipBg: '#e6efff',
      chipText: '#27476f'
    }
  },
  brahian: {
    title: 'Brahian Alexandre',
    role: 'API / Backend',
    text: 'Responsable de la capa de servicios y backend: endpoints, logica del sistema e integracion con base de datos.',
    tags: ['Servicios', 'Base de datos'],
    avatarText: 'BA',
    palette: {
      accent: '#2d9868',
      text: '#153326',
      textSoft: '#2f6a4d',
      chipBg: '#dff3e8',
      chipText: '#2d634a'
    }
  },
  juan: {
    title: 'Juan Rondon',
    role: 'Movil Android',
    text: 'Lider movil del modulo Android: implementacion Kotlin, pruebas de app y coordinacion de funcionalidades moviles.',
    tags: ['Kotlin', 'APK', 'Lider movil'],
    avatar: '/assets/team/juan-rondon-lider.png',
    palette: {
      accent: '#7b4ae2',
      text: '#311a4f',
      textSoft: '#68409b',
      chipBg: '#ede2ff',
      chipText: '#58388a'
    }
  },
  omar: {
    title: 'Omar Jordan',
    role: 'Desktop / Godot',
    text: 'Encargado del entorno de escritorio y del prototipo en Godot, junto con integracion entre plataformas.',
    tags: ['Desktop', 'Integracion'],
    avatarText: 'OJ',
    palette: {
      accent: '#4f6e9f',
      text: '#1f2b3f',
      textSoft: '#4d607c',
      chipBg: '#e9edf4',
      chipText: '#445979'
    }
  },
  valeri: {
    title: 'Valeri',
    role: 'UI/UX · Diseno',
    text: 'Responsable de experiencia de usuario y diseno visual: figma, mockups y prototipado de interfaz.',
    tags: ['Figma', 'Mockups', 'Prototipado'],
    avatarText: 'V',
    palette: {
      accent: '#cc5b8f',
      text: '#4b1e35',
      textSoft: '#8a4568',
      chipBg: '#ffe1ef',
      chipText: '#8a3f63'
    }
  },
  heidy: {
    title: 'Heidy Calderon',
    role: 'Documentacion · Lider',
    text: 'Lidera la documentacion del proyecto: evidencias, entregables PDF y gestion del material de soporte de TMS.',
    tags: ['PDF', 'Evidencias', 'Gestion'],
    avatarText: 'HC',
    palette: {
      accent: '#c6812f',
      text: '#4a3218',
      textSoft: '#8b6238',
      chipBg: '#fbe8cf',
      chipText: '#80552c'
    }
  }
};

let activeMemberCard = null;

function openMemberModal(key) {
  if (!memberModal || !memberModalTitle || !memberModalRole || !memberModalText || !memberModalAvatar || !memberModalTags || !memberInfo[key]) return;
  const info = memberInfo[key];

  if (activeMemberCard) activeMemberCard.classList.remove('is-active');
  activeMemberCard = document.querySelector(`.member-card-link[data-member="${key}"]`);
  if (activeMemberCard) activeMemberCard.classList.add('is-active');

  memberModalTitle.textContent = info.title;
  memberModalRole.textContent = info.role;
  memberModalText.textContent = info.text;
  memberModalAvatar.innerHTML = info.avatar
    ? `<img src="${info.avatar}" alt="${info.title}">`
    : `<span>${info.avatarText || ''}</span>`;
  memberModalTags.innerHTML = (info.tags || [])
    .map(tag => `<span class="member-chip">${tag}</span>`)
    .join('');

  if (memberModalCard && info.palette) {
    memberModalCard.style.setProperty('--modal-accent', info.palette.accent);
    memberModalCard.style.setProperty('--modal-text', info.palette.text);
    memberModalCard.style.setProperty('--modal-text-soft', info.palette.textSoft);
    memberModalCard.style.setProperty('--modal-chip-bg', info.palette.chipBg);
    memberModalCard.style.setProperty('--modal-chip-text', info.palette.chipText);
  }

  memberModal.classList.add('open');
  memberModal.setAttribute('aria-hidden', 'false');
}

function closeMemberModal() {
  if (!memberModal) return;
  memberModal.classList.remove('open');
  memberModal.setAttribute('aria-hidden', 'true');
  if (activeMemberCard) activeMemberCard.classList.remove('is-active');
  activeMemberCard = null;
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
