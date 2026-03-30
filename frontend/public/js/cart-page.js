// ================================
// FUNCIONALIDAD DE PÁGINA DEL CARRITO
// ================================

document.addEventListener('DOMContentLoaded', () => {
    renderCartPage();
});

// Renderizar página del carrito
function renderCartPage() {
    const cartItems = cart.getItems();
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCart');
    const cartSummarySection = document.getElementById('cartSummarySection');

    if (cartItems.length === 0) {
        // Mostrar mensaje de carrito vacío
        cartItemsContainer.classList.add('hidden');
        emptyCartMessage.classList.remove('hidden');
        cartSummarySection.classList.add('hidden');
    } else {
        // Mostrar items del carrito
        cartItemsContainer.classList.remove('hidden');
        emptyCartMessage.classList.add('hidden');
        cartSummarySection.classList.remove('hidden');

        // Renderizar items
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const cartItemElement = createCartItemElement(item);
            cartItemsContainer.appendChild(cartItemElement);
        });

        // Actualizar resumen
        updateCartSummary();
    }
}

// Crear elemento de item del carrito
function createCartItemElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.dataset.productId = item.id;

    itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        
        <div class="cart-item-details">
            <h3 class="cart-item-title">${item.name}</h3>
            <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.5rem;">
                ${item.description}
            </p>
            <p class="cart-item-price">${cart.formatPrice(item.price)}</p>
            
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">
                    -
                </button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn" onclick="increaseQuantity(${item.id})">
                    +
                </button>
            </div>
        </div>

        <div style="display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between;">
            <button 
                class="btn-outline" 
                style="padding: 0.5rem; border: none; color: var(--text-secondary);"
                onclick="removeFromCart(${item.id})"
                title="Eliminar del carrito"
            >
                🗑️
            </button>
            
            <div style="text-align: right;">
                <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.25rem;">
                    Subtotal
                </p>
                <p style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color);">
                    ${cart.formatPrice(item.price * item.quantity)}
                </p>
            </div>
        </div>
    `;

    return itemDiv;
}

// Aumentar cantidad
function increaseQuantity(productId) {
    const item = cart.getItems().find(i => i.id === productId);
    if (item) {
        cart.updateQuantity(productId, item.quantity + 1);
        renderCartPage();
    }
}

// Disminuir cantidad
function decreaseQuantity(productId) {
    const item = cart.getItems().find(i => i.id === productId);
    if (item) {
        if (item.quantity > 1) {
            cart.updateQuantity(productId, item.quantity - 1);
        } else {
            if (confirm('¿Deseas eliminar este producto del carrito?')) {
                cart.removeItem(productId);
            }
        }
        renderCartPage();
    }
}

// Eliminar del carrito
function removeFromCart(productId) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        cart.removeItem(productId);
        renderCartPage();
    }
}

// Actualizar resumen del carrito
function updateCartSummary() {
    const subtotal = cart.getSubtotal();
    const tax = cart.getTax();
    const shipping = cart.getShipping();
    const total = cart.getTotal();

    document.getElementById('subtotal').textContent = cart.formatPrice(subtotal);
    document.getElementById('tax').textContent = cart.formatPrice(tax);
    document.getElementById('shipping').textContent = shipping === 0 
        ? 'GRATIS ✨' 
        : cart.formatPrice(shipping);
    document.getElementById('total').textContent = cart.formatPrice(total);
}

// Proceder al pago
function proceedToCheckout() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.loggedIn) {
        cart.showNotification('⚠️ Debes iniciar sesión para continuar');
        setTimeout(() => {
            showLoginModal();
        }, 1000);
        return;
    }

    showCheckoutModal();
}

// Mostrar modal de checkout
function showCheckoutModal() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const total = cart.getTotal();

    const modal = createModal('Finalizar Compra', `
        <div style="margin-top: 1.5rem;">
            <!-- Información del cliente -->
            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="card-content">
                    <h3 style="margin-bottom: 1rem;">📦 Información de Envío</h3>
                    <p><strong>Nombre:</strong> ${user.name || 'No especificado'}</p>
                    <p><strong>Email:</strong> ${user.email || 'No especificado'}</p>
                    <p><strong>Teléfono:</strong> ${user.phone || 'No especificado'}</p>
                    <p><strong>Dirección:</strong> ${user.address || 'No especificado'}</p>
                    <a href="#" style="color: var(--primary-color); font-size: 0.875rem; margin-top: 0.5rem; display: inline-block;">
                        Editar información
                    </a>
                </div>
            </div>

            <!-- Método de pago -->
            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="card-content">
                    <h3 style="margin-bottom: 1rem;">💳 Método de Pago</h3>
                    
                    <div class="form-group">
                        <label style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; border: 2px solid var(--border-color); border-radius: 8px; cursor: pointer; margin-bottom: 0.5rem;">
                            <input type="radio" name="paymentMethod" value="card" checked>
                            <span>💳 Tarjeta de Crédito/Débito</span>
                        </label>
                        
                        <label style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; border: 2px solid var(--border-color); border-radius: 8px; cursor: pointer; margin-bottom: 0.5rem;">
                            <input type="radio" name="paymentMethod" value="pse">
                            <span>🏦 PSE</span>
                        </label>
                        
                        <label style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; border: 2px solid var(--border-color); border-radius: 8px; cursor: pointer;">
                            <input type="radio" name="paymentMethod" value="cash">
                            <span>💵 Efectivo contra entrega</span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Resumen final -->
            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="card-content">
                    <h3 style="margin-bottom: 1rem;">📝 Resumen</h3>
                    <div class="flex-between" style="margin-bottom: 0.5rem;">
                        <span>Productos (${cart.getTotalItems()})</span>
                        <span>${cart.formatPrice(cart.getSubtotal())}</span>
                    </div>
                    <div class="flex-between" style="margin-bottom: 0.5rem;">
                        <span>IVA</span>
                        <span>${cart.formatPrice(cart.getTax())}</span>
                    </div>
                    <div class="flex-between" style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                        <span>Envío</span>
                        <span>${cart.getShipping() === 0 ? 'GRATIS' : cart.formatPrice(cart.getShipping())}</span>
                    </div>
                    <div class="flex-between" style="font-size: 1.25rem; font-weight: 700;">
                        <span>Total</span>
                        <span style="color: var(--primary-color);">${cart.formatPrice(total)}</span>
                    </div>
                </div>
            </div>

            <!-- Botones -->
            <button 
                class="btn btn-primary" 
                style="width: 100%; margin-bottom: 1rem;"
                onclick="confirmOrder()"
            >
                Confirmar Pedido
            </button>
            
            <button 
                class="btn btn-outline" 
                style="width: 100%;"
                onclick="closeModal()"
            >
                Cancelar
            </button>
        </div>
    `);
}

// Confirmar pedido
function confirmOrder() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    
    if (!paymentMethod) {
        cart.showNotification('⚠️ Selecciona un método de pago');
        return;
    }

    // Simular procesamiento de pedido
    closeModal();
    
    // Mostrar loading
    const loadingModal = createModal('Procesando Pedido', `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">⏳</div>
            <p>Procesando tu pedido...</p>
        </div>
    `);

    // Simular delay de procesamiento
    setTimeout(() => {
        closeModal();
        
        // Guardar pedido
        const order = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: cart.getItems(),
            total: cart.getTotal(),
            status: 'pending',
            paymentMethod: paymentMethod
        };

        // Guardar en historial
        let orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Limpiar carrito
        cart.clear();

        // Mostrar confirmación
        showOrderConfirmation(order);
    }, 2000);
}

// Mostrar confirmación de pedido
function showOrderConfirmation(order) {
    const modal = createModal('¡Pedido Confirmado! 🎉', `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
            <h2 style="color: var(--secondary-color); margin-bottom: 1rem;">
                ¡Tu pedido ha sido confirmado!
            </h2>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                Número de pedido: <strong>#${order.id}</strong>
            </p>
            <p style="margin-bottom: 2rem;">
                Recibirás un correo de confirmación con los detalles de tu pedido.
            </p>
            <button 
                class="btn btn-primary" 
                style="margin-bottom: 1rem;"
                onclick="closeModal(); window.location.href='index.html';"
            >
                Seguir Comprando
            </button>
            <br>
            <a href="#" style="color: var(--primary-color);">Ver mis pedidos</a>
        </div>
    `);
}
