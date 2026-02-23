// ====== EDIT THESE NUMBERS ======
const RAISED = 0;    // dollars raised
const MILES_GOAL = 500;
const MILES_LOGGED = 100; // <-- update this whenever
// ======================
// ================================

const pct = MILES_GOAL > 0
  ? Math.min(100, Math.round((MILES_LOGGED / MILES_GOAL) * 100))
  : 0;

function animateCount(el, to, duration = 900) {
  if (!el) return;
  const start = 0;
  const startTime = performance.now();

  function tick(now) {
    const t = Math.min(1, (now - startTime) / duration);
    const value = Math.round(start + (to - start) * t);
    el.textContent = String(value);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

window.addEventListener("load", () => {
  const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");
const milesLoggedEl = document.getElementById("milesLogged");
const milesGoalEl = document.getElementById("goalAmount"); // we can reuse this id
const moneyRaisedEl = document.getElementById("raiseAmount");

if (milesGoalEl) milesGoalEl.textContent = String(MILES_GOAL);
if (progressFill) progressFill.style.width = pct + "%";
if (progressPercent) progressPercent.textContent = String(pct);
if (milesLoggedEl) milesLoggedEl.textContent = String(MILES_LOGGED);
if (moneyRaisedEl) moneyRaisedEl.textContent = String(RAISED);

  // Optional: fade hero video slightly on scroll
  const hero = document.querySelector(".hero");
  const heroVideo = document.querySelector(".bg-video");
  if (hero && heroVideo) {
    window.addEventListener(
      "scroll",
      () => {
        const rect = hero.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
        heroVideo.style.opacity = String(1 - progress * 0.65);
      },
      { passive: true }
    );
  }
});

// Blog posts content
// ===== BLOG POSTS (ADD UNLIMITED) =====
const posts = [
  {
    title: "Kickoff Week",
    date: "March 30, 2026",
    desc: "Training begins. First miles logged. First donations.",
    body: "Write the full update here.\n\nAdd miles + a thank you."
  },
  {
    title: "Milestone: 50 Miles",
    date: "April 12, 2026",
    desc: "Consistency beats motivation. Momentum is building.",
    body: "Write the full update here."
  },
  {
    title: "100 Miles Down",
    date: "May 1, 2026",
    desc: "Every mile = proof. Every donation = impact.",
    body: "Write the full update here."
  },
  {
    title: "Halfway Push",
    date: "May 20, 2026",
    desc: "Hard days, still showing up.",
    body: "Write the full update here."
  },
];

// Render cards into the slider track
function renderPosts() {
  const track = document.getElementById("blogTrack");
  if (!track) {
    console.error("Missing #blogTrack in HTML.");
    return;
  }

  track.innerHTML = "";

  posts.forEach((post, i) => {
    const card = document.createElement("a");
    card.className = "blog-card";
    card.href = "#";

    card.addEventListener("click", (e) => {
      e.preventDefault();
      openPost(i);
    });

    card.innerHTML = `
      <div class="blog-top">${post.date || "Update"}</div>
      <div class="blog-title">${post.title}</div>
      <div class="blog-desc">${post.desc || ""}</div>
      <div class="blog-arrow">→</div>
    `;

    track.appendChild(card);
  });
}

// Slider arrows
function setupSlider() {
  const track = document.getElementById("blogTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!track || !prevBtn || !nextBtn) {
    console.error("Missing slider elements: #blogTrack, #prevBtn, or #nextBtn.");
    return;
  }

  function scrollByCards(direction) {
    const firstCard = track.querySelector(".blog-card");
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 260;
    const gap = 14;
    track.scrollBy({ left: (cardWidth + gap) * 2 * direction, behavior: "smooth" });
  }

  prevBtn.addEventListener("click", () => scrollByCards(-1));
  nextBtn.addEventListener("click", () => scrollByCards(1));
}

// Modal open/close (keep if you already have it; otherwise use this)
function openPost(index) {
  const modal = document.getElementById("modal");
  const title = document.getElementById("modalTitle");
  const body = document.getElementById("modalBody");
  if (!modal || !title || !body) return;

  const post = posts[index];
  title.textContent = post.title;
  body.innerHTML = (post.body || "").replace(/\n/g, "<br><br>");
  modal.classList.add("show");
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.remove("show");
}

window.closeModal = closeModal; // needed for the HTML close button

// Run after the page loads
document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
  setupSlider();
});

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.remove("show");
}

// THIS is the key fix for Replit + inline onclick
window.openPost = openPost;
window.closeModal = closeModal;

// Close modal if clicking outside
document.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (!modal) return;
  if (modal.classList.contains("show") && e.target === modal) closeModal();
});
