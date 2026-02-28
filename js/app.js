document.addEventListener("DOMContentLoaded", () => {
  /* =============================
   GLOBAL USER AVATAR (NO INITIALS)
   - Uses uploaded avatar if available (localStorage/sessionStorage morph_user_avatar)
   - Otherwise uses deterministic default avatar (DiceBear) based on name/email
   ============================= */
(function applyGlobalAvatarEverywhere() {
  const name =
    (sessionStorage.getItem("morph_user_name") || localStorage.getItem("morph_user_name") || "User").trim();
  const email =
    (sessionStorage.getItem("morph_user_email") || localStorage.getItem("morph_user_email") || "").trim();

  // Custom uploaded avatar (dataURL or image URL)
  const customAvatar =
    (sessionStorage.getItem("morph_user_avatar") || localStorage.getItem("morph_user_avatar") || "").trim();

  // Deterministic default avatar (NOT initials)
  // Deterministic default avatar (PHOTO) – pravatar
const makePravatarUrl = (seedStr) => {
  const s = String(seedStr || "user").toLowerCase().trim();
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  const imgId = (hash % 70) + 1; // pravatar supports many ids
  return `https://i.pravatar.cc/96?img=${imgId}`;
};

const defaultAvatar = makePravatarUrl(email || name || "user");
  const avatarUrl = customAvatar || defaultAvatar;

  // 1) Update ALL "app-user-avatar" elements (some pages have duplicate IDs)
  const avatarEls = document.querySelectorAll(
    '#app-user-avatar, .app-user-avatar, .settings-ref-user-avatar, .notif-user-avatar, .settings-mini-avatar, .support-mini-avatar'
  );

  avatarEls.forEach((el) => {
    // if it's an <img>
    if (el.tagName.toLowerCase() === "img") {
      el.src = avatarUrl;
      return;
    }

    // if it's a div badge
    el.style.backgroundImage = `url("${avatarUrl}")`;
    el.classList.add("has-image");
    el.textContent = ""; // remove initials
  });

  // 2) If there are places where user name is shown, keep them updated
  const nameEls = document.querySelectorAll("#app-user-name");
  nameEls.forEach((el) => (el.textContent = name || "User"));

  const emailEl = document.getElementById("app-user-email");
  if (emailEl && email) emailEl.textContent = email;
})();
  /* =============================
   GLOBAL i18n (whole app)
   - Applies only when language != EN
   - Safe: translates only known UI strings
   ============================= */
if (!window.MorphI18n) {
  window.MorphI18n = (() => {
    const KEY = "morph_ui_lang";

    const DICT = {
      ES: {
        "Notification Center": "Centro de notificaciones",
        "Monitor your AI generations, team collaborations, and system health.": "Supervisa tus generaciones de IA, colaboraciones del equipo y el estado del sistema.",
        "MARK ALL AS READ": "MARCAR TODO COMO LEÍDO",
        "All Notifications": "Todas",
        "Unread": "No leídas",
        "Archived": "Archivadas",
        "ALL TYPES": "TODOS LOS TIPOS",
        "AI OUTPUT": "SALIDA IA",
        "TEAM": "EQUIPO",
        "APPROVALS": "APROBACIONES",
        "RECENT ACTIVITY": "ACTIVIDAD RECIENTE",
        "ACTIVE SESSION": "SESIÓN ACTIVA",
        "COLLABORATORS": "COLABORADORES",
        "Add Collaborator": "Añadir colaborador",
        "SUPPORT": "SOPORTE",
        "Search notifications or projects...": "Buscar notificaciones o proyectos...",
        "Search documentation, tutorials, and BIM guides...": "Buscar documentación, tutoriales y guías BIM...",
        "SUBMIT TICKET": "ENVIAR TICKET",
        "Contact Support": "Contactar soporte",
        "Frequently Asked Questions": "Preguntas frecuentes",
        "Video Tutorials": "Tutoriales en vídeo",
        "View all tutorials →": "Ver todos los tutoriales →",
        "Community Forum": "Foro de la comunidad",
        "System Status": "Estado del sistema",
        "Release Notes": "Notas de versión",
        "Team": "Equipo",
        "Billing": "Facturación",
        "Settings": "Configuración",
        "Library": "Biblioteca",
        "New Project": "Nuevo proyecto",
        "Generate Floor Plan": "Generar plano",
        "Save Draft": "Guardar borrador",
        "Dashboard": "Panel"
      },

      FR: {
        "Notification Center": "Centre de notifications",
        "Monitor your AI generations, team collaborations, and system health.": "Suivez vos générations IA, collaborations d’équipe et l’état du système.",
        "MARK ALL AS READ": "TOUT MARQUER COMME LU",
        "All Notifications": "Toutes",
        "Unread": "Non lues",
        "Archived": "Archivées",
        "ALL TYPES": "TOUS LES TYPES",
        "AI OUTPUT": "SORTIE IA",
        "TEAM": "ÉQUIPE",
        "APPROVALS": "APPROBATIONS",
        "RECENT ACTIVITY": "ACTIVITÉ RÉCENTE",
        "ACTIVE SESSION": "SESSION ACTIVE",
        "COLLABORATORS": "COLLABORATEURS",
        "Add Collaborator": "Ajouter un collaborateur",
        "SUPPORT": "SUPPORT",
        "Search notifications or projects...": "Rechercher des notifications ou des projets...",
        "Search documentation, tutorials, and BIM guides...": "Rechercher documentation, tutoriels et guides BIM...",
        "SUBMIT TICKET": "ENVOYER",
        "Contact Support": "Contacter le support",
        "Frequently Asked Questions": "Questions fréquentes",
        "Video Tutorials": "Tutoriels vidéo",
        "Community Forum": "Forum communautaire",
        "System Status": "État du système",
        "Release Notes": "Notes de version",
        "Team": "Équipe",
        "Billing": "Facturation",
        "Settings": "Paramètres",
        "Library": "Bibliothèque",
        "New Project": "Nouveau projet",
        "Generate Floor Plan": "Générer le plan",
        "Save Draft": "Enregistrer le brouillon",
        "Dashboard": "Tableau de bord"
      },

      HI: {
        "Notification Center": "सूचना केंद्र",
        "Monitor your AI generations, team collaborations, and system health.": "AI जनरेशन, टीम सहयोग और सिस्टम स्वास्थ्य मॉनिटर करें।",
        "MARK ALL AS READ": "सबको पढ़ा हुआ करें",
        "All Notifications": "सभी",
        "Unread": "अपठित",
        "Archived": "संग्रहीत",
        "ALL TYPES": "सभी प्रकार",
        "AI OUTPUT": "AI आउटपुट",
        "TEAM": "टीम",
        "APPROVALS": "अनुमोदन",
        "RECENT ACTIVITY": "हाल की गतिविधि",
        "ACTIVE SESSION": "सक्रिय सत्र",
        "COLLABORATORS": "सहयोगी",
        "Add Collaborator": "सहयोगी जोड़ें",
        "SUPPORT": "सपोर्ट",
        "Search notifications or projects...": "सूचनाएँ या प्रोजेक्ट खोजें...",
        "SUBMIT TICKET": "टिकट सबमिट करें",
        "Contact Support": "सपोर्ट से संपर्क",
        "Frequently Asked Questions": "अक्सर पूछे जाने वाले प्रश्न",
        "Video Tutorials": "वीडियो ट्यूटोरियल",
        "Community Forum": "समुदाय फोरम",
        "System Status": "सिस्टम स्थिति",
        "Release Notes": "रिलीज़ नोट्स",
        "Team": "टीम",
        "Billing": "बिलिंग",
        "Settings": "सेटिंग्स",
        "Library": "लाइब्रेरी",
        "New Project": "नया प्रोजेक्ट",
        "Generate Floor Plan": "फ्लोर प्लान बनाएं",
        "Save Draft": "ड्राफ्ट सेव करें",
        "Dashboard": "डैशबोर्ड"
      }
    };

    const getLang = () => (localStorage.getItem(KEY) || "EN").toUpperCase();
    const setLang = (code) => localStorage.setItem(KEY, String(code || "EN").toUpperCase());

    // Preserve icons inside buttons/links
    const setLabel = (el, newText) => {
      if (!el) return;
      const icon = el.querySelector("i");
      if (icon) {
        // remove existing text nodes
        Array.from(el.childNodes).forEach(n => { if (n.nodeType === 3) n.textContent = ""; });
        let span = el.querySelector(".i18n-text");
        if (!span) {
          span = document.createElement("span");
          span.className = "i18n-text";
          el.appendChild(span);
        }
        span.textContent = " " + newText;
      } else {
        el.textContent = newText;
      }
    };

    const apply = () => {
      const lang = getLang();
      document.documentElement.dataset.lang = lang;
      document.documentElement.lang = lang === "EN" ? "en" : lang.toLowerCase();

      if (lang === "EN") return; // only translate after user selects other language
      const map = DICT[lang];
      if (!map) return;

      // Translate placeholders
      document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach(el => {
        const ph = (el.getAttribute("placeholder") || "").trim();
        if (map[ph]) el.setAttribute("placeholder", map[ph]);
      });

      // Translate common UI elements by exact text match (safe)
      const candidates = document.querySelectorAll("h1,h2,h3,button,a,span,label,p");
      candidates.forEach(el => {
        // skip user content areas
        if (el.closest(".project-card, .example-carousel, .support-video, .notif-card")) return;
        if (el.id === "app-user-name" || el.id === "app-hero-name") return;

        const txt = (el.textContent || "").trim();
        if (!txt) return;

        // Handle "Unread 3" tabs by matching startsWith "Unread"
        if (txt.startsWith("Unread") && map["Unread"]) {
          // keep count span
          if (el.querySelector(".notif-count")) {
            const countSpan = el.querySelector(".notif-count");
            el.childNodes.forEach(n => { if (n.nodeType === 3) n.textContent = ""; });
            el.insertBefore(document.createTextNode(map["Unread"] + " "), countSpan);
            return;
          }
        }

        if (map[txt]) setLabel(el, map[txt]);
      });
    };

    const bindDropdown = (selector) => {
      const btn = document.querySelector(selector);
      if (!btn) return;

      // update button label to stored language
      const updateBtn = () => {
        const lang = getLang();
        btn.innerHTML = `${lang} <i class="fas fa-chevron-down"></i>`;
      };
      updateBtn();

      let menu = document.getElementById("lang-menu");
      if (!menu) {
        menu = document.createElement("div");
        menu.id = "lang-menu";
        menu.className = "lang-menu";
        menu.hidden = true;
        document.body.appendChild(menu);
      }

      const langs = ["EN", "ES", "FR", "HI"];

      const renderMenu = () => {
        const curr = getLang();
        menu.innerHTML = "";
        langs.forEach(code => {
          const item = document.createElement("button");
          item.type = "button";
          item.className = "lang-item" + (code === curr ? " active" : "");
          item.innerHTML = `<span>${code}</span>${code === curr ? `<span class="lang-check">✓</span>` : ""}`;
          item.addEventListener("click", () => {
            setLang(code);
            updateBtn();
            menu.hidden = true;
            apply(); // apply to this page immediately
          });
          menu.appendChild(item);
        });
      };

      const positionMenu = () => {
        const r = btn.getBoundingClientRect();
        menu.style.top = `${r.bottom + 8}px`;
        menu.style.left = `${Math.min(window.innerWidth - 180, Math.max(8, r.left))}px`;
      };

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        renderMenu();
        menu.hidden = !menu.hidden;
        if (!menu.hidden) positionMenu();
      });

      document.addEventListener("click", () => { if (!menu.hidden) menu.hidden = true; });
      window.addEventListener("resize", () => { if (!menu.hidden) positionMenu(); });
      window.addEventListener("scroll", () => { if (!menu.hidden) positionMenu(); }, true);
    };

    return { apply, bindDropdown, getLang, setLang };
  })();
}
window.MorphI18n.apply();
window.MorphI18n.bindDropdown(".notif-lang");
  if (document.body.classList.contains("app")) {
  const loggedIn = sessionStorage.getItem("morph_logged_in") === "1";
  if (!loggedIn) {
    // ✅ remember the page user wanted (invite link, billing, etc.)
    sessionStorage.setItem("morph_redirect_after_login", window.location.href);
    window.location.replace("signin.html");
    return;
  }
}
  const isPage = (cls) => document.body.classList.contains(cls);
  /* =============================
   APP: BACK TO HOME BUTTON
   ============================= */
(function addBackToHomeButton(){
  if (!document.body.classList.contains("app")) return;

  // If topbar has a right-side container, add an icon button there
  const right = document.querySelector(".app-topbar-right");
  if (right && !document.getElementById("app-home-btn")) {
    const homeLink = document.createElement("a");
    homeLink.href = "index.html";
    homeLink.id = "app-home-btn";
    homeLink.className = "app-icon-btn app-home-btn";
    homeLink.title = "Back to Home";
    homeLink.setAttribute("aria-label", "Back to Home");
    homeLink.innerHTML = `<i class="fas fa-home"></i>`;
    right.prepend(homeLink);
    return;
  }

  // If this page uses a nav list in topbar, add a text link there
  const nav = document.querySelector(".app-topbar-nav");
  if (nav && !document.getElementById("app-home-link")) {
    const a = document.createElement("a");
    a.href = "index.html";
    a.id = "app-home-link";
    a.textContent = "Home";
    nav.prepend(a);
  }
})();
 
(function initUnifiedSidebar() {
  if (!document.body.classList.contains("app")) return;

 const getSavedProfile = () => {
  try { return JSON.parse(localStorage.getItem("morph_settings_profile") || "null"); }
  catch { return null; }
};

const getName = () => {
  const p = getSavedProfile();
  const n =
    p?.name ||
    sessionStorage.getItem("morph_user_name") ||
    localStorage.getItem("morph_user_name") ||
    "User";
  return String(n).trim();
};

const getEmail = () => {
  const p = getSavedProfile();
  const e =
    p?.email ||
    sessionStorage.getItem("morph_user_email") ||
    localStorage.getItem("morph_user_email") ||
    "";
  return String(e).trim();
};
const getAvatarUrl = () => {
  const custom =
    (sessionStorage.getItem("morph_user_avatar") || localStorage.getItem("morph_user_avatar") || "").trim();
  if (custom) return custom;

  // deterministic pravatar photo based on name/email
  const seedStr = ((getEmail() || getName() || "user")).toLowerCase().trim();

  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) hash = (hash * 31 + seedStr.charCodeAt(i)) >>> 0;

  const imgId = (hash % 70) + 1;
  return `https://i.pravatar.cc/96?img=${imgId}`;
};

  const logout = () => {
    sessionStorage.removeItem("morph_logged_in");
    sessionStorage.removeItem("morph_user_name");
    sessionStorage.removeItem("morph_user_email");
    sessionStorage.removeItem("morph_user_avatar");
    window.location.href = "index.html";
  };

  // Ensure sidebar element exists (reuse existing if already in HTML)
  let sidebar = document.getElementById("app-sidebar");
  if (!sidebar) {
    sidebar = document.createElement("aside");
    sidebar.id = "app-sidebar";
    document.body.prepend(sidebar);
  }

  // Backdrop
  let backdrop = document.querySelector(".mp-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "mp-backdrop";
    document.body.appendChild(backdrop);
  }

  // Build one sidebar
  sidebar.className = "mp-sidebar";
  sidebar.innerHTML = `
    <div class="mp-sidebar-head">
      <a class="mp-brand" href="dashboard.html">
        <span class="mp-brand-badge">
          <img src="./img/logo-morphopolis.png" alt="Morphopolis logo">
        </span>
        <span>MORPHOPOLIS</span>
      </a>

      <button class="mp-sidebar-close" id="app-sidebar-close" type="button" aria-label="Close sidebar">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="mp-sidebar-body">
      <div class="mp-section">
        <div class="mp-section-title">WORKSPACE</div>
        <nav class="mp-nav">
          <a class="mp-nav-item" href="dashboard.html" data-key="dashboard">
            <i class="fa-solid fa-border-all"></i><span>Dashboard</span>
          </a>
          <a class="mp-nav-item" href="projects.html" data-key="projects">
            <i class="fa-regular fa-folder-open"></i><span>Projects</span>
          </a>
          <a class="mp-nav-item" href="library.html" data-key="library">
            <i class="fa-solid fa-book"></i><span>Library</span>
          </a>
          <a class="mp-nav-item" href="notifications.html" data-key="notifications">
            <i class="fa-regular fa-bell"></i><span>Notifications</span>
          </a>
        </nav>
      </div>

      <div class="mp-section">
        <div class="mp-section-title">DESIGN</div>
        <nav class="mp-nav">
          <a class="mp-nav-item" href="new-project.html" data-key="generator">
            <i class="fa-solid fa-wand-magic-sparkles"></i><span>AI Generator</span>
          </a>
          <a class="mp-nav-item" href="library.html" data-key="floorplans" data-view="floorplans">
            <i class="fa-regular fa-map"></i><span>Floor Plans</span>
          </a>
          <a class="mp-nav-item" href="library.html" data-key="models" data-view="models">
            <i class="fa-solid fa-cube"></i><span>3D Models</span>
          </a>
        </nav>
      </div>

      <div class="mp-section">
        <div class="mp-section-title">COLLABORATION</div>
        <nav class="mp-nav">
          <a class="mp-nav-item" href="team.html" data-key="team">
            <i class="fa-solid fa-user-group"></i><span>Team</span>
          </a>
          <a class="mp-nav-item" href="billing.html" data-key="billing">
            <i class="fa-solid fa-credit-card"></i><span>Billing</span>
          </a>
        </nav>
      </div>

      <div class="mp-section">
<div class="mp-section-title">ACCOUNT</div>
<nav class="mp-nav">
  <a class="mp-nav-item" href="settings.html" data-key="settings">
    <i class="fa-solid fa-gear"></i><span>General Settings</span>
  </a>

  <button class="mp-nav-item danger" type="button" data-action="logout">
    <i class="fa-solid fa-right-from-bracket"></i><span>Sign out</span>
  </button>
</nav>
      </div>
    </div>

    <div class="mp-sidebar-foot">
      <div class="mp-profile">
        <div class="mp-profile-avatar" id="mp-profile-avatar"></div>
        <div class="mp-profile-meta">
          <div class="mp-profile-name" id="mp-profile-name">User</div>
          <div class="mp-profile-email" id="mp-profile-email">—</div>
        </div>
        <a class="mp-profile-edit" href="settings.html#profile" title="Edit profile" aria-label="Edit profile">
          <i class="fa-solid fa-pen"></i>
        </a>
      </div>
    </div>
  `;

  // Fill profile footer
  
  const name = getName();
  const email = getEmail();
  const avatarUrl = getAvatarUrl();

  const nameEl = document.getElementById("mp-profile-name");
  const emailEl = document.getElementById("mp-profile-email");
  const avatarEl = document.getElementById("mp-profile-avatar");
  if (nameEl) nameEl.textContent = name || "User";
  if (emailEl) emailEl.textContent = email || "No email";
  if (avatarEl) avatarEl.style.backgroundImage = `url("${avatarUrl}")`;
const profileCard = document.querySelector(".mp-sidebar .mp-profile");
profileCard?.addEventListener("click", (e) => {
  // allow pen button to work normally
  if (e.target.closest(".mp-profile-edit")) return;
  window.location.href = "settings.html#profile";
});
  // Save "Floor Plans / 3D Models" view intent (future pages can use it)
  sidebar.querySelectorAll("[data-view]").forEach(a => {
    a.addEventListener("click", () => {
      localStorage.setItem("morph_library_view", a.dataset.view);
    });
  });

  // Active link highlight
  const current = (location.pathname.split("/").pop() || "").toLowerCase();
  sidebar.querySelectorAll(".mp-nav-item[href]").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    const isActive = href.includes(current) && current !== "";
    a.classList.toggle("active", isActive);
  });

  // Toggle open/close (works with any existing #app-hamburger too)
  const open = () => { sidebar.classList.add("open"); document.body.classList.add("sidebar-open"); };
  const close = () => { sidebar.classList.remove("open"); document.body.classList.remove("sidebar-open"); };

  const closeBtn = document.getElementById("app-sidebar-close");
  closeBtn?.addEventListener("click", close);
  backdrop.addEventListener("click", close);

  // Logout button
  sidebar.querySelector('[data-action="logout"]')?.addEventListener("click", logout);

  // If page already has a hamburger button, use it
  const existingHamburger = document.getElementById("app-hamburger");
  if (existingHamburger) {
    existingHamburger.addEventListener("click", () => {
      sidebar.classList.contains("open") ? close() : open();
    });
  } else {
    // Otherwise create a floating hamburger (for pages like support/community)
    let fab = document.querySelector(".mp-fab-hamburger");
    if (!fab) {
      fab = document.createElement("button");
      fab.className = "mp-fab-hamburger";
      fab.type = "button";
      fab.setAttribute("aria-label", "Open sidebar");
      fab.innerHTML = `<i class="fa-solid fa-bars"></i>`;
      document.body.appendChild(fab);
    }
    fab.addEventListener("click", () => {
      sidebar.classList.contains("open") ? close() : open();
    });
  }
})();
  /* =============================
     PERSONALIZATION: USER + AVATAR
     ============================= */
  (function initPersonalization() {
const storedName = (sessionStorage.getItem("morph_user_name") || 
localStorage.getItem("morph_user_name") || "").trim();    
const fullName = storedName || "Designer";
    const firstName = fullName.split(" ")[0] || fullName;

    const heroNameSpan = document.getElementById("app-hero-name");
    if (heroNameSpan) heroNameSpan.textContent = firstName;

    const userNameEl = document.getElementById("app-user-name");
    if (userNameEl) userNameEl.textContent = fullName;

    const avatarEl = document.getElementById("app-user-avatar");
    if (avatarEl) {
      const storedAvatar = (localStorage.getItem("morph_user_avatar") || "").trim();
      if (storedAvatar) {
        avatarEl.style.backgroundImage = `url("${storedAvatar}")`;
        avatarEl.textContent = "";
        avatarEl.classList.add("has-image");
      } else {
        avatarEl.style.backgroundImage = "none";
        avatarEl.textContent = firstName.charAt(0).toUpperCase();
      }
    }
  })();
/* =============================
   DASHBOARD: TABS + COUNTS + SEARCH + STATUS ACTIONS
   ============================= */
