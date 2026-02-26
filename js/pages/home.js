const SKILL_ICONS = {
  'Python': { icon: 'devicon-python-plain', colored: true },
  'Django': { icon: 'devicon-django-plain', colored: false, invertOnLight: true },
  'Flask': { icon: 'devicon-flask-original', colored: false, invertOnLight: true },
  'TensorFlow': { icon: 'devicon-tensorflow-original', colored: true },
  'PyTorch': { icon: 'devicon-pytorch-original', colored: true },
  'scikit-learn': { svg: '<img src="/icons/scikit-learn.png" alt="scikit-learn" />' },
  'OpenCV': { icon: 'devicon-opencv-plain', colored: true },
  'PostgreSQL': { icon: 'devicon-postgresql-plain', colored: true },
  'SQLite': { icon: 'devicon-sqlite-plain', colored: true },
  'Docker': { icon: 'devicon-docker-plain', colored: true },
  'Git': { icon: 'devicon-git-plain', colored: true },
  'Selenium': { icon: 'devicon-selenium-original', colored: true },
  'Arch Linux': { icon: 'devicon-archlinux-plain', colored: true },
  'JavaScript': { icon: 'devicon-javascript-plain', colored: true },
  'Rust': { icon: 'devicon-rust-original', colored: false, invertOnLight: true },
  'RPA': { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent)"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>' },
  'Machine Learning': { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent)"><path d="M12 2a4 4 0 0 0-4 4c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2 4 4 0 0 0-4-4z"/><path d="M10 8v8"/><path d="M14 8v8"/><path d="M8 16a4 4 0 0 0 8 0"/><line x1="6" y1="12" x2="18" y2="12"/></svg>' },
  'REST API': { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent)"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>' },
  'Data Scraping': { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent)"><path d="M21 12a9 9 0 1 1-6.219-8.56"/><path d="M21 3v5h-5"/></svg>' },
  'Full-Stack': { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent)"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>' },
};

function getSkillIcon(name) {
  const key = Object.keys(SKILL_ICONS).find(k => name.toLowerCase().includes(k.toLowerCase()));
  if (!key) {
    return '<svg class="skill-icon-img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent)"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>';
  }
  const entry = SKILL_ICONS[key];
  if (entry.svg) {
    return '<div class="skill-icon-img" style="width:36px;height:36px">' + entry.svg + '</div>';
  }
  const colorClass = entry.colored ? 'colored' : '';
  const invertClass = entry.invertOnLight ? 'invert-on-light' : '';
  return '<i class="' + entry.icon + ' ' + colorClass + ' skill-icon-img ' + invertClass + '" style="font-size:36px;"></i>';
}

function renderSkillIconCard(name) {
  const icon = getSkillIcon(name);
  return '<div class="skill-icon-card">' + icon + '<span class="skill-icon-name">' + name + '</span></div>';
}

function cleanSkillName(s) {
  return s.replace(/\s*\(.*?\)\s*/g, '').trim();
}

