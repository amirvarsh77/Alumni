/**
 * script.js - Institutional Behavior
 */
document.addEventListener('DOMContentLoaded', () => {
    const sidebarAnchors = document.querySelectorAll('.sidebar-nav a');
    
    // Smooth scrolling & active state assignment for the sidebar
    sidebarAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Remove active class from all
            sidebarAnchors.forEach(a => a.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
        });
    });

    // Sidebar Accordion Logic
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            const content = this.nextElementSibling;
            if (!isExpanded) {
                content.style.maxHeight = (content.scrollHeight + 10) + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });

    // Mobile Navigation logic (Basic functionality)
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const headerNav = document.querySelector('.header-nav');
    let menuOpen = false;

    if (mobileMenuToggle && headerNav) {
        mobileMenuToggle.addEventListener('click', () => {
            menuOpen = !menuOpen;
            if (menuOpen) {
                // Inline styles just for mobile menu prototyping
                headerNav.style.display = 'block';
                headerNav.style.position = 'absolute';
                headerNav.style.top = '80px';
                headerNav.style.left = '0';
                headerNav.style.width = '100%';
                headerNav.style.backgroundColor = '#ffffff';
                headerNav.style.borderBottom = '1px solid #e5e5e5';
                headerNav.style.padding = '1rem 2rem';
                headerNav.style.boxShadow = '0 10px 15px rgba(0,0,0,0.05)';
                
                const ul = headerNav.querySelector('ul');
                if (ul) {
                    ul.style.flexDirection = 'column';
                    ul.style.gap = '1.5rem';
                }
            } else {
                headerNav.style.display = 'none';
            }
        });

        // Reset display on resize to ensure desktop layout returns
        window.addEventListener('resize', () => {
            if (window.innerWidth > 600) {
                headerNav.style.display = 'block';
                headerNav.style.position = 'static';
                headerNav.style.padding = '0';
                headerNav.style.boxShadow = 'none';
                headerNav.style.borderBottom = 'none';
                
                const ul = headerNav.querySelector('ul');
                if (ul) {
                    ul.style.flexDirection = 'row';
                    ul.style.gap = '2.5rem';
                }
                menuOpen = false;
            } else if (!menuOpen) {
                headerNav.style.display = 'none';
            }
        });
    }

    // Intersection Observer for scroll spying the sidebar
    const contentBlocks = document.querySelectorAll('.main-content > div[id]');
    
    if (contentBlocks.length > 0 && sidebarAnchors.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    sidebarAnchors.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            root: null,
            rootMargin: '-10% 0px -60% 0px',
            threshold: 0
        });

        contentBlocks.forEach(block => observer.observe(block));
    }

    // Metric Counting Animation
    const metricNumbers = document.querySelectorAll('.metric-number');
    let metricsAnimated = false;

    if (metricNumbers.length > 0) {
        const metricsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !metricsAnimated) {
                    metricsAnimated = true; // ensure it runs only once
                    
                    metricNumbers.forEach(metric => {
                        const target = parseInt(metric.getAttribute('data-target'), 10);
                        const duration = 2000; // 2 seconds
                        let startTimestamp = null;
                        
                        const step = (timestamp) => {
                            if (!startTimestamp) startTimestamp = timestamp;
                            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                            
                            // ease-out effect: 1 - (1 - t)^3
                            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
                            
                            metric.innerText = Math.floor(easeOutProgress * target);
                            
                            if (progress < 1) {
                                window.requestAnimationFrame(step);
                            } else {
                                metric.innerText = target;
                            }
                        };
                        
                        window.requestAnimationFrame(step);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        const trustSection = document.getElementById('trust');
        if (trustSection) {
            metricsObserver.observe(trustSection);
        }
    }
});
