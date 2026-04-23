// ================================
// ARCHIVO PRINCIPAL
// ================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar aplicación
    initializeApp();
});

// Inicializar la aplicación
function initializeApp() {
    // Cargar productos iniciales
    loadInitialProducts();
    
    // Configurar anuncios
    setupAnnouncements();
    
    // Modales simplificados del nav (búsqueda / login / mini-carrito)
    setupNavModals();
    
    // Actualizar año del footer
    updateFooterYear();

    // Secciones marketing (solo si existen en la página)
    renderMarketingSections();
}

// Cargar productos iniciales
function loadInitialProducts() {
    if (typeof productFilters !== 'undefined') {
        productFilters.applyFilters();
    }
}

// Configurar sistema de anuncios
function setupAnnouncements() {
    const announcementBar = document.getElementById('announcementBar');
    
    if (!announcementBar || typeof announcements === 'undefined') {
        return;
    }

    // Obtener anuncios activos
    const activeAnnouncements = announcements.filter(a => a.active);
    
    if (activeAnnouncements.length === 0) {
        announcementBar.style.display = 'none';
        return;
    }

    // Rotar anuncios cada 5 segundos
    let currentIndex = 0;
    
    function showNextAnnouncement() {
        if (activeAnnouncements.length > 0) {
            const announcement = activeAnnouncements[currentIndex];
            announcementBar.querySelector('p').textContent = announcement.message;
            currentIndex = (currentIndex + 1) % activeAnnouncements.length;
        }
    }

    // Mostrar primer anuncio
    showNextAnnouncement();
    
    // Rotar si hay más de uno
    if (activeAnnouncements.length > 1) {
        setInterval(showNextAnnouncement, 5000);
    }
}

