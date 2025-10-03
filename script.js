// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
            const headerHeight = 80; // Height of fixed header
            let targetPosition = target.offsetTop - headerHeight;
            
            // Special handling for about section to ensure it's fully visible
            if (target.id === 'about') {
                targetPosition = targetPosition - 40; // Extra margin for about section
            }
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            }
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const eventType = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !phone || !eventType || !message) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\(\)\-\+]+$/;
        if (!phoneRegex.test(phone)) {
            alert('Por favor, insira um telefone válido.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .feature, .gallery-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// WhatsApp integration
function openWhatsApp() {
    const phoneNumber = '5567999999999'; // Replace with actual phone number
    const message = 'Olá! Gostaria de saber mais sobre o Parrock Rock\'n Parrilla.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Add WhatsApp click handler to WhatsApp social link
document.addEventListener('DOMContentLoaded', () => {
    const whatsappLink = document.querySelector('.social-link[href="#"]:has(.fa-whatsapp)');
    if (whatsappLink) {
        whatsappLink.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp();
        });
    }
});

// Add click handlers for other social links (placeholder)
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        if (!link.onclick) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const icon = link.querySelector('i');
                if (icon.classList.contains('fa-instagram')) {
                    // Replace with actual Instagram URL
                    window.open('https://instagram.com/parrocknparrilla', '_blank');
                } else if (icon.classList.contains('fa-facebook')) {
                    // Replace with actual Facebook URL
                    window.open('https://facebook.com/parrocknparrilla', '_blank');
                }
            });
        }
    });
});

// Add scroll to top functionality
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gold);
        color: var(--primary-black);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Promotions Management
class PromotionsManager {
    constructor() {
        this.promotions = JSON.parse(localStorage.getItem('parrockPromotions')) || [];
        this.init();
    }

    init() {
        this.renderPromotions();
    }

    renderPromotions() {
        const container = document.getElementById('promotionsCarousel');
        if (!container) return;

        // Get only featured promotions (max 7)
        const featuredPromotions = this.promotions
            .filter(promo => promo.featured)
            .slice(0, 7);

        if (featuredPromotions.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; color: var(--gray); grid-column: 1/-1; padding: 2rem;">
                    <i class="fas fa-tags" style="font-size: 3rem; margin-bottom: 1rem; color: var(--gold);"></i>
                    <p>Nenhuma promoção disponível no momento.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = featuredPromotions.map(promo => `
            <div class="promotion-card ${promo.featured ? 'featured' : ''}">
                ${promo.badge ? `<div class="promotion-badge">${promo.badge}</div>` : ''}
                ${promo.image ? `<img src="${promo.image}" alt="${promo.name}" class="promotion-image">` : ''}
                <div class="promotion-content">
                    <h3 class="promotion-title">${promo.name}</h3>
                    <p class="promotion-price">${promo.price}</p>
                    <p class="promotion-description">${promo.description}</p>
                    ${promo.validity ? `<p class="promotion-validity">Válido até: ${this.formatDate(promo.validity)}</p>` : ''}
                </div>
            </div>
        `).join('');
    }

    formatDate(dateString) {
        // Ajustar para UTC-4 (Brasil)
        const date = new Date(dateString);
        const utc4Date = new Date(date.getTime() - (4 * 60 * 60 * 1000));
        return utc4Date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'America/Sao_Paulo'
        });
    }
}

// Menu Management (for cardápio page)
class MenuManager {
    constructor() {
        this.menuItems = JSON.parse(localStorage.getItem('parrockMenu')) || [];
        this.init();
    }

    init() {
        this.renderMenu();
        this.bindEvents();
    }

    bindEvents() {
        // No form binding needed for index page - only for admin
    }

    handleMenuSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('menuName').value;
        const price = document.getElementById('menuPrice').value;
        const description = document.getElementById('menuDescription').value;
        const imageFile = document.getElementById('menuImage').files[0];