(function initDashboard() {
  const tabsContainer = document.getElementById("project-tabs");
  const projectGrid = document.getElementById("project-grid");
  const emptyCardClass = "project-card-empty";
  if (!tabsContainer || !projectGrid) return;

  const STORAGE_KEY = "morph_project_status_map";

  const getCards = () =>
    Array.from(projectGrid.querySelectorAll(".project-card")).filter(
      (c) => !c.classList.contains(emptyCardClass)
    );

  const allCountSpan = document.getElementById("tab-count-all");
  const footerSummary = document.getElementById("project-count-summary");
  const searchInput = document.getElementById("project-search");

  const slugify = (s) =>
    String(s || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const loadMap = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const saveMap = (map) => localStorage.setItem(STORAGE_KEY, JSON.stringify(map));

  const STATUS_META = {
    "in-progress": { label: "IN PROGRESS", badge: "badge-yellow", archived: false },
    "approved": { label: "APPROVED", badge: "badge-green", archived: false },
    "completed": { label: "COMPLETED", badge: "badge-blue", archived: false },
    "archive": { label: "ARCHIVED", badge: "badge-grey", archived: true },
  };

  const ensureId = (card) => {
    if (card.dataset.id) return card.dataset.id;
    const title = card.dataset.title || card.querySelector("h3")?.textContent || "project";
    const id = slugify(title);
    card.dataset.id = id;
    return id;
  };

  const setBadge = (card, status) => {
    const meta = STATUS_META[status] || STATUS_META["in-progress"];

    // badge element
    let badge = card.querySelector(".project-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "project-badge";
      card.querySelector(".project-card-image")?.appendChild(badge);
    }

    badge.textContent = meta.label;
    badge.classList.remove("badge-yellow", "badge-green", "badge-grey", "badge-blue");
    badge.classList.add(meta.badge);

    card.classList.toggle("is-archived", !!meta.archived);
  };

  const setCardStatus = (card, status) => {
    card.dataset.status = status;
    setBadge(card, status);

    const map = loadMap();
    map[ensureId(card)] = status;
    saveMap(map);
  };

  // Apply persisted statuses on load
  const statusMap = loadMap();
  getCards().forEach((card) => {
    const id = ensureId(card);
    const savedStatus = statusMap[id];
    const current = (card.dataset.status || "in-progress").toLowerCase();
    setCardStatus(card, savedStatus || current);
  });

  const updateAllCount = () => {
    const total = getCards().length;
    if (allCountSpan) allCountSpan.textContent = String(total);
  };

  const updateVisibleSummary = () => {
    const visibleCount = getCards().filter((c) => c.style.display !== "none").length;
    if (footerSummary) {
      footerSummary.textContent = `Showing ${visibleCount} project${visibleCount === 1 ? "" : "s"}`;
    }
  };

  let activeFilter = "all";

  const applySearch = () => {
    const q = (searchInput?.value || "").trim().toLowerCase();

    getCards().forEach((card) => {
      const title = (card.dataset.title || card.querySelector("h3")?.textContent || "").toLowerCase();
      const matchesText = !q || title.includes(q);

      // filter match flag from tab filtering
      const matchesFilter = card.dataset.matchesFilter !== "0";
      card.style.display = matchesText && matchesFilter ? "" : "none";
    });

    // Create card stays visible
    const emptyCard = projectGrid.querySelector(`.${emptyCardClass}`);
    if (emptyCard) emptyCard.style.display = "";

    updateVisibleSummary();
  };

  const applyFilter = (filter) => {
    activeFilter = filter;

    const cards = getCards();
    projectGrid.classList.add("slide-out");

    setTimeout(() => {
      cards.forEach((card) => {
        const status = (card.dataset.status || "in-progress").toLowerCase();
        const visible = filter === "all" ? true : status === filter;

        card.dataset.matchesFilter = visible ? "1" : "0";
        // don’t set display here; let search combine with it
      });

      // Active tab style
      tabsContainer.querySelectorAll(".app-tab").forEach((b) => b.classList.remove("active"));
      const activeBtn = tabsContainer.querySelector(`.app-tab[data-filter="${filter}"]`);
      if (activeBtn) activeBtn.classList.add("active");

      projectGrid.classList.remove("slide-out");
      projectGrid.classList.add("slide-in");
      requestAnimationFrame(() => setTimeout(() => projectGrid.classList.remove("slide-in"), 1));

      applySearch(); // combine filter + search
    }, 200);
  };

  // Tabs
  tabsContainer.querySelectorAll(".app-tab").forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.filter || "all"));
  });

  // Search input
  if (searchInput) searchInput.addEventListener("input", applySearch);

  /* ===== Add actions menu to each card ===== */
  const closeAllMenus = () => {
    document.querySelectorAll(".project-actions-menu").forEach((m) => (m.hidden = true));
  };

  document.addEventListener("click", () => closeAllMenus());

  const buildMenu = (card, menu) => {
    const status = (card.dataset.status || "in-progress").toLowerCase();
    menu.innerHTML = "";

    const addItem = (label, action, danger = false) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `project-actions-item${danger ? " danger" : ""}`;
      b.textContent = label;
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.hidden = true;

        if (action === "completed") setCardStatus(card, "completed");
        if (action === "archive") setCardStatus(card, "archive");
        if (action === "restore") setCardStatus(card, "in-progress");
        if (action === "approved") setCardStatus(card, "approved");

        applyFilter(activeFilter); // refresh view for current tab
      });
      menu.appendChild(b);
    };

    if (status !== "completed") addItem("Mark as Completed", "completed");
    if (status !== "approved") addItem("Mark as Approved", "approved");
    if (status !== "archive") addItem("Archive", "archive", true);
    if (status === "archive" || status === "completed") addItem("Restore to In Progress", "restore");
  };

  getCards().forEach((card) => {
    // Add button in card footer (right side)
    const footer = card.querySelector(".project-card-footer");
    if (!footer) return;

    // Wrap to keep layout stable
    const wrap = document.createElement("div");
    wrap.className = "project-actions-wrap";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "project-actions-btn";
    btn.innerHTML = '<i class="fas fa-ellipsis-h"></i>';

    const menu = document.createElement("div");
    menu.className = "project-actions-menu";
    menu.hidden = true;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = menu.hidden;
      closeAllMenus();
      if (willOpen) {
        buildMenu(card, menu);
        menu.hidden = false;
      }
    });

    wrap.appendChild(btn);
    wrap.appendChild(menu);

    // put actions at end of footer
    footer.appendChild(wrap);
  });

  // Init
  updateAllCount();
  applyFilter("all");
})();

/* =============================
   NEW PROJECT: GENERATE -> CREATE PROJECT (with ownerEmail/ownerName)
   ============================= */
(function initGenerate() {
  const btn = document.getElementById("generate-floorplan-btn");
  if (!btn) return;

  const KEY = "morph_projects_v1";

  const loadProjects = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch { return []; }
  };

  const saveProjects = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const prompt = (document.getElementById("project-prompt")?.value || "").trim();
    localStorage.setItem("morph_last_prompt", prompt);

    // ✅ THESE ARE THE TWO FIELDS (OWNER)
    const ownerEmail =
      (sessionStorage.getItem("morph_user_email") || localStorage.getItem("morph_user_email") || "")
        .trim()
        .toLowerCase();

    const ownerName =
      (sessionStorage.getItem("morph_user_name") || localStorage.getItem("morph_user_name") || "User").trim();

    // Build a project title/description from prompt
    const words = prompt ? prompt.split(/\s+/).slice(0, 5).join(" ") : "New Project";
    const title = prompt ? `AI Concept: ${words}…` : "AI Concept Project";
    const description = prompt
      ? (prompt.slice(0, 140) + (prompt.length > 140 ? "…" : ""))
      : "Generated with Morphopolis AI.";

    const id = (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(16).slice(2)}`);

    const projects = loadProjects();

    // ✅ THIS is where you SAVE ownerEmail, ownerName (inside the project object)
    projects.unshift({
      id,
      ownerEmail,
      ownerName,
      title,
      description,
      image: "./img/professional-blueprint.jpeg",
      status: "in-progress",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    saveProjects(projects);

    // optional helper
    localStorage.setItem("morph_last_project_id", id);

    window.location.href = "engine.html";
  });
})();
  /* =============================
   NEW PROJECT – SAVE DRAFT (REAL)
   ============================= */
(function initSaveDraft() {
  if (!document.body.classList.contains("new-project-page")) return;

  const KEY = "morph_last_draft";

  const saveBtn = document.getElementById("save-draft-btn");
  const statusEl = document.getElementById("draft-status");

  const promptEl = document.getElementById("project-prompt");
  const squareEl = document.getElementById("param-square");
  const bedEl = document.getElementById("param-bed");
  const bathEl = document.getElementById("param-bath");

  if (!saveBtn || !promptEl || !squareEl || !bedEl || !bathEl) return;

  // Remove any previous click handler duplicates safely
  const newBtn = saveBtn.cloneNode(true);
  saveBtn.parentNode.replaceChild(newBtn, saveBtn);

  // Toast helper
  const ensureToastWrap = () => {
    let wrap = document.getElementById("np-toast-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "np-toast-wrap";
      wrap.className = "np-toast-wrap";
      document.body.appendChild(wrap);
    }
    return wrap;
  };

  const toast = (msg) => {
    const wrap = ensureToastWrap();
    const t = document.createElement("div");
    t.className = "np-toast";
    t.textContent = msg;
    wrap.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 200);
    }, 2000);
  };

  const setStatus = (cls, text) => {
    if (!statusEl) return;
    statusEl.classList.remove("is-saving", "is-saved", "is-dirty");
    if (cls) statusEl.classList.add(cls);
    statusEl.textContent = text;
  };

  const collectDraft = () => {
    const styles = Array.from(document.querySelectorAll(".style-tag.active"))
      .map(t => t.textContent.trim());

    return {
      prompt: promptEl.value.trim(),
      square: squareEl.value,
      bedrooms: bedEl.value,
      bathrooms: bathEl.value,
      styles,
      savedAt: new Date().toISOString()
    };
  };

  const loadDraft = () => {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      setStatus("", "No draft saved yet");
      return;
    }

    try {
      const d = JSON.parse(raw);
      if (d.prompt) promptEl.value = d.prompt;
      if (d.square) squareEl.value = d.square;
      if (d.bedrooms) bedEl.value = d.bedrooms;
      if (d.bathrooms) bathEl.value = d.bathrooms;

      setStatus("is-saved", "Draft loaded");
    } catch {
      setStatus("", "Draft could not be loaded");
    }
  };

  const saveDraft = () => {
    setStatus("is-saving", "Saving draft…");
    newBtn.disabled = true;
    const originalText = newBtn.textContent;
    newBtn.textContent = "Saving…";

    requestAnimationFrame(() => {
      localStorage.setItem(KEY, JSON.stringify(collectDraft()));

      newBtn.disabled = false;
      newBtn.textContent = originalText;

      setStatus("is-saved", "Draft saved");
      toast("Draft saved");
    });
  };

  // Save button
  newBtn.addEventListener("click", (e) => {
    e.preventDefault();
    saveDraft();
  });

  // Mark as “unsaved changes” when user edits
  const markDirty = () => setStatus("is-dirty", "Unsaved changes");
  promptEl.addEventListener("input", markDirty);
  squareEl.addEventListener("input", markDirty);
  bedEl.addEventListener("input", markDirty);
  bathEl.addEventListener("input", markDirty);
  document.querySelectorAll(".style-tag").forEach(tag => tag.addEventListener("click", markDirty));

  // Auto-load on page open
  loadDraft();
})();
  /* =============================
     NEW PROJECT: REAL SAVE DRAFT (NO ALERT)
     ============================= */
  (function initRealDraftSaving() {
    if (!isPage("new-project-page")) return;

    const DRAFT_KEY = "morph_last_draft";

    const saveBtn = document.getElementById("save-draft-btn");
    const promptInput = document.getElementById("project-prompt");
    const squareInput = document.getElementById("param-square");
    const bedInput = document.getElementById("param-bed");
    const bathInput = document.getElementById("param-bath");

    if (!saveBtn || !promptInput || !squareInput || !bedInput || !bathInput) return;

    // remove old listeners by replacing node
    const newBtn = saveBtn.cloneNode(true);
    saveBtn.parentNode.replaceChild(newBtn, saveBtn);

    const collectDraft = () => {
      const styles = Array.from(document.querySelectorAll(".style-tag.active"))
        .map((t) => t.textContent.trim());

      return {
        prompt: promptInput.value.trim(),
        square: squareInput.value,
        bedrooms: bedInput.value,
        bathrooms: bathInput.value,
        styles,
        savedAt: new Date().toISOString(),
      };
    };

    const setBtnState = (text, disabled) => {
      newBtn.textContent = text;
      newBtn.disabled = !!disabled;
    };

    const save = () => {
      setBtnState("Saving…", true);
      requestAnimationFrame(() => {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(collectDraft()));
        setBtnState("Saved", true);
        setTimeout(() => setBtnState("Save Draft", false), 900);
      });
    };

    newBtn.addEventListener("click", (e) => {
      e.preventDefault();
      save();
    });

    // preload existing draft
    try {
      const existing = localStorage.getItem(DRAFT_KEY);
      if (existing) {
        const d = JSON.parse(existing);
        if (d.prompt) promptInput.value = d.prompt;
        if (d.square) squareInput.value = d.square;
        if (d.bedrooms) bedInput.value = d.bedrooms;
        if (d.bathrooms) bathInput.value = d.bathrooms;
      }
    } catch {}
  })();

  /* =============================
     NEW PROJECT: CHIPS + STYLE TAGS
     ============================= */
  (function initNewProjectUI() {
    const promptInput = document.getElementById("project-prompt");

    // Chips
    const chips = document.querySelectorAll(".prompt-chip");
    if (chips.length && promptInput) {
      chips.forEach((chip) => {
        chip.addEventListener("click", () => {
          const textToAdd = chip.dataset.chip || chip.textContent.trim();
          const curr = promptInput.value.trim();
          promptInput.value = curr ? `${curr.replace(/\s*$/, "")}, ${textToAdd}` : textToAdd;
          promptInput.focus();
        });
      });
    }

    // Style tags
    const styleTags = document.querySelectorAll(".style-tag");
    if (styleTags.length) {
      styleTags.forEach((tag) => tag.addEventListener("click", () => tag.classList.toggle("active")));
    }
  })();

  /* =============================
     NEW PROJECT: PROMPT TOOLS (IMAGE / VOICE / FILE+LINK)
     ============================= */
  (function initPromptTools() {
    if (!isPage("new-project-page")) return;

    const promptEl = document.getElementById("project-prompt");
    if (!promptEl) return;

    let attachmentsWrap = document.getElementById("prompt-attachments");
    if (!attachmentsWrap) {
      attachmentsWrap = document.createElement("div");
      attachmentsWrap.id = "prompt-attachments";
      attachmentsWrap.className = "prompt-attachments";
      promptEl.insertAdjacentElement("afterend", attachmentsWrap);
    }

    const iconImageBtn = document.querySelector('.prompt-icon-btn[data-action="image"]');
    const iconMicBtn = document.querySelector('.prompt-icon-btn[data-action="mic"]');
    const iconFileBtn =
      document.querySelector('.prompt-icon-btn[data-action="file"]') ||
      document.querySelector('.prompt-icon-btn[data-action="link"]');

    const imgInput = document.createElement("input");
    imgInput.type = "file";
    imgInput.accept = "image/*";
    imgInput.multiple = true;
    imgInput.hidden = true;

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg";
    fileInput.multiple = true;
    fileInput.hidden = true;

    document.body.appendChild(imgInput);
    document.body.appendChild(fileInput);

    const attachments = [];

    const formatBytes = (bytes) => {
      if (!Number.isFinite(bytes)) return "";
      const units = ["B", "KB", "MB", "GB"];
      let i = 0, v = bytes;
      while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
      return `${v.toFixed(v >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
    };

    const render = () => {
      attachmentsWrap.innerHTML = "";
      attachments.forEach((a, idx) => {
        const item = document.createElement("div");
        item.className = "attachment-item";

        const thumb = document.createElement("div");
        thumb.className = "attachment-thumb";
        if (a.kind === "image") {
          const img = document.createElement("img");
          img.src = a.url;
          img.alt = a.name;
          thumb.appendChild(img);
        } else if (a.kind === "link") {
          thumb.innerHTML = '<i class="fas fa-link"></i>';
        } else {
          thumb.innerHTML = '<i class="fas fa-file"></i>';
        }

        const meta = document.createElement("div");
        meta.className = "attachment-meta";
        meta.innerHTML = `
          <div class="attachment-name">${a.name}</div>
          <div class="attachment-sub">${a.sub || ""}</div>
        `;

        const actions = document.createElement("div");
        actions.className = "attachment-actions";

        const openBtn = document.createElement("button");
        openBtn.className = "attachment-btn";
        openBtn.type = "button";
        openBtn.textContent = "Open";
        openBtn.addEventListener("click", () => window.open(a.url, "_blank", "noopener,noreferrer"));

        const removeBtn = document.createElement("button");
        removeBtn.className = "attachment-btn";
        removeBtn.type = "button";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
          const removed = attachments.splice(idx, 1)[0];
          if (removed?.url?.startsWith("blob:")) URL.revokeObjectURL(removed.url);
          render();
        });

        actions.appendChild(openBtn);
        actions.appendChild(removeBtn);

        item.appendChild(thumb);
        item.appendChild(meta);
        item.appendChild(actions);
        attachmentsWrap.appendChild(item);
      });
    };

    // Image
    if (iconImageBtn) {
      iconImageBtn.addEventListener("click", (e) => {
        e.preventDefault();
        imgInput.click();
      });
    }
    imgInput.addEventListener("change", () => {
      Array.from(imgInput.files || []).forEach((file) => {
        const url = URL.createObjectURL(file);
        attachments.push({ kind: "image", name: file.name, url, sub: formatBytes(file.size) });
      });
      imgInput.value = "";
      render();
    });

    // File/link modal
    const ensureModal = () => {
      let backdrop = document.getElementById("attach-backdrop");
      if (backdrop) return backdrop;

      backdrop = document.createElement("div");
      backdrop.id = "attach-backdrop";
      backdrop.className = "attach-backdrop";
      backdrop.innerHTML = `
        <div class="attach-modal" role="dialog" aria-modal="true">
          <h3>Attach file or link</h3>
          <p>Add a supporting brief (PDF/DOC/TXT) or paste a reference URL.</p>

          <div class="attach-row">
            <input class="attach-input" id="attach-url" type="text" placeholder="https://example.com/reference" />
            <button class="attachment-btn" type="button" id="attach-add-url">Add link</button>
          </div>

          <div class="attach-row">
            <button class="attachment-btn" type="button" id="attach-upload-file">Upload file</button>
            <span style="color:rgba(148,163,184,.9);font-size:.82rem;">PDF, DOCX, TXT, images</span>
          </div>

          <div class="attach-actions">
            <button class="attachment-btn" type="button" id="attach-close">Close</button>
          </div>
        </div>
      `;

      backdrop.addEventListener("click", (ev) => {
        if (ev.target === backdrop) backdrop.classList.remove("active");
      });

      document.body.appendChild(backdrop);

      backdrop.querySelector("#attach-close").addEventListener("click", () => backdrop.classList.remove("active"));
      backdrop.querySelector("#attach-upload-file").addEventListener("click", () => fileInput.click());

      const urlInput = backdrop.querySelector("#attach-url");
      const addBtn = backdrop.querySelector("#attach-add-url");

      const addUrl = () => {
        let url = (urlInput.value || "").trim();
        if (!url) return;

        if (!/^https?:\/\//i.test(url)) url = "https://" + url;
        try { url = new URL(url).toString(); } catch { urlInput.focus(); return; }

        attachments.push({ kind: "link", name: "Reference link", url, sub: url });
        urlInput.value = "";
        render();
        backdrop.classList.remove("active");
      };

      addBtn.addEventListener("click", addUrl);
      urlInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); addUrl(); }
      });

      return backdrop;
    };

    if (iconFileBtn) {
      iconFileBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const backdrop = ensureModal();
        backdrop.classList.add("active");
        backdrop.querySelector("#attach-url")?.focus();
      });
    }

    fileInput.addEventListener("change", () => {
      Array.from(fileInput.files || []).forEach((file) => {
        const url = URL.createObjectURL(file);
        attachments.push({ kind: "file", name: file.name, url, sub: formatBytes(file.size) });
      });
      fileInput.value = "";
      render();
      document.getElementById("attach-backdrop")?.classList.remove("active");
    });

    // Voice
    if (iconMicBtn) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        iconMicBtn.disabled = true;
        iconMicBtn.title = "Voice input not supported in this browser";
        iconMicBtn.style.opacity = "0.5";
      } else {
        const rec = new SpeechRecognition();
        rec.lang = "en-US";
        rec.interimResults = false;
        rec.continuous = true;

        let listening = false;
        const start = () => {
          rec.start();
          listening = true;
          iconMicBtn.classList.add("is-recording");
          iconMicBtn.title = "Stop voice input";
        };
        const stop = () => {
          rec.stop();
          listening = false;
          iconMicBtn.classList.remove("is-recording");
          iconMicBtn.title = "Start voice input";
        };

        iconMicBtn.addEventListener("click", (e) => {
          e.preventDefault();
          listening ? stop() : start();
        });

        rec.addEventListener("result", (event) => {
          const text = Array.from(event.results)
            .slice(event.resultIndex)
            .map(r => r[0].transcript)
            .join(" ")
            .trim();

          if (!text) return;
          const curr = promptEl.value.trim();
          promptEl.value = curr ? `${curr} ${text}` : text;
          promptEl.focus();
        });

        rec.addEventListener("error", stop);
        rec.addEventListener("end", () => { if (listening) stop(); });
      }
    }
  })();

  /* =============================
     NEW PROJECT – SITE CONTEXT (ONE VERSION)
     ============================= */
  (function initSiteContext() {
    if (!isPage("new-project-page")) return;

    const pill = document.querySelector(".param-topography-pill");
    if (pill) {
      const options = ["Flat", "Gentle Slope", "Steep Slope"];
      let i = options.indexOf(localStorage.getItem("morph_site_topography") || pill.textContent.trim());
      if (i < 0) i = options.indexOf("Steep Slope");

      const render = () => {
        pill.textContent = options[i];
        pill.classList.toggle("is-active", options[i] === "Steep Slope");
        localStorage.setItem("morph_site_topography", options[i]);
      };

      render();
      pill.addEventListener("click", () => {
        i = (i + 1) % options.length;
        render();
      });
    }

    const addImgBox = document.getElementById("param-add-image");
    if (addImgBox) {
      let fileInput = document.getElementById("site-image-input");
      if (!fileInput) {
        fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.id = "site-image-input";
        fileInput.hidden = true;
        document.body.appendChild(fileInput);
      }

      addImgBox.addEventListener("click", () => fileInput.click());
      fileInput.addEventListener("change", () => {
        const file = fileInput.files && fileInput.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        addImgBox.style.backgroundImage =
          `linear-gradient(rgba(2,6,23,.62), rgba(2,6,23,.62)), url("${url}")`;
        addImgBox.style.backgroundSize = "cover";
        addImgBox.style.backgroundPosition = "center";
        addImgBox.style.borderStyle = "solid";
      });
    }
  })();

  /* =============================
     ENGINE PAGE: SIMULATED PROGRESS
     ============================= */
  (function initEngine() {
    if (!isPage("engine-page")) return;

    const valueEl = document.getElementById("engine-progress-value");
    const circleEl = document.getElementById("engine-circle");
    const step2 = document.querySelector('.engine-step[data-step="2"]');
    const step3 = document.querySelector('.engine-step[data-step="3"]');

    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.7;
      if (progress > 100) progress = 100;

      if (valueEl) valueEl.textContent = `${progress.toFixed(1)}%`;
      if (circleEl) circleEl.style.setProperty("--progress", `${progress}%`);

      if (progress > 60 && step2 && !step2.classList.contains("done")) {
        step2.classList.add("done");
        const icon = step2.querySelector(".engine-step-icon");
        if (icon) {
          icon.classList.remove("active");
          icon.innerHTML = '<i class="fas fa-check"></i>';
        }
      }

      if (progress >= 100) {
        clearInterval(interval);
        if (step3) {
          step3.classList.add("active");
          const sub = step3.querySelector(".engine-step-sub");
          if (sub) sub.textContent = "Optimized layout ready";
        }
        setTimeout(() => (window.location.href = "library.html"), 2000);
      }
    }, 80);
  })();

  /* =============================
     TOPBAR ACTIVE LINK
     ============================= */
  (function initTopbarActive() {
    const nav = document.querySelector(".app-topbar-nav");
    if (!nav) return;

    const path = (location.pathname.split("/").pop() || "").toLowerCase();
    nav.querySelectorAll("a").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      const isActive =
        (path === "" && href.includes("dashboard")) ||
        (path && href.endsWith(path));
      a.classList.toggle("is-active", isActive);
    });
  })();

  /* =============================
     BILLING PAGE – Plan Selection + Save
     ============================= */
  (function initBillingPage() {
    if (!isPage("billing-page")) return;

    const KEY = "morph_billing_plan";
    const currentEl = document.getElementById("billing-current");
    const plans = Array.from(document.querySelectorAll(".pro-plan"));

    let selected = localStorage.getItem(KEY) || "Professional";

    const render = () => {
      plans.forEach((btn) => btn.classList.toggle("is-selected", btn.dataset.plan === selected));
      if (currentEl) currentEl.textContent = `Current: ${selected}`;
    };

    plans.forEach((btn) => btn.addEventListener("click", () => {
      selected = btn.dataset.plan;
      render();
    }));

    document.getElementById("billing-save")?.addEventListener("click", () => {
      localStorage.setItem(KEY, selected);
      render();
    });

    document.getElementById("billing-cancel")?.addEventListener("click", () => {
      selected = localStorage.getItem(KEY) || "Professional";
      render();
    });

    render();
  })();

 /* =============================
   TEAM PAGE (REFERENCE MATCH)
   - Keeps: sent requests modal + invite links + revoke + accept page flow
   - Adds: stats cards + members table w/ pending invites + seat usage + new invite modal UI
   ============================= */
