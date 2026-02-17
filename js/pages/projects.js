let projectsData = [];

const SKILL_TAG_COLORS = [
  { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.25)' },
  { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.25)' },
  { color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.1)', border: 'rgba(6, 182, 212, 0.25)' },
  { color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)', border: 'rgba(236, 72, 153, 0.25)' },
  { color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)', border: 'rgba(249, 115, 22, 0.25)' },
  { color: '#14b8a6', bg: 'rgba(20, 184, 166, 0.1)', border: 'rgba(20, 184, 166, 0.25)' },
  { color: '#6366f1', bg: 'rgba(99, 102, 241, 0.1)', border: 'rgba(99, 102, 241, 0.25)' },
  { color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.25)' },
  { color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.1)', border: 'rgba(14, 165, 233, 0.25)' },
  { color: '#d946ef', bg: 'rgba(217, 70, 239, 0.1)', border: 'rgba(217, 70, 239, 0.25)' },
];

const skillColorMap = {};

function getSkillColor(label) {
  if (!skillColorMap[label]) {
    const keys = Object.keys(skillColorMap).length;
    skillColorMap[label] = SKILL_TAG_COLORS[keys % SKILL_TAG_COLORS.length];
  }
  return skillColorMap[label];
}

function getTagHtml(tag) {
  if (tag.type === 'status') {
    const label = tag.label.toLowerCase();
    let cls = 'tag-status-progress';
    if (label.includes('completed') || label.includes('done')) cls = 'tag-status-completed';
    else if (label.includes('review') || label.includes('pending')) cls = 'tag-status-review';
    return '<span class="tag ' + cls + '">' + tag.label + '</span>';
  }
  const c = getSkillColor(tag.label);
  return '<span class="tag" style="color:' + c.color + ';background:' + c.bg + ';border:1px solid ' + c.border + '">' + tag.label + '</span>';
}

function getVisibilityTag(visibility) {
  if (visibility === 'private') {
    return '<span class="tag tag-visibility-private">' +
      '<svg class="visibility-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
      ' Private</span>';
  }
  return '<span class="tag tag-visibility-public">' +
    '<svg class="visibility-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' +
    ' Public</span>';
}

function renderProjectCard(project, index) {
  const tags = project.tags.map(tag => getTagHtml(tag)).join('');
  const visTag = getVisibilityTag(project.visibility || 'public');

  const thumbnailHtml = project.thumbnail
    ? '<div class="project-thumbnail">' +
        '<img src="' + project.thumbnail + '" alt="' + project.name + '" crossorigin="anonymous" onerror="this.parentElement.innerHTML=\'<div class=\\\'project-thumbnail-placeholder\\\'><svg viewBox=\\\'0 0 24 24\\\' fill=\\\'none\\\' stroke=\\\'currentColor\\\' stroke-width=\\\'2\\\' stroke-linecap=\\\'round\\\' stroke-linejoin=\\\'round\\\'><rect x=\\\'3\\\' y=\\\'3\\\' width=\\\'18\\\' height=\\\'18\\\' rx=\\\'2\\\'/><circle cx=\\\'8.5\\\' cy=\\\'8.5\\\' r=\\\'1.5\\\'/><path d=\\\'M21 15l-5-5L5 21\\\'/></svg></div><div class=\\\'project-thumbnail-overlay\\\'><svg viewBox=\\\'0 0 24 24\\\' fill=\\\'none\\\' stroke=\\\'currentColor\\\' stroke-width=\\\'2\\\' stroke-linecap=\\\'round\\\' stroke-linejoin=\\\'round\\\'><circle cx=\\\'11\\\' cy=\\\'11\\\' r=\\\'8\\\'/><path d=\\\'m21 21-4.3-4.3\\\'/></svg><span>View Details</span></div>\'">' +
        '<div class="project-thumbnail-overlay">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' +
          '<span>View Details</span>' +
        '</div>' +
      '</div>'
    : '<div class="project-thumbnail">' +
        '<div class="project-thumbnail-placeholder">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>' +
        '</div>' +
        '<div class="project-thumbnail-overlay">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' +
          '<span>View Details</span>' +
        '</div>' +
      '</div>';

  return '<article class="project-card fade-in" data-project-id="' + project.id + '" data-tags="' + project.tags.map(t => t.label).join(',') + '" data-visibility="' + (project.visibility || 'public') + '">' +
    thumbnailHtml +
    '<div class="project-body">' +
      '<div class="project-header">' +
        '<h3 class="project-name">' + project.name + '</h3>' +
        '<span class="project-icon">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 7 10 10"/><path d="M17 7v10H7"/></svg>' +
        '</span>' +
      '</div>' +
      '<div class="project-client">' + project.client + '</div>' +
      '<div class="project-period">' + project.period + '</div>' +
      '<p class="project-description">' + project.description + '</p>' +
      '<div class="project-tags">' + visTag + tags + '</div>' +
    '</div>' +
  '</article>';
}

