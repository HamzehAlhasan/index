(function () {
    "use strict";

    // Highlight active navigation link
    const currentPath = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".site-nav a").forEach(link => {
        const linkPath = link.getAttribute("href").split("/").pop();
        if (linkPath === currentPath) {
            link.classList.add("is-active");
            link.setAttribute("aria-current", "page");
        }
    });

    // Scroll-to-top button functionality
    // Use existing button if present in HTML, otherwise create one
    let scrollToTopBtn = document.querySelector('.scroll-to-top');

    if (!scrollToTopBtn) {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.classList.add('scroll-to-top');
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        scrollToTopBtn.innerHTML = '&uarr;'; // Up arrow
        document.body.appendChild(scrollToTopBtn);
    }

    const toggleScrollToTop = () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleScrollToTop);
    window.addEventListener('load', toggleScrollToTop);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Fade-in animation for elements with .fade-in-element class
    if ('IntersectionObserver' in window) {
        const fadeInObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        document.querySelectorAll('.fade-in-element').forEach(element => {
            fadeInObserver.observe(element);
        });
    } else {
        // Fallback for browsers that do not support IntersectionObserver
        document.querySelectorAll('.fade-in-element').forEach(element => {
            element.classList.add('fade-in-visible');
        });
    }

})();