(function initTeamPageRef() {
  if (!document.body.classList.contains("team-page")) return;

  const MEMBERS_KEY = "morph_team_members";
  const INVITES_KEY = "morph_team_invites";

  const membersTable = document.getElementById("team-table");

  const totalMembersEl = document.getElementById("team-total-members");
  const seatLimitEl = document.getElementById("team-seat-limit");
  const activeProjectsEl = document.getElementById("team-active-projects");
  const yourRoleEl = document.getElementById("team-your-role");
  const planLabelEl = document.getElementById("team-plan-label");
  const seatsLabelEl = document.getElementById("team-seats-label");

  const seatTextEl = document.getElementById("team-seat-text");
  const seatUsedEl = document.getElementById("team-seat-used");
  const seatRemainingEl = document.getElementById("team-seat-remaining");
  const seatProgressEl = document.getElementById("team-seat-progress");

  // Sent requests modal (keep your existing ids)
  const invitesTable = document.getElementById("invite-table");
  const invitesCountText = document.getElementById("invite-count");
  const invitesBadge = document.getElementById("invite-count-badge");
  const sentBackdrop = document.getElementById("sent-backdrop");
  const openSentBtn = document.getElementById("open-sent-requests");
  const closeSentBtn = document.getElementById("close-sent-requests");
  const closeSentBtn2 = document.getElementById("close-sent-requests-2");

  // Invite modal (updated UI but same ids)
  const inviteBackdrop = document.getElementById("invite-backdrop");
  const openInviteBtn = document.getElementById("open-invite-modal");
  const closeInviteBtn = document.getElementById("close-invite-modal");
  const cancelInviteBtn = document.getElementById("cancel-invite");
  const sendInviteBtn = document.getElementById("send-invite");
  const emailEl = document.getElementById("invite-email");
  const roleEl = document.getElementById("invite-role");
  const msgEl = document.getElementById("invite-message");
  const seatNoteEl = document.getElementById("invite-seat-note");
  const roleHintEl = document.getElementById("invite-role-hint");

  const toast = (msg) => {
    const wrap = document.getElementById("pro-toast-wrap");
    if (!wrap) return;
    const t = document.createElement("div");
    t.className = "pro-toast";
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  };

  const loadJSON = (key, fallback) => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
    catch { return fallback; }
  };
  const saveJSON = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  const getPlan = () => {
    // Prefer active subscription plan if you store it, else fall back to saved billing plan
    let plan =
      (loadJSON("morph_subscription", null)?.plan) ||
      localStorage.getItem("morph_billing_plan") ||
      "Studio";
    plan = String(plan).trim();
    return plan;
  };

 const seatLimitFor = (plan) => {
  // Prototype rule: allow up to 3 seats for ALL plans
  return 3;
};

  const defaultOwner = () => ({
    name: localStorage.getItem("morph_user_name") || "User",
    email: (localStorage.getItem("morph_user_email") || "user@demo.com").toLowerCase(),
    role: "Admin"
  });

  const loadMembers = () => {
    const arr = loadJSON(MEMBERS_KEY, []);
    if (!Array.isArray(arr) || arr.length === 0) return [defaultOwner()];
    return arr;
  };

  const loadInvites = () => {
    const arr = loadJSON(INVITES_KEY, []);
    return Array.isArray(arr) ? arr : [];
  };

  const makeAvatarUrl = (seedStr) => {
    const s = String(seedStr || "user").toLowerCase().trim();
    let hash = 0;
    for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
    const imgId = (hash % 70) + 1;
    return `https://i.pravatar.cc/96?img=${imgId}`;
  };

  const inviteLink = (token) => {
    const u = new URL("invite-accept.html", location.href);
    u.searchParams.set("token", token);
    return u.toString();
  };

  const openModal = (el) => el && el.classList.add("active");
  const closeModal = (el) => el && el.classList.remove("active");

  // Modal wiring
  openSentBtn?.addEventListener("click", () => openModal(sentBackdrop));
  closeSentBtn?.addEventListener("click", () => closeModal(sentBackdrop));
  closeSentBtn2?.addEventListener("click", () => closeModal(sentBackdrop));
  sentBackdrop?.addEventListener("click", (e) => { if (e.target === sentBackdrop) closeModal(sentBackdrop); });

  openInviteBtn?.addEventListener("click", () => {
    // reset fields
    if (emailEl) emailEl.value = "";
    if (msgEl) msgEl.value = "";
    if (roleEl) roleEl.value = "Editor";
    if (roleHintEl) roleHintEl.textContent = "Editors can modify architectural layouts but cannot manage billing.";

    // show seat note based on current usage
    const plan = getPlan();
    const limit = seatLimitFor(plan);
    const pending = loadInvites().filter(i => i.status === "sent").length;
    const active = loadMembers().length;
    const used = active + pending;
    const remaining = Math.max(0, limit - used);

    if (seatNoteEl) {
      seatNoteEl.textContent = `This invitation will consume 1 seat from your current ${plan} Plan. You have ${remaining} seat${remaining===1?"":"s"} remaining.`;
    }

    openModal(inviteBackdrop);
  });

  closeInviteBtn?.addEventListener("click", () => closeModal(inviteBackdrop));
  cancelInviteBtn?.addEventListener("click", () => closeModal(inviteBackdrop));
  inviteBackdrop?.addEventListener("click", (e) => { if (e.target === inviteBackdrop) closeModal(inviteBackdrop); });

  roleEl?.addEventListener("change", () => {
    const r = roleEl.value;
    if (!roleHintEl) return;
    if (r === "Admin") roleHintEl.textContent = "Admins can manage members, settings, and workspace access.";
    else if (r === "Viewer") roleHintEl.textContent = "Viewers can review outputs and comments but cannot edit.";
    else roleHintEl.textContent = "Editors can modify architectural layouts but cannot manage billing.";
  });

  const renderStats = () => {
    const plan = getPlan();
    const limit = seatLimitFor(plan);

    const members = loadMembers();
    const pendingInvites = loadInvites().filter(i => i.status === "sent");
    const used = members.length + pendingInvites.length;
    const remaining = Math.max(0, limit - used);

    if (planLabelEl) planLabelEl.textContent = `${plan} Plan`;
    if (seatsLabelEl) seatsLabelEl.textContent = `${remaining} seats available`;

    if (totalMembersEl) totalMembersEl.textContent = String(used);
    if (seatLimitEl) seatLimitEl.textContent = String(limit);

    // Active projects: derive from your saved status map keys
    const map = loadJSON("morph_project_status_map", {});
    const projectCount = map && typeof map === "object" ? Object.keys(map).length : 0;
    if (activeProjectsEl) activeProjectsEl.textContent = String(projectCount);

// Your role should be based on the logged-in user email
const meEmail = (localStorage.getItem("morph_user_email") || "").toLowerCase().trim();
const me = loadMembers().find(m => String(m.email || "").toLowerCase() === meEmail);
if (yourRoleEl) yourRoleEl.textContent = me?.role || "Member";
    // Seat usage card
    const pct = limit ? Math.min(100, Math.round((used / limit) * 100)) : 0;
    if (seatTextEl) seatTextEl.textContent = `You have used ${used} out of ${limit} available seats in your ${plan} Plan.`;
    if (seatUsedEl) seatUsedEl.textContent = String(used);
    if (seatRemainingEl) seatRemainingEl.textContent = String(remaining);
    if (seatProgressEl) seatProgressEl.style.width = `${pct}%`;
  };

  const renderMembersTable = () => {
    if (!membersTable) return;

    const members = loadMembers();
    const pendingInvites = loadInvites().filter(i => i.status === "sent");

    const rows = [];

    // Active members
    members.forEach((m) => {
      rows.push({
        kind: "member",
        name: m.name || m.email,
        email: m.email,
        role: m.role || "Viewer",
        status: "active",
        avatarUrl: (m.email === defaultOwner().email && (localStorage.getItem("morph_user_avatar") || "").trim())
          ? localStorage.getItem("morph_user_avatar")
          : makeAvatarUrl(m.email || m.name)
      });
    });

    // Pending invites appear as “Pending Invite” rows (reference behavior)
    pendingInvites.forEach((inv) => {
      rows.push({
        kind: "invite",
        name: inv.email.split("@")[0],
        email: inv.email,
        role: inv.role || "Viewer",
        status: "pending",
        token: inv.token,
        avatarUrl: makeAvatarUrl(inv.email)
      });
    });

    membersTable.innerHTML = "";

    rows.forEach((r) => {
      const roleCls = String(r.role || "").toLowerCase() === "admin" ? "admin" : "";
      const pending = r.status === "pending";

      const row = document.createElement("div");
      row.className = "team-row";
      row.innerHTML = `
        <div class="team-member">
          <div class="team-avatar"><img src="${r.avatarUrl}" alt=""></div>
          <div class="team-mmeta">
            <div class="team-mname">${r.name}</div>
            <div class="team-memail">${r.email}</div>
          </div>
        </div>

        <div>
          <span class="team-role-pill ${roleCls}">${String(r.role || "").toUpperCase()}</span>
        </div>

        <div class="team-status ${pending ? "pending" : ""}">
          <span class="team-dot-status ${pending ? "pending" : ""}"></span>
          <span>${pending ? "Pending Invite" : "Active"}</span>
        </div>

        <div>
          <button class="team-ellipsis" type="button" title="Actions">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
      `;

      // Actions: keep simple + professional (uses sent modal for pending)
      row.querySelector(".team-ellipsis").addEventListener("click", async () => {
        if (r.kind === "invite") {
          // Copy invite link
          const link = inviteLink(r.token);
          try {
            await navigator.clipboard.writeText(link);
            toast("Invite link copied");
          } catch {
            prompt("Copy invite link:", link);
          }
          return;
        }

        // Active member actions (optional): remove (preserves your current logic)
        const all = loadMembers();
        if (all.length === 1) return toast("You can’t remove the last member.");

        const email = String(r.email || "").toLowerCase();
        const next = all.filter(x => String(x.email || "").toLowerCase() !== email);
        saveJSON(MEMBERS_KEY, next);
        toast("Member removed");
        renderMembersTable();
        renderStats();
      });

      membersTable.appendChild(row);
    });
  };

  const renderSentInvitesModal = () => {
    const pending = loadInvites().filter(i => i.status === "sent");

    if (invitesBadge) invitesBadge.textContent = String(pending.length);
    if (invitesCountText) invitesCountText.textContent = `${pending.length} pending`;

    if (!invitesTable) return;
    invitesTable.innerHTML = "";

    if (pending.length === 0) {
      const empty = document.createElement("div");
      empty.style.color = "rgba(148,163,184,.9)";
      empty.style.padding = "8px 4px";
      empty.textContent = "No pending invites.";
      invitesTable.appendChild(empty);
      return;
    }

    pending.forEach((inv) => {
      const row = document.createElement("div");
      row.className = "pro-row";
      const link = inviteLink(inv.token);

      row.innerHTML = `
        <div class="pro-row-left">
          <div class="pro-avatar">${inv.email.slice(0,2).toUpperCase()}</div>
          <div style="min-width:0;">
            <div class="pro-name">${inv.email}</div>
            <div class="pro-email">Role: ${inv.role} • Status: Pending</div>
          </div>
        </div>
        <div class="pro-row-right">
          <button class="pro-btn" type="button" data-copy>Copy link</button>
          <button class="pro-btn pro-danger" type="button" data-revoke>Revoke</button>
        </div>
      `;

      row.querySelector("[data-copy]").addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(link); toast("Invite link copied"); }
        catch { prompt("Copy invite link:", link); }
      });

      row.querySelector("[data-revoke]").addEventListener("click", () => {
        const all = loadInvites();
        saveJSON(INVITES_KEY, all.filter(x => x.token !== inv.token));
        toast("Invite revoked");
        renderSentInvitesModal();
        renderMembersTable();
        renderStats();
      });

      invitesTable.appendChild(row);
    });
  };

  // Send invite (keeps your original flow + invite accept page)
  sendInviteBtn?.addEventListener("click", () => {
    const email = (emailEl?.value || "").trim().toLowerCase();
    const role = (roleEl?.value || "Viewer").trim();
    const message = (msgEl?.value || "").trim();

    if (!email) return toast("Enter an email");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast("Enter a valid email");

    // Seat limit check
    const plan = getPlan();
    const limit = seatLimitFor(plan);
    const pending = loadInvites().filter(i => i.status === "sent").length;
    const active = loadMembers().length;
    const used = active + pending;
    if (used >= limit) return toast("No seats remaining. Upgrade your plan in Billing.");

    const members = loadMembers();
    if (members.some(m => (m.email || "").toLowerCase() === email)) return toast("This user is already a member");

    const invites = loadInvites();
    if (invites.some(i => i.email === email && i.status === "sent")) return toast("Invite already sent");

    const token = (crypto?.randomUUID) ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(16).slice(2)}`;

    invites.push({
      token,
      email,
      role,
      message,
      status: "sent",
      createdAt: new Date().toISOString()
    });

    saveJSON(INVITES_KEY, invites);

    closeModal(inviteBackdrop);
    toast("Invite sent");

    renderSentInvitesModal();
    renderMembersTable();
    renderStats();
  });

  // Init
  renderSentInvitesModal();
  renderMembersTable();
  renderStats();
})();
  /* =============================
     INVITE ACCEPT PAGE – ACCEPT/DECLINE
     ============================= */
  (function initInviteAcceptPage() {
    if (!isPage("invite-accept-page")) return;

    const MEMBERS_KEY = "morph_team_members";
    const INVITES_KEY = "morph_team_invites";

    const infoEl = document.getElementById("invite-info");
    const acceptBtn = document.getElementById("accept-invite-btn");
    const declineBtn = document.getElementById("decline-invite-btn");

    const toast = (msg) => {
      const wrap = document.getElementById("pro-toast-wrap");
      if (!wrap) return;
      const t = document.createElement("div");
      t.className = "pro-toast";
      t.textContent = msg;
      wrap.appendChild(t);
      setTimeout(() => t.remove(), 2200);
    };

    const loadJSON = (key, fallback) => {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    };

    const saveJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value));

    const token = new URLSearchParams(location.search).get("token");
    const invites = loadJSON(INVITES_KEY, []);
    const invite = Array.isArray(invites) ? invites.find(i => i.token === token && i.status === "sent") : null;

    if (!token || !invite) {
      if (infoEl) infoEl.textContent = "Invalid or expired invite.";
      if (acceptBtn) acceptBtn.disabled = true;
      if (declineBtn) declineBtn.disabled = true;
      return;
    }

    if (infoEl) infoEl.textContent = `You’ve been invited as ${invite.role}: ${invite.email}`;

    acceptBtn?.addEventListener("click", () => {
      const members = loadJSON(MEMBERS_KEY, []);
      const arr = Array.isArray(members) ? members : [];

      const exists = arr.some(m => (m.email || "").toLowerCase() === invite.email.toLowerCase());
      if (!exists) {
        arr.push({
          name: invite.email.split("@")[0],
          email: invite.email,
          role: invite.role
        });
        saveJSON(MEMBERS_KEY, arr);
      }

      const nextInvites = invites.map(i =>
        i.token === token ? { ...i, status: "accepted", acceptedAt: new Date().toISOString() } : i
      );
      saveJSON(INVITES_KEY, nextInvites);

      toast("Invite accepted");
      setTimeout(() => window.location.href = "team.html", 800);
    });

    declineBtn?.addEventListener("click", () => {
      const nextInvites = invites.map(i =>
        i.token === token ? { ...i, status: "declined", declinedAt: new Date().toISOString() } : i
      );
      saveJSON(INVITES_KEY, nextInvites);

      toast("Invite declined");
      setTimeout(() => window.location.href = "team.html", 800);
    });
  })();
 /* =============================
   APP: LOGOUT BUTTON (place after Settings icon)
   ============================= */
(function addLogoutButton() {
  if (!document.body.classList.contains("app")) return;
  if (document.getElementById("app-logout-btn") || document.getElementById("app-logout-link")) return;

  const doLogout = () => {
    sessionStorage.removeItem("morph_logged_in");
    sessionStorage.removeItem("morph_user_name");
    sessionStorage.removeItem("morph_user_email");
    sessionStorage.removeItem("morph_user_avatar");
    window.location.href = "index.html";
  };

  // Prefer placing in the icon area (top-right) after the settings (cog) button
  const right = document.querySelector(".app-topbar-right");
  if (right) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "app-logout-btn";
    btn.className = "app-icon-btn";
    btn.title = "Logout";
    btn.setAttribute("aria-label", "Logout");
    btn.innerHTML = `<i class="fas fa-right-from-bracket"></i>`;
    btn.addEventListener("click", doLogout);

    // Find the settings/cog button inside topbar-right
    const settingsBtn = Array.from(right.querySelectorAll(".app-icon-btn")).find((el) =>
      el.querySelector(".fa-cog")
    );

    if (settingsBtn) {
      settingsBtn.insertAdjacentElement("afterend", btn); // ✅ directly after Settings
    } else {
      right.appendChild(btn); // fallback: far right end
    }
    return;
  }

  // Fallback: if the page uses a nav link row
  const nav = document.querySelector(".app-topbar-nav");
  if (nav) {
    const a = document.createElement("a");
    a.href = "#";
    a.id = "app-logout-link";
    a.textContent = "Logout";
    a.addEventListener("click", (e) => {
      e.preventDefault();
      doLogout();
    });

    // Insert after Settings link if present
    const settingsLink = Array.from(nav.querySelectorAll("a")).find((x) => {
      const href = (x.getAttribute("href") || "").toLowerCase();
      const txt = (x.textContent || "").trim().toLowerCase();
      return href.includes("settings.html") || txt === "settings";
    });

    if (settingsLink) settingsLink.insertAdjacentElement("afterend", a);
    else nav.appendChild(a);
  }
})();
/* =============================
   SUPPORT PAGE: FAQ ACCORDION
   ============================= */
(function initSupportFAQ(){
  if (!document.body.classList.contains("support-page")) return;

  document.querySelectorAll(".faq-item .faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      if (!item) return;

      // close others (professional behavior)
      document.querySelectorAll(".faq-item").forEach(i => {
        if (i !== item) i.classList.remove("open");
      });

      item.classList.toggle("open");
    });
  });
})();
/* =============================
   SETTINGS (REFERENCE) – FUNCTIONALITY
   ============================= */
(function initSettingsReference() {
  if (!document.body.classList.contains("settings-ref-page")) return;

  // Tabs switching (Profile/Preferences/Security)
  const tabs = Array.from(document.querySelectorAll(".settings-ref-tab[data-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-panel]"));

  const activate = (tabName) => {
    tabs.forEach(t => {
      const on = t.dataset.tab === tabName;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach(p => p.hidden = p.dataset.panel !== tabName);
  };

  tabs.forEach(t => t.addEventListener("click", () => activate(t.dataset.tab)));
  activate("profile");

  // Profile save
  const KEY_PROFILE = "morph_settings_profile";
  const $ = (id) => document.getElementById(id);

  const nameEl = $("profile-name");
  const emailEl = $("profile-email");
  const firmEl = $("profile-firm");
  const titleEl = $("profile-title");
  const bioEl = $("profile-bio");
  const statusProfile = $("settings-status-profile");

  const heroName = $("hero-display-name");
  const heroRole = $("hero-display-role");

  const loadJSON = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  };
  const saveJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  // Prefill from storage + existing user values
  const savedProfile = loadJSON(KEY_PROFILE, {});

const baseName = (sessionStorage.getItem("morph_user_name") || localStorage.getItem("morph_user_name") || "").trim();
const baseEmail = (sessionStorage.getItem("morph_user_email") || localStorage.getItem("morph_user_email") || "").trim();

if (nameEl)  nameEl.value  = (savedProfile.name  ?? baseName ?? "").trim();
if (emailEl) emailEl.value = (savedProfile.email ?? baseEmail ?? "").trim();
if (firmEl)  firmEl.value  = (savedProfile.firm  ?? "").trim();
if (titleEl) titleEl.value = (savedProfile.title ?? "").trim();
if (bioEl)   bioEl.value   = (savedProfile.bio   ?? "").trim();
  const syncHero = () => {
    if (heroName && nameEl) heroName.textContent = nameEl.value || "User";
    if (heroRole && titleEl) heroRole.textContent = (titleEl.value || "Professional") + (firmEl?.value ? ` at ${firmEl.value}` : "");
  };
  syncHero();

  $("save-profile-btn")?.addEventListener("click", () => {
    const data = {
      name: (nameEl?.value || "").trim(),
      email: (emailEl?.value || "").trim(),
      firm: (firmEl?.value || "").trim(),
      title: (titleEl?.value || "").trim(),
      bio: (bioEl?.value || "").trim(),
      savedAt: new Date().toISOString()
    };
    saveJSON(KEY_PROFILE, data);

    // Update global app personalization
    if (data.name) localStorage.setItem("morph_user_name", data.name);
    if (data.email) localStorage.setItem("morph_user_email", data.email);

    if (statusProfile) statusProfile.textContent = "Profile saved successfully.";
    syncHero();
    setTimeout(() => { if (statusProfile) statusProfile.textContent = ""; }, 2000);
    // Default profile photo: pravatar until user uploads a real one
(function setDefaultProfilePhoto(){
  const img = document.getElementById("profile-photo");
  if (!img) return;

  const uploaded = (localStorage.getItem("morph_user_avatar") || "").trim();
  if (uploaded) {
    img.src = uploaded;
    return;
  }

  // fallback pravatar based on email/name
  const name = (localStorage.getItem("morph_user_name") || "User").trim();
  const email = (localStorage.getItem("morph_user_email") || "").trim();
  const seedStr = (email || name || "user").toLowerCase();

  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) hash = (hash * 31 + seedStr.charCodeAt(i)) >>> 0;
  const imgId = (hash % 70) + 1;

  img.src = `https://i.pravatar.cc/256?img=${imgId}`;
})();
  });

  // Live sync hero when typing
  [nameEl, firmEl, titleEl].forEach(el => el && el.addEventListener("input", syncHero));

  // Quick Preferences save + persist
  const KEY_PREFS = "morph_settings_prefs";
  const rigidityEl = $("pref-rigidity");
  const bimEl = $("pref-bim");
  const statusPrefs = $("settings-status-preferences");
  const statusPrefs2 = $("settings-status-preferences-2");

  const savedPrefs = loadJSON(KEY_PREFS, { rigidity: true, bim: false });
  if (rigidityEl) rigidityEl.checked = !!savedPrefs.rigidity;
  if (bimEl) bimEl.checked = !!savedPrefs.bim;

  const savePrefs = () => {
    saveJSON(KEY_PREFS, {
      rigidity: !!rigidityEl?.checked,
      bim: !!bimEl?.checked,
      savedAt: new Date().toISOString()
    });
    if (statusPrefs) statusPrefs.textContent = "Preferences saved.";
    if (statusPrefs2) statusPrefs2.textContent = "Preferences saved.";
    setTimeout(() => {
      if (statusPrefs) statusPrefs.textContent = "";
      if (statusPrefs2) statusPrefs2.textContent = "";
    }, 2000);
  };

  $("save-preferences-btn")?.addEventListener("click", savePrefs);

  // “All preferences” button switches tab
  $("all-prefs-btn")?.addEventListener("click", () => activate("preferences"));

  // Security save (2FA + password validation simulation)
  const KEY_SEC = "morph_settings_security";
  const secPass = $("sec-pass");
  const secPass2 = $("sec-pass2");
  const sec2fa = $("sec-2fa");
  const statusSec = $("settings-status-security");

  const savedSec = loadJSON(KEY_SEC, { twofa: false });
  if (sec2fa) sec2fa.checked = !!savedSec.twofa;

  $("save-security-btn")?.addEventListener("click", () => {
    const p1 = secPass?.value || "";
    const p2 = secPass2?.value || "";

    if (p1 || p2) {
      if (p1.length < 8) {
        if (statusSec) statusSec.textContent = "Password must be at least 8 characters.";
        return;
      }
      if (p1 !== p2) {
        if (statusSec) statusSec.textContent = "Passwords do not match.";
        return;
      }
    }

    saveJSON(KEY_SEC, { twofa: !!sec2fa?.checked, savedAt: new Date().toISOString() });
    if (secPass) secPass.value = "";
    if (secPass2) secPass2.value = "";
    if (statusSec) statusSec.textContent = "Security saved.";
    setTimeout(() => { if (statusSec) statusSec.textContent = ""; }, 2000);
  });

  // Deactivate account (logs out)
  $("deactivate-btn")?.addEventListener("click", () => {
    const ok = confirm("Deactivate account? This will log you out.");
    if (!ok) return;

    sessionStorage.clear();
    window.location.href = "index.html";
  });

  // Profile photo change (real file input -> preview)
  const photoInput = $("profile-photo-input");
  $("change-photo-btn")?.addEventListener("click", () => photoInput && photoInput.click());

  photoInput?.addEventListener("change", () => {
  const file = photoInput.files && photoInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = String(reader.result || "");

    // update profile photo preview
    const img = document.getElementById("profile-photo");
    if (img) img.src = dataUrl;

    // SAVE globally so avatar works across the whole app
    localStorage.setItem("morph_user_avatar", dataUrl);
    sessionStorage.setItem("morph_user_avatar", dataUrl);

    // optional: refresh avatars instantly without reload
    document.querySelectorAll('#app-user-avatar, .settings-mini-avatar, .support-mini-avatar').forEach(el => {
      if (el.tagName.toLowerCase() === "img") el.src = dataUrl;
      else {
        el.style.backgroundImage = `url("${dataUrl}")`;
        el.classList.add("has-image");
        el.textContent = "";
      }
    });
  };
  reader.readAsDataURL(file);
});
})();
/* =============================
   SUPPORT PAGE – REAL DATA (Tutorials + FAQ)
   ============================= */