function getUniqueSkillTags(projects) {
  const skillTags = new Set();
  projects.forEach(p => {
    p.tags.forEach(t => {
      if (t.type === 'skill') skillTags.add(t.label);
    });
  });
  return [...skillTags].sort();
}

function getUniqueStatusTags(projects) {
  const statusTags = new Set();
  projects.forEach(p => {
    p.tags.forEach(t => {
      if (t.type === 'status') statusTags.add(t.label);
    });
  });
  return [...statusTags];
}

function renderFilterBar(projects) {
  const statuses = getUniqueStatusTags(projects);
  const skills = getUniqueSkillTags(projects);

  const allChip = '<button class="filter-chip active" data-filter="all">All</button>';
  const publicChip = '<button class="filter-chip" data-filter="public" data-filter-type="visibility">Public</button>';
  const privateChip = '<button class="filter-chip" data-filter="private" data-filter-type="visibility">Private</button>';

  const statusChips = statuses.map(s =>
    '<button class="filter-chip" data-filter="' + s + '" data-filter-type="status">' + s + '</button>'
  ).join('');

  const skillOptions = skills.map(s => {
    const c = getSkillColor(s);
    return '<div class="filter-select-option" data-skill="' + s + '">' +
      '<span class="option-dot" style="background:' + c.color + '"></span>' +
      s +
    '</div>';
  }).join('');

  const selectDropdown =
    '<div class="filter-select-wrapper">' +
      '<button class="filter-select-btn" id="skill-select-btn">' +
        '<span id="skill-select-label">Filter by Skill</span>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>' +
      '</button>' +
      '<div class="filter-select-dropdown" id="skill-select-dropdown">' +
        '<input type="text" class="filter-select-search" id="skill-search" placeholder="Search skills..." autocomplete="off">' +
        '<div class="filter-select-options" id="skill-options">' + skillOptions + '</div>' +
      '</div>' +
    '</div>';

  return '<div class="filter-bar fade-in">' + allChip + publicChip + privateChip + statusChips + selectDropdown + '</div>';
}

