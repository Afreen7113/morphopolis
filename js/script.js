document.addEventListener('DOMContentLoaded', () => {
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


    // --- "Start Designing" Button Functionality (Home Page) ---
    document.querySelectorAll('.btn[data-action="start-designing"]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'signup.html'; // Redirect to signup page
        });
    });

    // --- Pricing Card "Start Designing" buttons ---
    document.querySelectorAll('.pricing-card .btn-dark').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const plan = button.closest('.pricing-card').querySelector('h3').textContent;
            alert(`You selected the "${plan}" plan! Redirecting to sign up.`);
            window.location.href = 'signup.html';
        });
    });

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
                alert('Account created successfully! Redirecting to sign in.');
                window.location.href = 'signin.html';
            }
        });
    }

    // Simulate Signin
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = signinForm.querySelector('input[name="email"]').value;
            const password = signinForm.querySelector('input[name="password"]').value;

            if (email && password) {
                alert('Signed in successfully! Welcome back.');
                window.location.href = 'index.html'; // Redirect to home or dashboard
            } else {
                alert('Please enter your email and password.');
            }
        });
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
});