(function initSupportReal() {
  if (!document.body.classList.contains("support-page")) return;

  const TUT_KEY = "morph_support_tutorials";
  const FAQ_KEY = "morph_support_faq";

  const videosWrap = document.getElementById("support-videos");
  const faqWrap = document.getElementById("faq-list");

  const addBtn = document.getElementById("add-tutorial-btn");
  const resetBtn = document.getElementById("reset-tutorials-btn");

  const modal = document.getElementById("tutorial-modal");
  const modalClose = document.getElementById("tutorial-modal-close");
  const cancelBtn = document.getElementById("tutorial-cancel");
  const saveBtn = document.getElementById("tutorial-save");

  const titleEl = document.getElementById("tutorial-title");
  const urlEl = document.getElementById("tutorial-url");
  const thumbEl = document.getElementById("tutorial-thumb");
  const durEl = document.getElementById("tutorial-duration");

  const playerModal = document.getElementById("player-modal");
  const playerClose = document.getElementById("player-close");
  const playerTitle = document.getElementById("player-title");
  const playerBody = document.getElementById("player-body");

  const searchInput = document.querySelector(".support-search input");

  const loadJSON = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };
  const saveJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  // First-time defaults (saved once; after that user controls everything)
  const defaultTutorials = [
    {
      id: crypto.randomUUID?.() || String(Date.now()),
      title: "BIM Integration Workflow",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail: "./img/professional-blueprint.jpeg",
      duration: "15:30",
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString()
    },
    {
      id: crypto.randomUUID?.() || String(Date.now() + 1),
      title: "Real-time Lighting in Morphopolis",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail: "./img/urban-core-housing.jpg",
      duration: "08:12",
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
    }
  ];

  const defaultFaq = [
  {
    id: "f1",
    q: "How do I export my project to BIM software?",
    a: "Morphopolis supports export to IFC and other industry-standard formats. You can export files from the Export menu under File → Export. For best results, enable BIM Integration in Settings.",
    updatedAt: new Date().toISOString()
  },
  {
    id: "f2",
    q: "What are the recommended system specs for AI rendering?",
    a: "A modern CPU, 16GB+ RAM, and a dedicated GPU is recommended for best performance.",
    updatedAt: new Date().toISOString()
  },
  {
    id: "f3",
    q: "Can I share my project library with my firm?",
    a: "Yes. Team collaboration is supported through shared libraries (requires a team-enabled plan).",
    updatedAt: new Date().toISOString()
  },
  {
    id: "f4",
    q: "How accurate are the generated floor plans?",
    a: "Plans follow architectural standards and typical building constraints, but they should always be reviewed and validated before construction or permit submission.",
    updatedAt: new Date().toISOString()
  },
  {
    id: "f5",
    q: "Does Morphopolis support different architectural styles?",
    a: "Yes. Multiple style profiles are supported and can be combined in prompts to influence layout logic and visual direction.",
    updatedAt: new Date().toISOString()
  }
];
  const ensureDefaults = () => {
    const existing = loadJSON(TUT_KEY, null);
    if (!existing) saveJSON(TUT_KEY, defaultTutorials);

    const existingFaq = loadJSON(FAQ_KEY, null);
    if (!existingFaq) saveJSON(FAQ_KEY, defaultFaq);
  };

  const relTime = (iso) => {
    try {
      const diff = Date.now() - new Date(iso).getTime();
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (minutes < 60) return "Updated just now";
      if (hours < 24) return `Updated ${hours} hour${hours === 1 ? "" : "s"} ago`;
      if (days < 7) return `Updated ${days} day${days === 1 ? "" : "s"} ago`;
      const weeks = Math.floor(days / 7);
      return `Updated ${weeks} week${weeks === 1 ? "" : "s"} ago`;
    } catch {
      return "Updated recently";
    }
  };

  const parseYouTubeId = (url) => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
      if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    } catch {}
    return null;
  };

  const openPlayer = (tut) => {
    if (!playerModal || !playerBody) return;
    playerTitle.textContent = tut.title;

    playerBody.innerHTML = "";
    const yt = parseYouTubeId(tut.url);

    if (yt) {
      const iframe = document.createElement("iframe");
      iframe.width = "100%";
      iframe.height = "460";
      iframe.src = `https://www.youtube.com/embed/${yt}`;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.style.border = "0";
      iframe.style.borderRadius = "12px";
      playerBody.appendChild(iframe);
    } else {
      // fallback for mp4 links
      const video = document.createElement("video");
      video.controls = true;
      video.src = tut.url;
      video.style.width = "100%";
      video.style.borderRadius = "12px";
      playerBody.appendChild(video);
    }

    playerModal.classList.add("active");
  };

  const closePlayer = () => {
    if (!playerModal) return;
    playerModal.classList.remove("active");
    if (playerBody) playerBody.innerHTML = "";
  };

  const renderTutorials = (query = "") => {
    if (!videosWrap) return;
    const tutorials = loadJSON(TUT_KEY, []);
    const q = query.trim().toLowerCase();

    videosWrap.innerHTML = "";

    tutorials
      .filter(t => !q || t.title.toLowerCase().includes(q))
      .forEach(tut => {
        const card = document.createElement("article");
        card.className = "support-video";
        card.dataset.id = tut.id;

        card.innerHTML = `
          <img src="${tut.thumbnail || "./img/skyline-pavilion.jpg"}" alt="">
          <span class="support-time">${tut.duration || "—"}</span>
          <div class="support-video-actions">
            <button class="support-mini-action" type="button" data-del title="Delete">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
          <div class="support-video-title">${tut.title}</div>
          <div class="support-video-sub">${relTime(tut.updatedAt)}</div>
        `;

        // play on card click
        card.addEventListener("click", (e) => {
          if (e.target.closest("[data-del]")) return;
          openPlayer(tut);
        });

        // delete
        card.querySelector("[data-del]").addEventListener("click", (e) => {
          e.stopPropagation();
          const next = tutorials.filter(x => x.id !== tut.id);
          saveJSON(TUT_KEY, next);
          renderTutorials(searchInput?.value || "");
        });

        videosWrap.appendChild(card);
      });
  };

  const renderFAQ = (query = "") => {
    if (!faqWrap) return;
    const faq = loadJSON(FAQ_KEY, []);
    const q = query.trim().toLowerCase();

    faqWrap.innerHTML = "";

    faq
      .filter(item => !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q))
      .forEach(item => {
        const wrap = document.createElement("div");
        wrap.className = "faq-item";

        wrap.innerHTML = `
          <button class="faq-q" type="button">
            ${item.q}
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="faq-a">${item.a}</div>
        `;

        const qBtn = wrap.querySelector(".faq-q");
        qBtn.addEventListener("click", () => {
          // close others
          document.querySelectorAll("#faq-list .faq-item").forEach(i => {
            if (i !== wrap) i.classList.remove("open");
          });
          wrap.classList.toggle("open");
        });

        faqWrap.appendChild(wrap);
      });
  };

  // Modal open/close
  const openModal = () => modal && modal.classList.add("active");
  const closeModal = () => modal && modal.classList.remove("active");

  addBtn?.addEventListener("click", () => {
    if (titleEl) titleEl.value = "";
    if (urlEl) urlEl.value = "";
    if (thumbEl) thumbEl.value = "";
    if (durEl) durEl.value = "";
    uploadedThumbDataUrl = "";
setThumbPreview("");  // clear preview
if (thumbFileEl) thumbFileEl.value = "";
    openModal();
  });

  modalClose?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  const thumbFileEl = document.getElementById("tutorial-thumb-file");
const thumbUploadBtn = document.getElementById("thumb-upload-btn");
const thumbPreviewImg = document.getElementById("thumb-preview-img");
const thumbPreviewHint = document.getElementById("thumb-preview-hint");
  saveBtn?.addEventListener("click", () => {
  const title = (titleEl?.value || "").trim();
  const url = (urlEl?.value || "").trim();
  const thumb = (thumbEl?.value || "").trim();
  const dur = (durEl?.value || "").trim();

  if (!title || !url) return;

  const tutorials = loadJSON(TUT_KEY, []);

  // Pick thumbnail priority:
  // 1) uploaded image (DataURL)
  // 2) typed thumbnail URL
  // 3) auto YouTube thumbnail from video URL
  // 4) fallback placeholder
  const autoThumb = youTubeThumb(url);
  const finalThumb =
    uploadedThumbDataUrl ||
    (thumb ? thumb : "") ||
    autoThumb ||
    "./img/skyline-pavilion.jpg";

  tutorials.unshift({
    id: crypto.randomUUID?.() || String(Date.now()),
    title,
    url,
    thumbnail: finalThumb,
    duration: dur || "—",
    updatedAt: new Date().toISOString()
  });

  saveJSON(TUT_KEY, tutorials);
  closeModal();
  renderTutorials(searchInput?.value || "");
});
  // Reset tutorials to default
  resetBtn?.addEventListener("click", () => {
    const ok = confirm("Reset tutorials to default?");
    if (!ok) return;
    saveJSON(TUT_KEY, defaultTutorials);
    renderTutorials(searchInput?.value || "");
  });

  // Player close
  playerClose?.addEventListener("click", closePlayer);
  playerModal?.addEventListener("click", (e) => { if (e.target === playerModal) closePlayer(); });

  // Search filters tutorials + FAQ in real time
  searchInput?.addEventListener("input", () => {
    const q = searchInput.value || "";
    renderTutorials(q);
    renderFAQ(q);
  });
  const youTubeThumb = (url) => {
  const yt = parseYouTubeId(url);
  return yt ? `https://img.youtube.com/vi/${yt}/hqdefault.jpg` : "";
};

// Keeps the preview UI updated
const setThumbPreview = (src) => {
  if (!thumbPreviewImg || !thumbPreviewHint) return;
  if (src) {
    thumbPreviewImg.src = src;
    thumbPreviewImg.style.display = "block";
    thumbPreviewHint.style.display = "none";
  } else {
    thumbPreviewImg.removeAttribute("src");
    thumbPreviewImg.style.display = "none";
    thumbPreviewHint.style.display = "flex";
  }
};
let uploadedThumbDataUrl = ""; // stored only for this modal session

thumbUploadBtn?.addEventListener("click", () => {
  if (thumbFileEl) thumbFileEl.click();
});

thumbFileEl?.addEventListener("change", () => {
  const file = thumbFileEl.files && thumbFileEl.files[0];
  if (!file) return;

  // Store thumbnail as DataURL (local, persistent). Note: large images can increase storage usage.
  const reader = new FileReader();
  reader.onload = () => {
    uploadedThumbDataUrl = String(reader.result || "");
    setThumbPreview(uploadedThumbDataUrl);
  };
  reader.readAsDataURL(file);
});
thumbEl?.addEventListener("input", () => {
  // if user types/pastes thumbnail URL
  const v = (thumbEl.value || "").trim();
  uploadedThumbDataUrl = ""; // typed URL overrides any uploaded image in this session
  setThumbPreview(v);
});

urlEl?.addEventListener("input", () => {
  // auto thumbnail suggestion from YouTube
  const url = (urlEl.value || "").trim();
  if (!uploadedThumbDataUrl && !(thumbEl?.value || "").trim()) {
    const auto = youTubeThumb(url);
    setThumbPreview(auto);
  }
});
  // init
  ensureDefaults();
  renderTutorials("");
  renderFAQ("");
})();
/* =============================
   SUPPORT: Ticket submit + real attachments (IndexedDB)
   ============================= */