function openModal(project) {
  const existingModal = document.querySelector('.modal-overlay');
  if (existingModal) existingModal.remove();

  const images = [];
  if (project.thumbnail) images.push(project.thumbnail);
  if (project.gallery) images.push(...project.gallery);

  let galleryHtml;
  if (images.length > 0) {
    galleryHtml = '<div class="modal-gallery" id="modal-gallery">' +
      '<img src="' + images[0] + '" alt="' + project.name + '" id="modal-gallery-img" crossorigin="anonymous" onerror="this.parentElement.innerHTML=\'<div class=\\\'modal-gallery-placeholder\\\'><svg viewBox=\\\'0 0 24 24\\\' fill=\\\'none\\\' stroke=\\\'currentColor\\\' stroke-width=\\\'2\\\'><rect x=\\\'3\\\' y=\\\'3\\\' width=\\\'18\\\' height=\\\'18\\\' rx=\\\'2\\\'/><circle cx=\\\'8.5\\\' cy=\\\'8.5\\\' r=\\\'1.5\\\'/><path d=\\\'M21 15l-5-5L5 21\\\'/></svg></div>\'">' +
      (images.length > 1 ?
        '<button class="gallery-nav gallery-nav-prev" id="gallery-prev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>' +
        '<button class="gallery-nav gallery-nav-next" id="gallery-next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>' +
        '<div class="gallery-dots">' + images.map((_, i) => '<button class="gallery-dot ' + (i === 0 ? 'active' : '') + '" data-index="' + i + '"></button>').join('') + '</div>'
        : '') +
      '</div>';
  } else {
    galleryHtml = '<div class="modal-gallery"><div class="modal-gallery-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div></div>';
  }

  const tags = project.tags.map(tag => getTagHtml(tag)).join('');
  const visTag = getVisibilityTag(project.visibility || 'public');

  const links = [];
  if (project.links.github) {
    links.push('<a href="' + project.links.github + '" target="_blank" rel="noopener noreferrer" class="modal-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>Source Code</a>');
  }
  if (project.links.live) {
    links.push('<a href="' + project.links.live + '" target="_blank" rel="noopener noreferrer" class="modal-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>Live Site</a>');
  }
  const linksHtml = links.length ? '<div class="modal-links">' + links.join('') + '</div>' : '';

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML =
    '<div class="modal-content">' +
      galleryHtml +
      '<div class="modal-body">' +
        '<button class="modal-close" id="modal-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
        '<h2 class="modal-title">' + project.name + '</h2>' +
        '<div class="modal-meta">' +
          '<div class="modal-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><span>' + project.client + '</span></div>' +
          '<div class="modal-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span>' + project.period + '</span></div>' +
        '</div>' +
        '<p class="modal-description">' + project.description + '</p>' +
        '<div class="modal-tags">' + visTag + tags + '</div>' +
        linksHtml +
      '</div>' +
    '</div>';

  document.body.appendChild(modal);
  document.body.classList.add('modal-open');

  let currentImg = 0;
  if (images.length > 1) {
    const imgEl = modal.querySelector('#modal-gallery-img');
    const dots = modal.querySelectorAll('.gallery-dot');
    function goToImage(idx) {
      currentImg = idx;
      imgEl.src = images[idx];
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }
    modal.querySelector('#gallery-prev').addEventListener('click', (e) => { e.stopPropagation(); goToImage((currentImg - 1 + images.length) % images.length); });
    modal.querySelector('#gallery-next').addEventListener('click', (e) => { e.stopPropagation(); goToImage((currentImg + 1) % images.length); });
    dots.forEach(dot => { dot.addEventListener('click', (e) => { e.stopPropagation(); goToImage(parseInt(dot.dataset.index)); }); });
  }

  function closeModal() {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.95) translateY(10px)';
    setTimeout(() => { modal.remove(); document.body.classList.remove('modal-open'); }, 200);
  }

  modal.querySelector('#modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function escHandler(e) { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escHandler); } });
}

export async function renderProjects() {
  const res = await fetch('data/projects.json');
  projectsData = await res.json();

  const filterBar = renderFilterBar(projectsData);
  const cards = projectsData.map((p, i) => renderProjectCard(p, i)).join('');

  return '<div class="page">' +
    '<div class="section-header fade-in">' +
      '<h2 class="section-title">Projects & Work</h2>' +
      '<p class="section-subtitle">A collection of projects I\'ve built and contributed to.</p>' +
      '<div class="section-line"></div>' +
    '</div>' +
    filterBar +
    '<div class="projects-grid" id="projects-grid">' + cards + '</div>' +
  '</div>';
}

