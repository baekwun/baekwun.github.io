// script.js
// Portfolio render functions and modal helpers.
// Theme toggle and Typed.js init are handled in index.html.

function initPortfolio(data) {
  renderExperience(data.experience || []);
  renderCertificates(data.certificates || []);
  renderProjects(data.projects || []);
  renderMedia(data.media || []);
  renderArt(data.art || []);
}

/* ---------- EXPERIENCE ---------- */
function renderExperience(items) {
  const container = document.getElementById("experience-container");
  if (!container) return;
  container.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "details-container";
    let html = `
      <h2 class="experience-sub-title">${escapeHtml(item.title)}</h2>
      <h3>${escapeHtml(item.company || "")}</h3>
      <p class="experience-date">${escapeHtml(item.date || "")}</p>
      <p class="experience-location">${escapeHtml(item.location || "")}</p>
    `;
    if (item.bullets && Array.isArray(item.bullets)) {
      html += `<ul class="experience-list">`;
      item.bullets.forEach((b) => { html += `<li>${escapeHtml(b)}</li>`; });
      html += `</ul>`;
    }
    if (item.skills) html += `<p><strong>Skills:</strong> ${escapeHtml(item.skills)}</p>`;
    if (item.sections && Array.isArray(item.sections)) {
      item.sections.forEach((sec) => {
        html += `<h3>${escapeHtml(sec.subtitle || "")}</h3>`;
        if (sec.bullets && Array.isArray(sec.bullets)) {
          html += `<ul class="experience-list">`;
          sec.bullets.forEach((b) => { html += `<li>${escapeHtml(b)}</li>`; });
          html += `</ul>`;
        }
        if (sec.skills) html += `<p><strong>Skills:</strong> ${escapeHtml(sec.skills)}</p>`;
      });
    }
    card.innerHTML = html;
    container.appendChild(card);
  });
}

/* ---------- CERTIFICATES ---------- */
function renderCertificates(items) {
  const container = document.getElementById("cert-container");
  const modalContainer = document.getElementById("modal-container");
  if (!container || !modalContainer) return;
  container.innerHTML = "";
  items.forEach((item, idx) => {
    const thumbWrap = document.createElement("div");
    thumbWrap.className = "cert-img-container";
    thumbWrap.innerHTML = `
    <label class="cert-thumb" data-cert-id="${item.id || 'cert-' + idx}">
      <img src="${escapeHtml(item.src || '')}"
          alt="${escapeHtml(item.title)}"
          class="cert-img"
          loading="lazy">
    </label>`;
    thumbWrap.addEventListener("click", () => openModal(item.id || 'cert-' + idx));
    container.appendChild(thumbWrap);
    createModal(item.id || 'cert-' + idx, item.title, item.src || '', item.description || "");
  });
}

/* ---------- PROJECTS ---------- */
function renderProjects(items) {
  const container = document.getElementById("project-container");
  if (!container) return;
  container.innerHTML = "";
  items.forEach((item, idx) => {
    const box = document.createElement("div");
    box.className = "project-container-box";
    box.innerHTML = `
      <label class="project-thumb" data-proj-id="${item.id || 'proj-' + idx}">
        <img src="${escapeHtml(item.src || '')}" alt="${escapeHtml(item.title)}" class="project-img" loading="lazy">
      </label>
      <div class="contact-container">
        <p><a href="${item.github || '#'}" target="_blank" rel="noopener">${escapeHtml(item.title)}</a></p>
      </div>
      <p class="section-text-1">Role: ${escapeHtml(item.role || "")}</p>`;
    const label = box.querySelector(".project-thumb");
    label.addEventListener("click", () => openModal(item.id || 'proj-' + idx));
    container.appendChild(box);

    const imgList = Array.isArray(item.images) && item.images.length ? item.images : item.src ? [item.src] : [];
    const detailsHtml = `
      <p>Role: ${escapeHtml(item.role || "")}</p>
      <p>${escapeHtml(item.details || "")}</p>
      <p><a href="${item.github || '#'}" target="_blank" rel="noopener">View repository</a></p>`;
    createProjectModal(item.id || 'proj-' + idx, item.title, imgList, detailsHtml);
  });
}

