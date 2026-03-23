/* ==========================================================================
   Haarlems Oktoberfest — Main JS
   ========================================================================== */

(function () {
    'use strict';

    const header = document.getElementById('site-header');
    const navToggle = document.querySelector('.nav__toggle');
    const navLinks = document.querySelector('.nav__links');
    const hero = document.getElementById('hero');

    // --- Mobile Nav Toggle ---
    navToggle.addEventListener('click', function () {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isOpen);
        navToggle.setAttribute('aria-label', isOpen ? 'Menu openen' : 'Menu sluiten');
        navLinks.classList.toggle('is-open');
    });

    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Menu openen');
            navLinks.classList.remove('is-open');
        });
    });

    // --- Sticky Header Scroll Effect ---
    var headerObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                header.classList.toggle('is-scrolled', !entry.isIntersecting);
            });
        },
        { threshold: 0.1 }
    );

    headerObserver.observe(hero);

    // --- Pre-register Form ---
    var preregisterForm = document.getElementById('preregister-form');
    if (preregisterForm) {
        preregisterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var emailInput = document.getElementById('preregister-email');
            var message = document.getElementById('preregister-message');
            var btnText = preregisterForm.querySelector('.preregister-form__btn-text');
            var btnLoading = preregisterForm.querySelector('.preregister-form__btn-loading');
            var btn = preregisterForm.querySelector('button[type="submit"]');

            var phoneInput = document.getElementById('preregister-phone');

            btn.disabled = true;
            btnText.hidden = true;
            btnLoading.hidden = false;
            message.hidden = true;

            var payload = { email: emailInput.value.trim() };
            if (phoneInput && phoneInput.value.trim()) {
                payload.phone = '+31' + phoneInput.value.trim().replace(/^0+/, '');
            }

            fetch('/.netlify/functions/preregister', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                message.hidden = false;
                if (data.success) {
                    message.textContent = data.duplicate
                        ? 'Je staat al op de lijst! We houden je op de hoogte.'
                        : 'Je bent aangemeld! We laten je weten zodra de tickets beschikbaar zijn.';
                    message.className = 'preregister-form__message preregister-form__message--success';
                    emailInput.value = '';
                    if (phoneInput) phoneInput.value = '';
                } else {
                    message.textContent = data.error || 'Er ging iets mis. Probeer het later opnieuw.';
                    message.className = 'preregister-form__message preregister-form__message--error';
                }
            })
            .catch(function () {
                message.hidden = false;
                message.textContent = 'Er ging iets mis. Probeer het later opnieuw.';
                message.className = 'preregister-form__message preregister-form__message--error';
            })
            .finally(function () {
                btn.disabled = false;
                btnText.hidden = false;
                btnLoading.hidden = true;
            });
        });
    }

    // --- Scroll Reveal Animation ---
    var revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        var revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    }
})();
