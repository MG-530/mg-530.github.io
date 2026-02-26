let certificatesData = [];
const TAG_COLORS = [
  { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.25)' },
  { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.25)' },
  { color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.1)', border: 'rgba(6, 182, 212, 0.25)' },
  { color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)', border: 'rgba(236, 72, 153, 0.25)' }
];

const tagColorMap = {};

function getTagColor(label) {
  if (!tagColorMap[label]) {
    const keys = Object.keys(tagColorMap).length;
    tagColorMap[label] = TAG_COLORS[keys % TAG_COLORS.length];
  }
  return tagColorMap[label];
}

function getTagHtml(tagLabel) {
  const c = getTagColor(tagLabel);
  return `<span class="tag" style="color:${c.color}; background:${c.bg}; border:1px solid ${c.border}">${tagLabel}</span>`;
}

function openCertModal(cert) {
  const existingModal = document.querySelector('.modal-overlay');
  if (existingModal) existingModal.remove();

  const tagsHtml = cert.tags ? cert.tags.map(t => getTagHtml(t)).join('') : '';
  const verifyLink = cert.verifyUrl 
    ? `<a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="modal-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Verify Certificate
       </a>` 
    : '';

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-gallery">
        ${cert.image 
          ? `<img src="${cert.image}" alt="${cert.title}" class="modal-cert-img">` 
          : `<div class="modal-gallery-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>`
        }
      </div>
      <div class="modal-body">
        <button class="modal-close" id="cert-modal-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        <h2 class="modal-title">${cert.title}</h2>
        <div class="modal-meta">
          <div class="modal-meta-item"><strong>Issuer:</strong> ${cert.issuer}</div>
          <div class="modal-meta-item"><strong>Date:</strong> ${cert.date}</div>
        </div>
        <p class="modal-description">${cert.description}</p>
        <div class="modal-tags">${tagsHtml}</div>
        <div class="modal-links">${verifyLink}</div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.classList.add('modal-open');

  const closeModal = () => {
    modal.style.opacity = '0';
    setTimeout(() => { modal.remove(); document.body.classList.remove('modal-open'); }, 200);
  };

  modal.querySelector('#cert-modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

function renderCertCard(cert, index) {
  const tagsHtml = cert.tags ? `<div class="cert-tags">${cert.tags.map(t => getTagHtml(t)).join('')}</div>` : '';
  
  const imageHtml = cert.image
    ? `<img src="${cert.image}" alt="${cert.title}" loading="lazy">`
    : `<div class="cert-image-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
       </div>`;

  return `
    <article class="cert-card fade-in" data-cert-index="${index}" style="animation-delay: ${index * 0.1}s">
      <div class="cert-image">
        ${imageHtml}
        <div class="project-thumbnail-overlay">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <span>View Certificate</span>
        </div>
      </div>
      <div class="cert-body">
        <h3 class="cert-title">${cert.title}</h3>
        <div class="cert-issuer">${cert.issuer}</div>
        <div class="cert-date">${cert.date}</div>
        ${tagsHtml}
      </div>
    </article>
  `;
}

export async function renderCertificates() {
  const res = await fetch('data/certificates.json');
  certificatesData = await res.json();

  const cards = certificatesData.map((c, i) => renderCertCard(c, i)).join('');

  return `
    <div class="page">
      <div class="section-header fade-in">
        <h2 class="section-title">Certificates</h2>
        <p class="section-subtitle">Professional certifications and courses I've completed.</p>
        <div class="section-line"></div>
      </div>
      <div class="certs-grid">
        ${cards}
      </div>
    </div>
  `;
}

export function initCertificatesPage() {
    const cards = document.querySelectorAll('.cert-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const index = card.dataset.certIndex;
            const cert = certificatesData[index];
            if (cert) openCertModal(cert);
        });
    });
}