document.addEventListener('DOMContentLoaded', () => {
    function setSessionUser(name, email) {
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
  sessionStorage.setItem("morph_logged_in", "1");
  localStorage.setItem("morph_logged_in", "1");
  if (name) sessionStorage.setItem("morph_user_name", name);
  if (email) sessionStorage.setItem("morph_user_email", email);
}
    // --- Smooth Scrolling for Navigation (Home Page) ---
    document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (document.body.classList.contains('nav-open')) {
                toggleMobileMenu();
            }
        });
        const isLoggedIn = () => sessionStorage.getItem("morph_logged_in") === "1";

const setSessionUser = (name, email) => {
  if (name) sessionStorage.setItem("morph_user_name", name);
  if (email) sessionStorage.setItem("morph_user_email", email);
  sessionStorage.setItem("morph_logged_in", "1");
};

const logout = () => {
  sessionStorage.removeItem("morph_logged_in");
  localStorage.removeItem("morph_logged_in");
  sessionStorage.removeItem("morph_user_name");
  sessionStorage.removeItem("morph_user_email");
  sessionStorage.removeItem("morph_user_avatar");
  window.location.href = "index.html";
};
    });

    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const header = document.querySelector('.header');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            header.classList.toggle('active');
            document.body.classList.toggle('nav-open'); // To prevent scroll when menu is open
        });
    }

        // --- Hero Section Image Carousel (thumbnails + hero background) ---
    const heroSection = document.querySelector('.hero');
    const heroThumbnails = document.querySelectorAll('.hero-thumbnails .thumbnail');
    const prevHeroArrow = document.querySelector('.hero-carousel-nav .carousel-arrow.prev');
    const nextHeroArrow = document.querySelector('.hero-carousel-nav .carousel-arrow.next');
    const thumbStrip = document.querySelector('.hero-thumbnails');

    if (heroSection && heroThumbnails.length > 0 && thumbStrip) {
        let currentHeroIndex = 0;

        // scroll the thumbnail strip so that only 2 are visible
        function scrollThumbnails(index) {
            // we have 4 thumbs, want 2 visible:
            // index 0 or 1 -> show thumbs 0 & 1
            // index 2 or 3 -> show thumbs 2 & 3
            const thumbWidth = heroThumbnails[0].offsetWidth + 12; // 12px gap
            const groupWidth = thumbWidth * 2;

            if (index <= 1) {
                thumbStrip.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                thumbStrip.scrollTo({ left: groupWidth, behavior: 'smooth' });
            }
        }

        function setHeroSlide(index) {
            const thumb = heroThumbnails[index];
            const imgEl = thumb.querySelector('img');
            if (!imgEl) return;

            const src = imgEl.src;

            // Set gradient + new image as hero background
            heroSection.style.backgroundImage =
                `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url('${src}')`;

            heroThumbnails.forEach((t, i) => {
                t.classList.toggle('active', i === index);
            });

            currentHeroIndex = index;
            scrollThumbnails(index);
        }

        // Click on thumbnail = change hero background and move strip if needed
        heroThumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => setHeroSlide(index));
        });

        // Next / prev arrows
        if (nextHeroArrow) {
            nextHeroArrow.addEventListener('click', () => {
                const newIndex = (currentHeroIndex + 1) % heroThumbnails.length;
                setHeroSlide(newIndex);
            });
        }

        if (prevHeroArrow) {
            prevHeroArrow.addEventListener('click', () => {
                const newIndex = (currentHeroIndex - 1 + heroThumbnails.length) % heroThumbnails.length;
                setHeroSlide(newIndex);
            });
        }

        // Initial slide = first thumbnail
        setHeroSlide(0);
    }
    // --- Design Examples Carousel ---
    const exampleCarousel = document.querySelector('.example-carousel-inner');
    const examplePrevArrow = document.querySelector('.design-examples .carousel-arrow.prev');
    const exampleNextArrow = document.querySelector('.design-examples .carousel-arrow.next');

    if (exampleCarousel) {
        let currentExampleIndex = 0;
        const exampleItems = exampleCarousel.querySelectorAll('.example-carousel-item');
        const totalExamples = exampleItems.length;

        function updateExampleCarousel() {
            const offset = -currentExampleIndex * 100;
            exampleCarousel.style.transform = `translateX(${offset}%)`;
        }

        if (examplePrevArrow && exampleNextArrow) {
            examplePrevArrow.addEventListener('click', () => {
                currentExampleIndex = (currentExampleIndex - 1 + totalExamples) % totalExamples;
                updateExampleCarousel();
            });

            exampleNextArrow.addEventListener('click', () => {
                currentExampleIndex = (currentExampleIndex + 1) % totalExamples;
                updateExampleCarousel();
            });
        }
        updateExampleCarousel(); // Initialize
    }

    // --- Auth Pages Form Logic ---

    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const passwordInput = toggle.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            toggle.classList.toggle('fa-eye');
            toggle.classList.toggle('fa-eye-slash');
        });
    });

    // Simulate Signup
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        const passwordInput = signupForm.querySelector('input[name="password"]');
        const confirmPasswordInput = signupForm.querySelector('input[name="confirm-password"]');
        const strengthBar = signupForm.querySelector('.password-strength-bar');
        const passwordError = signupForm.querySelector('#password-error');
        const termsCheckbox = signupForm.querySelector('#terms-checkbox');
        const termsError = signupForm.querySelector('#terms-error');

        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            let strength = 0;
            if (password.length > 0) strengthBar.classList.remove('weak', 'medium', 'strong');

            if (password.length >= 8) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;

            if (password.length === 0) {
                strengthBar.querySelector('.strength-fill').style.width = '0%';
            } else if (strength < 2) {
                strengthBar.classList.add('weak');
            } else if (strength < 4) {
                strengthBar.classList.add('medium');
            } else {
                strengthBar.classList.add('strong');
            }

            if (password.length > 0 && password.length < 8) {
                passwordError.textContent = 'Password must be at least 8 characters.';
                passwordError.style.display = 'block';
            } else {
                passwordError.textContent = '';
                passwordError.style.display = 'none';
            }
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Basic validation
            const fullName = signupForm.querySelector('input[name="full-name"]').value;
            const email = signupForm.querySelector('input[name="email"]').value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (!fullName || !email || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                isValid = false;
            } else if (password.length < 8) {
                passwordError.textContent = 'Password must be at least 8 characters.';
                passwordError.style.display = 'block';
                isValid = false;
            } else if (password !== confirmPassword) {
                passwordError.textContent = 'Passwords do not match.';
                passwordError.style.display = 'block';
                isValid = false;
            } else {
                passwordError.textContent = '';
                passwordError.style.display = 'none';
            }

            if (!termsCheckbox.checked) {
                termsError.textContent = 'You must agree to the Terms of Service and Privacy Policy.';
                termsError.style.display = 'block';
                isValid = false;
            } else {
                termsError.textContent = '';
                termsError.style.display = 'none';
            }

                    if (isValid) {
            // Save user info for the app pages
            const fullName = signupForm.querySelector('input[name="full-name"]').value.trim();
            const email = signupForm.querySelector('input[name="email"]').value.trim();
             setSessionUser(fullName, email);
            if (fullName) {
                localStorage.setItem('morph_user_name', fullName);
            }
            if (email) {
                localStorage.setItem('morph_user_email', email);
            }

            // Go directly to dashboard after sign up
            window.location.href = 'dashboard.html';
        }
        });
    }

    // Simulate Signin (REAL session)