/* ---------- MEDIA ---------- */
function renderMedia(items) {
  const container = document.getElementById("media-container");
  if (!container) return;
  container.innerHTML = "";
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "video-container";
    div.innerHTML = `
      <h3>${escapeHtml(item.title)}</h3>
      <p class="section-text-1">Role: ${escapeHtml(item.role || "")}</p>
      <iframe width="560" height="315" src="${item.embed}" title="${escapeHtml(item.title)}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    container.appendChild(div);
  });
}

/* ---------- ART ---------- */
function renderArt(items) {
  const container = document.getElementById("art-container");
  const modalContainer = document.getElementById("modal-container");
  if (!container || !modalContainer) return;
  container.innerHTML = "";
  items.forEach((item, idx) => {
    const card = document.createElement("div");
    card.className = "art-card";
    card.innerHTML = `
      <img src="${escapeHtml(item.src || item.image || '')}" alt="${escapeHtml(item.title)}" loading="lazy">
      <div class="art-card-info">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.medium || "")}${item.year ? ' · ' + escapeHtml(item.year) : ''}</p>
      </div>`;
    card.addEventListener("click", () => openModal(item.id || 'art-' + idx));
    container.appendChild(card);
    createModal(item.id || 'art-' + idx, item.title, item.src || item.image || '', (item.medium || '') + (item.year ? ' · ' + item.year : ''), 'art-modal');
  });
}

/* ---------- MODAL HELPERS ---------- */
function createModal(id, title, src, text, extraClass) {
  const modalContainer = document.getElementById("modal-container");
  if (document.getElementById(id)) return;
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = id;
  const cls = extraClass ? 'modal-content ' + extraClass : 'modal-content cert-modal';
  modal.innerHTML = `
    <div class="${cls}">
      <img src="${escapeHtml(src || '')}"
           alt="${escapeHtml(title)}"
           class="modal-image"
           loading="lazy">
      <p class="modal-description">${escapeHtml(text || "")}</p>
      <span class="modal-close-btn" role="button" aria-label="Close" data-close="${id}">Close</span>
    </div>`;
  modalContainer.appendChild(modal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(id); });
  modal.querySelector("[data-close]")?.addEventListener("click", () => closeModal(id));
}

function createProjectModal(id, title, images, detailsHtml) {
  const modalContainer = document.getElementById("modal-container");
  if (document.getElementById(id)) return;
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = id;
  const slidesHtml = images.map((src, i) =>
    `<img class="slide" src="${escapeHtml(src)}" style="${i === 0 ? 'display:block' : 'display:none'}" loading="lazy">`
  ).join("");
  modal.innerHTML = `
    <div class="modal-content project-modal">
      <div class="slider-container">
        <div class="slider">${slidesHtml}</div>
        <button class="prev" data-prev="${id}">&#10094;</button>
        <button class="next" data-next="${id}">&#10095;</button>
      </div>
      <div class="project-details">
        <h3>${escapeHtml(title)}</h3>
        ${detailsHtml}
      </div>
      <span class="modal-close-btn" role="button" aria-label="Close" data-close="${id}">Close</span>
    </div>`;
  modalContainer.appendChild(modal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(id); });
  modal.querySelector("[data-close]")?.addEventListener("click", () => closeModal(id));
  modal.querySelector("[data-prev]")?.addEventListener("click", () => changeSlide(-1, id));
  modal.querySelector("[data-next]")?.addEventListener("click", () => changeSlide(1, id));
  modal.dataset.slideIndex = 0;
}

function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.style.display = "flex";
  if (m.dataset.slideIndex !== undefined) { m.dataset.slideIndex = 0; showSlide(id, 0); }
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.style.display = "none";
}

function changeSlide(direction, modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  const slides = modal.querySelectorAll(".slide");
  if (!slides || slides.length === 0) return;
  let idx = Number(modal.dataset.slideIndex || 0);
  idx += direction;
  if (idx < 0) idx = slides.length - 1;
  if (idx >= slides.length) idx = 0;
  modal.dataset.slideIndex = idx;
  showSlide(modalId, idx);
}

function showSlide(modalId, index) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.querySelectorAll(".slide").forEach((s, i) => {
    s.style.display = i === index ? "block" : "none";
  });
}

/* ---------- UTIL ---------- */
function escapeHtml(unsafe) {
  if (unsafe === undefined || unsafe === null) return "";
  return String(unsafe).replace(/[&<>"'`=\/]/g, (s) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;",
    "/":"&#x2F;","`":"&#x60;","=":"&#x3D;"
  }[s]));
}