        if (!name || !price || !description) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const menuItem = {
            id: Date.now(),
            name,
            price,
            description,
            image: null
        };

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                menuItem.image = e.target.result;
                this.addMenuItem(menuItem);
            };
            reader.readAsDataURL(imageFile);
        } else {
            this.addMenuItem(menuItem);
        }
    }

    addMenuItem(item) {
        this.menuItems.push(item);
        this.saveMenu();
        this.renderMenu();
        this.clearMenuForm();
        alert('Item adicionado ao cardápio com sucesso!');
    }

    deleteMenuItem(id) {
        if (confirm('Tem certeza que deseja remover este item do cardápio?')) {
            this.menuItems = this.menuItems.filter(item => item.id !== id);
            this.saveMenu();
            this.renderMenu();
        }
    }

    saveMenu() {
        localStorage.setItem('parrockMenu', JSON.stringify(this.menuItems));
    }

    renderMenu() {
        const container = document.getElementById('menuItems');
        if (!container) return;

        if (this.menuItems.length === 0) {
            container.innerHTML = '<p style="color: var(--gray); text-align: center; grid-column: 1/-1;">Nenhum item no cardápio ainda. Adicione o primeiro item!</p>';
            return;
        }

        container.innerHTML = this.menuItems.map(item => `
            <div class="menu-item">
                ${item.image ? `<img src="${item.image}" alt="${item.name}" class="menu-item-img">` : ''}
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-name">${item.name}</h3>
                        <span class="menu-item-price">${item.price}</span>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                </div>
            </div>
        `).join('');
    }

    clearMenuForm() {
        document.getElementById('menuForm').reset();
    }
}

// Shows Management
class ShowsManager {
    constructor() {
        this.shows = JSON.parse(localStorage.getItem('shows')) || [];
        this.init();
    }

    init() {
        this.renderShows();
        this.bindEvents();
        
        // Listener para redimensionamento da janela
        window.addEventListener('resize', () => {
            this.renderShows();
        });
    }

    bindEvents() {
        // No form binding needed for index page - only for admin
    }

    handleShowSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('showTitle').value;
        const date = document.getElementById('showDate').value;
        const time = document.getElementById('showTime').value;
        const price = document.getElementById('showPrice').value;
        const description = document.getElementById('showDescription').value;
        const imageFile = document.getElementById('showImage').files[0];

