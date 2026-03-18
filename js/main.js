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
const memberModalText = document.getElementById('memberModalText');
const memberModalCard = memberModal ? memberModal.querySelector('.member-modal-card') : null;

const memberInfo = {
  freddy: {
    title: 'Freddy Reyes',
    role: 'Desarrollo Web',
    text: 'Soy desarrollador web especializado en el diseno y desarrollo de interfaces dinamicas. Utilizo tecnologias modernas para crear paginas rapidas, seguras y visualmente atractivas. Me enfoco en la usabilidad, la optimizacion y el detalle visual, asegurando una navegacion intuitiva. Trabajo con una mentalidad orientada a resultados, creando soluciones eficientes y adaptables.',
    avatarText: 'FR',
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
    text: 'Responsable del backend y la arquitectura de servicios: desarrollo de APIs, implementacion de logica del negocio e integracion con bases de datos. Enfocado en rendimiento, seguridad y escalabilidad para garantizar sistemas solidos y eficientes.',
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
    text: 'Soy desarrollador movil especializado en la creacion de aplicaciones modernas utilizando React Native, NativeWind, Tailwind CSS y Expo. Me enfoco en construir interfaces limpias, rapidas y funcionales, combinando buen diseno con rendimiento solido. Trabajo con una mentalidad practica, orientada a resultados, desarrollando soluciones escalables que realmente aportan valor al usuario.',
    avatarText: 'JR',
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
    text: 'Encargado del desarrollo del entorno de escritorio y la implementacion del prototipo funcional en Godot Engine. Lidera la construccion de la capa de presentacion para plataformas de escritorio, asegurando la integracion fluida con los demas modulos del sistema. Ademas, gestiona la compatibilidad entre plataformas, garantizando un comportamiento consistente y estable en los diferentes entornos de ejecucion.',
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
    text: 'Responsable del diseno de experiencia de usuario e interfaz visual del proyecto. Su trabajo abarca desde la conceptualizacion de la arquitectura de informacion hasta la creacion de wireframes, mockups de alta fidelidad y prototipos interactivos mediante Figma. Garantiza que cada pantalla cumpla con principios de usabilidad, accesibilidad y coherencia visual, asegurando una experiencia intuitiva y atractiva para el usuario final.',
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
    text: 'Responsable de la gestion integral de la documentacion tecnica y operativa del proyecto. Coordina la elaboracion de evidencias de avance, la generacion de entregables formales en formato PDF y la administracion del material de soporte del sistema TMS. Su rol como lider implica velar por la trazabilidad del proyecto, mantener los registros actualizados y asegurar que toda la informacion este organizada y disponible para los distintos miembros del equipo.',
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
  if (!memberModal || !memberModalTitle || !memberModalRole || !memberModalText || !memberInfo[key]) return;
  const info = memberInfo[key];

  if (activeMemberCard) activeMemberCard.classList.remove('is-active');
  activeMemberCard = document.querySelector(`.member-card-link[data-member="${key}"]`);
  if (activeMemberCard) activeMemberCard.classList.add('is-active');

  memberModalTitle.textContent = info.title;
  memberModalRole.textContent = info.role;
  memberModalText.textContent = info.text;
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