const signinForm = document.getElementById("signin-form");
if (signinForm) {
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signinForm.querySelector("#email").value.trim();
    const password = signinForm.querySelector("#password").value;

    if (!email || !password) return;

    // keep email in localStorage (optional)
    localStorage.setItem("morph_user_email", email);

    // IMPORTANT: set session login flag so app pages allow entry
    // name might not be known on sign-in, so we keep it empty
    setSessionUser("", email);

const next = sessionStorage.getItem("morph_redirect_after_login");
if (next) {
  sessionStorage.removeItem("morph_redirect_after_login");
  window.location.href = next;
} else {
  window.location.href = "dashboard.html";
}  });
}

    // Simulate Forgot Password
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = forgotPasswordForm.querySelector('input[name="email"]').value;

            if (email) {
                alert(`Password reset link sent to ${email}!`);
                window.location.href = 'signin.html'; // Redirect to sign-in after sending link
            } else {
                alert('Please enter your email address.');
            }
        });
    }

    // Redirect to signup from signin if "Don't have an account?" is clicked
    const signupLink = document.querySelector('.auth-footer-text a[href="signup.html"]');
    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'signup.html';
        });
    }

    // Redirect to signin from signup if "Already have an account?" is clicked
    const signinLink = document.querySelector('.auth-footer-text a[href="signin.html"]');
    if (signinLink) {
        signinLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'signin.html';
        });
    }

    // Redirect from forgot password to signin
    const backToSigninLink = document.querySelector('.forgot-password-link a[href="signin.html"]');
    if (backToSigninLink) {
        backToSigninLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'signin.html';
        });
    }
        // --- Social login modal ("Continue with Google/Apple") ---
    const socialModal = document.getElementById('social-modal');
    const socialModalTitle = document.getElementById('social-modal-title');
    const socialModalText = document.getElementById('social-modal-text');
    const socialModalContinue = document.getElementById('social-modal-continue');
    const socialModalCloseBtn = document.querySelector('.social-modal-close');
    const socialModalCancel = document.querySelector('.social-modal-cancel');

    if (socialModal && socialModalTitle && socialModalText && socialModalContinue) {
        let currentProvider = null;

        function openSocialModal(provider) {
            currentProvider = provider;
            socialModalTitle.textContent = `Continue with ${provider}`;
            socialModalText.textContent =
                `You’ll be redirected to ${provider} to continue with Morphopolis.`;
            socialModal.classList.add('active');
        }

        function closeSocialModal() {
            socialModal.classList.remove('active');
            currentProvider = null;
        }

        // When user clicks Google / Apple buttons
        document.querySelectorAll('.btn-social').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();  // prevent any default action for now
                const text = btn.textContent.toLowerCase();
                const provider = text.includes('google') ? 'Google'
                              : text.includes('apple')  ? 'Apple'
                              : 'Provider';
                openSocialModal(provider);
            });
        });

        // Continue button – here is where real OAuth redirect would go
        socialModalContinue.addEventListener('click', (e) => {
            e.preventDefault();
            // TODO: replace with real OAuth redirect when backend is ready
            // Example: window.location.href = `/auth/${currentProvider.toLowerCase()}`;
            closeSocialModal();
        });

        // Close / cancel actions
        if (socialModalCloseBtn) {
            socialModalCloseBtn.addEventListener('click', closeSocialModal);
        }
        if (socialModalCancel) {
            socialModalCancel.addEventListener('click', closeSocialModal);
        }

        // Close when clicking outside the card
        socialModal.addEventListener('click', (e) => {
            if (e.target === socialModal) {
                closeSocialModal();
            }
        });
    }
  /* =============================
   HOME CTA ROUTING (Start Designing) — FIXED
   - Works for pricing buttons + header + hero
   - Stores selected plan for billing
   - Logged-in -> billing.html, else -> signup.html
   ============================= */
