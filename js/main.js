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
const memberModalMedia = document.getElementById('memberModalMedia');
const memberModalMediaLabel = document.getElementById('memberModalMediaLabel');
const memberModalMediaPlaceholder = document.getElementById('memberModalMediaPlaceholder');
const memberModalTitle = document.getElementById('memberModalTitle');
const memberModalRole = document.getElementById('memberModalRole');
const memberModalBadge = document.getElementById('memberModalBadge');
const memberModalText = document.getElementById('memberModalText');
const memberModalChips = document.getElementById('memberModalChips');
const memberModalCard = memberModal ? memberModal.querySelector('.member-modal-card') : null;

const memberInfo = {
  freddy: {
    title: 'Freddy Reyes',
    role: 'Web',
    badge: 'LIDER',
    text: 'Encargados del desarrollo del sitio web del sistema TMS: estructura de vistas, interaccion dinamica con Ajax, estilos y logica frontend integrada con el backend PHP.',
    chips: ['Ajax', 'HTML', 'PHP', 'JS', 'CSS'],
    avatarText: 'FR',
    palette: {
      accent: '#4d8f29',
      text: '#27461a',
      textSoft: '#3f6c2c',
      chipBg: '#e9f6d5',
      chipText: '#2f5a20'
    }
  },
  brahian: {
    title: 'Brahian Alexander',
    role: 'API / Backend',
    badge: 'LIDER',
    text: 'Responsables de la arquitectura del backend y los servicios REST. Implementan la logica de negocio en Laravel, con base de datos MySQL y despliegue en Hostinger.',
    chips: ['Laravel', 'SQL', 'PHP', 'MySQL', 'Hostinger'],
    avatarText: 'BA',
    palette: {
      accent: '#2f73c6',
      text: '#173355',
      textSoft: '#2b5e97',
      chipBg: '#e7f0ff',
      chipText: '#214f84'
    }
  },
  juan: {
    title: 'Juan Rondón',
    role: 'Móvil',
    badge: 'LIDER',
    text: 'Desarrollan la aplicacion movil multiplataforma con React Native y Expo. Utilizan TypeScript para tipado seguro y TailWind para los estilos del UI.',
    chips: ['React Native', 'Expo', 'TypeScript', 'TailWind'],
    avatarText: 'JR',
    palette: {
      accent: '#6153ce',
      text: '#2f2867',
      textSoft: '#5b50ac',
      chipBg: '#ebe8ff',
      chipText: '#4c43a0'
    }
  },
  omar: {
    title: 'Omar Jordan',
    role: 'Desktop',
    badge: 'SCRUM MASTER',
    text: 'Scrum Master del equipo y desarrollador de la version desktop del sistema, implementada en Python con interfaz grafica PySide6 y procesamiento de imagenes con Pillow.',
    chips: ['Python', 'PySide6', 'Pillow'],
    avatarText: 'OJ',
    palette: {
      accent: '#d28c1f',
      text: '#5a3811',
      textSoft: '#95642e',
      chipBg: '#fcebcf',
      chipText: '#845521'
    }
  },
  jean: {
    title: 'Jean Carlos',
    role: 'Diseño',
    badge: 'LIDER',
    text: 'Equipo creativo responsable de la identidad visual, wireframes, ilustraciones y activos graficos del proyecto, usando herramientas como Figma, Canva y Godot.',
    chips: ['Draw.io', 'Canva', 'Figma', 'IbisPaintX', 'Godot'],
    avatarText: 'JC',
    palette: {
      accent: '#b14672',
      text: '#5f1f3c',
      textSoft: '#93456a',
      chipBg: '#ffe7f2',
      chipText: '#8e355f'
    }
  },
  heidy: {
    title: 'Heidy Calderón',
    role: 'Documentación',
    badge: 'LIDER',
    text: 'Encargada de la documentacion oficial del proyecto: diagramas UML, cumplimiento de norma ISO-25010, control de versiones en GitHub, minutas de reunion y formularios de seguimiento.',
    chips: ['UML', 'ISO-25010', 'GitHub', 'MR', 'Word', 'Forms'],
    avatarText: 'HC',
    palette: {
      accent: '#2f9f8f',
      text: '#18413a',
      textSoft: '#2c6e64',
      chipBg: '#dff6ef',
      chipText: '#1f655b'
    }
  }
};

let activeMemberCard = null;

function openMemberModal(key) {
  if (!memberModal || !memberModalTitle || !memberModalRole || !memberModalText || !memberInfo[key]) return;
  const info = memberInfo[key];

  if (activeMemberCard) activeMemberCard.classList.remove('is-active');
  activeMemberCard = document.querySelector(`.member-card-link[data-member="${key}"]`);
  if (activeMemberCard) activeMemberCard.classList.add('is-active');

  memberModalTitle.textContent = info.title;
  memberModalRole.textContent = info.role;
  if (memberModalBadge) {
    memberModalBadge.textContent = info.badge || '';
    memberModalBadge.style.display = info.badge ? 'inline-flex' : 'none';
  }
  memberModalText.textContent = info.text;
  if (memberModalChips) {
    if (Array.isArray(info.chips) && info.chips.length > 0) {
      memberModalChips.innerHTML = info.chips.map((chip) => `<span class="member-modal-chip">${chip}</span>`).join('');
      memberModalChips.style.display = 'flex';
    } else {
      memberModalChips.innerHTML = '';
      memberModalChips.style.display = 'none';
    }
  }
  if (memberModalMediaLabel) memberModalMediaLabel.textContent = info.role;
  if (memberModalMedia) {
    if (info.avatar) {
      memberModalMedia.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.45)), url('${info.avatar}')`;
      if (memberModalMediaPlaceholder) memberModalMediaPlaceholder.textContent = '';
    } else {
      memberModalMedia.style.backgroundImage = `linear-gradient(165deg, color-mix(in srgb, ${info.palette.accent} 38%, #ffffff 62%), #1f2432)`;
      if (memberModalMediaPlaceholder) memberModalMediaPlaceholder.textContent = info.avatarText || '';
    }
  }
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
