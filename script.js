  // Theme toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const logo = document.getElementById('site-logo');
  const favicon = document.getElementById('favicon');
  const body = document.body;

  const setIcon = (btn, dark) => {
    const i = btn?.querySelector('i');
    if (!i) return;
    i.classList.toggle('fa-moon', !dark);
    i.classList.toggle('fa-sun', dark);
  };

  // Initialize from localStorage
  const savedTheme = localStorage.getItem('theme');
  const darkMode = savedTheme === 'dark';
  if (darkMode) body.classList.add('dark-mode');
  setIcon(toggleBtn, darkMode);

  if (logo) logo.src = darkMode 
    ? '/assets/logo/kyme-logo-dark.svg' 
    : '/assets/logo/kyme-logo-light.svg';
  if (favicon) favicon.href = darkMode 
    ? '/assets/logo/kyme-logo-dark.ico' 
    : '/assets/logo/kyme-logo-light.ico';

  // Toggle handler
  toggleBtn?.addEventListener('click', () => {
    const dark = body.classList.toggle('dark-mode');
    setIcon(toggleBtn, dark);
    if (logo) logo.src = dark 
      ? '/assets/logo/kyme-logo-dark.svg' 
      : '/assets/logo/kyme-logo-light.svg';
    if (favicon) favicon.href = dark 
      ? '/assets/logo/kyme-logo-dark.ico' 
      : '/assets/logo/kyme-logo-light.ico';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  });
});


  // Type Effect
var typed = new Typed("#element", {
  strings: [
    "System Administrator",
    "Front-end Designer",
    "Video Editor",
    "Graphics Designer"
  ],
  typeSpeed: 50,
  loop: true,
});



// JSON Config
async function initPortfolio() {
  try {
    const res = await fetch("data/portfolio.json");
    if (!res.ok) throw new Error("Could not load portfolio.json");
    const data = await res.json();

    renderExperience(data.experience || []);
    renderCertificates(data.certificates || []);
    renderProjects(data.projects || []);
    renderMedia(data.media || []);
  } catch (err) {
    console.error("Error loading portfolio data:", err);
  }
}

