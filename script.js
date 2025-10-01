// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
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
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
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
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
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
        this.shows = JSON.parse(localStorage.getItem('parrockShows')) || [];
        this.init();
    }

    init() {
        this.renderShows();
        this.bindEvents();
    }

    bindEvents() {
        // No form binding needed for index page - only for admin
    }

    handleShowSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('showName').value;
        const date = document.getElementById('showDate').value;
        const time = document.getElementById('showTime').value;
        const price = document.getElementById('showPrice').value;
        const description = document.getElementById('showDescription').value;
        const imageFile = document.getElementById('showImage').files[0];

        if (!name || !date || !time || !description) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const show = {
            id: Date.now(),
            name,
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
        localStorage.setItem('parrockShows', JSON.stringify(this.shows));
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

        container.innerHTML = featuredShows.map(show => `
            <div class="show-item" style="min-width: 300px;">
                ${show.image ? `<img src="${show.image}" alt="${show.name}" class="show-item-img">` : ''}
                <div class="show-item-content">
                    <div class="show-item-header">
                        <h3 class="show-item-name">${show.name}</h3>
                        <p class="show-item-date">${this.formatDate(show.date)}</p>
                        <p class="show-item-time">${show.time}</p>
                        <p class="show-item-price">${show.price}</p>
                    </div>
                    <p class="show-item-description">${show.description}</p>
                </div>
            </div>
        `).join('');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    clearShowForm() {
        document.getElementById('showsForm').reset();
    }
}

// Initialize managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.promotionsManager = new PromotionsManager();
    window.menuManager = new MenuManager();
    window.showsManager = new ShowsManager();
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