(function initSupportTickets() {
  if (!document.body.classList.contains("support-page")) return;

  const subjectEl = document.getElementById("support-subject");
  const typeEl = document.getElementById("support-project-type");
  const descEl = document.getElementById("support-description");

  const dropEl = document.getElementById("support-attach-drop");
  const inputEl = document.getElementById("support-attach-input");
  const listEl = document.getElementById("support-attach-list");
  const submitBtn = document.getElementById("support-submit-ticket");
  const statusEl = document.getElementById("support-ticket-status");

  if (!dropEl || !inputEl || !listEl || !submitBtn) return;

  const TICKETS_KEY = "morph_support_tickets";
  const DB_NAME = "morphopolis_support";
  const DB_STORE = "attachments";

  const selected = []; // {id, file, name, size, type}

  const setStatus = (msg, type = "") => {
    if (!statusEl) return;
    statusEl.className = "support-ticket-status" + (type ? ` ${type}` : "");
    statusEl.textContent = msg || "";
  };

  const formatBytes = (bytes) => {
    const units = ["B","KB","MB","GB"];
    let i = 0, v = bytes;
    while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
    return `${v.toFixed(v >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
  };

  const iconFor = (name) => {
    const n = (name || "").toLowerCase();
    if (n.endsWith(".pdf")) return "fa-file-pdf";
    if (n.endsWith(".doc") || n.endsWith(".docx")) return "fa-file-word";
    if (n.endsWith(".png") || n.endsWith(".jpg") || n.endsWith(".jpeg")) return "fa-file-image";
    if (n.endsWith(".ifc") || n.endsWith(".morph")) return "fa-file-lines";
    return "fa-file";
  };

  // ---------- IndexedDB helpers ----------
  const openDB = () => new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) return reject(new Error("IndexedDB not supported"));

    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

  const putAttachment = async (id, file) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, "readwrite");
      tx.objectStore(DB_STORE).put({
        id,
        name: file.name,
        type: file.type,
        size: file.size,
        blob: file
      });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  };

  // ---------- UI rendering ----------
  const renderList = () => {
    listEl.innerHTML = "";

    if (selected.length === 0) return;

    selected.forEach((a, idx) => {
      const row = document.createElement("div");
      row.className = "support-attach-item";

      row.innerHTML = `
        <div class="support-attach-left">
          <div class="support-attach-icon"><i class="fa-solid ${iconFor(a.name)}"></i></div>
          <div class="support-attach-meta">
            <div class="support-attach-name">${a.name}</div>
            <div class="support-attach-sub">${formatBytes(a.size)}</div>
          </div>
        </div>
        <button class="support-attach-remove" type="button">Remove</button>
      `;

      row.querySelector("button").addEventListener("click", () => {
        selected.splice(idx, 1);
        renderList();
      });

      listEl.appendChild(row);
    });
  };

  // ---------- file picking ----------
  const addFiles = (files) => {
    const arr = Array.from(files || []);
    arr.forEach((file) => {
      const id = (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(16).slice(2)}`);
      selected.push({ id, file, name: file.name, size: file.size, type: file.type });
    });
    renderList();
  };

  dropEl.addEventListener("click", () => inputEl.click());
  dropEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputEl.click();
    }
  });

  inputEl.addEventListener("change", () => {
    addFiles(inputEl.files);
    inputEl.value = "";
  });

  // Drag & drop
  dropEl.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropEl.classList.add("is-dragover");
  });
  dropEl.addEventListener("dragleave", () => dropEl.classList.remove("is-dragover"));
  dropEl.addEventListener("drop", (e) => {
    e.preventDefault();
    dropEl.classList.remove("is-dragover");
    addFiles(e.dataTransfer.files);
  });

  // ---------- submit ticket ----------
  const loadTickets = () => {
    try {
      const raw = localStorage.getItem(TICKETS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const saveTickets = (tickets) => localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));

  submitBtn.addEventListener("click", async () => {
    const subject = (subjectEl?.value || "").trim();
    const projectType = (typeEl?.value || "").trim();
    const description = (descEl?.value || "").trim();

    if (!subject || !description) {
      setStatus("Please enter subject and description.", "err");
      return;
    }

    submitBtn.disabled = true;
    setStatus("Submitting ticket…", "");

    // store attachments in IndexedDB (real file storage)
    try {
      for (const a of selected) {
        await putAttachment(a.id, a.file);
      }
    } catch (err) {
      // still allow ticket submit even if attachments can't be stored
      console.warn("Attachment storage failed:", err);
    }

    const ticket = {
      id: (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(16).slice(2)}`),
      subject,
      projectType,
      description,
      attachments: selected.map(a => ({ id: a.id, name: a.name, size: a.size, type: a.type })),
      status: "open",
      createdAt: new Date().toISOString()
    };

    const tickets = loadTickets();
    tickets.unshift(ticket);
    saveTickets(tickets);

    // Reset UI
    if (subjectEl) subjectEl.value = "";
    if (descEl) descEl.value = "";
    selected.length = 0;
    renderList();

    submitBtn.disabled = false;
    setStatus("Ticket submitted successfully.", "ok");
    setTimeout(() => setStatus(""), 2500);
  });
})();
/* =============================
   COMMUNITY + STATUS + RELEASE NOTES (Functional, persistent)
   ============================= */
(function initFooterPages() {

  const loadJSON = (key, fallback) => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
    catch { return fallback; }
  };
  const saveJSON = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  const relTime = (iso) => {
    try {
      const diff = Date.now() - new Date(iso).getTime();
      const h = Math.floor(diff / (1000*60*60));
      const d = Math.floor(diff / (1000*60*60*24));
      if (h < 24) return `${h <= 1 ? 1 : h}h ago`;
      return `${d <= 1 ? 1 : d}d ago`;
    } catch { return "recently"; }
  };

  /* ---------- Community ---------- */
  /* ---------- Community (Posts + Replies) ---------- */
if (document.body.classList.contains("community-page")) {
  const KEY = "morph_forum_posts";

  const list = document.getElementById("forum-list");
  const count = document.getElementById("forum-count");
  const search = document.getElementById("forum-search");

  const modal = document.getElementById("forum-modal");
  const openBtn = document.getElementById("new-post-btn");
  const closeBtn = document.getElementById("forum-modal-close");
  const cancelBtn = document.getElementById("post-cancel");
  const publishBtn = document.getElementById("post-publish");

  const titleEl = document.getElementById("post-title");
  const catEl = document.getElementById("post-category");
  const bodyEl = document.getElementById("post-body");

  // Topic modal elements
  const topicModal = document.getElementById("topic-modal");
  const topicClose = document.getElementById("topic-close");
  const topicTitle = document.getElementById("topic-title");
  const topicSub = document.getElementById("topic-sub");
  const topicBody = document.getElementById("topic-body");
  const replyList = document.getElementById("reply-list");
  const replyInput = document.getElementById("reply-input");
  const replySend = document.getElementById("reply-send");
  const replyCancel = document.getElementById("reply-cancel");

  const loadJSON = (k, fallback) => {
    try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : fallback; }
    catch { return fallback; }
  };
  const saveJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  const relTime = (iso) => {
    try {
      const diff = Date.now() - new Date(iso).getTime();
      const h = Math.floor(diff / (1000*60*60));
      const d = Math.floor(diff / (1000*60*60*24));
      if (h < 24) return `${Math.max(1,h)}h ago`;
      return `${Math.max(1,d)}d ago`;
    } catch { return "recently"; }
  };

  // Seed ONLY if empty (so user data becomes the default)
  const seedIfEmpty = () => {
    const existing = loadJSON(KEY, null);
    if (existing && Array.isArray(existing) && existing.length) return;

    saveJSON(KEY, []);
  };

  // Normalize old format (if some posts had replies number instead of array)
  const normalize = (posts) => posts.map(p => ({
    ...p,
    replies: Array.isArray(p.replies) ? p.replies : []
  }));

  const openTopic = (postId) => {
    const posts = normalize(loadJSON(KEY, []));
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    topicTitle.textContent = post.title;
    topicSub.textContent = `${post.category} • ${post.author} • ${relTime(post.createdAt)}`;
    topicBody.textContent = post.body;

    // render replies
    replyList.innerHTML = "";
    if (!post.replies.length) {
      const empty = document.createElement("div");
      empty.style.color = "rgba(148,163,184,.9)";
      empty.textContent = "No replies yet. Be the first to reply.";
      replyList.appendChild(empty);
    } else {
      post.replies.forEach(r => {
        const item = document.createElement("div");
        item.className = "reply-item";
        item.innerHTML = `
          <div class="reply-meta">${r.author} • ${relTime(r.createdAt)}</div>
          <div class="reply-text">${r.text}</div>
        `;
        replyList.appendChild(item);
      });
    }

    topicModal.classList.add("active");

    // reply submit
    replySend.onclick = () => {
      const text = (replyInput.value || "").trim();
      if (!text) return;

      const posts2 = normalize(loadJSON(KEY, []));
      const i = posts2.findIndex(p => p.id === postId);
      if (i === -1) return;

      posts2[i].replies.unshift({
        id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
        author: localStorage.getItem("morph_user_name") || "User",
        text,
        createdAt: new Date().toISOString()
      });

      saveJSON(KEY, posts2);
      replyInput.value = "";
      openTopic(postId);   // re-render modal
      render();            // update replies count on list
    };

    replyCancel.onclick = () => {
      replyInput.value = "";
      topicModal.classList.remove("active");
    };
  };

  const render = () => {
    const posts = normalize(loadJSON(KEY, []));
    const q = (search?.value || "").trim().toLowerCase();

    const filtered = posts.filter(p =>
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.body.toLowerCase().includes(q)
    );

    if (count) count.textContent = `${filtered.length} topic${filtered.length === 1 ? "" : "s"}`;
    if (!list) return;

    list.innerHTML = "";

    if (!filtered.length) {
      const empty = document.createElement("div");
      empty.style.color = "rgba(148,163,184,.9)";
      empty.style.padding = "8px 4px";
      empty.textContent = "No topics yet. Create the first post.";
      list.appendChild(empty);
      return;
    }

    filtered.forEach(p => {
      const repliesCount = (p.replies || []).length;

      const el = document.createElement("div");
      el.className = "forum-item";

      el.innerHTML = `
        <div style="min-width:0;">
          <div class="forum-title">${p.title}</div>
          <div class="forum-meta">
            <span class="forum-pill">${p.category}</span>
            &nbsp;•&nbsp; ${p.author} • ${relTime(p.createdAt)}
          </div>
        </div>

        <div class="forum-right">
          <button class="forum-replies-btn" type="button" data-open="${p.id}">
            ${repliesCount} repl${repliesCount === 1 ? "y" : "ies"}
          </button>
        </div>
      `;

      el.querySelector("[data-open]").addEventListener("click", () => openTopic(p.id));
      list.appendChild(el);
    });
  };

  // Create post modal
  const open = () => modal.classList.add("active");
  const close = () => modal.classList.remove("active");

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  cancelBtn?.addEventListener("click", close);
  modal?.addEventListener("click", (e) => { if (e.target === modal) close(); });

  publishBtn?.addEventListener("click", () => {
    const title = (titleEl.value || "").trim();
    const category = (catEl.value || "How-to").trim();
    const body = (bodyEl.value || "").trim();
    if (!title || !body) return;

    const posts = normalize(loadJSON(KEY, []));
    posts.unshift({
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title,
      category,
      body,
      author: localStorage.getItem("morph_user_name") || "User",
      createdAt: new Date().toISOString(),
      replies: []
    });

    saveJSON(KEY, posts);
    titleEl.value = "";
    bodyEl.value = "";
    close();
    render();
  });

  // Close topic modal
  topicClose?.addEventListener("click", () => topicModal.classList.remove("active"));
  topicModal?.addEventListener("click", (e) => { if (e.target === topicModal) topicModal.classList.remove("active"); });

  search?.addEventListener("input", render);

  seedIfEmpty();
  render();
}
  /* ---------- Status ---------- */
  if (document.body.classList.contains("status-page")) {
    const KEY = "morph_status_data";
    const bannerTitle = document.getElementById("status-title");
    const bannerSub = document.getElementById("status-sub");
    const dot = document.getElementById("status-dot");
    const comps = document.getElementById("status-components");
    const incidentsEl = document.getElementById("incident-list");
    const incidentCount = document.getElementById("incident-count");

    const seed = () => {
      const existing = loadJSON(KEY, null);
      if (existing) return;
      saveJSON(KEY, {
        components: [
          { name: "Prompt Engine", status: "ok" },
          { name: "2D Generator", status: "ok" },
          { name: "3D Render Queue", status: "ok" },
          { name: "Exports (IFC/DWG)", status: "ok" },
        ],
        incidents: []
      });
    };

    const render = () => {
      const data = loadJSON(KEY, { components: [], incidents: [] });
      const anyDown = data.components.some(c => c.status === "down");
      const anyWarn = data.components.some(c => c.status === "warn");

      const state = anyDown ? "down" : anyWarn ? "warn" : "ok";
      if (dot) dot.style.background = state === "ok" ? "#22c55e" : state === "warn" ? "#facc15" : "#ef4444";

      if (bannerTitle) bannerTitle.textContent =
        state === "ok" ? "All Systems Operational" :
        state === "warn" ? "Partial Degradation" : "Major Outage";

      if (bannerSub) bannerSub.textContent =
        data.incidents.length ? `Latest incident: ${data.incidents[0].title}` : "No incidents reported recently.";

      if (comps) {
        comps.innerHTML = "";
        data.components.forEach(c => {
          const el = document.createElement("div");
          el.className = "status-comp";
          el.innerHTML = `
            <div style="font-weight:850;">${c.name}</div>
            <span class="status-pill ${c.status}">${c.status === "ok" ? "Operational" : c.status === "warn" ? "Degraded" : "Down"}</span>
          `;
          comps.appendChild(el);
        });
      }

      if (incidentCount) incidentCount.textContent = `${data.incidents.length} incidents`;
      if (incidentsEl) {
        incidentsEl.innerHTML = "";
        if (!data.incidents.length) {
          const empty = document.createElement("div");
          empty.style.color = "rgba(148,163,184,.9)";
          empty.style.padding = "8px 4px";
          empty.textContent = "No incidents to show.";
          incidentsEl.appendChild(empty);
        } else {
          data.incidents.forEach(i => {
            const el = document.createElement("div");
            el.className = "incident-item";
            el.innerHTML = `
              <div class="t">${i.title}</div>
              <div class="m">${i.message}</div>
              <div class="m" style="opacity:.9;">${new Date(i.createdAt).toLocaleString()}</div>
            `;
            incidentsEl.appendChild(el);
          });
        }
      }
    };

    document.getElementById("status-refresh")?.addEventListener("click", render);

    seed();
    render();
  }

  /* ---------- Release Notes ---------- */
  if (document.body.classList.contains("release-page")) {
    const KEY = "morph_release_notes";
    const list = document.getElementById("release-list");
    const count = document.getElementById("release-count");
    const search = document.getElementById("release-search");

    const seed = () => {
      const existing = loadJSON(KEY, null);
      if (existing) return;
      saveJSON(KEY, [
        { ver: "v2.8.0", date: "2026-02-10", items: ["Improved dashboard filtering performance", "New Support center module", "Better draft persistence for New Project"] },
        { ver: "v2.7.4", date: "2026-01-22", items: ["Engine progress UI refinements", "Stability fixes across navigation", "Visual polish for project cards"] },
        { ver: "v2.7.0", date: "2026-01-05", items: ["New Project parameters panel improvements", "Search + tab filtering combined behavior", "Auth UI improvements"] }
      ]);
    };

    const render = () => {
      const releases = loadJSON(KEY, []);
      const q = (search?.value || "").trim().toLowerCase();
      const filtered = releases.filter(r => !q || r.ver.toLowerCase().includes(q) || r.items.join(" ").toLowerCase().includes(q));

      if (count) count.textContent = `${filtered.length} releases`;
      if (!list) return;

      list.innerHTML = "";
      filtered.forEach(r => {
        const el = document.createElement("div");
        el.className = "release-item";
        el.innerHTML = `
          <div class="release-top">
            <div class="release-ver">${r.ver}</div>
            <div class="release-date">${r.date}</div>
          </div>
          <ul class="release-bullets">
            ${r.items.map(x => `<li>${x}</li>`).join("")}
          </ul>
        `;
        list.appendChild(el);
      });
    };

    search?.addEventListener("input", render);

    seed();
    render();
  }
})();
/* =============================
   SYSTEM STATUS PAGE – INIT + REFRESH (WORKING)
   ============================= */
(function initStatusPage() {
  if (!document.body.classList.contains("status-page")) return;

  const KEY = "morph_status_data";

  const bannerTitle = document.getElementById("status-title");
  const bannerSub = document.getElementById("status-sub");
  const dot = document.getElementById("status-dot");

  const comps = document.getElementById("status-components");
  const incidentsEl = document.getElementById("incident-list");
  const incidentCount = document.getElementById("incident-count");

  const refreshBtn = document.getElementById("status-refresh");

  const loadJSON = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };

  const saveJSON = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  // Seed defaults once (so it’s not dummy later; it becomes user state)
  const seed = () => {
    const existing = loadJSON(KEY, null);
    if (existing) return;

    saveJSON(KEY, {
      components: [
        { name: "Prompt Engine", status: "ok" },
        { name: "2D Generator", status: "ok" },
        { name: "3D Render Queue", status: "ok" },
        { name: "Exports (IFC/DWG)", status: "ok" },
      ],
      incidents: []
    });
  };

  const render = () => {
    const data = loadJSON(KEY, { components: [], incidents: [] });

    const anyDown = data.components.some(c => c.status === "down");
    const anyWarn = data.components.some(c => c.status === "warn");

    const state = anyDown ? "down" : anyWarn ? "warn" : "ok";

    if (dot) {
      dot.style.background = state === "ok" ? "#22c55e" : state === "warn" ? "#facc15" : "#ef4444";
    }

    if (bannerTitle) {
      bannerTitle.textContent =
        state === "ok" ? "All Systems Operational" :
        state === "warn" ? "Partial Degradation" : "Major Outage";
    }

    if (bannerSub) {
      bannerSub.textContent =
        data.incidents.length ? `Latest incident: ${data.incidents[0].title}` : "No incidents reported recently.";
    }

    if (comps) {
      comps.innerHTML = "";
      data.components.forEach(c => {
        const el = document.createElement("div");
        el.className = "status-comp";
        el.innerHTML = `
          <div style="font-weight:600;">${c.name}</div>
          <span class="status-pill ${c.status}">
            ${c.status === "ok" ? "Operational" : c.status === "warn" ? "Degraded" : "Down"}
          </span>
        `;
        comps.appendChild(el);
      });
    }

    if (incidentCount) incidentCount.textContent = `${data.incidents.length} incidents`;

    if (incidentsEl) {
      incidentsEl.innerHTML = "";
      if (!data.incidents.length) {
        const empty = document.createElement("div");
        empty.style.color = "rgba(148,163,184,.9)";
        empty.style.padding = "8px 4px";
        empty.textContent = "No incidents to show.";
        incidentsEl.appendChild(empty);
      } else {
        data.incidents.forEach(i => {
          const el = document.createElement("div");
          el.className = "incident-item";
          el.innerHTML = `
            <div class="t">${i.title}</div>
            <div class="m">${i.message}</div>
            <div class="m" style="opacity:.9;">${new Date(i.createdAt).toLocaleString()}</div>
          `;
          incidentsEl.appendChild(el);
        });
      }
    }
  };

  // ✅ Refresh button functionality
  if (refreshBtn) {
    refreshBtn.addEventListener("click", (e) => {
      e.preventDefault();
      render();
    });
  }

  seed();
  render();
})();
/* =============================
   NOTIFICATIONS PAGE – REALTIME (LocalStorage-driven)
   ============================= */
(function initNotificationsCenter(){
  if (!document.body.classList.contains("notifications-page")) return;

  const KEY = "morph_notifications";
  const COLLAB_KEY = "morph_notif_collaborators";
  const SESSION_KEY = "morph_notif_active_session";

  const feedEl = document.getElementById("notif-feed");
  const unreadCountEl = document.getElementById("notif-unread-count");
  const searchEl = document.getElementById("notif-search");
  const markAllBtn = document.getElementById("notif-mark-all");

  const tabs = Array.from(document.querySelectorAll(".notif-tab"));
  const chips = Array.from(document.querySelectorAll(".notif-chip"));

  const activeSessionCard = document.getElementById("active-session-card");
  const collabAvatars = document.getElementById("collab-avatars");
  const collabList = document.getElementById("collab-list");

  // collaborator modal
  const collabModal = document.getElementById("collab-modal");
  const collabOpen = document.getElementById("collab-add-btn");
  const collabClose = document.getElementById("collab-modal-close");
  const collabCancel = document.getElementById("collab-cancel");
  const collabSave = document.getElementById("collab-save");
  const collabName = document.getElementById("collab-name");
  const collabRole = document.getElementById("collab-role");

  const loadJSON = (k, fallback) => { try{ const r = localStorage.getItem(k); return r?JSON.parse(r):fallback; }catch{return fallback;} };
  const saveJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  const nowISO = () => new Date().toISOString();
  const minutesAgoISO = (m) => new Date(Date.now() - m*60*1000).toISOString();
  const hoursAgoISO = (h) => new Date(Date.now() - h*60*60*1000).toISOString();

  const relTime = (iso) => {
    const t = new Date(iso).getTime();
    const diff = Date.now() - t;
    const m = Math.floor(diff/60000);
    if (m < 60) return `${Math.max(1,m)}m ago`;
    const h = Math.floor(m/60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h/24);
    return `${d}d ago`;
  };

  const startOfDay = (d) => {
    const x = new Date(d); x.setHours(0,0,0,0); return x.getTime();
  };

  const slug = (s)=>String(s||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

  const seed = () => {
    const existing = loadJSON(KEY, null);
    if (existing) return;

    const userName = localStorage.getItem("morph_user_name") || "You";
    const lastPrompt = (localStorage.getItem("morph_last_prompt") || "").trim();

    const projectName = lastPrompt
      ? `AI Concept: ${lastPrompt.split(" ").slice(0,4).join(" ")}…`
      : "Urban Pavilion V2";

    const projectId = slug(projectName).slice(0,14) || "urban-pav-v2";

    const seeded = [
      {
        id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
        type: "ai",
        title: "AI Generation Complete",
        message: `Your latest output for “${projectName}” is ready. 12 alternative viewpoints were generated based on your constraints.`,
        project: { id: projectId, name: projectName },
        createdAt: minutesAgoISO(2),
        read: false,
        archived: false,
        actions: [{key:"review", label:"Review Results"},{key:"dismiss", label:"Dismiss"}]
      },
      {
        id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()+1),
        type: "team",
        title: "Project Shared",
        message: `A collaborator shared “Skyline Residency Phase 1” with you as an Editor.`,
        project: { id: "skyline-res-1", name: "Skyline Residency Phase 1" },
        createdAt: hoursAgoISO(1),
        read: false,
        archived: false,
        actions: []
      },
      {
        id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()+2),
        type: "approvals",
        title: "Design Approved",
        message: `Structural Engineer approved the cantilever designs for the East Wing. Proceed to technical documentation.`,
        project: { id: "east-wing", name: "East Wing" },
        createdAt: hoursAgoISO(4),
        read: true,
        archived: false,
        actions: []
      },
      {
        id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()+3),
        type: "system",
        title: "Platform Update",
        message: `A new toolset for topography mapping and solar analysis has been added to your toolkit.`,
        project: null,
        createdAt: hoursAgoISO(24),
        read: true,
        archived: false,
        actions: [{key:"release", label:"Read release notes"}]
      }
    ];

    saveJSON(KEY, seeded);

    // seed collaborators
    if (!loadJSON(COLLAB_KEY, null)) {
      saveJSON(COLLAB_KEY, [
        { id:"c1", name: localStorage.getItem("morph_user_name") || "User", role:"Senior Architect", online:true },
        { id:"c2", name:"Julian Vane", role:"Senior Architect", online:true },
        { id:"c3", name:"Sarah Meyer", role:"Editor", online:false },
        { id:"c4", name:"David Chen", role:"Engineer", online:true },
      ]);
    }

    // seed active session
    if (!loadJSON(SESSION_KEY, null)) {
      saveJSON(SESSION_KEY, {
        projectName,
        progress: 0.85,
        subtitle: "Optimization in progress"
      });
    }
  };

  let state = {
    tab: "all",       // all | unread | archived
    type: "all",      // all | ai | team | approvals
    query: ""
  };

  const getData = () => loadJSON(KEY, []);
  const setData = (arr) => saveJSON(KEY, arr);

  const updateUnreadCount = () => {
    const d = getData().filter(n => !n.archived);
    const unread = d.filter(n => !n.read).length;
    if (unreadCountEl) unreadCountEl.textContent = String(unread);
  };

  const iconClass = (type) => {
    if (type === "ai") return { cls:"ai", icon:"fa-wand-magic-sparkles" };
    if (type === "team") return { cls:"team", icon:"fa-share-nodes" };
    if (type === "approvals") return { cls:"approvals", icon:"fa-badge-check" };
    return { cls:"", icon:"fa-gear" };
  };

  const matchesQuery = (n, q) => {
    if (!q) return true;
    const text = `${n.title} ${n.message} ${(n.project?.name||"")} ${(n.project?.id||"")}`.toLowerCase();

    // allow #project-id search
    if (q.startsWith("#")) {
      const pid = q.slice(1);
      return (n.project?.id || "").toLowerCase().includes(pid);
    }
    return text.includes(q);
  };

  const filtered = () => {
    const q = state.query.trim().toLowerCase();
    return getData().filter(n => {
      if (state.tab === "unread" && (n.read || n.archived)) return false;
      if (state.tab === "archived" && !n.archived) return false;
      if (state.tab === "all" && n.archived) return false;

      if (state.type !== "all" && n.type !== state.type) return false;

      return matchesQuery(n, q);
    });
  };

  const groupLabel = (iso) => {
    const t = new Date(iso);
    const today = startOfDay(new Date());
    const day = startOfDay(t);
    if (day === today) return "TODAY";
    if (day === today - 86400000) return "YESTERDAY";
    return "EARLIER";
  };

  const renderFeed = () => {
    if (!feedEl) return;
    const items = filtered().sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));

    feedEl.innerHTML = "";

    if (!items.length){
      const empty = document.createElement("div");
      empty.style.color = "rgba(148,163,184,.9)";
      empty.style.padding = "10px 0";
      empty.textContent = "No notifications found.";
      feedEl.appendChild(empty);
      updateUnreadCount();
      return;
    }

    let lastGroup = "";
    items.forEach(n => {
      const grp = groupLabel(n.createdAt);
      if (grp !== lastGroup){
        const lbl = document.createElement("div");
        lbl.className = "notif-group-label";
        lbl.textContent = grp;
        feedEl.appendChild(lbl);
        lastGroup = grp;
      }

      const {cls, icon} = iconClass(n.type);

      const card = document.createElement("div");

// Make “AI Generation Complete” a highlighted HERO card (reference style)
const isAiHero =
  n.type === "ai" &&
  String(n.title || "").toLowerCase().includes("ai generation complete");

card.className = isAiHero ? "notif-card notif-hero" : "notif-card";
      card.dataset.id = n.id;

      if (!n.read && !n.archived) {
        const dot = document.createElement("div");
        dot.className = "notif-dot";
        card.appendChild(dot);
      }

      card.innerHTML += `
        <div class="notif-iconbox ${cls}">
          <i class="fa-solid ${icon}"></i>
        </div>
        <div class="notif-card-body">
          <div class="notif-title">${n.title}</div>
          <div class="notif-msg">${n.message}</div>

          ${n.actions?.length ? `
            <div class="notif-actions">
              ${n.actions.map(a => {
                const primary = a.key === "review" ? "primary" : (a.key === "dismiss" ? "ghost" : "ghost");
                return `<button class="notif-btn ${primary}" type="button" data-action="${a.key}">${a.label}</button>`;
              }).join("")}
            </div>
          ` : ""}

          <div class="notif-meta">
            <span>${n.project ? `#${n.project.id}` : ""}</span>
            <span>${relTime(n.createdAt)}</span>
          </div>
        </div>
      `;

      // click card marks read (non-archived)
      card.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-action]");
        if (btn) return; // handled below
        const data = getData();
        const i = data.findIndex(x => x.id === n.id);
        if (i >= 0 && !data[i].archived) {
          data[i].read = true;
          setData(data);
          updateUnreadCount();
          renderFeed();
        }
      });

      // action buttons
      card.querySelectorAll("button[data-action]").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const action = btn.dataset.action;
          if (action === "release") {
  window.location.href = "release-notes.html";
  return;
}
          const data = getData();
          const i = data.findIndex(x => x.id === n.id);
          if (i < 0) return;

          if (action === "dismiss") {
            data[i].archived = true;
          } else if (action === "review") {
            data[i].read = true;
            // route to library as "results"
            window.location.href = "library.html";
            return;
          } else if (action === "release") {
            window.location.href = "release-notes.html";
            return;
          }

          setData(data);
          updateUnreadCount();
          renderFeed();
        });
      });

      feedEl.appendChild(card);
    });

    updateUnreadCount();
  };

  const renderActiveSession = () => {
    if (!activeSessionCard) return;
    const s = loadJSON(SESSION_KEY, null);
    if (!s) { activeSessionCard.innerHTML = ""; return; }

    const pct = Math.round((s.progress || 0) * 100);

    activeSessionCard.innerHTML = `
      <div class="active-title">${s.projectName || "Active Project"}</div>
      <div class="active-sub">${s.subtitle || ""} ${pct}% complete</div>
      <div class="active-bar"><div style="width:${pct}%;"></div></div>
      <button class="active-open" type="button" id="open-active-project">Open Project</button>
    `;

    const btn = document.getElementById("open-active-project");
    btn?.addEventListener("click", () => window.location.href = "dashboard.html");
  };

  const renderCollaborators = () => {
    const c = loadJSON(COLLAB_KEY, []);
    if (collabAvatars) {
      collabAvatars.innerHTML = "";
      c.slice(0,4).forEach(x => {
        const a = document.createElement("div");
        a.className = "collab-avatar";
        a.textContent = (x.name || "U").trim().split(/\s+/).slice(0,2).map(s=>s[0]?.toUpperCase()).join("");
        collabAvatars.appendChild(a);
      });
      if (c.length > 4){
        const more = document.createElement("div");
        more.className = "collab-avatar";
        more.textContent = `+${c.length-4}`;
        collabAvatars.appendChild(more);
      }
    }

    if (collabList) {
      collabList.innerHTML = "";
      c.forEach(x => {
        const row = document.createElement("div");
        row.className = "collab-item";
        row.innerHTML = `
          <div class="collab-left">
            <div class="collab-avatar">${(x.name||"U").trim().split(/\s+/).slice(0,2).map(s=>s[0]?.toUpperCase()).join("")}</div>
            <div style="min-width:0;">
              <div class="collab-name">${x.name}</div>
              <div class="collab-role">${x.role || ""}</div>
            </div>
          </div>
          <div class="collab-dot ${x.online ? "" : "off"}"></div>
        `;
        collabList.appendChild(row);
      });
    }
  };

  const openModal = () => collabModal?.classList.add("active");
  const closeModal = () => collabModal?.classList.remove("active");

  collabOpen?.addEventListener("click", openModal);
  collabClose?.addEventListener("click", closeModal);
  collabCancel?.addEventListener("click", closeModal);
  collabModal?.addEventListener("click", (e)=>{ if(e.target===collabModal) closeModal(); });

  collabSave?.addEventListener("click", () => {
  const name = (collabName?.value || "").trim();
  const role = (collabRole?.value || "").trim();
  if (!name) return;

  const arr = loadJSON(COLLAB_KEY, []);
  arr.unshift({
    id: (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(16).slice(2)}`),
    name,
    role: role || "Collaborator",
    online: true,
    avatarUrl: makeAvatarUrl(name)
  });
  saveJSON(COLLAB_KEY, arr);

  if (collabName) collabName.value = "";
  if (collabRole) collabRole.value = "";
  closeModal();
  renderCollaborators();
});

  // Tabs/chips
  tabs.forEach(t => t.addEventListener("click", ()=>{
    tabs.forEach(x=>x.classList.remove("active"));
    t.classList.add("active");
    state.tab = t.dataset.tab;
    renderFeed();
  }));

  chips.forEach(c => c.addEventListener("click", ()=>{
    chips.forEach(x=>x.classList.remove("active"));
    c.classList.add("active");
    state.type = c.dataset.type;
    renderFeed();
  }));

  searchEl?.addEventListener("input", ()=>{
    state.query = searchEl.value || "";
    renderFeed();
  });

  // Mark all read
  markAllBtn?.addEventListener("click", ()=>{
    const data = getData().map(n => n.archived ? n : ({...n, read:true}));
    setData(data);
    updateUnreadCount();
    renderFeed();
  });

  // Seed + initial render
  seed();
  updateUnreadCount();
  renderActiveSession();
  renderCollaborators();
  renderFeed();
})();
/* =============================
   NOTIFICATIONS: default sidebar open on desktop
   ============================= */
