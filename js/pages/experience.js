function renderExpCard(exp, index) {
  const highlights = exp.highlights
    .map(h => '<div class="exp-page-highlight">' + h + '</div>')
    .join('');

  const skills = exp.skills
    .map(s => '<span class="skill-chip">' + s + '</span>')
    .join('');

  return '<article class="exp-page-card fade-in" style="animation-delay: ' + (index * 0.1) + 's">' +
    '<div class="exp-page-header">' +
      '<div>' +
        '<div class="exp-page-role">' + exp.role + '</div>' +
        '<div class="exp-page-company">' + exp.company + '</div>' +
      '</div>' +
      '<span class="exp-page-type">' + exp.type + '</span>' +
    '</div>' +
    '<div class="exp-page-meta">' +
      '<div class="exp-page-meta-item">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' +
        '<span>' + exp.period + '</span>' +
      '</div>' +
      '<div class="exp-page-meta-item">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
        '<span>' + exp.duration + '</span>' +
      '</div>' +
      '<div class="exp-page-meta-item">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>' +
        '<span>' + exp.location + '</span>' +
      '</div>' +
    '</div>' +
    '<p class="exp-page-description">' + exp.description + '</p>' +
    '<div class="exp-page-highlights">' +
      '<div class="exp-page-highlights-title">Key Achievements</div>' +
      highlights +
    '</div>' +
    '<div class="exp-page-skills">' + skills + '</div>' +
  '</article>';
}

export async function renderExperience() {
  const res = await fetch('data/experience.json');
  const experiences = await res.json();

  const cards = experiences.map((e, i) => renderExpCard(e, i)).join('');

  return '<div class="page">' +
    '<div class="section-header fade-in">' +
      '<h2 class="section-title">Experience</h2>' +
      '<p class="section-subtitle">My professional journey and career highlights.</p>' +
      '<div class="section-line"></div>' +
    '</div>' +
    '<div class="exp-page-list">' + cards + '</div>' +
  '</div>';
}
