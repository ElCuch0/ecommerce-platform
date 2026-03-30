// ================================
// GESTIÓN DE FILTROS DE PRODUCTOS
// ================================

class ProductFilters {
    constructor() {
        this.filters = {
            category: 'all',
            size: 'all',
            color: 'all',
            price: 'all',
            search: ''
        };
        
        this.initializeFilters();
    }

    // Inicializar event listeners de filtros
    initializeFilters() {
        // Filtros de categoría
        const categoryFilters = document.querySelectorAll('#categoryFilters .filter-tag');
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.handleFilterClick(e.target, 'category', categoryFilters);
            });
        });

        // Filtros de talla
        const sizeFilters = document.querySelectorAll('#sizeFilters .filter-tag');
        sizeFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.handleFilterClick(e.target, 'size', sizeFilters);
            });
        });

        // Filtros de color
        const colorFilters = document.querySelectorAll('#colorFilters .filter-tag');
        colorFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.handleFilterClick(e.target, 'color', colorFilters);
            });
        });

        // Filtros de precio
        const priceFilters = document.querySelectorAll('#priceFilters .filter-tag');
        priceFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.handleFilterClick(e.target, 'price', priceFilters);
            });
        });
    }

    // Manejar clic en filtro
    handleFilterClick(element, filterType, allFilters) {
        // Remover clase active de todos
        allFilters.forEach(f => f.classList.remove('active'));
        
        // Añadir clase active al seleccionado
        element.classList.add('active');
        
        // Actualizar filtro
        const filterValue = element.dataset[filterType];
        this.filters[filterType] = filterValue;
        
        // Aplicar filtros
        this.applyFilters();
    }

    // Aplicar todos los filtros
    applyFilters() {
        let filteredProducts = [...products];

        // Filtrar por búsqueda
        if (this.filters.search) {
            const searchTerm = this.filters.search.toLowerCase();
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
        }

        // Filtrar por categoría
        if (this.filters.category !== 'all') {
            filteredProducts = filteredProducts.filter(product => 
                product.category === this.filters.category
            );
        }

        // Filtrar por talla
        if (this.filters.size !== 'all') {
            filteredProducts = filteredProducts.filter(product => 
                product.sizes.includes(this.filters.size)
            );
        }

        // Filtrar por color
        if (this.filters.color !== 'all') {
            filteredProducts = filteredProducts.filter(product => 
                product.colors.includes(this.filters.color)
            );
        }

        // Filtrar por precio
        if (this.filters.price !== 'all') {
            filteredProducts = filteredProducts.filter(product => {
                const price = product.price;
                
                if (this.filters.price === '0-50000') {
                    return price <= 50000;
                } else if (this.filters.price === '50000-100000') {
                    return price > 50000 && price <= 100000;
                } else if (this.filters.price === '100000-200000') {
                    return price > 100000 && price <= 200000;
                } else if (this.filters.price === '200000+') {
                    return price > 200000;
                }
                
                return true;
            });
        }

        // Actualizar vista de productos
        this.displayFilteredProducts(filteredProducts);
    }

    // Mostrar productos filtrados
    displayFilteredProducts(filteredProducts) {
        const productsGrid = document.getElementById('productsGrid');
        const noProducts = document.getElementById('noProducts');
        const productCount = document.getElementById('productCount');

        // Actualizar contador
        productCount.textContent = `${filteredProducts.length} producto${filteredProducts.length !== 1 ? 's' : ''}`;

        // Limpiar grid
        productsGrid.innerHTML = '';

        if (filteredProducts.length === 0) {
            // Mostrar mensaje de no productos
            productsGrid.classList.add('hidden');
            noProducts.classList.remove('hidden');
        } else {
            // Ocultar mensaje y mostrar productos
            productsGrid.classList.remove('hidden');
            noProducts.classList.add('hidden');

            // Renderizar productos
            filteredProducts.forEach(product => {
                const productCard = this.createProductCard(product);
                productsGrid.appendChild(productCard);
            });
        }
    }

    // Crear card de producto
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'card fade-in';
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-text">${product.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <p class="card-price">${cart.formatPrice(product.price)}</p>
                    ${product.stock > 0 
                        ? `<span class="badge badge-success">En stock (${product.stock})</span>`
                        : `<span class="badge badge-warning">Agotado</span>`
                    }
                </div>
                <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                    ${product.colors.map(color => `
                        <span style="
                            width: 20px; 
                            height: 20px; 
                            border-radius: 50%; 
                            background-color: ${this.getColorHex(color)}; 
                            border: 1px solid var(--border-color);
                            display: inline-block;
                        " title="${color}"></span>
                    `).join('')}
                </div>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                    ${product.sizes.map(size => `
                        <span class="badge badge-info">${size.toUpperCase()}</span>
                    `).join('')}
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
        
        return card;
    }

    // Obtener color hexadecimal
    getColorHex(colorName) {
        const colors = {
            'rojo': '#ef4444',
            'azul': '#3b82f6',
            'negro': '#000000',
            'blanco': '#ffffff',
            'verde': '#10b981',
            'beige': '#d4a574',
            'marrón': '#8b4513',
            'gris': '#6b7280'
        };
        
        return colors[colorName.toLowerCase()] || '#9ca3af';
    }

    // Actualizar filtro de búsqueda
    updateSearchFilter(searchTerm) {
        this.filters.search = searchTerm;
        this.applyFilters();
    }

    // Limpiar todos los filtros
    clearAllFilters() {
        this.filters = {
            category: 'all',
            size: 'all',
            color: 'all',
            price: 'all',
            search: ''
        };

        // Resetear clases active
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.classList.remove('active');
            if (tag.dataset.category === 'all' || 
                tag.dataset.size === 'all' || 
                tag.dataset.color === 'all' || 
                tag.dataset.price === 'all') {
                tag.classList.add('active');
            }
        });

        // Limpiar búsqueda
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }

        // Aplicar filtros
        this.applyFilters();
    }
}

// Crear instancia global de filtros
const productFilters = new ProductFilters();

// Función global para limpiar filtros
function clearFilters() {
    productFilters.clearAllFilters();
}

// Función global para añadir al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product && product.stock > 0) {
        cart.addItem(product);
    }
}