(function bindStartDesigningCTAs() {
  const isLoggedIn = () =>
    sessionStorage.getItem("morph_logged_in") === "1" ||
    localStorage.getItem("morph_logged_in") === "1";

  const getStartTarget = () => (isLoggedIn() ? "billing.html" : "signup.html");

  const logout = () => {
    sessionStorage.removeItem("morph_logged_in");
    sessionStorage.removeItem("morph_user_name");
    sessionStorage.removeItem("morph_user_email");
    sessionStorage.removeItem("morph_user_avatar");
    localStorage.removeItem("morph_logged_in");
    window.location.href = "index.html";
  };

  // Update all anchor CTAs to correct href
  document.querySelectorAll('a[data-action="start-designing"]').forEach((a) => {
    a.setAttribute("href", getStartTarget());
  });

  // One click handler for BOTH <a> and <button>
  document.addEventListener(
    "click",
    (e) => {
      const el = e.target.closest('[data-action="start-designing"]');
      if (!el) return;

      e.preventDefault();

      // If clicked inside Pricing cards, store selected plan for billing page
      const pricingCard = el.closest("#pricing .pricing-card");
      if (pricingCard) {
        const planName = (pricingCard.querySelector("h3")?.textContent || "").trim();
        if (planName) localStorage.setItem("morph_billing_intent_plan", planName);
      }

      window.location.href = getStartTarget();
    },
    true
  );

  // Header: if logged in, change button text + add Logout
  const headerActions = document.querySelector(".header .header-actions");
  if (headerActions && isLoggedIn()) {
    const startBtn = headerActions.querySelector('[data-action="start-designing"]');
    if (startBtn) {
      startBtn.textContent = "Billing";
      startBtn.setAttribute("href", "billing.html");
    }

    if (!document.getElementById("home-logout-btn")) {
      const logoutBtn = document.createElement("a");
      logoutBtn.href = "#";
      logoutBtn.id = "home-logout-btn";
      logoutBtn.className = "btn btn-text-link";
      logoutBtn.textContent = "Logout";
      logoutBtn.addEventListener("click", (ev) => {
        ev.preventDefault();
        logout();
      });
      headerActions.appendChild(logoutBtn);
    }
  }
})();

});