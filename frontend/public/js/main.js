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
    
    // Configurar modales de autenticación
    setupAuthModals();
    
    // Actualizar año del footer
    updateFooterYear();
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
function setupAuthModals() {
    const loginBtn = document.getElementById('loginBtn');
    const footerLoginLink = document.getElementById('footerLoginLink');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginModal();
        });
    }
    
    if (footerLoginLink) {
        footerLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginModal();
        });
    }
}

// Mostrar modal de inicio de sesión
function showLoginModal() {
    const modal = createModal('Iniciar Sesión', `
        <form id="loginForm" style="margin-top: 1.5rem;">
            <div class="form-group">
                <label for="loginEmail" class="form-label">Correo Electrónico</label>
                <input 
                    type="email" 
                    id="loginEmail" 
                    class="form-input" 
                    placeholder="tu@email.com"
                    required
                >
            </div>
            
            <div class="form-group">
                <label for="loginPassword" class="form-label">Contraseña</label>
                <input 
                    type="password" 
                    id="loginPassword" 
                    class="form-input" 
                    placeholder="••••••••"
                    required
                >
            </div>
            
            <div class="form-group" style="display: flex; justify-content: space-between; align-items: center;">
                <label style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" id="rememberMe">
                    <span style="font-size: 0.875rem;">Recordarme</span>
                </label>
                <a href="#" style="font-size: 0.875rem; color: var(--primary-color);">¿Olvidaste tu contraseña?</a>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-bottom: 1rem;">
                Iniciar Sesión
            </button>
            
            <p style="text-align: center; font-size: 0.875rem; color: var(--text-secondary);">
                ¿No tienes cuenta? <a href="#" id="showRegisterModal" style="color: var(--primary-color); font-weight: 600;">Regístrate aquí</a>
            </p>
        </form>
    `);
    
    // Event listener para el formulario
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
    
    // Link para mostrar registro
    const showRegisterLink = document.getElementById('showRegisterModal');
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
        setTimeout(showRegisterModal, 100);
    });
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
    const remember = document.getElementById('rememberMe').checked;
    
    // Aquí iría la lógica de autenticación con el backend
    console.log('Login:', { email, password, remember });
    
    // Simular login exitoso
    localStorage.setItem('user', JSON.stringify({
        email: email,
        name: 'Usuario Demo',
        loggedIn: true
    }));
    
    closeModal();
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
        loginBtn.onclick = (e) => {
            e.preventDefault();
            showUserMenu();
        };
    }
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
