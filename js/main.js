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
