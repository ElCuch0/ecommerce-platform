// ================================
// VISTA INDIVIDUAL DE PRODUCTO
// ================================

function getColorHex(colorName) {
    const colors = {
        rojo: '#ef4444',
        azul: '#3b82f6',
        negro: '#000000',
        blanco: '#ffffff',
        verde: '#10b981',
        beige: '#d4a574',
        marrón: '#8b4513',
        gris: '#6b7280'
    };
    return colors[String(colorName).toLowerCase()] || '#9ca3af';
}

function categoryLabel(category) {
    if (!category) return '';
    const c = String(category);
    return c.charAt(0).toUpperCase() + c.slice(1);
}

function renderProductPage() {
    const root = document.getElementById('productDetailRoot');
    const notFound = document.getElementById('productNotFound');
    if (!root || !notFound) return;

    if (typeof products === 'undefined' || !Array.isArray(products)) {
        root.classList.add('hidden');
        notFound.classList.remove('hidden');
        document.title = 'Producto no encontrado - ER Store';
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'), 10);
    const product = Number.isFinite(id) ? products.find(p => p.id === id) : null;

    if (!product) {
        root.classList.add('hidden');
        root.innerHTML = '';
        notFound.classList.remove('hidden');
        document.title = 'Producto no encontrado - ER Store';
        return;
    }

    notFound.classList.add('hidden');
    root.classList.remove('hidden');

    document.title = `${product.name} - ER Store`;

    const bc = document.getElementById('productBreadcrumbCurrent');
    if (bc) bc.textContent = product.name;

    const priceHtml = typeof cart !== 'undefined' && cart.formatPrice
        ? cart.formatPrice(product.price)
        : `$${Number(product.price).toLocaleString('es-CO')}`;

    const stockBadge =
        product.stock > 0
            ? `<span class="badge badge-success">En stock (${product.stock} disponibles)</span>`
            : `<span class="badge badge-warning">Agotado</span>`;

    const featuredHtml = product.featured
        ? `<span class="badge badge-info product-detail__featured">Destacado</span>`
        : '';

    const colorsHtml = (product.colors || [])
        .map(
            (color) => `
            <span class="product-detail__color-swatch" style="background-color: ${getColorHex(color)};"
                title="${color}"></span>
        `
        )
        .join('');

    const sizesHtml = (product.sizes || [])
        .map((size) => `<span class="badge badge-info">${String(size).toUpperCase()}</span>`)
        .join('');

    root.innerHTML = `
        <article class="product-detail__layout" aria-labelledby="productDetailTitle">
            <div class="product-detail__media">
                <img src="${product.image}" alt="" class="product-detail__image" id="productDetailImage">
            </div>
            <div class="product-detail__info">
                <p class="product-detail__category">${categoryLabel(product.category)}</p>
                <div class="product-detail__title-row">
                    <h1 id="productDetailTitle" class="product-detail__title">${product.name}</h1>
                    ${featuredHtml}
                </div>
                <p class="product-detail__price">${priceHtml}</p>
                <div class="product-detail__stock">${stockBadge}</div>
                <p class="product-detail__description">${product.description}</p>

                <div class="product-detail__block">
                    <h2 class="product-detail__label">Colores</h2>
                    <div class="product-detail__colors" role="list">${colorsHtml}</div>
                </div>
                <div class="product-detail__block">
                    <h2 class="product-detail__label">Tallas</h2>
                    <div class="product-detail__sizes">${sizesHtml}</div>
                </div>

                <div class="product-detail__actions">
                    <button type="button" class="btn btn-primary product-detail__cta"
                        onclick="addToCart(${product.id})"
                        ${product.stock <= 0 ? 'disabled' : ''}>
                        ${product.stock > 0 ? '🛒 Añadir al carrito' : '❌ Agotado'}
                    </button>
                    <a href="index.html#products-section" class="btn btn-outline">Seguir comprando</a>
                </div>
            </div>
        </article>
    `;

    const img = document.getElementById('productDetailImage');
    if (img) img.alt = product.name;
}

document.addEventListener('DOMContentLoaded', () => {
    renderProductPage();
});
