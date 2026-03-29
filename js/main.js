document.addEventListener('DOMContentLoaded', () => {
    // Navbar Reveal (Global)
    const navbar = document.querySelector('nav');
    if (navbar) {
        gsap.from(navbar, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
            delay: 0.2
        });
    }

    // Hero Section Reveal
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    if (document.querySelector('.hero-content')) {
        heroTl.from('.hero-content h1', { y: 100, opacity: 0, skewY: 7, stagger: 0.1 }, "+=0.3")
            .from('.hero-content p', { y: 20, opacity: 0 }, "-=0.8")
            .from('.hero-content .cta-group', { y: 20, opacity: 0 }, "-=1");
    }

    // Bento Cards Hover Parallax & Video Playback
    document.querySelectorAll('.bento-card').forEach(card => {
        const video = card.querySelector('.hover-video');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(card, {
                rotationY: x * 10,
                rotationX: -y * 10,
                duration: 0.5,
                ease: 'power2.out',
                transformPerspective: 1000
            });
        });

        card.addEventListener('mouseenter', () => {
            if (video) {
                video.play().catch(error => {
                    // Autoplay was prevented or video not loaded
                    console.log('Video play prevented:', error);
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: 'power2.out'
            });

            if (video) {
                video.pause();
                video.currentTime = 0; // Optional: reset to start
            }
        });
    });

    // Scroll Reveal (Intersection Observer for fallback or GSAP if available)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.reveal').forEach((elem) => {
            gsap.fromTo(elem, 
                { opacity: 0, y: 50 }, 
                {
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Staggered highlights
        gsap.utils.toArray('.stagger-reveal').forEach((parent) => {
            gsap.from(parent.children, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: parent,
                    start: "top 80%"
                }
            });
        });
    }
});