        if (!title || !date || !time || !description) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const show = {
            id: Date.now(),
            title,
            date,
            time,
            price: price || 'Entrada gratuita',
            description,
            image: null
        };

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                show.image = e.target.result;
                this.addShow(show);
            };
            reader.readAsDataURL(imageFile);
        } else {
            this.addShow(show);
        }
    }

    addShow(show) {
        this.shows.push(show);
        this.saveShows();
        this.renderShows();
        this.clearShowForm();
        alert('Show adicionado à agenda com sucesso!');
    }

    deleteShow(id) {
        if (confirm('Tem certeza que deseja remover este show da agenda?')) {
            this.shows = this.shows.filter(show => show.id !== id);
            this.saveShows();
            this.renderShows();
        }
    }

    saveShows() {
        localStorage.setItem('shows', JSON.stringify(this.shows));
    }

    renderShows() {
        const container = document.getElementById('showsCarousel');
        if (!container) return;

        // Get only featured shows (max 7)
        const featuredShows = this.shows
            .filter(show => show.featured)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 7);

        if (featuredShows.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; color: var(--gray); grid-column: 1/-1; padding: 2rem;">
                    <i class="fas fa-music" style="font-size: 3rem; margin-bottom: 1rem; color: var(--gold);"></i>
                    <p>Nenhum show em destaque no momento.</p>
                </div>
            `;
            return;
        }
        
        // Verificar se deve usar carrossel (mais de 3 cards em desktop)
        const shouldUseCarousel = featuredShows.length > 3 && window.innerWidth > 768;
        
        if (shouldUseCarousel) {
            this.renderCarousel(container, featuredShows);
        } else {
            this.renderGrid(container, featuredShows);
        }
    }

    renderCarousel(container, shows) {
        container.className = 'shows-carousel';
        container.innerHTML = `
            <div class="carousel-container">
                <button class="carousel-btn carousel-btn-prev" onclick="showsManager.prevSlide()">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <div class="carousel-track">
                    ${shows.map((show, index) => `
                        <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                            <div class="show-gallery-item">
                                ${show.image ? `<img src="${show.image}" alt="${show.title}" class="show-gallery-img">` : ''}
                                <div class="show-gallery-content">
                                    <h3 class="show-gallery-title">${show.title}</h3>
                                    <div class="show-gallery-meta">
                                        <p class="show-gallery-date">📅 ${this.formatDate(show.date)}</p>
                                        <p class="show-gallery-time">🕐 ${show.time}</p>
                                    </div>
                                    <p class="show-gallery-description">${show.description}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="carousel-btn carousel-btn-next" onclick="showsManager.nextSlide()">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="carousel-dots">
                ${Array.from({length: Math.max(1, shows.length - 2)}, (_, index) => `
                    <button class="carousel-dot ${index === 0 ? 'active' : ''}" onclick="showsManager.goToSlide(${index})"></button>
                `).join('')}
            </div>
        `;
        
        this.currentSlide = 0;
        this.totalSlides = shows.length;
    }

    renderGrid(container, shows) {
        container.className = 'gallery-grid';
        container.innerHTML = shows.map(show => `
            <div class="show-gallery-item">
                ${show.image ? `<img src="${show.image}" alt="${show.title}" class="show-gallery-img">` : ''}
                <div class="show-gallery-content">
                    <h3 class="show-gallery-title">${show.title}</h3>
                    <div class="show-gallery-meta">
                        <p class="show-gallery-date">📅 ${this.formatDate(show.date)}</p>
                        <p class="show-gallery-time">🕐 ${show.time}</p>
                    </div>
                    <p class="show-gallery-description">${show.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Métodos do carrossel
    nextSlide() {
        const maxSlide = Math.max(0, this.totalSlides - 3);
        if (this.currentSlide < maxSlide) {
            this.currentSlide++;
        } else {
            this.currentSlide = 0;
        }
        this.updateCarousel();
    }

    prevSlide() {
        const maxSlide = Math.max(0, this.totalSlides - 3);
        if (this.currentSlide > 0) {
            this.currentSlide--;
        } else {
            this.currentSlide = maxSlide;
        }
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }

    updateCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        
        // Mostrar apenas 3 slides ativos por vez
        slides.forEach((slide, index) => {
            const isActive = index >= this.currentSlide && index < this.currentSlide + 3;
            slide.classList.toggle('active', isActive);
        });
        
        // Atualizar dots baseado no slide atual
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        
        // Garantir que apenas 3 slides sejam visíveis
        const activeSlides = document.querySelectorAll('.carousel-slide.active');
        if (activeSlides.length > 3) {
            // Se mais de 3 slides estão ativos, desativar os extras
            for (let i = 3; i < activeSlides.length; i++) {
                activeSlides[i].classList.remove('active');
            }
        }
    }

    formatDate(dateString) {
        // Ajustar para UTC-4 (Brasil)
        const date = new Date(dateString);
        const utc4Date = new Date(date.getTime() - (4 * 60 * 60 * 1000));
        return utc4Date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'America/Sao_Paulo'
        });
    }

    clearShowForm() {
        document.getElementById('showsForm').reset();
    }
}

// Enhanced Admin Manager for robust panel
class EnhancedAdminManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindFormEvents();
        this.loadSettings();
    }

    bindFormEvents() {
        // Show form
        const showForm = document.getElementById('showForm');
        if (showForm) {
            showForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleShowSubmit();
            });
        }

        // Menu form
        const menuForm = document.getElementById('menuForm');
        if (menuForm) {
            menuForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleMenuSubmit();
            });
        }

        // Promotion form
        const promotionForm = document.getElementById('promotionForm');
        if (promotionForm) {
            promotionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handlePromotionSubmit();
            });
        }

        // Image form
        const imageForm = document.getElementById('imageForm');
        if (imageForm) {
            imageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleImageSubmit();
            });
        }

        // Content form
        const contentForm = document.getElementById('contentForm');
        if (contentForm) {
            contentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContentSubmit();
            });
        }

        // Settings form
        const settingsForm = document.getElementById('settingsForm');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSettingsSubmit();
            });
        }
    }

    handleShowSubmit() {
        const title = document.getElementById('showTitle').value;
        const date = document.getElementById('showDate').value;
        const time = document.getElementById('showTime').value;
        const description = document.getElementById('showDescription').value;
        const featured = document.getElementById('showFeatured').checked;
        const imageFile = document.getElementById('showImage').files[0];

        if (!title || !date || !time || !description) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const show = {
            id: Date.now().toString(), // Gerar ID único
            title,
            date,
            time,
            description,
            featured,
            image: null
        };

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                show.image = e.target.result;
                this.saveShow(show);
            };
            reader.readAsDataURL(imageFile);
        } else {
            this.saveShow(show);
        }
    }

    handleMenuSubmit() {
        const name = document.getElementById('menuName').value;
        const category = document.getElementById('menuCategory').value;
        const description = document.getElementById('menuDescription').value;
        const price = parseFloat(document.getElementById('menuPrice').value);
        const featured = document.getElementById('menuFeatured').checked;
        const imageFile = document.getElementById('menuImage').files[0];

        if (!name || !category || !description || isNaN(price)) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const menuItem = {
            name,
            category,
            description,
            price,
            featured,
            image: null
        };

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                menuItem.image = e.target.result;
                this.saveMenuItem(menuItem);
            };
            reader.readAsDataURL(imageFile);
        } else {
            this.saveMenuItem(menuItem);
        }
    }

    handlePromotionSubmit() {
        const title = document.getElementById('promotionTitle').value;
        const description = document.getElementById('promotionDescription').value;
        const validUntil = document.getElementById('promotionValidUntil').value;
        const featured = document.getElementById('promotionFeatured').checked;
        const imageFile = document.getElementById('promotionImage').files[0];

        if (!title || !description || !validUntil) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const promotion = {
            title,
            description,
            validUntil,
            featured,
            image: null
        };

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                promotion.image = e.target.result;
                this.savePromotion(promotion);
            };
            reader.readAsDataURL(imageFile);
        } else {
            this.savePromotion(promotion);
        }
    }

    handleImageSubmit() {
        const name = document.getElementById('imageName').value;
        const description = document.getElementById('imageDescription').value;
        const imageFile = document.getElementById('imageFile').files[0];

        if (!name || !imageFile) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Determinar categoria automaticamente baseada no nome
        let category = 'gallery'; // padrão
        if (name.toLowerCase().includes('profile') || name.toLowerCase().includes('logo')) {
            category = 'logo';
        } else if (name.toLowerCase().includes('hero') || name.toLowerCase().includes('banner')) {
            category = 'hero';
        } else if (name.toLowerCase().includes('about') || name.toLowerCase().includes('sobre')) {
            category = 'about';
        } else if (name.toLowerCase().includes('services') || name.toLowerCase().includes('serviços')) {
            category = 'services';
        } else if (name.toLowerCase().includes('contact') || name.toLowerCase().includes('contato')) {
            category = 'contact';
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const image = {
                name,
                category,
                description,
                data: e.target.result
            };
            
            // Verificar se está no modo de substituição
            if (window.currentReplacingImage) {
                console.log(`🔄 Modo de substituição ativo para: ${window.currentReplacingImage}`);
                // Adicionar flag para indicar que é uma substituição
                image.isReplacement = true;
                image.originalPath = window.currentReplacingImage;
            }
            
            this.saveImage(image);
            
            // Limpar a referência de substituição
            window.currentReplacingImage = null;
        };
        reader.readAsDataURL(imageFile);
    }

    handleContentSubmit() {
        const section = document.getElementById('contentSection').value;
        const title = document.getElementById('contentTitle').value;
        const text = document.getElementById('contentText').value;
        const imageFile = document.getElementById('contentImage').files[0];

        if (!section || !title || !text) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const content = {
            section,
            title,
            text,
            image: null
        };

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                content.image = e.target.result;
                this.saveContent(content);
            };
            reader.readAsDataURL(imageFile);
        } else {
            this.saveContent(content);
        }
    }

    handleSettingsSubmit() {
        const title = document.getElementById('siteTitle').value;
        const description = document.getElementById('siteDescription').value;
        const primaryColor = document.getElementById('primaryColor').value;
        const secondaryColor = document.getElementById('secondaryColor').value;
        const logoFile = document.getElementById('siteLogo').files[0];

        const settings = {
            title,
            description,
            primaryColor,
            secondaryColor,
            logo: null
        };

        if (logoFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                settings.logo = e.target.result;
                this.saveSettings(settings);
            };
            reader.readAsDataURL(logoFile);
        } else {
            this.saveSettings(settings);
        }
    }

    saveShow(show) {
        const shows = JSON.parse(localStorage.getItem('shows') || '[]');
        
        // Verificar se está editando um show existente
        if (window.editingShowId) {
            const index = shows.findIndex(s => (s.id || s.title) === window.editingShowId);
            if (index !== -1) {
                shows[index] = show;
                this.showSuccess('Show atualizado com sucesso!');
            } else {
                shows.push(show);
                this.showSuccess('Show adicionado com sucesso!');
            }
            // Limpar ID de edição
            window.editingShowId = null;
        } else {
            shows.push(show);
            this.showSuccess('Show adicionado com sucesso!');
        }
        
        localStorage.setItem('shows', JSON.stringify(shows));
        this.clearForm('showForm');
        if (typeof loadShows === 'function') loadShows();
        if (typeof updateStats === 'function') updateStats();
        if (typeof refreshPreviews === 'function') refreshPreviews();
    }

    saveMenuItem(menuItem) {
        const menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]');
        menuItems.push(menuItem);
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
        this.clearForm('menuForm');
        this.showSuccess('Item do cardápio adicionado com sucesso!');
        if (typeof loadMenuItems === 'function') loadMenuItems();
        if (typeof updateStats === 'function') updateStats();
        if (typeof refreshPreviews === 'function') refreshPreviews();
    }

    savePromotion(promotion) {
        const promotions = JSON.parse(localStorage.getItem('promotions') || '[]');
        promotions.push(promotion);
        localStorage.setItem('promotions', JSON.stringify(promotions));
        this.clearForm('promotionForm');
        this.showSuccess('Promoção adicionada com sucesso!');
        if (typeof loadPromotions === 'function') loadPromotions();
        if (typeof updateStats === 'function') updateStats();
        if (typeof refreshPreviews === 'function') refreshPreviews();
    }

    saveImage(image) {
        const images = JSON.parse(localStorage.getItem('images') || '[]');
        
        // Se for uma substituição, procurar pela imagem original
        if (image.isReplacement && image.originalPath) {
            console.log(`🔄 Procurando imagem original: ${image.originalPath}`);
            
            // Procurar por imagem com o mesmo nome ou caminho
            const originalIndex = images.findIndex(img => 
                img.name === image.name || 
                img.path === image.originalPath ||
                img.data === image.originalPath
            );
            
            if (originalIndex !== -1) {
                // Substituir imagem existente
                image.id = images[originalIndex].id; // Manter o mesmo ID
                images[originalIndex] = image;
                this.showSuccess('Imagem substituída com sucesso!');
                console.log(`✅ Imagem substituída no índice: ${originalIndex}`);
            } else {
                // Se não encontrar, adicionar como nova
                if (!image.id) {
                    image.id = 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                }
                images.push(image);
                this.showSuccess('Imagem adicionada com sucesso!');
                console.log(`➕ Imagem adicionada como nova (original não encontrada)`);
            }
        } else {
            // Lógica normal para novas imagens
            if (!image.id) {
                image.id = 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            }
            
            const existingIndex = images.findIndex(img => img.id === image.id);
            
            if (existingIndex !== -1) {
                images[existingIndex] = image;
                this.showSuccess('Imagem atualizada com sucesso!');
            } else {
                images.push(image);
                this.showSuccess('Imagem adicionada com sucesso!');
            }
        }
        
        localStorage.setItem('images', JSON.stringify(images));
        this.clearForm('imageForm');
        if (typeof loadImages === 'function') loadImages();
        if (typeof updateStats === 'function') updateStats();
        if (typeof refreshPreviews === 'function') refreshPreviews();
        
        // Voltar ao preview após salvar
        if (typeof showImagePreview === 'function') showImagePreview();
    }

    saveContent(content) {
        const contents = JSON.parse(localStorage.getItem('siteContent') || '[]');
        
        // Se for seção de contato, processar dados específicos
        if (content.section === 'contact') {
            const contactData = {
                address: document.getElementById('contactAddress') ? document.getElementById('contactAddress').value : '',
                phone: document.getElementById('contactPhone') ? document.getElementById('contactPhone').value : '',
                email: document.getElementById('contactEmail') ? document.getElementById('contactEmail').value : ''
            };
            content.contactData = contactData;
        }
        
        // Verificar se já existe conteúdo para esta seção
        const existingIndex = contents.findIndex(item => item.section === content.section);
        
        if (existingIndex !== -1) {
            // Atualizar conteúdo existente
            contents[existingIndex] = content;
            this.showSuccess('Conteúdo atualizado com sucesso!');
        } else {
            // Adicionar novo conteúdo
            contents.push(content);
            this.showSuccess('Conteúdo salvo com sucesso!');
        }
        
        localStorage.setItem('siteContent', JSON.stringify(contents));
        this.clearForm('contentForm');
        if (typeof loadContent === 'function') loadContent();
        if (typeof refreshPreviews === 'function') refreshPreviews();
        
        // Voltar ao preview após salvar
        if (typeof showContentPreview === 'function') showContentPreview();
        
        // Forçar atualização do site principal
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'siteContent',
            newValue: JSON.stringify(contents)
        }));
    }

    saveSettings(settings) {
        localStorage.setItem('siteSettings', JSON.stringify(settings));
        this.showSuccess('Configurações salvas com sucesso!');
        this.applySettings(settings);
    }

    clearForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
            // Clear image previews
            const previews = form.querySelectorAll('.image-preview');
            previews.forEach(preview => {
                preview.style.display = 'none';
                preview.src = '';
            });
        }
    }

    showSuccess(message) {
        // Create a temporary success message
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 10000;
            font-weight: 600;
        `;
        successDiv.textContent = message;
        document.body.appendChild(successDiv);

        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 3000);
    }

    loadSettings() {
        const settings = JSON.parse(localStorage.getItem('siteSettings') || '{}');
        if (settings.title) {
            document.getElementById('siteTitle').value = settings.title;
        }
        if (settings.description) {
            document.getElementById('siteDescription').value = settings.description;
        }
        if (settings.primaryColor) {
            document.getElementById('primaryColor').value = settings.primaryColor;
        }
        if (settings.secondaryColor) {
            document.getElementById('secondaryColor').value = settings.secondaryColor;
        }
        if (settings.logo) {
            document.getElementById('siteLogoPreview').src = settings.logo;
            document.getElementById('siteLogoPreview').style.display = 'block';
        }
    }

    applySettings(settings) {
        // Apply settings to the main site
        if (settings.primaryColor) {
            document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
        }
        if (settings.secondaryColor) {
            document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
        }
        if (settings.logo) {
            const logos = document.querySelectorAll('.header-logo img');
            logos.forEach(logo => {
                logo.src = settings.logo;
            });
        }
    }
}

// Initialize managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.promotionsManager = new PromotionsManager();
    window.menuManager = new MenuManager();
    window.showsManager = new ShowsManager();
    
    // Initialize enhanced admin manager if on admin page
    if (document.getElementById('showForm')) {
        window.enhancedAdminManager = new EnhancedAdminManager();
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on escape
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--gold)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});
