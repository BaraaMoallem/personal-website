/* ============================================
   BARAA AL MOALEM - PERSONAL WEBSITE
   Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Matrix Rain Background ----------
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(10, 14, 23, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00d4ff';
            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        setInterval(drawMatrix, 50);
    }

    // ---------- Typing Animation ----------
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const phrases = [
            'whoami',
            'Cybersecurity Student',
            'SOC Analyst',
            'Blue Team Defender',
            'Network Security'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 80;

        const typeWriter = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 80;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000; // pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // pause before new phrase
            }

            setTimeout(typeWriter, typeSpeed);
        };

        setTimeout(typeWriter, 1000);
    }

    // ---------- Title Rotation ----------
    const titleElement = document.getElementById('title-rotate');
    if (titleElement) {
        const titles = [
            'SOC Analyst',
            'Blue Team Defender',
            'Network Security Enthusiast',
            'Cybersecurity Student'
        ];
        let currentTitle = 0;

        setInterval(() => {
            titleElement.style.opacity = '0';
            titleElement.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                currentTitle = (currentTitle + 1) % titles.length;
                titleElement.textContent = titles[currentTitle];
                titleElement.style.opacity = '1';
                titleElement.style.transform = 'translateY(0)';
            }, 300);
        }, 3000);

        titleElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        titleElement.style.display = 'inline-block';
    }

    // ---------- Navbar Scroll Effect ----------
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');

    window.addEventListener('scroll', () => {
        // Scrolled state
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ---------- Mobile Nav Toggle ----------
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-links');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ---------- Number Counter Animation ----------
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCount = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 1500;
        const start = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(easeOut * target);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    };

    // ---------- Scroll Reveal / Intersection Observer ----------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation for stat numbers
                if (entry.target.querySelector('.stat-number')) {
                    entry.target.querySelectorAll('.stat-number').forEach(num => {
                        animateCount(num);
                    });
                }
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add reveal class to animatable elements
    const animatableSelectors = [
        '.about-text',
        '.about-stats',
        '.skill-category',
        '.timeline-item',
        '.cert-card',
        '.project-card',
        '.education-card',
        '.contact-card',
        '.contact-intro',
        '.contact-cta'
    ];

    animatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${index * 0.1}s`;
            revealObserver.observe(el);
        });
    });

    // ---------- Smooth Scroll for all anchor links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ---------- Parallax Effect for Shield ----------
    const shieldContainer = document.querySelector('.shield-container');
    if (shieldContainer) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            shieldContainer.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

});