export async function renderHome() {
  const [profileRes, projectsRes, certsRes] = await Promise.all([
    fetch('data/profile.json'),
    fetch('data/projects.json'),
    fetch('data/certificates.json'),
  ]);
  const profile = await profileRes.json();
  const projects = await projectsRes.json();
  const certs = await certsRes.json();

  const projectCount = projects.length + '+';
  const certCount = certs.length + '+';

  const allSkills = [
    ...profile.skills.core.map(cleanSkillName),
    ...profile.skills.frameworks,
    ...profile.skills.databases,
  ];
  const uniqueSkills = [...new Set(allSkills)];

  const skillIconCards = uniqueSkills.map(s => renderSkillIconCard(s)).join('');



  const langItems = profile.skills.languages
    .map(
      (l) => '<div class="lang-item">' +
        '<span class="lang-name">' + l.name + '</span>' +
        '<span class="lang-level">' + l.level + '</span>' +
        '</div>'
    )
    .join('');

  const yearsExp = '4+';

  return '<div class="page">' +
    '<section class="hero">' +
      '<div class="hero-top fade-in">' +
        '<div class="hero-intro">' +
          '<p class="hero-greeting">Hello, I\'m</p>' +
          '<h1 class="hero-name">' + profile.name + '</h1>' +
          '<p class="hero-title">' + profile.title + '</p>' +
          '<p class="hero-bio">' + profile.bio + '</p>' +
          '<div class="hero-actions">' +
            '<a href="' + profile.links.github + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>' +
              'GitHub' +
            '</a>' +
            '<a href="' + profile.links.linkedin + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>' +
              'LinkedIn' +
            '</a>' +  
            '<a href="mailto:' + profile.email + '" rel="noopener noreferrer" class="btn btn-secondary">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>' +
              'Email' +
            '</a>' +
            '<a href="' + profile.links.telegram + '" rel="noopener noreferrer" class="btn btn-secondary">' +
            '<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="#0F0F0F"/></svg>' +
              'Telegram' +
            '</a>' +
              '<a href="' + profile.resumeFile + '" download class="btn btn-primary">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
              'Download Resume' +
            '</a>' +
          '</div>' +
        '</div>' +
        '<div class="hero-terminal">' +
          '<div class="terminal-header">' +
            '<span class="terminal-dot"></span>' +
            '<span class="terminal-dot"></span>' +
            '<span class="terminal-dot"></span>' +
            '<span class="terminal-title">terminal</span>' +
          '</div>' +
          '<div class="terminal-body">' +
            '<div class="terminal-line"><span class="terminal-prompt">$</span><span class="terminal-text">whoami</span></div>' +
            '<div class="terminal-line"><span class="terminal-text">Mohammad Ghoreishi</span></div>' +
            '<div class="terminal-line"><span class="terminal-prompt">$</span><span class="terminal-text">cat skills.txt</span></div>' +
            '<div class="terminal-line"><span class="terminal-text">Python, Django, ML, RPA</span></div>' +
            '<div class="terminal-line"><span class="terminal-prompt">$</span><span class="terminal-text">echo $STATUS</span></div>' +
            '<div class="terminal-line"><span class="terminal-text">Open to opportunities<span class="terminal-cursor"></span></span></div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="stats-bar fade-in">' +
        '<div class="stat-item">' +
          '<span class="stat-number">' + yearsExp + '</span>' +
          '<span class="stat-label">Years Experience</span>' +
        '</div>' +
        '<div class="stat-item">' +
          '<span class="stat-number">' + projectCount + '</span>' +
          '<span class="stat-label">Projects</span>' +
        '</div>' +
        '<div class="stat-item">' +
          '<span class="stat-number">' + certCount + '</span>' +
          '<span class="stat-label">Certifications</span>' +
        '</div>' +
        '<div class="stat-item">' +
          '<span class="stat-number">B.Sc.</span>' +
          '<span class="stat-label">Computer Science</span>' +
        '</div>' +
      '</div>' +

      '<div class="detail-card fade-in">' +
        '<h3 class="skills-section-title">Technologies & Tools</h3>' +
        '<div class="skill-icon-grid">' + skillIconCards + '</div>' +
      '</div>' +

      '<div class="hero-details">' +
        '<div class="detail-card fade-in">' +
          '<h3 class="detail-card-title">Programming Languages</h3>' +
          langItems +
        '</div>' +



        '<div class="detail-card fade-in">' +
          '<h3 class="detail-card-title">Education</h3>' +
          '<div class="edu-degree">' + profile.education.degree + '</div>' +
          '<div class="edu-university">' + profile.education.university + '</div>' +
          '<div class="edu-details">' + profile.education.period + ' &middot; GPA: ' + profile.education.gpa + '</div>' +
          '<div class="skill-list" style="margin-top: 12px;">' +
            profile.education.coursework.map(c => '<span class="skill-chip">' + c + '</span>').join('') +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="detail-card fade-in">' +
        '<h3 class="detail-card-title">Contact</h3>' +
        '<div class="contact-grid">' +
          '<div class="contact-item">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>' +
            '<a href="mailto:' + profile.email + '"> email </a>' +
          '</div>' +
          '<div class="contact-item">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>' +
            '<span>' + profile.location + '</span>' +
          '</div>' +
          '<div class="contact-item">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>' +
            '<a href="' + profile.links.github + '" target="_blank" rel="noopener noreferrer">GitHub</a>' +
          '</div>' +
          '<div class="contact-item">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>' +
            '<a href="' + profile.links.linkedin + '" target="_blank" rel="noopener noreferrer">LinkedIn</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +
  '</div>';
}
