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
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.innerHTML = '&uarr;'; // Up arrow
    document.body.appendChild(scrollToTopBtn);

    const toggleScrollToTop = () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleScrollToTop);
    // Also check on load, in case page is already scrolled down
    window.addEventListener('load', toggleScrollToTop);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Optional: Fade-in animation for sections/cards on scroll
    // This is a basic implementation. For more advanced features like staggering, a library might be considered.
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }); // Adjust rootMargin to trigger slightly before element is fully visible

    document.querySelectorAll('.card, .hero').forEach(element => {
        element.classList.add('fade-in-element'); // Add base class for hidden state
        fadeInObserver.observe(element);
    });

    // CSS for fade-in effect (to be added in style.css)
    // .fade-in-element { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
    // .fade-in-element.fade-in-visible { opacity: 1; transform: translateY(0); }

})();
