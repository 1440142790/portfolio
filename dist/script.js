/**
 * Portfolio Website - Interactive Script
 * 包含：导航、滚动动画、画廊筛选、图片灯箱、表单处理等功能
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== 页面加载动画 =====
    const loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        });
    }

    // ===== 导航栏滚动效果 =====
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // 导航链接高亮
    function highlightNavLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ===== 移动端导航菜单 =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ===== 平滑滚动 =====
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

    // ===== 滚动动画 =====
    const animateElements = document.querySelectorAll('.about, .gallery, .videos, .contact, .about-image, .about-text, .about-stats, .gallery-item, .video-item, .contact-info, .contact-form');

    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // ===== 画廊筛选 =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            galleryItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                    item.style.display = 'block';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ===== 图片灯箱 =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ===== 视频播放 =====
    const videoWrappers = document.querySelectorAll('.video-wrapper');

    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('.video-preview');
        const playBtn = wrapper.querySelector('.video-play');

        if (video && playBtn) {
            // 点击播放
            playBtn.addEventListener('click', () => {
                playBtn.style.opacity = '0';
                playBtn.style.pointerEvents = 'none';
                video.controls = true;
                video.play();
            });

            // 暂停时显示播放按钮
            video.addEventListener('pause', () => {
                if (!video.ended && video.currentTime > 0) {
                    playBtn.style.opacity = '1';
                    playBtn.style.pointerEvents = 'auto';
                }
            });

            // 播放结束
            video.addEventListener('ended', () => {
                playBtn.style.opacity = '1';
                playBtn.style.pointerEvents = 'auto';
                video.controls = false;
            });
        }
    });

    // ===== 联系表单 =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span>发送中...</span>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = `
                    <span>发送成功!</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                `;
                btn.style.background = '#22c55e';

                setTimeout(() => {
                    contactForm.reset();
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 2000);
            }, 1500);
        });

        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // ===== 鼠标跟随光效 =====
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const gradient = document.createElement('div');
            gradient.className = 'mouse-glow';
            gradient.style.cssText = `
                position: absolute;
                width: 400px;
                height: 400px;
                background: radial-gradient(circle, rgba(201, 169, 98, 0.15) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                left: ${x - 200}px;
                top: ${y - 200}px;
                transition: transform 0.1s ease;
            `;

            const oldGlow = hero.querySelector('.mouse-glow');
            if (oldGlow) oldGlow.remove();

            hero.appendChild(gradient);

            requestAnimationFrame(() => {
                gradient.style.transform = 'scale(1)';
            });
        });

        hero.addEventListener('mouseleave', () => {
            const glow = hero.querySelector('.mouse-glow');
            if (glow) {
                glow.style.opacity = '0';
                setTimeout(() => glow.remove(), 300);
            }
        });
    }

    // ===== 统计数字动画 =====
    const statNumbers = document.querySelectorAll('.stat-number');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/[\d]/g, '');
                let current = 0;
                const increment = numericValue / 50;
                const duration = 1500;
                const stepTime = duration / 50;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        target.textContent = finalValue;
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(current) + suffix;
                    }
                }, stepTime);

                countObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => countObserver.observe(num));

    // ===== 技能标签悬浮效果 =====
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-4px) rotateX(10deg)';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = '';
        });
    });

    // ===== 视差效果 =====
    const parallaxElements = document.querySelectorAll('.hero-content');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${scrolled * 0.3}px)`;
            el.style.opacity = 1 - scrolled / 700;
        });
    });

    // ===== 社交媒体链接 =====
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.getAttribute('aria-label');
            alert(`社交媒体 "${platform}" 功能将在后续版本中添加`);
        });
    });

    // ===== 回到顶部按钮 =====
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        // 滚动时显示/隐藏按钮
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // 点击回到顶部
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    console.log('Portfolio website initialized successfully!');
});