export function initProjectsPage() {
  const filterChips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.project-card');
  const selectBtn = document.getElementById('skill-select-btn');
  const selectDropdown = document.getElementById('skill-select-dropdown');
  const searchInput = document.getElementById('skill-search');
  const optionsContainer = document.getElementById('skill-options');
  const selectLabel = document.getElementById('skill-select-label');

  let currentSkillFilter = null;

  function applyFilters(filterType, filterValue) {
    cards.forEach(card => {
      if (filterValue === 'all') {
        card.classList.remove('filter-hidden');
      } else if (filterType === 'visibility') {
        const vis = card.dataset.visibility;
        if (vis === filterValue) {
          card.classList.remove('filter-hidden');
        } else {
          card.classList.add('filter-hidden');
        }
      } else if (filterType === 'status') {
        const cardTags = card.dataset.tags.split(',');
        if (cardTags.includes(filterValue)) {
          card.classList.remove('filter-hidden');
        } else {
          card.classList.add('filter-hidden');
        }
      } else if (filterType === 'skill') {
        const cardTags = card.dataset.tags.split(',');
        if (cardTags.includes(filterValue)) {
          card.classList.remove('filter-hidden');
        } else {
          card.classList.add('filter-hidden');
        }
      }
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentSkillFilter = null;
      selectLabel.textContent = 'Filter by Skill';
      selectBtn.classList.remove('active');
      document.querySelectorAll('.filter-select-option').forEach(o => o.classList.remove('selected'));
      const filter = chip.dataset.filter;
      const type = chip.dataset.filterType || 'all';
      applyFilters(type === 'all' ? 'all' : type, filter);
    });
  });

  if (selectBtn) {
    selectBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = selectDropdown.classList.contains('open');
      selectDropdown.classList.toggle('open');
      selectBtn.classList.toggle('open');
      if (!isOpen) {
        searchInput.value = '';
        filterSkillOptions('');
        setTimeout(() => searchInput.focus(), 50);
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterSkillOptions(searchInput.value);
    });
    searchInput.addEventListener('click', (e) => e.stopPropagation());
  }

  function filterSkillOptions(query) {
    const q = query.toLowerCase();
    const options = optionsContainer.querySelectorAll('.filter-select-option');
    let hasMatch = false;
    options.forEach(opt => {
      const skill = opt.dataset.skill.toLowerCase();
      if (skill.includes(q)) {
        opt.style.display = '';
        hasMatch = true;
      } else {
        opt.style.display = 'none';
      }
    });
    const emptyEl = optionsContainer.querySelector('.filter-select-empty');
    if (!hasMatch) {
      if (!emptyEl) {
        const empty = document.createElement('div');
        empty.className = 'filter-select-empty';
        empty.textContent = 'No skills found';
        optionsContainer.appendChild(empty);
      }
    } else if (emptyEl) {
      emptyEl.remove();
    }
  }

  if (optionsContainer) {
    optionsContainer.addEventListener('click', (e) => {
      const option = e.target.closest('.filter-select-option');
      if (!option) return;
      e.stopPropagation();
      const skill = option.dataset.skill;
      if (currentSkillFilter === skill) {
        currentSkillFilter = null;
        selectLabel.textContent = 'Filter by Skill';
        selectBtn.classList.remove('active');
        option.classList.remove('selected');
        filterChips.forEach(c => c.classList.remove('active'));
        document.querySelector('[data-filter="all"]').classList.add('active');
        applyFilters('all', 'all');
      } else {
        currentSkillFilter = skill;
        selectLabel.textContent = skill;
        selectBtn.classList.add('active');
        document.querySelectorAll('.filter-select-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        filterChips.forEach(c => c.classList.remove('active'));
        applyFilters('skill', skill);
      }
      selectDropdown.classList.remove('open');
      selectBtn.classList.remove('open');
    });
  }

  document.addEventListener('click', () => {
    if (selectDropdown && selectDropdown.classList.contains('open')) {
      selectDropdown.classList.remove('open');
      selectBtn.classList.remove('open');
    }
  });

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const id = parseInt(card.dataset.projectId);
      const project = projectsData.find(p => p.id === id);
      if (project) openModal(project);
    });
  });
}