(function initNotifSidebarDefault() {
  if (!document.body.classList.contains("notifications-page")) return;
  const sidebar = document.getElementById("app-sidebar");
  if (!sidebar) return;

  // Open by default on desktop
  if (window.matchMedia("(min-width: 1024px)").matches) {
    sidebar.classList.add("open");
  }
})();
/* =============================
   Notifications: mark AI Generation Complete as HERO (safe decorator)
   Does not change your existing notification rendering code.
   ============================= */
(function notifHeroDecorator() {
  if (!document.body.classList.contains("notifications-page")) return;

  const feed = document.getElementById("notif-feed");
  if (!feed) return;

  const apply = () => {
    feed.querySelectorAll(".notif-card").forEach(card => {
      const titleEl = card.querySelector(".notif-title");
      const title = (titleEl?.textContent || "").trim().toLowerCase();

      // match your existing item by title text
      const isHero = title.includes("ai generation complete");
      card.classList.toggle("notif-hero", isHero);
    });
  };

  // apply now + whenever list updates (filters/search)
  apply();
  const obs = new MutationObserver(apply);
  obs.observe(feed, { childList: true, subtree: true });
})();
/* Notifications: open sidebar by default on desktop */
(function initNotifSidebarDefault(){
  if (!document.body.classList.contains("notifications-page")) return;
  const sidebar = document.getElementById("app-sidebar");
  if (!sidebar) return;
  if (window.matchMedia("(min-width: 1024px)").matches) sidebar.classList.add("open");
})();
/* =============================
   NOTIFICATIONS CENTER – Functional + persistent (page-scoped)
   ============================= */
