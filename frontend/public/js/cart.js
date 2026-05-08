// ================================
// GESTIÓN DEL CARRITO DE COMPRAS
// ================================

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartBadge();
    }

    // Cargar carrito desde localStorage
    loadCart() {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Guardar carrito en localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartBadge();
    }

    // Añadir producto al carrito
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }

        this.saveCart();
        this.showNotification(`✅ ${product.name} añadido al carrito`);
        return true;
    }

    // Eliminar producto del carrito
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.showNotification('🗑️ Producto eliminado del carrito');
    }

    // Actualizar cantidad de un producto
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    // Obtener todos los items del carrito
    getItems() {
        return this.items;
    }

    // Obtener cantidad total de items
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Calcular subtotal
    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Calcular impuestos (19% IVA)
    getTax() {
        return Math.round(this.getSubtotal() * 0.19);
    }

    // Calcular costo de envío
    getShipping() {
        const subtotal = this.getSubtotal();
        return subtotal >= 50000 ? 0 : 5000;
    }

    // Calcular total
    getTotal() {
        return this.getSubtotal() + this.getTax() + this.getShipping();
    }

    // Vaciar carrito
    clear() {
        this.items = [];
        this.saveCart();
        this.showNotification('🗑️ Carrito vaciado');
    }

    // Actualizar badge del carrito en el header
    updateCartBadge() {
        const badge = document.getElementById('cartBadge');
        if (badge) {
            const totalItems = this.getTotalItems();
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    // Mostrar notificación
    showNotification(message) {
        // Remover notificación existente si hay
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Crear nueva notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background-color: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Formatear precio en pesos colombianos
    formatPrice(price) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    }
}

// Crear instancia global del carrito
const cart = new ShoppingCart();

// Añadir al carrito (global; requiere `products` de data.js)
function addToCart(productId) {
    if (typeof products === 'undefined' || !Array.isArray(products)) return;
    const product = products.find(p => p.id === productId);
    if (product && product.stock > 0) {
        cart.addItem(product);
    }
}

// Agregar estilos de animación para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