/* ---------- EXPERIENCE ---------- */
function renderExperience(items) {
  const container = document.getElementById("experience-container");
  container.innerHTML = "";
  items.forEach((item) => {
    // Primary entry (single or with sections)
    const card = document.createElement("div");
    card.className = "details-container";

    // Title + company
    let html = `
      <h2 class="experience-sub-title">${escapeHtml(item.title)}</h2>
      <h3>${escapeHtml(item.company || "")}</h3>
      <p class="experience-date">${escapeHtml(item.date || "")}</p>
      <p class="experience-location">${escapeHtml(item.location || "")}</p>
    `;

    // bullets (top-level)
    if (item.bullets && Array.isArray(item.bullets)) {
      html += `<ul class="experience-list">`;
      item.bullets.forEach((b) => {
        html += `<li>${escapeHtml(b)}</li>`;
      });
      html += `</ul>`;
    }

    // skills
    if (item.skills) {
      html += `<p><strong>Skills:</strong> ${escapeHtml(item.skills)}</p>`;
    }

    // sections (for internship multiple roles)
    if (item.sections && Array.isArray(item.sections)) {
      item.sections.forEach((sec) => {
        html += `<h3>${escapeHtml(sec.subtitle || "")}</h3>`;
        if (sec.bullets && Array.isArray(sec.bullets)) {
          html += `<ul class="experience-list">`;
          sec.bullets.forEach((b) => {
            html += `<li>${escapeHtml(b)}</li>`;
          });
          html += `</ul>`;
        }
        if (sec.skills)
          html += `<p><strong>Skills:</strong> ${escapeHtml(sec.skills)}</p>`;
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
  container.innerHTML = "";
  modalContainer.innerHTML = modalContainer.innerHTML || ""; // ensure exists

  items.forEach((item, idx) => {
    const thumbWrap = document.createElement("div");
    thumbWrap.className = "cert-img-container";
    thumbWrap.innerHTML = `
      <label class="cert-thumb" data-cert-id="${item.id || "cert-" + idx}">
        <img id="cert-img-${idx}" src="${item.image}" alt="${escapeHtml(
      item.title
    )}" class="cert-img">
      </label>
    `;
    thumbWrap.addEventListener("click", () =>
      openModal(item.id || "cert-" + idx)
    );
    container.appendChild(thumbWrap);

    // generate modal
    createModal(
      item.id || "cert-" + idx,
      item.title,
      item.image,
      item.description || ""
    );
  });
}

/* ---------- PROJECTS ---------- */
function renderProjects(items) {
  const container = document.getElementById("project-container");
  container.innerHTML = "";
  items.forEach((item, idx) => {
    const box = document.createElement("div");
    box.className = "project-container-box";
    box.innerHTML = `
      <label class="project-thumb" data-proj-id="${item.id || "proj-" + idx}">
        <img src="${item.thumb}" alt="${escapeHtml(
      item.title
    )}" class="project-img">
      </label>
      <div class="contact-container">
        <img src="/assets/icons/github.png" alt="github icon" class="icon contact-icon">
        <p><a href="${
          item.github || "#"
        }" target="_blank" rel="noopener">${escapeHtml(
      item.title
    )} </a></p>
      </div>
      <p class="section-text-1">Role: ${escapeHtml(item.role || "")}</p>
    `;
    const label = box.querySelector(".project-thumb");
    label.addEventListener("click", () => openModal(item.id || "proj-" + idx));
    container.appendChild(box);

    // create project modal with slider (images array)
    const imgList =
      Array.isArray(item.images) && item.images.length
        ? item.images
        : item.thumb
        ? [item.thumb]
        : [];
    const detailsHtml = `
      <p>Role: ${escapeHtml(item.role || "")}</p>
      <p>${escapeHtml(item.details || "")}</p>
      <p><a href="${
        item.github || "#"
      }" target="_blank" rel="noopener">View repository</a></p>
    `;
    createProjectModal(
      item.id || "proj-" + idx,
      item.title,
      imgList,
      detailsHtml
    );
  });
}

/* ---------- MEDIA (YouTube embeds) ---------- */
function renderMedia(items) {
  const container = document.getElementById("media-container");
  container.innerHTML = "";
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "video-container";
    div.innerHTML = `
      <h3>${escapeHtml(item.title)}</h3>
      <p class="section-text-1">Role: ${escapeHtml(item.role || "")}</p>
      <iframe width="560" height="315" src="${item.embed}" title="${escapeHtml(
      item.title
    )}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `;
    container.appendChild(div);
  });
}

/* ---------- MODAL HELPERS ---------- */
function createModal(id, title, image, text) {
  const modalContainer = document.getElementById("modal-container");
  // avoid duplicating
  if (document.getElementById(id)) return;
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = id;
  modal.innerHTML = `
    <div class="modal-content cert-modal">
      <img src="${image}" alt="${escapeHtml(title)}" class="modal-image">
      <p class="modal-description">${escapeHtml(text || "")}</p>
      <span class="modal-close-btn" role="button" aria-label="Close" data-close="${id}">Close</span>
    </div>
  `;
  modalContainer.appendChild(modal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(id);
  });
  modal
    .querySelector("[data-close]")
    ?.addEventListener("click", () => closeModal(id));
}

function createProjectModal(id, title, images, detailsHtml) {
  const modalContainer = document.getElementById("modal-container");
  if (document.getElementById(id)) return;

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = id;

  // slider markup
  const slidesHtml = images
    .map(
      (src, i) =>
        `<img class="slide" src="${src}" style="${
          i === 0 ? "display:block" : "display:none"
        }">`
    )
    .join("");
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
    </div>
  `;

  modalContainer.appendChild(modal);

  // hook up events
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(id);
  });
  modal
    .querySelector("[data-close]")
    ?.addEventListener("click", () => closeModal(id));

  const prevBtn = modal.querySelector("[data-prev]");
  const nextBtn = modal.querySelector("[data-next]");
  if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1, id));
  if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1, id));

  // store current index on element
  modal.dataset.slideIndex = 0;
}

function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.style.display = "flex";
  // reset slide index to 0
  if (m.dataset.slideIndex !== undefined) {
    m.dataset.slideIndex = 0;
    showSlide(id, 0);
  }
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.style.display = "none";
}

function changeSlide(direction, modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  const slider = modal.querySelectorAll(".slide");
  if (!slider || slider.length === 0) return;
  let idx = Number(modal.dataset.slideIndex || 0);
  idx += direction;
  if (idx < 0) idx = slider.length - 1;
  if (idx >= slider.length) idx = 0;
  modal.dataset.slideIndex = idx;
  showSlide(modalId, idx);
}

function showSlide(modalId, index) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  const slides = modal.querySelectorAll(".slide");
  slides.forEach((s, i) => {
    s.style.display = i === index ? "block" : "none";
  });
}

/* ---------- UTIL ---------- */
function escapeHtml(unsafe) {
  if (unsafe === undefined || unsafe === null) return "";
  return String(unsafe).replace(/[&<>"'`=\/]/g, function (s) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;",
    }[s];
  });
}

/* init */
document.addEventListener("DOMContentLoaded", initPortfolio);