(function initNotificationsCenter(){
  if (!document.body.classList.contains("notifications-page")) return;

  const KEY = "morph_notifications";
  const COLLAB_KEY = "morph_notif_collaborators";
  const SESSION_KEY = "morph_notif_active_session";

  const feedEl = document.getElementById("notif-feed");
  const unreadCountEl = document.getElementById("notif-unread-count");
  const searchEl = document.getElementById("notif-search");
  const markAllBtn = document.getElementById("notif-mark-all");

  const tabs = Array.from(document.querySelectorAll(".notif-tab"));
  const chips = Array.from(document.querySelectorAll(".notif-chip"));

  const activeSessionCard = document.getElementById("active-session-card");
  const collabAvatars = document.getElementById("collab-avatars");
  const collabList = document.getElementById("collab-list");

  // collaborator modal
  const collabModal = document.getElementById("collab-modal");
  const collabOpen = document.getElementById("collab-add-btn");
  const collabClose = document.getElementById("collab-modal-close");
  const collabCancel = document.getElementById("collab-cancel");
  const collabSave = document.getElementById("collab-save");
  const collabName = document.getElementById("collab-name");
  const collabRole = document.getElementById("collab-role");

  const loadJSON = (k, fallback) => { try{ const r = localStorage.getItem(k); return r?JSON.parse(r):fallback; }catch{return fallback;} };
  const saveJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  const slug = (s)=>String(s||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  const relTime = (iso) => {
    try{
      const diff = Date.now() - new Date(iso).getTime();
      const m = Math.floor(diff/60000);
      if (m < 60) return `${Math.max(1,m)}m ago`;
      const h = Math.floor(m/60);
      if (h < 24) return `${h}h ago`;
      const d = Math.floor(h/24);
      return `${d}d ago`;
    }catch{ return ""; }
  };

  const iconClass = (type) => {
    if (type === "ai") return { cls:"ai", icon:"fa-wand-magic-sparkles" };
    if (type === "team") return { cls:"team", icon:"fa-share-nodes" };
    if (type === "approvals") return { cls:"approvals", icon:"fa-circle-check" };
    return { cls:"", icon:"fa-gear" };
  };

  // Seed only once (so after that it becomes user-driven)
  const seedIfEmpty = () => {
    const existing = loadJSON(KEY, null);
    if (Array.isArray(existing) && existing.length) return;

    const prompt = (localStorage.getItem("morph_last_prompt") || "").trim();
    const projectName = prompt
      ? `AI Concept: ${prompt.split(/\s+/).slice(0, 6).join(" ")}…`
      : "AI Concept";
    const projectId = slug(projectName).slice(0, 16) || "ai-concept";

    const now = new Date();
    const seeded = [
      {
        id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
        type: "ai",
        title: "AI Generation Complete",
        message: "Your latest output is ready. Review the generated layout and iterations.",
        project: { id: projectId, name: projectName },
        createdAt: now.toISOString(),
        read: false,
        archived: false,
        actions: [{key:"review", label:"Review Results"},{key:"dismiss", label:"Archive"}]
      }
    ];

    saveJSON(KEY, seeded);

    if (!loadJSON(COLLAB_KEY, null)) {
      saveJSON(COLLAB_KEY, [
        { id:"c1", name: localStorage.getItem("morph_user_name") || "User", role:"Senior Architect", online:true }
      ]);
    }

    if (!loadJSON(SESSION_KEY, null)) {
      saveJSON(SESSION_KEY, { projectName, progress: 0.85, subtitle: "Optimization in progress" });
    }
  };

  let state = { tab:"all", type:"all", query:"" };

  const getData = () => loadJSON(KEY, []);
  const setData = (arr) => saveJSON(KEY, arr);

  const updateUnreadCount = () => {
    const d = getData().filter(n => !n.archived);
    const unread = d.filter(n => !n.read).length;
    if (unreadCountEl) unreadCountEl.textContent = String(unread);
  };

  const matchesQuery = (n, q) => {
    if (!q) return true;
    const text = `${n.title} ${n.message} ${(n.project?.name||"")} ${(n.project?.id||"")}`.toLowerCase();
    if (q.startsWith("#")) return (n.project?.id || "").toLowerCase().includes(q.slice(1));
    return text.includes(q);
  };

  const filtered = () => {
    const q = state.query.trim().toLowerCase();
    return getData().filter(n => {
      if (state.tab === "unread" && (n.read || n.archived)) return false;
      if (state.tab === "archived" && !n.archived) return false;
      if (state.tab === "all" && n.archived) return false;
      if (state.type !== "all" && n.type !== state.type) return false;
      return matchesQuery(n, q);
    });
  };

  const renderFeed = () => {
    if (!feedEl) return;

    const items = filtered().sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));
    feedEl.innerHTML = "";

    if (!items.length){
      const empty = document.createElement("div");
      empty.style.color = "rgba(148,163,184,.9)";
      empty.style.padding = "10px 0";
      empty.textContent = "No notifications found.";
      feedEl.appendChild(empty);
      updateUnreadCount();
      return;
    }

    items.forEach(n => {
      const isAiHero = n.type === "ai" && String(n.title || "").toLowerCase().includes("ai generation complete");
      const {cls, icon} = iconClass(n.type);

      const card = document.createElement("div");
      card.className = isAiHero ? "notif-card notif-hero" : "notif-card";
      card.dataset.id = n.id;

      card.innerHTML = `
        ${(!n.read && !n.archived) ? `<div class="notif-dot"></div>` : ""}

        ${isAiHero ? "" : `
          <div class="notif-iconbox ${cls}">
            <i class="fa-solid ${icon}"></i>
          </div>
        `}

        <div class="notif-card-body">
          <div class="notif-title">${n.title}</div>
          <div class="notif-msg">${n.message}</div>

          ${n.actions?.length ? `
            <div class="notif-actions">
              ${n.actions.map(a => {
                const primary = a.key === "review" ? "primary" : "ghost";
                return `<button class="notif-btn ${primary}" type="button" data-action="${a.key}">${a.label}</button>`;
              }).join("")}
            </div>
          ` : ""}

          <div class="notif-meta">
            <span>${n.project ? `#${n.project.id}` : ""}</span>
            <span>${relTime(n.createdAt)}</span>
          </div>
        </div>
      `;

      // mark read on card click
      card.addEventListener("click", (e) => {
        if (e.target.closest("button[data-action]")) return;
        const data = getData();
        const i = data.findIndex(x => x.id === n.id);
        if (i >= 0 && !data[i].archived) {
          data[i].read = true;
          setData(data);
          updateUnreadCount();
          renderFeed();
        }
      });

      // actions
      card.querySelectorAll("button[data-action]").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const action = btn.dataset.action;
          const data = getData();
          const i = data.findIndex(x => x.id === n.id);
          if (i < 0) return;

          if (action === "dismiss") data[i].archived = true;
          if (action === "review") { data[i].read = true; setData(data); window.location.href = "library.html"; return; }

          setData(data);
          updateUnreadCount();
          renderFeed();
        });
      });

      feedEl.appendChild(card);
    });

    updateUnreadCount();
  };

  const renderActiveSession = () => {
    if (!activeSessionCard) return;
    const s = loadJSON(SESSION_KEY, null);
    if (!s) { activeSessionCard.innerHTML = ""; return; }
    const pct = Math.round((s.progress || 0) * 100);

    activeSessionCard.innerHTML = `
      <div class="active-title">${s.projectName || "Active Project"}</div>
      <div class="active-sub">${s.subtitle || ""} ${pct}% complete</div>
      <div class="active-bar"><div style="width:${pct}%;"></div></div>
      <button class="active-open" type="button" id="open-active-project">Open Project</button>
    `;
    document.getElementById("open-active-project")?.addEventListener("click", () => window.location.href = "dashboard.html");
  };

  const makeAvatarUrl = (seedStr) => {
  const s = String(seedStr || "user").toLowerCase().trim();
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  const imgId = (hash % 70) + 1;
  return `https://i.pravatar.cc/96?img=${imgId}`;
};

const renderCollaborators = () => {
  let c = loadJSON(COLLAB_KEY, []);
  if (!Array.isArray(c)) c = [];

  // ensure every collaborator has avatarUrl saved (user-default persistence)
  let changed = false;
  c = c.map(x => {
    if (!x.avatarUrl) {
      changed = true;
      return { ...x, avatarUrl: makeAvatarUrl(x.email || x.name || x.role || "collab") };
    }
    return x;
  });
  if (changed) saveJSON(COLLAB_KEY, c);

  // 1) Sidebar user avatar (photo)
  const userName = localStorage.getItem("morph_user_name") || "User";
  const userEmail = localStorage.getItem("morph_user_email") || "";
  const savedAvatar = (localStorage.getItem("morph_user_avatar") || "").trim();
  const sidebarAvatarEl = document.querySelector(".notif-user-avatar#app-user-avatar");

  if (sidebarAvatarEl) {
    const url = savedAvatar || makeAvatarUrl(userEmail || userName);
    sidebarAvatarEl.style.backgroundImage = `url("${url}")`;
    sidebarAvatarEl.classList.add("has-image");
    sidebarAvatarEl.textContent = "";
  }

  // 2) Top avatars row (first 4 +N)
  if (collabAvatars) {
    collabAvatars.innerHTML = "";

    const top = c.slice(0, 4);
    top.forEach(x => {
      const a = document.createElement("div");
      a.className = "collab-avatar";
      a.innerHTML = `<img src="${x.avatarUrl}" alt="${x.name || "Collaborator"}">`;
      collabAvatars.appendChild(a);
    });

    const remaining = c.length - top.length;
    if (remaining > 0) {
      const more = document.createElement("div");
      more.className = "collab-avatar";
      more.textContent = `+${remaining}`;       // keep +N as text
      collabAvatars.appendChild(more);
    }
  }

  // 3) Right panel list (photo avatars)
  if (collabList) {
    collabList.innerHTML = "";

    c.forEach(x => {
      const row = document.createElement("div");
      row.className = "collab-item";
      row.innerHTML = `
        <div class="collab-left">
          <div class="collab-avatar" style="width:42px;height:42px;">
            <img src="${x.avatarUrl}" alt="${x.name || "Collaborator"}">
          </div>
          <div style="min-width:0;">
            <div class="collab-name">${x.name || "Collaborator"}</div>
            <div class="collab-role">${x.role || ""}</div>
          </div>
        </div>
        <div class="collab-dot ${x.online ? "" : "off"}"></div>
      `;
      collabList.appendChild(row);
    });
  }
};

  const openModal = () => collabModal?.classList.add("active");
  const closeModal = () => collabModal?.classList.remove("active");

  collabOpen?.addEventListener("click", openModal);
  collabClose?.addEventListener("click", closeModal);
  collabCancel?.addEventListener("click", closeModal);
  collabModal?.addEventListener("click", (e)=>{ if(e.target===collabModal) closeModal(); });

  collabSave?.addEventListener("click", () => {
  const name = (collabName?.value || "").trim();
  const role = (collabRole?.value || "").trim();
  if (!name) return;

  // deterministic photo avatar like Team page
  const makeAvatarUrl = (seedStr) => {
    const s = String(seedStr || "user").toLowerCase().trim();
    let hash = 0;
    for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
    const imgId = (hash % 70) + 1;
    return `https://i.pravatar.cc/96?img=${imgId}`;
  };

  const arr = loadJSON(COLLAB_KEY, []);
  arr.unshift({
    id: (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(16).slice(2)}`),
    name,
    role: role || "Collaborator",
    online: true,
    avatarUrl: makeAvatarUrl(name)
  });

  saveJSON(COLLAB_KEY, arr);

  if (collabName) collabName.value = "";
  if (collabRole) collabRole.value = "";
  closeModal();
  renderCollaborators();
});

  tabs.forEach(t => t.addEventListener("click", ()=>{
    tabs.forEach(x=>x.classList.remove("active"));
    t.classList.add("active");
    state.tab = t.dataset.tab;
    renderFeed();
  }));

  chips.forEach(c => c.addEventListener("click", ()=>{
    chips.forEach(x=>x.classList.remove("active"));
    c.classList.add("active");
    state.type = c.dataset.type;
    renderFeed();
  }));

  searchEl?.addEventListener("input", ()=>{ state.query = searchEl.value || ""; renderFeed(); });

  markAllBtn?.addEventListener("click", ()=>{
    const data = getData().map(n => n.archived ? n : ({...n, read:true}));
    setData(data);
    updateUnreadCount();
    renderFeed();
  });

  seedIfEmpty();
  updateUnreadCount();
  renderActiveSession();
  renderCollaborators();
  renderFeed();
})();
/* =============================
   NOTIFICATIONS: ensure AI Generation Complete exists (user-default)
   ============================= */
(function ensureAiGenerationNotif(){
  if (!document.body.classList.contains("notifications-page")) return;

  const KEY = "morph_notifications";

  const load = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch { return []; }
  };
  const save = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

  const arr = load();

  const hasAi = arr.some(n =>
    (n.type === "ai") ||
    String(n.title || "").toLowerCase().includes("ai generation complete")
  );

  if (hasAi) return;

  const prompt = (localStorage.getItem("morph_last_prompt") || "").trim();
  const projectName = prompt
    ? `AI Concept: ${prompt.split(/\s+/).slice(0, 6).join(" ")}…`
    : "Urban Pavilion V2";

  const projectId = projectName.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"").slice(0, 16) || "urban-pav-v2";

  arr.unshift({
    id: (crypto?.randomUUID ? crypto.randomUUID() : String(Date.now())),
    type: "ai",
    title: "AI Generation Complete",
    message: `The high-fidelity render for “${projectName}” is ready. View results to review your generated iterations.`,
    project: { id: projectId, name: projectName },
    createdAt: new Date().toISOString(),
    read: false,
    archived: false,
    actions: [{ key: "review", label: "Review Results" }, { key: "dismiss", label: "Dismiss" }]
  });

  save(arr);
})();
/* Notifications: highlight AI Generation Complete card as hero (safe) */
(function notifHeroDecorator(){
  if (!document.body.classList.contains("notifications-page")) return;

  const feed = document.getElementById("notif-feed");
  if (!feed) return;

  const apply = () => {
    feed.querySelectorAll(".notif-card").forEach(card => {
      const title = (card.querySelector(".notif-title")?.textContent || "").toLowerCase();
      card.classList.toggle("notif-hero", title.includes("ai generation complete"));
    });
  };

  apply();
  new MutationObserver(apply).observe(feed, { childList:true, subtree:true });
})();
/* =============================
   LANGUAGE DROPDOWN (EN ▼) – real functionality
   ============================= */
(function initLanguageDropdown(){
  const LANG_KEY = "morph_ui_lang";

  // Works for your Notifications page button: .notif-lang
  // (If you add the same class on other pages, it will work there too.)
  const langBtn = document.querySelector(".notif-lang");
  if (!langBtn) return;

  const LANGS = [
    { code: "EN", label: "English" },
    { code: "ES", label: "Español" },
    { code: "FR", label: "Français" },
    { code: "HI", label: "हिन्दी" }
  ];

  let current = (localStorage.getItem(LANG_KEY) || "EN").toUpperCase();
  if (!LANGS.some(l => l.code === current)) current = "EN";

  const setBtnLabel = (code) => {
    // keeps your ▼ icon
    langBtn.innerHTML = `${code} <i class="fas fa-chevron-down"></i>`;
  };

  // Apply on load
  setBtnLabel(current);
  document.documentElement.setAttribute("lang", current === "EN" ? "en" : current.toLowerCase());
  document.documentElement.dataset.lang = current;

  // Create menu once
  let menu = document.getElementById("lang-menu");
  if (!menu) {
    menu = document.createElement("div");
    menu.id = "lang-menu";
    menu.className = "lang-menu";
    menu.hidden = true;
    document.body.appendChild(menu);
  }

  const renderMenu = () => {
    menu.innerHTML = "";
    LANGS.forEach(l => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "lang-item" + (l.code === current ? " active" : "");
      item.innerHTML = `
        <span>${l.label}</span>
        ${l.code === current ? `<span class="lang-check">✓</span>` : ``}
      `;
      item.addEventListener("click", () => {
        current = l.code;
        localStorage.setItem(LANG_KEY, current);
        setBtnLabel(current);
        document.documentElement.setAttribute("lang", current === "EN" ? "en" : current.toLowerCase());
        document.documentElement.dataset.lang = current;
        closeMenu();
      });
      menu.appendChild(item);
    });
  };

  const positionMenu = () => {
    const r = langBtn.getBoundingClientRect();
    const top = r.bottom + 8;
    const left = Math.min(window.innerWidth - 180, Math.max(8, r.left));
    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
  };

  const openMenu = () => {
    renderMenu();
    menu.hidden = false;
    positionMenu();
    requestAnimationFrame(() => positionMenu());
  };

  const closeMenu = () => {
    menu.hidden = true;
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (menu.hidden) openMenu();
    else closeMenu();
  };

  langBtn.addEventListener("click", toggleMenu);

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (menu.hidden) return;
    if (e.target === langBtn || langBtn.contains(e.target)) return;
    if (menu.contains(e.target)) return;
    closeMenu();
  });

  // Close on Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Reposition on resize/scroll
  window.addEventListener("resize", () => { if (!menu.hidden) positionMenu(); });
  window.addEventListener("scroll", () => { if (!menu.hidden) positionMenu(); }, true);
})();
/* =============================
   LANGUAGE DROPDOWN (EN ▼) – guaranteed working
   ============================= */
(function bindLangDropdown(){
  const btn = document.querySelector(".notif-lang");
  if (!btn) return;

  // prevent double-binding if code runs twice
  if (btn.dataset.langBound === "1") return;
  btn.dataset.langBound = "1";

  const KEY = "morph_ui_lang";
  const LANGS = ["EN", "ES", "FR", "HI"];

  const getLang = () => (localStorage.getItem(KEY) || "EN").toUpperCase();
  const setLang = (code) => localStorage.setItem(KEY, code);

  const setBtn = (code) => {
    btn.innerHTML = `${code} <i class="fas fa-chevron-down"></i>`;
  };

  setBtn(getLang());

  // create menu once
  let menu = document.getElementById("lang-menu");
  if (!menu) {
    menu = document.createElement("div");
    menu.id = "lang-menu";
    menu.className = "lang-menu";
    menu.hidden = true;
    document.body.appendChild(menu);
  }

  const close = () => { menu.hidden = true; };

  const position = () => {
    const r = btn.getBoundingClientRect();
    menu.style.top = `${r.bottom + 8}px`;
    menu.style.left = `${Math.min(window.innerWidth - 190, Math.max(8, r.left))}px`;
  };

  const render = () => {
    const curr = getLang();
    menu.innerHTML = "";
    LANGS.forEach(code => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "lang-item" + (code === curr ? " active" : "");
      item.innerHTML = `<span>${code}</span>${code === curr ? "<span>✓</span>" : ""}`;

      item.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLang(code);
        setBtn(code);
        close();

        // Apply translations if your global i18n exists
        if (window.MorphI18n && typeof window.MorphI18n.apply === "function") {
          window.MorphI18n.apply();
        }
      });

      menu.appendChild(item);
    });
  };

  // open/close
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (menu.hidden) {
      render();
      menu.hidden = false;
      position();
      requestAnimationFrame(position);
    } else {
      close();
    }
  });

  // IMPORTANT: stop menu clicks from closing it immediately
  menu.addEventListener("click", (e) => e.stopPropagation());

  // close on outside click / ESC
  document.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  window.addEventListener("resize", () => { if (!menu.hidden) position(); });
  window.addEventListener("scroll", () => { if (!menu.hidden) position(); }, true);
})();
/* =============================
   NOTIFICATIONS: ensure "Read release notes" action exists
   ============================= */
(function ensureReleaseAction() {
  if (!document.body.classList.contains("notifications-page")) return;

  const KEY = "morph_notifications";

  let arr = [];
  try { arr = JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { arr = []; }

  if (!Array.isArray(arr) || !arr.length) return;

  let changed = false;

  arr.forEach(n => {
    // Choose which notifications should get this button:
    // system/platform update notifications
    const title = String(n.title || "").toLowerCase();
    const isSystem = n.type === "system" || title.includes("platform update") || title.includes("update");

    if (!isSystem) return;

    if (!Array.isArray(n.actions)) n.actions = [];

    const hasRelease = n.actions.some(a => a && a.key === "release");
    if (!hasRelease) {
      n.actions.push({ key: "release", label: "Read release notes" });
      changed = true;
    }
  });

  if (changed) localStorage.setItem(KEY, JSON.stringify(arr));
})();
/* =============================
   NOTIFICATIONS: force "Read release notes" to work (guaranteed)
   - Adds release action to system/update notifications if missing
   - Captures click on data-action="release" and redirects
   ============================= */
(function fixReleaseNotesAction() {
  if (!document.body.classList.contains("notifications-page")) return;

  const KEY = "morph_notifications";
  const feed = document.getElementById("notif-feed");

  // 1) Ensure release action exists in stored notifications (so button can appear)
  try {
    const arr = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (Array.isArray(arr)) {
      let changed = false;

      arr.forEach(n => {
        const title = String(n.title || "").toLowerCase();
        const isSystemLike =
          n.type === "system" ||
          title.includes("platform update") ||
          title.includes("update");

        if (!isSystemLike) return;

        n.actions = Array.isArray(n.actions) ? n.actions : [];
        const hasRelease = n.actions.some(a => a && a.key === "release");
        if (!hasRelease) {
          n.actions.push({ key: "release", label: "Read release notes" });
          changed = true;
        }
      });

      if (changed) localStorage.setItem(KEY, JSON.stringify(arr));
    }
  } catch (e) {
    console.warn("Could not ensure release action:", e);
  }

  // 2) GUARANTEED click handling (capture phase)
  if (!feed) return;
  if (feed.dataset.releaseBound === "1") return;
  feed.dataset.releaseBound = "1";

  feed.addEventListener(
    "click",
    (e) => {
      const btn = e.target.closest('button[data-action="release"]');
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      // Redirect
      window.location.href = "release-notes.html";
    },
    true // capture phase (so it works even if other handlers exist)
  );
})();
/* =============================
   BILLING CHECKOUT – FULLY FUNCTIONAL (Reference UI)
   ============================= */
(function initBillingCheckout(){
  if (!document.body.classList.contains("billing-checkout-page")) return;

  const money = (n) => new Intl.NumberFormat("en-US", { style:"currency", currency:"USD" }).format(n);

  const userName =
    (sessionStorage.getItem("morph_user_name") || localStorage.getItem("morph_user_name") || "User").trim();
  const userEmail =
    (sessionStorage.getItem("morph_user_email") || localStorage.getItem("morph_user_email") || "").trim();

  // Plans
  const PLANS = {
    Starter: {
      title: "Starter Plan",
      sub: "For exploration and students",
      monthly: 0,
      features: ["2 projects per month", "Basic 2D floor plans", "Standard 3D models", "Community support"],
      popular: false
    },
    Professional: {
      title: "Professional Plan",
      sub: "Perfect for independent architects",
      monthly: 29,
      features: ["Unlimited Projects", "High‑resolution exports", "Faster generation queue", "Advance customization"],
      popular: true
    },
    Studio: {
      title: "Studio Plan",
      sub: "For teams and firms",
      monthly: 99,
      features: ["Team collaboration", "Priority support 24/7", "White‑label exports", "API access"],
      popular: false
    }
  };

  const SUB_KEY = "morph_subscription";
  const INTENT_PLAN_KEY = "morph_billing_intent_plan";
  const CYCLE_KEY = "morph_billing_cycle";
  const METHOD_KEY = "morph_payment_method";

  const loadJSON = (k, fallback) => { try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; } };
  const saveJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  const toastWrap = document.getElementById("billing-toast-wrap");
  const toast = (msg) => {
    if (!toastWrap) return;
    const t = document.createElement("div");
    t.className = "billing-toast";
    t.textContent = msg;
    toastWrap.appendChild(t);
    setTimeout(() => t.remove(), 2400);
  };

  // Current state
  const savedSub = loadJSON(SUB_KEY, null);
  let selectedPlan =
    (savedSub?.plan) ||
    localStorage.getItem(INTENT_PLAN_KEY) ||
    localStorage.getItem("morph_billing_plan") ||
    "Professional";

  if (!PLANS[selectedPlan]) selectedPlan = "Professional";

  let cycle = (localStorage.getItem(CYCLE_KEY) || savedSub?.cycle || "monthly").toLowerCase();
  if (!["monthly","yearly"].includes(cycle)) cycle = "monthly";

  let method = (localStorage.getItem(METHOD_KEY) || savedSub?.method || "card").toLowerCase();
  if (!["card","upi"].includes(method)) method = "card";

  // Elements
  const elPlanTitle = document.getElementById("bill-plan-title");
  const elPlanSub = document.getElementById("bill-plan-sub");
  const elPopular = document.getElementById("bill-popular-pill");
  const elPrice = document.getElementById("bill-price");
  const elPeriod = document.getElementById("bill-period");
  const elFeatures = document.getElementById("bill-features");
  const elDue = document.getElementById("bill-due");

  const changePlanBtn = document.getElementById("bill-change-plan");

  const cycleBtns = Array.from(document.querySelectorAll(".billing-cycle-btn"));
  const methodTabs = Array.from(document.querySelectorAll(".billing-method-tab"));
  const form = document.getElementById("billing-form");
  const errorEl = document.getElementById("bill-error");
  const confirmBtn = document.getElementById("bill-confirm");
  const freePanel = document.getElementById("billing-free");
const cyclePanel = document.getElementById("billing-cycle-panel");
const paymentPanel = document.getElementById("billing-payment-panel");
const termsEl = document.getElementById("bill-terms");

  const paneCard = document.querySelector('[data-pane="card"]');
  const paneUpi  = document.querySelector('[data-pane="upi"]');

  const inCardName = document.getElementById("bill-card-name");
  const inCardNumber = document.getElementById("bill-card-number");
  const inExp = document.getElementById("bill-exp");
  const inCvc = document.getElementById("bill-cvc");
  const inUpi = document.getElementById("bill-upi-id");
  const inBank = document.getElementById("bill-bank");

  // Prefill name on card
  if (inCardName && !inCardName.value) inCardName.value = userName;

  const yearlyTotal = (monthly) => {
    // 20% off on annual billed upfront
    const base = monthly * 12;
    return +(base * 0.8).toFixed(2);
  };

  const dueToday = () => {
    const m = PLANS[selectedPlan].monthly;
    return cycle === "monthly" ? m : yearlyTotal(m);
  };

  const priceLabel = () => {
    const m = PLANS[selectedPlan].monthly;
    if (cycle === "monthly") return { value: m, period: "/ month" };
    // show annual total as "$XXX / year"
    return { value: yearlyTotal(m), period: "/ year" };
  };

  const renderSummary = () => {
    const p = PLANS[selectedPlan];
    if (elPlanTitle) elPlanTitle.textContent = p.title;
    if (elPlanSub) elPlanSub.textContent = p.sub;

    if (elPopular) {
      elPopular.hidden = !p.popular;
    }

    const pr = priceLabel();
    if (elPrice) elPrice.textContent = pr.value === 0 ? "$0" : `$${pr.value}`;
    if (elPeriod) elPeriod.textContent = pr.period;

    if (elFeatures) {
      elFeatures.innerHTML = p.features.map(f =>
        `<li><i class="fa-solid fa-circle-check"></i><span>${f}</span></li>`
      ).join("");
    }

    if (elDue) elDue.textContent = money(dueToday());

    // persist non-sensitive selections
    localStorage.setItem("morph_billing_plan", selectedPlan);
    localStorage.setItem(CYCLE_KEY, cycle);
    localStorage.setItem(METHOD_KEY, method);

    cycleBtns.forEach(b => b.classList.toggle("is-active", (b.dataset.cycle || "") === cycle));
    methodTabs.forEach(b => b.classList.toggle("is-active", (b.dataset.method || "") === method));

    if (paneCard) paneCard.hidden = method !== "card";
    if (paneUpi) paneUpi.hidden = method !== "upi";
    // ===== FREE vs PAID UX =====
const isFree = dueToday() === 0;

// Show free panel only for free plan
if (freePanel) freePanel.hidden = !isFree;

// Hide payment method tabs/fields if free
const methodTabsWrap = document.querySelector(".billing-method-tabs");
const paymentLine = paymentPanel?.querySelector(".billing-line");

if (methodTabsWrap) methodTabsWrap.style.display = isFree ? "none" : "";
if (paymentLine) paymentLine.style.display = isFree ? "none" : "";

// If free, hide all payment panes
if (isFree) {
  if (paneCard) paneCard.hidden = true;
  if (paneUpi) paneUpi.hidden = true;
}

// Disable billing cycle toggle when free (cycle doesn’t matter)
cycleBtns.forEach((b) => b.classList.toggle("is-disabled", isFree));
if (isFree) cycle = "monthly"; // normalize

// Button label
if (confirmBtn) {
  confirmBtn.innerHTML = isFree
    ? `Get Started Free <i class="fa-solid fa-arrow-right"></i>`
    : `Proceed to Secure Checkout <i class="fa-solid fa-arrow-right"></i>`;
}
    const paid = dueToday() > 0;

// Hide payment method section when free
const paymentPanel = document.querySelector(".billing-right .billing-panel:nth-child(2)");
if (paymentPanel) paymentPanel.style.display = paid ? "" : "none";

// Change button label for free plan
if (confirmBtn) {
  confirmBtn.innerHTML = paid
    ? `Confirm &amp; Subscribe <i class="fa-solid fa-arrow-right"></i>`
    : `Activate Free Plan <i class="fa-solid fa-arrow-right"></i>`;
}

  };

  // ---- Change plan modal ----
  const modal = document.getElementById("bill-plan-modal");
  const modalGrid = document.getElementById("bill-plan-grid");
  const modalClose = document.getElementById("bill-modal-close");
  const modalCancel = document.getElementById("bill-modal-cancel");
  const modalSave = document.getElementById("bill-modal-save");

  let modalPlan = selectedPlan;

  const openModal = () => modal?.classList.add("active");
  const closeModal = () => modal?.classList.remove("active");

  const renderModal = () => {
    if (!modalGrid) return;
    modalGrid.innerHTML = "";

    Object.keys(PLANS).forEach(name => {
      const p = PLANS[name];
      const card = document.createElement("button");
      card.type = "button";
      card.className = "billing-plan-card" + (name === modalPlan ? " is-selected" : "");
      card.innerHTML = `
        <div class="t">${name}</div>
        <div class="p">$${p.monthly}<span style="font-size:.8rem;color:rgba(148,163,184,.9);font-weight:750;"> /mo</span></div>
        <div class="d">${p.sub}</div>
      `;
      card.addEventListener("click", () => {
        modalPlan = name;
        renderModal();
      });
      modalGrid.appendChild(card);
    });
  };

  changePlanBtn?.addEventListener("click", () => {
    modalPlan = selectedPlan;
    renderModal();
    openModal();
  });

  modalClose?.addEventListener("click", closeModal);
  modalCancel?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  modalSave?.addEventListener("click", () => {
    selectedPlan = modalPlan;
    closeModal();
    renderSummary();
    toast(`Plan set to ${selectedPlan}`);
  });

  // ---- Cycle buttons ----
  cycleBtns.forEach(btn => btn.addEventListener("click", () => {
    const c = (btn.dataset.cycle || "monthly").toLowerCase();
    cycle = c;
    renderSummary();
  }));

  // ---- Payment method tabs ----
  methodTabs.forEach(btn => btn.addEventListener("click", () => {
    method = (btn.dataset.method || "card").toLowerCase();
    renderSummary();
  }));

  // ---- Card formatting / detection ----
  const digitsOnly = (s) => String(s || "").replace(/\D+/g, "");
  const formatCard = (s) => digitsOnly(s).slice(0,19).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExp = (s) => {
    const d = digitsOnly(s).slice(0,4);
    const mm = d.slice(0,2);
    const yy = d.slice(2,4);
    if (!yy) return mm;
    return `${mm} / ${yy}`;
  };

  const luhnValid = (numStr) => {
    const s = digitsOnly(numStr);
    if (s.length < 12) return false;
    let sum = 0, alt = false;
    for (let i = s.length - 1; i >= 0; i--) {
      let n = parseInt(s[i], 10);
      if (alt) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alt = !alt;
    }
    return sum % 10 === 0;
  };

  inCardNumber?.addEventListener("input", () => {
    const pos = inCardNumber.selectionStart || 0;
    const before = inCardNumber.value;
    inCardNumber.value = formatCard(before);
    try { inCardNumber.setSelectionRange(pos, pos); } catch {}
  });

  inExp?.addEventListener("input", () => { inExp.value = formatExp(inExp.value); });
  inCvc?.addEventListener("input", () => { inCvc.value = digitsOnly(inCvc.value).slice(0,4); });

  // ---- Submit (simulate subscription) ----
  const setError = (msg) => {
    if (!errorEl) return;
    errorEl.hidden = !msg;
    errorEl.textContent = msg || "";
  };

  const validate = () => {
    setError("");
    if (selectedPlan === "Starter" && dueToday() === 0) return true; // allow free plan

    if (method === "card") {
      const name = (inCardName?.value || "").trim();
      const card = (inCardNumber?.value || "").trim();
      const exp = digitsOnly(inExp?.value || "");
      const cvc = digitsOnly(inCvc?.value || "");

      if (!name) return setError("Please enter name on card."), false;
      if (!luhnValid(card)) return setError("Please enter a valid card number."), false;
      if (exp.length !== 4) return setError("Please enter expiry as MM / YY."), false;

      const mm = parseInt(exp.slice(0,2), 10);
      if (!(mm >= 1 && mm <= 12)) return setError("Expiry month must be between 01 and 12."), false;

      if (cvc.length < 3) return setError("CVC must be 3–4 digits."), false;
      return true;
    }

    if (method === "upi") {
      const upi = (inUpi?.value || "").trim();
      const bank = (inBank?.value || "").trim();
      if (!upi || !upi.includes("@")) return setError("Please enter a valid UPI ID."), false;
      if (!bank) return setError("Please select a bank."), false;
      return true;
    }

    return true;
  };

  form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  setError("");

  const due = dueToday();

  // ✅ FREE plan (Starter or any $0 due) → activate without payment
  if (due === 0) {
    const subscription = {
      status: "active",
      plan: selectedPlan,
      cycle,
      method: "free",
      dueToday: 0,
      user: { name: userName, email: userEmail },
      updatedAt: new Date().toISOString()
    };

    saveJSON(SUB_KEY, subscription);
    localStorage.removeItem(INTENT_PLAN_KEY);

    toast("Starter plan activated.");
    setTimeout(() => window.location.href = "dashboard.html", 600);
    return;
  }

  // ✅ PAID plans → DO NOT collect card details here.
  // Redirect to a real payment provider (Stripe Checkout / Razorpay).
  confirmBtn.disabled = true;
  confirmBtn.textContent = "Redirecting to secure checkout…";

  try {
    // OPTION 1 (Recommended): Stripe Checkout Session via your backend
    // You must implement /api/create-checkout-session on server (I’ll give it next if you want).
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: selectedPlan, cycle })
    });

    if (!res.ok) throw new Error("Checkout session failed");
    const data = await res.json();
    if (!data.url) throw new Error("No checkout URL returned");

    window.location.href = data.url;
  } catch (err) {
    console.error(err);
    setError("Could not start secure checkout. Please try again.");
    confirmBtn.disabled = false;
// Restore correct label (free vs paid)
    const isFree = dueToday() === 0;
    confirmBtn.innerHTML = isFree
      ? `Get Started Free <i class="fa-solid fa-arrow-right"></i>`
      : `Proceed to Secure Checkout <i class="fa-solid fa-arrow-right"></i>`;  
    }
});

  // init render
  renderSummary();
})();
/* =============================
   SETTINGS > SECURITY (V2) – user-default + functional
   - Password update (local hash)
   - Strength meter
   - 2FA toggle + QR modal (client-side demo)
   - Active sessions list (local)
   - Recovery email verify
   - Deactivate account
   ============================= */
(function initSettingsSecurityV2(){
  if (!document.body.classList.contains("settings-ref-page")) return;
  const wrap = document.querySelector('.settings-ref-panelwrap[data-panel="security"].sec-v2');
  if (!wrap) return;

  // Prevent double binding if app.js has duplicates
  if (wrap.dataset.bound === "1") return;
  wrap.dataset.bound = "1";

  const $ = (id) => document.getElementById(id);

  // Keys (user-default)
  const KEY_PASS = "morph_sec_password_hash";
  const KEY_2FA  = "morph_sec_2fa_enabled";
  const KEY_2FA_SECRET = "morph_sec_2fa_secret";
  const KEY_REC  = "morph_sec_recovery_email";
  const KEY_REC_OK = "morph_sec_recovery_verified";
  const KEY_SESS = "morph_sec_sessions";

  const userName = (sessionStorage.getItem("morph_user_name") || localStorage.getItem("morph_user_name") || "User").trim();
  const userEmail = (sessionStorage.getItem("morph_user_email") || localStorage.getItem("morph_user_email") || "").trim();

  const loadJSON = (k, fallback) => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : fallback; } catch { return fallback; } };
  const saveJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  const setMsg = (el, msg, type="") => {
    if (!el) return;
    el.hidden = !msg;
    el.className = "sec-v2-msg" + (type ? ` ${type}` : "");
    el.textContent = msg || "";
  };

  // SHA-256 (local only)
  const sha256 = async (txt) => {
    if (!window.crypto?.subtle) return btoa(unescape(encodeURIComponent(txt)));
    const enc = new TextEncoder().encode(txt);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
  };

  // ---------------- Password strength
  const strengthScore = (p) => {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s; // 0..4
  };
  const strengthLabel = (s) => (s <= 1 ? "Weak" : s === 2 ? "Fair" : s === 3 ? "Good" : "Strong");
  const strengthColor = (s) => (s <= 1 ? "rgba(248,113,113,.95)" : s === 2 ? "rgba(250,204,21,.95)" : "rgba(34,197,94,.95)");

  const form = $("sec-v2-pass-form");
  const cur = $("sec-v2-current");
  const nw = $("sec-v2-new");
  const cf = $("sec-v2-confirm");
  const bars = $("sec-v2-bars");
  const labelEl = $("sec-v2-strength-label");
  const passMsg = $("sec-v2-pass-msg");

  const renderStrength = () => {
    const p = (nw?.value || "");
    const s = strengthScore(p);
    if (labelEl) labelEl.textContent = p ? strengthLabel(s) : "—";

    const segs = bars ? Array.from(bars.querySelectorAll("span")) : [];
    segs.forEach((b, i) => {
      b.style.background = (p && i < s) ? strengthColor(s) : "rgba(148,163,184,.18)";
    });
  };
  nw?.addEventListener("input", renderStrength);
  renderStrength();

  // Eye toggle
  wrap.querySelectorAll("[data-eye]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-eye");
      const input = document.getElementById(id);
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
      btn.innerHTML = input.type === "password"
        ? `<i class="fa-regular fa-eye"></i>`
        : `<i class="fa-regular fa-eye-slash"></i>`;
    });
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMsg(passMsg, "");

    const existingHash = localStorage.getItem(KEY_PASS) || "";
    const curVal = (cur?.value || "");
    const newVal = (nw?.value || "");
    const conVal = (cf?.value || "");

    if (!newVal || !conVal) return setMsg(passMsg, "Please enter and confirm your new password.", "err");
    if (newVal !== conVal) return setMsg(passMsg, "Passwords do not match.", "err");
    if (strengthScore(newVal) < 3) return setMsg(passMsg, "Password too weak. Improve it and try again.", "err");

    if (existingHash) {
      const curHash = await sha256(curVal);
      if (curHash !== existingHash) return setMsg(passMsg, "Current password is incorrect.", "err");
    }

    localStorage.setItem(KEY_PASS, await sha256(newVal));
    if (cur) cur.value = "";
    if (nw) nw.value = "";
    if (cf) cf.value = "";
    renderStrength();

    setMsg(passMsg, "Password updated successfully.", "ok");
  });

  // ---------------- 2FA
  const toggle2fa = $("sec-v2-2fa-toggle");
  const pill2fa = $("sec-v2-2fa-pill");
  const msg2fa = $("sec-v2-2fa-msg");
  const open2fa = $("sec-v2-configure-2fa");

  const modal = $("sec-v2-2fa-modal");
  const closeBtn = $("sec-v2-2fa-close");
  const cancelBtn = $("sec-v2-2fa-cancel");
  const enableBtn = $("sec-v2-2fa-enable");
  const codeEl = $("sec-v2-2fa-code");
  const modalMsg = $("sec-v2-2fa-modal-msg");
  const qrImg = $("sec-v2-qr-img");
  const qrEmail = $("sec-v2-qr-email");

  const openModal = () => modal?.classList.add("active");
  const closeModal = () => {
    modal?.classList.remove("active");
    setMsg(modalMsg, "");
    if (codeEl) codeEl.value = "";
  };

  const makeSecret = () => {
    const existing = localStorage.getItem(KEY_2FA_SECRET);
    if (existing) return existing;
    const s = (crypto?.randomUUID ? crypto.randomUUID().replace(/-/g,"") : String(Date.now()) + Math.random().toString(16).slice(2));
    localStorage.setItem(KEY_2FA_SECRET, s);
    return s;
  };

  const render2fa = () => {
    const on = localStorage.getItem(KEY_2FA) === "1";
    if (toggle2fa) toggle2fa.checked = on;
    if (pill2fa) {
      pill2fa.textContent = on ? "Enabled" : "Disabled";
      pill2fa.classList.toggle("on", on);
      pill2fa.classList.toggle("off", !on);
    }
    setMsg(msg2fa, on ? "Two‑factor authentication is enabled." : "");
  };

  open2fa?.addEventListener("click", () => {
    const secret = makeSecret();
    if (qrEmail) qrEmail.textContent = userEmail || "—";
    // QR via external generator (works static; real SaaS would do server verify)
    const otpauth = encodeURIComponent(`otpauth://totp/Morphopolis:${userEmail}?secret=${secret}&issuer=Morphopolis`);
    if (qrImg) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${otpauth}`;
    openModal();
  });

  closeBtn?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  toggle2fa?.addEventListener("change", () => {
    localStorage.setItem(KEY_2FA, toggle2fa.checked ? "1" : "0");
    render2fa();
  });

  enableBtn?.addEventListener("click", () => {
    const code = (codeEl?.value || "").trim();
    if (!/^\d{6}$/.test(code)) return setMsg(modalMsg, "Enter a valid 6-digit code.", "err");
    // client-side demo: accept any 6 digits
    localStorage.setItem(KEY_2FA, "1");
    render2fa();
    closeModal();
  });

  render2fa();

  // ---------------- Sessions (user-default, local)
  const sessionsWrap = $("sec-v2-sessions");
  const sessionsMsg = $("sec-v2-sessions-msg");

  const SESSION_ID_KEY = "morph_session_id";
  if (!sessionStorage.getItem(SESSION_ID_KEY)) {
    sessionStorage.setItem(SESSION_ID_KEY, (crypto?.randomUUID ? crypto.randomUUID() : String(Date.now())));
  }
  const thisSessionId = sessionStorage.getItem(SESSION_ID_KEY);

  const relTime = (iso) => {
    try{
      const diff = Date.now() - new Date(iso).getTime();
      const m = Math.floor(diff/60000);
      if (m < 60) return `${Math.max(1,m)}m ago`;
      const h = Math.floor(m/60);
      if (h < 24) return `${h}h ago`;
      const d = Math.floor(h/24);
      return `${d}d ago`;
    } catch { return "—"; }
  };

  const deviceName = () => {
    const ua = navigator.userAgent || "";
    if (/iphone/i.test(ua)) return "iPhone";
    if (/mac/i.test(ua)) return "MacBook Pro";
    if (/windows/i.test(ua)) return "Windows Workstation";
    return "This device";
  };

  const seedSessions = () => {
    const existing = loadJSON(KEY_SESS, null);
    if (Array.isArray(existing) && existing.length) return;

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Local";
    saveJSON(KEY_SESS, [
      {
        id: thisSessionId,
        device: deviceName(),
        app: "Chrome",
        location: tz,
        ip: "Local session",
        lastActive: new Date().toISOString()
      },
      {
        id: "seed_2",
        device: "iPhone 14 Pro",
        app: "Morphopolis App",
        location: tz,
        ip: "—",
        lastActive: new Date(Date.now() - 2*60*60*1000).toISOString()
      },
      {
        id: "seed_3",
        device: "Windows Workstation",
        app: "Firefox",
        location: tz,
        ip: "—",
        lastActive: new Date(Date.now() - 3*24*60*60*1000).toISOString()
      }
    ]);
  };

  const renderSessions = () => {
    seedSessions();
    const sessions = loadJSON(KEY_SESS, []);
    if (!sessionsWrap) return;

    sessionsWrap.innerHTML = "";
    if (!sessions.length) {
      setMsg(sessionsMsg, "No sessions found.");
      return;
    }
    setMsg(sessionsMsg, "");

    sessions
      .slice()
      .sort((a,b) => (a.id === thisSessionId ? -1 : 1) - (b.id === thisSessionId ? -1 : 1))
      .forEach(s => {
        const isThis = s.id === thisSessionId;
        const ico = /iphone/i.test(s.device) ? "fa-mobile-screen" : /mac/i.test(s.device) ? "fa-laptop" : "fa-desktop";

        const row = document.createElement("div");
        row.className = "sec-v2-session";
        row.innerHTML = `
          <div class="sec-v2-session-left">
            <div class="sec-v2-dev"><i class="fa-solid ${ico}"></i></div>
            <div style="min-width:0;">
              <div class="sec-v2-sname">${s.device} ${isThis ? '<span style="opacity:.8;font-weight:600;">(This device)</span>' : ""}</div>
              <div class="sec-v2-smeta">${s.app} • ${s.location}<br>${s.ip}</div>
            </div>
          </div>
          <div class="sec-v2-session-right">
            ${isThis ? `<span class="sec-v2-now">Active now</span>` : `<span class="sec-v2-time">${relTime(s.lastActive)}</span>`}
            ${isThis ? "" : `<button class="sec-v2-xbtn" type="button" title="Sign out"><i class="fa-solid fa-xmark"></i></button>`}
          </div>
        `;

        row.querySelector("button")?.addEventListener("click", () => {
          const next = loadJSON(KEY_SESS, []).filter(x => x.id !== s.id);
          saveJSON(KEY_SESS, next);
          renderSessions();
        });

        sessionsWrap.appendChild(row);
      });
  };

  $("sec-v2-signout-all")?.addEventListener("click", () => {
    // client-side: clear sessions and log out
    localStorage.removeItem(KEY_SESS);
    sessionStorage.clear();
    window.location.href = "index.html";
  });

  renderSessions();

  // ---------------- Recovery email (user-default)
  const rec = $("sec-v2-recovery");
  const verify = $("sec-v2-verify-recovery");
  const recHint = $("sec-v2-recovery-hint");
  const safetyMsg = $("sec-v2-safety-msg");

  const renderRecovery = () => {
    const saved = localStorage.getItem(KEY_REC) || userEmail || "";
    const ok = localStorage.getItem(KEY_REC_OK) === "1";
    if (rec) rec.value = saved;
    if (verify) { verify.textContent = ok ? "Verified" : "Verify"; verify.disabled = ok; }
    if (recHint) recHint.textContent = ok ? "Recovery email verified." : "Used to regain access if you lose your password.";
  };

  rec?.addEventListener("change", () => {
    localStorage.setItem(KEY_REC, (rec.value || "").trim());
    localStorage.setItem(KEY_REC_OK, "0");
    renderRecovery();
  });

  verify?.addEventListener("click", () => {
    const v = (rec?.value || "").trim();
    if (!/^\S+@\S+\.\S+$/.test(v)) return setMsg(safetyMsg, "Enter a valid recovery email.", "err");
    localStorage.setItem(KEY_REC, v);
    localStorage.setItem(KEY_REC_OK, "1");
    setMsg(safetyMsg, "Recovery email verified.", "ok");
    renderRecovery();
    setTimeout(() => setMsg(safetyMsg, ""), 2000);
  });

  renderRecovery();

  // ---------------- Deactivate
  $("sec-v2-deactivate")?.addEventListener("click", () => {
    const ok = confirm("Deactivate account? This will sign you out and clear local security data for this browser.");
    if (!ok) return;

    localStorage.removeItem(KEY_PASS);
    localStorage.removeItem(KEY_2FA);
    localStorage.removeItem(KEY_2FA_SECRET);
    localStorage.removeItem(KEY_REC);
    localStorage.removeItem(KEY_REC_OK);
    localStorage.removeItem(KEY_SESS);

    sessionStorage.clear();
    window.location.href = "index.html";
  });
})();
/* =============================
   GLOBAL PHOTO AVATARS (like Team page)
   - Notifications avatars
   - Settings/Profile avatar
   - Topbar / mini avatars
   ============================= */
(function applyPhotoAvatarsEverywhere(){
  // deterministic pravatar like team page
  const makeAvatarUrl = (seedStr) => {
    const custom = (localStorage.getItem("morph_user_avatar") || sessionStorage.getItem("morph_user_avatar") || "").trim();
    // use uploaded avatar only for the logged-in user's avatar containers
    const s = String(seedStr || "user").toLowerCase().trim();
    let hash = 0;
    for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
    const imgId = (hash % 70) + 1;
    return { custom, fallback: `https://i.pravatar.cc/96?img=${imgId}` };
  };

  const getUserSeed = () => {
    const name = (sessionStorage.getItem("morph_user_name") || localStorage.getItem("morph_user_name") || "User").trim();
    const email = (sessionStorage.getItem("morph_user_email") || localStorage.getItem("morph_user_email") || "").trim();
    return email || name || "user";
  };

  const apply = () => {
    const userSeed = getUserSeed();
    const { custom, fallback } = makeAvatarUrl(userSeed);
    const userAvatarUrl = custom || fallback;

    // 1) All common avatar DIVs across the app → background image (no initials)
    const divAvatars = document.querySelectorAll(
      '#app-user-avatar, .app-user-avatar, .notif-user-avatar, .settings-ref-user-avatar, .settings-mini-avatar, .support-mini-avatar'
    );
    divAvatars.forEach(el => {
      if (el.tagName.toLowerCase() === "img") return;
      el.style.backgroundImage = `url("${userAvatarUrl}")`;
      el.classList.add("has-image");
      el.textContent = "";
    });

    // 2) Settings profile photo image (hero photo) should use saved avatar (user-default)
    const profilePhoto = document.getElementById("profile-photo");
    if (profilePhoto && profilePhoto.tagName.toLowerCase() === "img") {
      // if user uploaded avatar exists -> show it; else keep existing image
      if (custom) profilePhoto.src = custom;
    }

    // 3) Notifications: collaborator circles that currently show letters → convert to <img>
    document.querySelectorAll(".collab-avatar").forEach(a => {
      if (a.querySelector("img")) return;

      const seed = (a.textContent || "").trim() || "collab";
      const url = makeAvatarUrl(seed).fallback;

      a.textContent = "";
      const img = document.createElement("img");
      img.src = url;
      img.alt = "Collaborator";
      a.appendChild(img);
    });

    // 4) Notifications: collaborator list rows might have .collab-avatar too (same fix)
    document.querySelectorAll(".collab-item .collab-avatar").forEach(a => {
      if (a.querySelector("img")) return;
      const seed = (a.textContent || "").trim() || "collab";
      const url = makeAvatarUrl(seed).fallback;
      a.textContent = "";
      const img = document.createElement("img");
      img.src = url;
      img.alt = "Collaborator";
      a.appendChild(img);
    });
  };

  apply();

  // re-apply when notifications list updates, etc.
  const obs = new MutationObserver(apply);
  obs.observe(document.body, { childList: true, subtree: true });
})();
/* =============================
   SETTINGS: Plan badge (works even if you don't have syncHero)
   ============================= */
(function bindSettingsPlanBadge(){
  if (!document.body.classList.contains("settings-ref-page")) return;

  const getPlan = () => {
    let sub = null;
    try { sub = JSON.parse(localStorage.getItem("morph_subscription") || "null"); } catch {}
    const plan =
      (sub && sub.status === "active" && sub.plan) ||
      localStorage.getItem("morph_billing_plan") ||
      "Starter";
    return String(plan || "Starter").trim();
  };

  const render = () => {
    const plan = getPlan();
    const p = plan.toLowerCase();

    const planBadge = document.getElementById("hero-plan-badge");
    if (planBadge) {
      planBadge.textContent =
        p === "starter" ? "Starter • Free" :
        p === "professional" ? "Professional • Premium" :
        p === "studio" ? "Studio • Premium" :
        plan;
    }

    const premiumBadge = document.getElementById("hero-premium-badge");
    if (premiumBadge) premiumBadge.hidden = !["professional", "studio"].includes(p);
  };

  render();

  // if you change plan later (billing), re-render when user returns
  window.addEventListener("focus", render);
})();
/* =============================
   PROJECT STORE (User-default)
   - Keeps all projects in localStorage
   - Seeds your current dashboard projects once
   ============================= */
(function initProjectStoreV1(){
  const KEY = "morph_projects_v1";

  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };
  const save = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

  const existing = load();
  if (Array.isArray(existing) && existing.length) return;

  const seeded = [
    {
      id: "neo-brutalist-villa",
      title: "Neo-Brutalist Villa",
      description: "Modern coastal residence exploring concrete forms and integrated landscaping.",
      image: "./img/neo-brutalist.jpeg",
      status: "approved",
      createdAt: new Date(Date.now() - 14*864e5).toISOString(),
      updatedAt: new Date(Date.now() - 2*36e5).toISOString()
    },
    {
      id: "skyline-pavilion",
      title: "Skyline Pavilion",
      description: "Parametric roof structure for the Dubai 2025 Expo urban renewal competition.",
      image: "./img/skyline-pavilion.jpg",
      status: "in-progress",
      createdAt: new Date(Date.now() - 10*864e5).toISOString(),
      updatedAt: new Date(Date.now() - 1*864e5).toISOString()
    },
    {
      id: "urban-core-housing",
      title: "Urban Core Housing",
      description: "High-density sustainable social housing complex featuring modular timber frames.",
      image: "./img/urban-core-housing.jpg",
      status: "in-progress",
      createdAt: new Date(Date.now() - 21*864e5).toISOString(),
      updatedAt: new Date(Date.now() - 3*864e5).toISOString()
    },
    {
      id: "azure-office-complex",
      title: "Azure Office Complex",
      description: "Lobby design for the Azure Tech HQ, focusing on biophilic elements and smart glass technology.",
      image: "./img/azure-office-complex.avif",
      status: "approved",
      createdAt: new Date(Date.now() - 30*864e5).toISOString(),
      updatedAt: new Date(Date.now() - 7*864e5).toISOString()
    },
    {
      id: "desert-retreat",
      title: "Desert Retreat",
      description: "Subterranean residential project in Arizona utilizing thermal mass cooling techniques.",
      image: "./img/desert-retreat.avif",
      status: "in-progress",
      createdAt: new Date(Date.now() - 45*864e5).toISOString(),
      updatedAt: new Date(Date.now() - 14*864e5).toISOString()
    }
  ];

  save(seeded);
})();
/* =============================
   PROJECTS PAGE – Render all projects (User-default)
   ============================= */
(function initProjectsPage(){
  if (!document.body.classList.contains("projects-page")) return;

  const KEY = "morph_projects_v1";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };
  const save = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

  const grid = document.getElementById("projects-grid");
  const tabs = document.getElementById("projects-tabs");
  const search = document.getElementById("projects-search");
  const allCount = document.getElementById("projects-count-all");
  const summary = document.getElementById("projects-summary");

  if (!grid || !tabs) return;

  let state = { filter: "all", q: "" };

  const relTime = (iso) => {
    try {
      const diff = Date.now() - new Date(iso).getTime();
      const m = Math.floor(diff / 60000);
      if (m < 60) return `${Math.max(1, m)}m ago`;
      const h = Math.floor(m / 60);
      if (h < 24) return `${h}h ago`;
      const d = Math.floor(h / 24);
      return `${d}d ago`;
    } catch { return "—"; }
  };

  const badgeMeta = (status) => {
    const s = String(status || "in-progress").toLowerCase();
    if (s === "approved") return { text: "APPROVED", cls: "badge-green" };
    if (s === "completed") return { text: "COMPLETED", cls: "badge-blue" };
    if (s === "archive") return { text: "ARCHIVED", cls: "badge-grey" };
    return { text: "IN PROGRESS", cls: "badge-yellow" };
  };

  const filtered = () => {
    const q = (state.q || "").trim().toLowerCase();
    return load().filter(p => {
      const status = String(p.status || "in-progress").toLowerCase();
      const matchesFilter = state.filter === "all" ? true : status === state.filter;
      const matchesQ = !q || `${p.title} ${p.description}`.toLowerCase().includes(q);
      return matchesFilter && matchesQ;
    });
  };

  const setStatus = (id, status) => {
    const arr = load();
    const i = arr.findIndex(x => x.id === id);
    if (i < 0) return;
    arr[i].status = status;
    arr[i].updatedAt = new Date().toISOString();
    save(arr);
  };

  const closeMenus = () => {
    document.querySelectorAll(".project-actions-menu").forEach(m => m.hidden = true);
  };
  document.addEventListener("click", closeMenus);

  const buildMenu = (proj) => {
    const menu = document.createElement("div");
    menu.className = "project-actions-menu";
    menu.hidden = true;

    const addItem = (label, action, danger=false) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "project-actions-item" + (danger ? " danger" : "");
      b.textContent = label;
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.hidden = true;

        if (action === "approved") setStatus(proj.id, "approved");
        if (action === "completed") setStatus(proj.id, "completed");
        if (action === "archive") setStatus(proj.id, "archive");
        if (action === "restore") setStatus(proj.id, "in-progress");

        render();
      });
      menu.appendChild(b);
    };

    const st = String(proj.status || "in-progress").toLowerCase();
    if (st !== "approved") addItem("Mark as Approved", "approved");
    if (st !== "completed") addItem("Mark as Completed", "completed");
    if (st !== "archive") addItem("Archive", "archive", true);
    if (st === "archive" || st === "completed") addItem("Restore to In Progress", "restore");

    return menu;
  };

  const render = () => {
    const arrAll = load();
    if (allCount) allCount.textContent = String(arrAll.length);

    const items = filtered().sort((a,b)=> new Date(b.updatedAt) - new Date(a.updatedAt));
    grid.innerHTML = "";

    items.forEach(p => {
      const b = badgeMeta(p.status);

      const card = document.createElement("article");
      card.className = "project-card" + (String(p.status).toLowerCase() === "archive" ? " is-archived" : "");
      card.innerHTML = `
        <div class="project-card-image">
          <img src="${p.image || "./img/skyline-pavilion.jpg"}" alt="">
          <span class="project-badge ${b.cls}">${b.text}</span>
        </div>
        <div class="project-card-body">
          <h3>${p.title}</h3>
          <p>${p.description || "—"}</p>
          <div class="project-card-footer">
            <span class="project-meta">MODIFIED ${relTime(p.updatedAt)}</span>
            <div class="project-actions-wrap"></div>
          </div>
        </div>
      `;

      const wrap = card.querySelector(".project-actions-wrap");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "project-actions-btn";
      btn.innerHTML = '<i class="fas fa-ellipsis-h"></i>';

      const menu = buildMenu(p);

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const willOpen = menu.hidden;
        closeMenus();
        menu.hidden = !willOpen;
      });

      wrap.appendChild(btn);
      wrap.appendChild(menu);

      grid.appendChild(card);
    });

    if (summary) {
      summary.textContent = `Showing ${items.length} project${items.length === 1 ? "" : "s"}`;
    }
  };

  // Tabs
  tabs.querySelectorAll(".projects-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      tabs.querySelectorAll(".projects-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.filter = btn.dataset.filter || "all";
      render();
    });
  });

  // Search
  search?.addEventListener("input", () => {
    state.q = search.value || "";
    render();
  });

  render();
})();
/* =============================
   GLOBAL BACK ARROW (icon only) — FINAL
   - shows on every app page except dashboard
   - inserts into the topbar (so it never overlaps logo/sidebar)
   - works on Billing (app-topbar) + Settings (fixed next to hamburger)
   ============================= */