// Configurar modales de autenticación
function ensureNavDialogs() {
    const existing = document.getElementById('navSearchDialog');
    if (existing) {
        return;
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <dialog class="nav-dialog" id="navSearchDialog" aria-label="Búsqueda">
            <form method="dialog" class="nav-dialog__card">
                <header class="nav-dialog__header">
                    <h2 class="nav-dialog__title">Buscar</h2>
                    <button class="nav-dialog__close" value="cancel" aria-label="Cerrar">×</button>
                </header>
                <div class="nav-dialog__body">
                    <label class="nav-dialog__label" for="searchInput">Buscar productos</label>
                    <input id="searchInput" type="search" class="form-input" placeholder="Buscar..." autocomplete="off">
                    <p class="nav-dialog__hint">Tip: escribe y se filtrarán los productos (si estás en la homepage).</p>
                </div>
            </form>
        </dialog>

        <dialog class="nav-dialog" id="navLoginDialog" aria-label="Inicio de sesión">
            <form class="nav-dialog__card" id="navLoginForm">
                <header class="nav-dialog__header">
                    <h2 class="nav-dialog__title">Iniciar sesión</h2>
                    <button class="nav-dialog__close" type="button" data-close-dialog="navLoginDialog" aria-label="Cerrar">×</button>
                </header>
                <div class="nav-dialog__body">
                    <div class="form-group">
                        <label for="loginEmail" class="form-label">Correo electrónico</label>
                        <input type="email" id="loginEmail" class="form-input" placeholder="tu@email.com" required>
                    </div>
                    <div class="form-group">
                        <label for="loginPassword" class="form-label">Contraseña</label>
                        <input type="password" id="loginPassword" class="form-input" placeholder="••••••••" required>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Entrar</button>
                </div>
            </form>
        </dialog>

        <dialog class="nav-dialog" id="navCartDialog" aria-label="Carrito">
            <form method="dialog" class="nav-dialog__card">
                <header class="nav-dialog__header">
                    <h2 class="nav-dialog__title">Tu carrito</h2>
                    <button class="nav-dialog__close" value="cancel" aria-label="Cerrar">×</button>
                </header>
                <div class="nav-dialog__body">
                    <div id="navCartItems"></div>
                    <div class="nav-dialog__footer">
                        <div class="nav-dialog__total">
                            <span>Total</span>
                            <strong id="navCartTotal">$0</strong>
                        </div>
                        <div class="nav-dialog__actions">
                            <a class="btn btn-outline" href="cart.html">Ir al carrito</a>
                            <button type="button" class="btn btn-primary" id="navCartCheckoutBtn">Finalizar</button>
                        </div>
                    </div>
                </div>
            </form>
        </dialog>
    `;

    document.body.appendChild(wrapper);

    // Notificar a search.js que el input ya existe
    document.dispatchEvent(new CustomEvent('search:inputReady'));
}

function openDialogById(id) {
    const dialog = document.getElementById(id);
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') {
        dialog.showModal();
    } else {
        dialog.setAttribute('open', '');
    }
}

function closeDialogById(id) {
    const dialog = document.getElementById(id);
    if (!dialog) return;
    if (dialog.open && typeof dialog.close === 'function') {
        dialog.close();
    } else {
        dialog.removeAttribute('open');
    }
}

function renderNavCartDialog() {
    const itemsEl = document.getElementById('navCartItems');
    const totalEl = document.getElementById('navCartTotal');
    if (!itemsEl || !totalEl || typeof cart === 'undefined') return;

    const items = cart.getItems();
    if (!items || items.length === 0) {
        itemsEl.innerHTML = `
            <div class="nav-cart-empty">
                <p class="nav-cart-empty__icon">🛒</p>
                <p>Tu carrito está vacío.</p>
            </div>
        `;
        totalEl.textContent = cart.formatPrice(0);
        return;
    }

    const subtotal = cart.getSubtotal();
    const total = cart.getTotal();

    itemsEl.innerHTML = `
        <ul class="nav-cart-list">
            ${items.slice(0, 5).map(item => `
                <li class="nav-cart-item">
                    <img class="nav-cart-item__img" src="${item.image}" alt="${item.name}">
                    <div class="nav-cart-item__meta">
                        <p class="nav-cart-item__name">${item.name}</p>
                        <p class="nav-cart-item__sub">${item.quantity} × ${cart.formatPrice(item.price)}</p>
                    </div>
                    <button type="button" class="nav-cart-item__remove" aria-label="Eliminar" data-remove-from-cart="${item.id}">×</button>
                </li>
            `).join('')}
        </ul>
        ${items.length > 5 ? `<p class="nav-dialog__hint">Mostrando 5 de ${items.length} productos.</p>` : ''}
        <div class="nav-cart-subtotal">
            <span>Subtotal</span>
            <strong>${cart.formatPrice(subtotal)}</strong>
        </div>
    `;

    totalEl.textContent = cart.formatPrice(total);
}

function setupNavModals() {
    ensureNavDialogs();

    // Search (🔍)
    const searchShortcut = document.querySelector('.search-shortcut');
    if (searchShortcut) {
        searchShortcut.addEventListener('click', (e) => {
            e.preventDefault();
            ensureNavDialogs();
            openDialogById('navSearchDialog');
            requestAnimationFrame(() => {
                const input = document.getElementById('searchInput');
                input?.focus?.();
                input?.select?.();
            });
        });
    }

    // Login (👤)
    const loginBtn = document.getElementById('loginBtn');
    const footerLoginLink = document.getElementById('footerLoginLink');
    const openLogin = (e) => {
        e?.preventDefault?.();
        showLoginModal();
    };
    loginBtn?.addEventListener?.('click', openLogin);
    footerLoginLink?.addEventListener?.('click', openLogin);

    // Cart (🛒)
    const cartBtn = document.getElementById('cartBtn') || document.querySelector('[data-cart-trigger]');
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            ensureNavDialogs();
            renderNavCartDialog();
            openDialogById('navCartDialog');
        });
    }

    // Close buttons (login dialog)
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (!(target instanceof HTMLElement)) return;
        const closeId = target.getAttribute('data-close-dialog');
        if (closeId) {
            closeDialogById(closeId);
        }
        const removeId = target.getAttribute('data-remove-from-cart');
        if (removeId && typeof cart !== 'undefined') {
            cart.removeItem(Number(removeId));
            renderNavCartDialog();
        }
    });

    // Login submit
    const loginForm = document.getElementById('navLoginForm');
    loginForm?.addEventListener?.('submit', handleLogin);

    // Cart “Finalizar” -> ir a carrito (versión simplificada)
    const checkoutBtn = document.getElementById('navCartCheckoutBtn');
    checkoutBtn?.addEventListener?.('click', () => {
        window.location.href = 'cart.html';
    });
}

// Mostrar modal de inicio de sesión
function showLoginModal() {
    ensureNavDialogs();
    openDialogById('navLoginDialog');
}

// Mostrar modal de registro
function showRegisterModal() {
    const modal = createModal('Crear Cuenta', `
        <form id="registerForm" style="margin-top: 1.5rem;">
            <div class="form-group">
                <label for="registerName" class="form-label">Nombre Completo</label>
                <input 
                    type="text" 
                    id="registerName" 
                    class="form-input" 
                    placeholder="Juan Pérez"
                    required
                >
            </div>
            
            <div class="form-group">
                <label for="registerEmail" class="form-label">Correo Electrónico</label>
                <input 
                    type="email" 
                    id="registerEmail" 
                    class="form-input" 
                    placeholder="tu@email.com"
                    required
                >
            </div>
            
            <div class="form-group">
                <label for="registerPassword" class="form-label">Contraseña</label>
                <input 
                    type="password" 
                    id="registerPassword" 
                    class="form-input" 
                    placeholder="Mínimo 8 caracteres"
                    required
                    minlength="8"
                >
            </div>
            
            <div class="form-group">
                <label for="registerPhone" class="form-label">Teléfono</label>
                <input 
                    type="tel" 
                    id="registerPhone" 
                    class="form-input" 
                    placeholder="+57 300 123 4567"
                    required
                >
            </div>
            
            <div class="form-group">
                <label for="registerAddress" class="form-label">Dirección de Envío</label>
                <textarea 
                    id="registerAddress" 
                    class="form-input" 
                    rows="3"
                    placeholder="Calle 123 #45-67, Apto 101"
                    required
                ></textarea>
            </div>
            
            <div class="form-group">
                <label style="display: flex; align-items: start; gap: 0.5rem;">
                    <input type="checkbox" id="acceptTerms" required>
                    <span style="font-size: 0.875rem;">
                        Acepto los <a href="#" style="color: var(--primary-color);">Términos y Condiciones</a>
                    </span>
                </label>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-bottom: 1rem;">
                Crear Cuenta
            </button>
            
            <p style="text-align: center; font-size: 0.875rem; color: var(--text-secondary);">
                ¿Ya tienes cuenta? <a href="#" id="showLoginModal" style="color: var(--primary-color); font-weight: 600;">Inicia sesión</a>
            </p>
        </form>
    `);
    
    // Event listener para el formulario
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', handleRegister);
    
    // Link para mostrar login
    const showLoginLink = document.getElementById('showLoginModal');
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
        setTimeout(showLoginModal, 100);
    });
}

// Crear modal genérico
function createModal(title, content) {
    // Remover modal existente si hay
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">×</button>
            <h2 style="margin-bottom: 1rem;">${title}</h2>
            ${content}
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Cerrar al hacer clic fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
    
    return modal;
}

// Cerrar modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Manejar inicio de sesión
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Aquí iría la lógica de autenticación con el backend
    console.log('Login:', { email, password });
    
    // Simular login exitoso
    localStorage.setItem('user', JSON.stringify({
        email: email,
        name: 'Usuario Demo',
        loggedIn: true
    }));
    
    closeDialogById('navLoginDialog');
    cart.showNotification('✅ Inicio de sesión exitoso');
    updateUserInterface();
}

// Manejar registro
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const phone = document.getElementById('registerPhone').value;
    const address = document.getElementById('registerAddress').value;
    
    // Aquí iría la lógica de registro con el backend
    console.log('Register:', { name, email, password, phone, address });
    
    // Simular registro exitoso
    localStorage.setItem('user', JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        address: address,
        loggedIn: true
    }));
    
    closeModal();
    cart.showNotification('✅ Cuenta creada exitosamente');
    updateUserInterface();
}

// Actualizar interfaz de usuario
function updateUserInterface() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const loginBtn = document.getElementById('loginBtn');
    
    if (user.loggedIn && loginBtn) {
        loginBtn.innerHTML = `👤 <span>${user.name}</span>`;
    }
}

function renderProductsToGrid(gridId, list) {
    const grid = document.getElementById(gridId);
    if (!grid || typeof cart === 'undefined') return;
    if (!list || list.length === 0) {
        grid.innerHTML = '';
        return;
    }
    grid.innerHTML = '';
    list.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card fade-in';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-text">${product.description}</p>
                <div class="flex-between" style="margin-bottom: 1rem;">
                    <p class="card-price">${cart.formatPrice(product.price)}</p>
                    ${product.stock > 0
                        ? `<span class="badge badge-success">En stock</span>`
                        : `<span class="badge badge-warning">Agotado</span>`}
                </div>
                <button
                    class="btn btn-primary"
                    style="width: 100%;"
                    onclick="addToCart(${product.id})"
                    ${product.stock <= 0 ? 'disabled' : ''}
                >
                    ${product.stock > 0 ? '🛒 Añadir al Carrito' : '❌ Agotado'}
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderMarketingSections() {
    if (typeof products === 'undefined' || !Array.isArray(products)) return;

    // Destacados / Más buscados: por ahora, selección simple determinística
    const featured = products.slice(0, 4);
    const trending = products.slice(4, 8);

    renderProductsToGrid('featuredProductsGrid', featured);
    renderProductsToGrid('trendingProductsGrid', trending);

    // Categorías destacadas: aplica filtro cuando existe
    document.querySelectorAll('[data-category-jump]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const category = el.getAttribute('data-category-jump');
            if (!category) return;
            const btn = document.querySelector(`#categoryFilters .filter-tag[data-category="${category}"]`);
            btn?.click?.();
            if (typeof scrollToProducts === 'function') {
                scrollToProducts();
            } else {
                document.getElementById('products-section')?.scrollIntoView?.({ behavior: 'smooth' });
            }
        });
    });

    // Suscripción
    const subscribeForm = document.getElementById('subscribeForm');
    subscribeForm?.addEventListener?.('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('subscribeEmail');
        const email = emailInput?.value?.trim?.() || '';
        if (!email || !email.includes('@')) {
            cart?.showNotification?.('⚠️ Ingresa un correo válido');
            return;
        }
        localStorage.setItem('subscribedEmail', email);
        cart?.showNotification?.('✅ ¡Gracias por suscribirte!');
        subscribeForm.reset();
    });
}

// Mostrar menú de usuario
function showUserMenu() {
    // Aquí se puede implementar un menú desplegable con opciones del usuario
    console.log('Show user menu');
}

// Actualizar año en el footer
function updateFooterYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => el.textContent = currentYear);
}

// Verificar si el usuario está logueado al cargar
if (localStorage.getItem('user')) {
    updateUserInterface();
}