(function mountBackArrowFinal(){
  if (document.body.classList.contains("dashboard-page")) return;
  if (document.getElementById("mp-back-arrow")) return;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "mp-back-arrow";
  btn.className = "mp-back-arrow";
  btn.setAttribute("aria-label", "Go back");
  btn.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;

  btn.addEventListener("click", () => {
    const fallback = document.body.classList.contains("app") ? "dashboard.html" : "index.html";
    if (history.length > 1) history.back();
    else window.location.href = fallback;
  });

  // SETTINGS page: no app-topbar-left, place next to hamburger (not on sidebar)
  if (document.body.classList.contains("settings-ref-page")) {
    document.body.appendChild(btn);
    btn.style.position = "fixed";
    btn.style.top = "18px";
    btn.style.left = "68px";  // right of settings hamburger
    btn.style.zIndex = "1400";
    return;
  }

  // APP pages (includes Billing if it uses app-topbar)
  const left = document.querySelector(".app-topbar-left");
  if (left) {
    const hb = left.querySelector("#app-hamburger");
    if (hb) hb.insertAdjacentElement("afterend", btn);
    else left.prepend(btn);
    return;
  }

  // Notifications / Support topbars fallback
  const notifTop = document.querySelector(".notif-topbar");
  if (notifTop) { notifTop.prepend(btn); return; }

  const supportTop = document.querySelector(".support-topbar");
  if (supportTop) { supportTop.prepend(btn); return; }

  // final fallback
  document.body.appendChild(btn);
  btn.style.position = "fixed";
  btn.style.top = "14px";
  btn.style.left = "14px";
  btn.style.zIndex = "5000";
})();
/* =============================
   PORTFOLIO PAGE (User-default)
   - Reads profile from morph_settings_profile
   - Reads plan from morph_subscription.plan or morph_billing_plan
   - Reads projects from morph_projects_v1 (seeded once from dashboard list)
   ============================= */
(function initPortfolioPage(){
  if (!document.body.classList.contains("portfolio-page")) return;
  if (window.__morph_portfolio_init) return;
  window.__morph_portfolio_init = true;

  const PROFILE_KEY = "morph_settings_profile";
  const PROJ_KEY = "morph_projects_v1";

  const loadJSON = (k, fallback) => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : fallback; } catch { return fallback; } };
  const saveJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  const getPlan = () => {
    let sub = null;
    try { sub = JSON.parse(localStorage.getItem("morph_subscription") || "null"); } catch {}
    const plan = (sub && sub.status === "active" && sub.plan) || localStorage.getItem("morph_billing_plan") || "Starter";
    return String(plan || "Starter").trim();
  };

  const makePravatarUrl = (seedStr) => {
    const s = String(seedStr || "user").toLowerCase().trim();
    let hash = 0;
    for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
    const imgId = (hash % 70) + 1;
    return `https://i.pravatar.cc/128?img=${imgId}`;
  };

  // Seed projects once (from your existing dashboard project set)
  const ensureProjects = () => {
    const existing = loadJSON(PROJ_KEY, []);
    if (Array.isArray(existing) && existing.length) return;

    saveJSON(PROJ_KEY, [
      { id:"neo-brutalist-villa", title:"Neo-Brutalist Villa", description:"Modern coastal residence exploring concrete forms and integrated landscaping.", image:"./img/neo-brutalist.jpeg", status:"approved", updatedAt:new Date(Date.now()-2*36e5).toISOString() },
      { id:"skyline-pavilion", title:"Skyline Pavilion", description:"Parametric roof structure for the Dubai 2025 Expo urban renewal competition.", image:"./img/skyline-pavilion.jpg", status:"in-progress", updatedAt:new Date(Date.now()-1*864e5).toISOString() },
      { id:"urban-core-housing", title:"Urban Core Housing", description:"High-density sustainable social housing complex featuring modular timber frames.", image:"./img/urban-core-housing.jpg", status:"in-progress", updatedAt:new Date(Date.now()-3*864e5).toISOString() },
      { id:"azure-office-complex", title:"Azure Office Complex", description:"Lobby design for the Azure Tech HQ, focusing on biophilic elements and smart glass technology.", image:"./img/azure-office-complex.avif", status:"approved", updatedAt:new Date(Date.now()-7*864e5).toISOString() },
      { id:"desert-retreat", title:"Desert Retreat", description:"Subterranean residential project in Arizona utilizing thermal mass cooling techniques.", image:"./img/desert-retreat.avif", status:"in-progress", updatedAt:new Date(Date.now()-14*864e5).toISOString() }
    ]);
  };

  ensureProjects();

  const profile = loadJSON(PROFILE_KEY, {});
  const name = (profile.name || localStorage.getItem("morph_user_name") || "User").trim();
  const email = (profile.email || localStorage.getItem("morph_user_email") || "").trim();
  const firm = (profile.firm || "").trim();
  const title = (profile.title || "").trim();

  const roleLine =
    title && firm ? `${title} at ${firm}` :
    title ? title :
    firm ? firm :
    (email ? email : "Update your profile in Account Settings");

  const plan = getPlan();
  const p = plan.toLowerCase();

  // Hero UI
  document.getElementById("port-name").textContent = name;
  document.getElementById("port-role").textContent = roleLine;
  document.getElementById("port-email").textContent = email || "No email";

  const updatedLabel = document.getElementById("port-updated");
  if (updatedLabel) {
    const d = profile.savedAt ? new Date(profile.savedAt) : null;
    updatedLabel.textContent = d ? d.toLocaleDateString() : "Updated recently";
  }

  const avatarDiv = document.getElementById("port-avatar");
  const uploaded = (localStorage.getItem("morph_user_avatar") || "").trim();
  avatarDiv.style.backgroundImage = `url("${uploaded || makePravatarUrl(email || name)}")`;

  // Badges
  const planBadge = document.getElementById("port-plan");
  if (planBadge) {
    planBadge.textContent =
      p === "starter" ? "Starter • Free" :
      p === "professional" ? "Professional • Premium" :
      p === "studio" ? "Studio • Premium" :
      plan;
  }

  const premium = document.getElementById("port-premium");
  const verified = document.getElementById("port-verified");
  if (premium) premium.hidden = !["professional","studio"].includes(p);
  if (verified) verified.hidden = !(title && firm);

  // Projects rendering
  const grid = document.getElementById("port-grid");
  const empty = document.getElementById("port-empty");
  const summary = document.getElementById("port-summary");
  const search = document.getElementById("portfolio-search");
  const tabs = document.getElementById("port-tabs");

  let state = { filter: "all", q: "" };

  const loadProjects = () => loadJSON(PROJ_KEY, []);

  const relTime = (iso) => {
    try{
      const diff = Date.now() - new Date(iso).getTime();
      const m = Math.floor(diff/60000);
      if (m < 60) return `${Math.max(1,m)}m ago`;
      const h = Math.floor(m/60);
      if (h < 24) return `${h}h ago`;
      const d = Math.floor(h/24);
      return `${d}d ago`;
    }catch{ return "—"; }
  };

  const computeStats = (arr) => {
    const total = arr.length;
    const inProgress = arr.filter(x => String(x.status).toLowerCase() === "in-progress").length;
    const approved = arr.filter(x => String(x.status).toLowerCase() === "approved").length;
    const completed = arr.filter(x => String(x.status).toLowerCase() === "completed").length;

    document.getElementById("stat-total").textContent = total;
    document.getElementById("stat-progress").textContent = inProgress;
    document.getElementById("stat-approved").textContent = approved;
    document.getElementById("stat-completed").textContent = completed;
  };

  const filtered = (arr) => {
    const q = (state.q || "").trim().toLowerCase();
    return arr.filter(p => {
      const st = String(p.status || "in-progress").toLowerCase();
      const okFilter = state.filter === "all" ? true : st === state.filter;
      const okQ = !q || `${p.title} ${p.description}`.toLowerCase().includes(q);
      return okFilter && okQ;
    });
  };

  const render = () => {
    const all = loadProjects();
    computeStats(all);

    const items = filtered(all).sort((a,b)=> new Date(b.updatedAt) - new Date(a.updatedAt));
    grid.innerHTML = "";

    if (!items.length) {
      if (empty) empty.hidden = false;
      if (summary) summary.textContent = "Showing 0 projects";
      return;
    }
    if (empty) empty.hidden = true;

    items.forEach(p => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.innerHTML = `
        <div class="project-card-image">
          <img src="${p.image || "./img/skyline-pavilion.jpg"}" alt="">
          <span class="project-badge ${String(p.status).toLowerCase()==="approved"?"badge-green":String(p.status).toLowerCase()==="completed"?"badge-blue":String(p.status).toLowerCase()==="archive"?"badge-grey":"badge-yellow"}">
            ${String(p.status || "in-progress").toUpperCase()}
          </span>
        </div>
        <div class="project-card-body">
          <h3>${p.title}</h3>
          <p>${p.description || "—"}</p>
          <div class="project-card-footer">
            <span class="project-meta">MODIFIED ${relTime(p.updatedAt)}</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    if (summary) summary.textContent = `Showing ${items.length} project${items.length===1?"":"s"}`;
  };

  tabs?.querySelectorAll(".port-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      tabs.querySelectorAll(".port-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.filter = btn.dataset.filter || "all";
      render();
    });
  });

  search?.addEventListener("input", () => {
    state.q = search.value || "";
    render();
  });

  render();
})();
});