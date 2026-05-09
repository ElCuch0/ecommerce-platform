// ================================
// FUNCIONALIDAD DE BÚSQUEDA
// ================================

class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.debounceTimer = null;
        this.initializeSearch();
    }

    // Inicializar búsqueda
    initializeSearch() {
        if (this.searchInput) {
            // Event listener con debounce para mejor rendimiento
            this.searchInput.addEventListener('input', (e) => {
                clearTimeout(this.debounceTimer);
                
                this.debounceTimer = setTimeout(() => {
                    this.performSearch(e.target.value);
                }, 300);
            });

            // También buscar al presionar Enter
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    clearTimeout(this.debounceTimer);
                    this.performSearch(e.target.value);
                }
            });
        }
    }

    // Realizar búsqueda
    performSearch(searchTerm) {
        const trimmedSearch = searchTerm.trim();
        
        // Actualizar filtros con el término de búsqueda
        if (typeof productFilters !== 'undefined') {
            productFilters.updateSearchFilter(trimmedSearch);
        }

        updateSearchRecommendations(trimmedSearch);

        // Guardar búsqueda en el historial
        if (trimmedSearch) {
            this.saveToSearchHistory(trimmedSearch);
        }
    }

    // Guardar en historial de búsquedas
    saveToSearchHistory(searchTerm) {
        let history = this.getSearchHistory();
        
        // Evitar duplicados
        history = history.filter(term => term.toLowerCase() !== searchTerm.toLowerCase());
        
        // Añadir al inicio
        history.unshift(searchTerm);
        
        // Limitar a 10 búsquedas recientes
        history = history.slice(0, 10);
        
        // Guardar en localStorage
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }

    // Obtener historial de búsquedas
    getSearchHistory() {
        const history = localStorage.getItem('searchHistory');
        return history ? JSON.parse(history) : [];
    }

    // Limpiar historial de búsquedas
    clearSearchHistory() {
        localStorage.removeItem('searchHistory');
    }

    // Obtener sugerencias de búsqueda
    getSuggestions(searchTerm) {
        if (!searchTerm || searchTerm.length < 2) {
            return [];
        }

        const term = searchTerm.toLowerCase();
        const suggestions = [];

        // Buscar en nombres de productos
        products.forEach(product => {
            if (product.name.toLowerCase().includes(term)) {
                suggestions.push({
                    type: 'product',
                    text: product.name,
                    value: product.name
                });
            }
        });

        // Buscar en categorías
        const categories = [...new Set(products.map(p => p.category))];
        categories.forEach(category => {
            if (category.toLowerCase().includes(term)) {
                suggestions.push({
                    type: 'category',
                    text: `Categoría: ${category}`,
                    value: category
                });
            }
        });

        // Limitar a 5 sugerencias
        return suggestions.slice(0, 5);
    }

    // Resaltar términos de búsqueda en resultados
    highlightSearchTerm(text, searchTerm) {
        if (!searchTerm) return text;
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark style="background-color: #fef3c7; padding: 0 2px;">$1</mark>');
    }
}

let searchManager = null;

function initSearchManager() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    if (searchManager && searchManager.searchInput === input) return;
    searchManager = new SearchManager();
}

document.addEventListener('DOMContentLoaded', () => {
    initSearchManager();
    renderPopularSearches();
    updateSearchRecommendations('');
});

// Función para scroll a productos
function scrollToProducts() {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function renderPopularSearches() {
    const container = document.getElementById('popularSearches');
    if (!container) return;

    const popular = [
        'Camisas',
        'Pantalones',
        'Vestidos',
        'Zapatos',
        'Accesorios',
        'Negro',
        'Oferta'
    ];

    container.innerHTML = `
        <ul class="popular-searches">
            ${popular.map(term => `
                <li><a href="#products-section" data-search-term="${term}">${term}</a></li>
            `).join('')}
        </ul>
    `;
}

function updateSearchRecommendations(searchTerm) {
    const container = document.getElementById('searchRecommendations');
    if (!container) return;

    const list = (typeof products !== 'undefined' && Array.isArray(products)) ? products : [];
    const term = (searchTerm || '').trim().toLowerCase();

    let recommended = [];
    if (term) {
        recommended = list.filter(p => {
            const name = String(p?.name || '').toLowerCase();
            const category = String(p?.category || '').toLowerCase();
            const desc = String(p?.description || '').toLowerCase();
            return name.includes(term) || category.includes(term) || desc.includes(term);
        });
    }

    const maxRec = 20;
    if (!term || recommended.length === 0) {
        recommended = list.slice(0, maxRec);
    } else {
        recommended = recommended.slice(0, maxRec);
    }

    if (recommended.length === 0) {
        container.innerHTML = `<p class="nav-dialog__hint">Aún no hay productos para mostrar.</p>`;
        return;
    }

    const formatPrice = (value) => {
        try {
            if (typeof cart?.formatPrice === 'function') return cart.formatPrice(value);
        } catch (_) {}
        return `$${Number(value || 0).toLocaleString('es-CO')}`;
    };

    const cardsHtml = recommended
        .map(
            (p) => `
        <div class="card fade-in" data-search-term="${String(p?.name || '')}">
            <img src="${p.image}" alt="${p.name}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">
                    <a class="card-title-link" href="product.html?id=${p.id}">${p.name}</a>
                </h3>
                <div class="flex-between" style="margin-bottom: 0.75rem;">
                    <p class="card-price" style="margin-bottom: 0;">${formatPrice(p.price)}</p>
                    ${p.stock > 0
                        ? `<span class="badge badge-success">En stock</span>`
                        : `<span class="badge badge-warning">Agotado</span>`}
                </div>
                <a
                    class="btn btn-outline btn-sm"
                    style="width: 100%; display: inline-block; text-align: center; box-sizing: border-box;"
                    href="product.html?id=${p.id}"
                >
                    Ver detalle
                </a>
            </div>
        </div>
    `
        )
        .join('');

    container.innerHTML = `
        <div class="search-rec-carousel search-rec-carousel--horizontal" role="region" aria-label="Productos recomendados">
            <div class="search-rec-carousel__strip">
                <button type="button" class="search-rec-carousel__arrow search-rec-carousel__arrow--prev" data-search-rec-prev aria-label="Ver productos anteriores">
                    <span aria-hidden="true">←</span>
                </button>
                <div class="search-rec-carousel__viewport" data-search-rec-viewport>
                    <div class="recommendations-row recommendations-row--carousel" data-search-rec-track>
                        ${cardsHtml}
                    </div>
                </div>
                <button type="button" class="search-rec-carousel__arrow search-rec-carousel__arrow--next" data-search-rec-next aria-label="Ver más productos">
                    <span aria-hidden="true">→</span>
                </button>
            </div>
        </div>
    `;

    initSearchRecommendationsHorizontalNav(container);
}

function initSearchRecommendationsHorizontalNav(container) {
    const viewport = container.querySelector('[data-search-rec-viewport]');
    const track = container.querySelector('[data-search-rec-track]');
    const prev = container.querySelector('[data-search-rec-prev]');
    const next = container.querySelector('[data-search-rec-next]');
    if (!viewport || !track) return;

    let offsetPx = 0;

    const getStep = () => {
        const a = track.children[0];
        const b = track.children[1];
        if (a && b) return b.offsetLeft - a.offsetLeft;
        return a ? a.getBoundingClientRect().width : 260;
    };

    const maxOffset = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

    const apply = () => {
        const max = maxOffset();
        offsetPx = Math.max(0, Math.min(max, offsetPx));
        track.style.transform = `translateX(-${offsetPx}px)`;
        if (prev) prev.disabled = max <= 0 || offsetPx <= 0.5;
        if (next) next.disabled = max <= 0 || offsetPx >= max - 0.5;
    };

    const onPrev = (e) => {
        e.preventDefault();
        e.stopPropagation();
        offsetPx -= getStep();
        apply();
    };
    const onNext = (e) => {
        e.preventDefault();
        e.stopPropagation();
        offsetPx += getStep();
        apply();
    };

    prev?.addEventListener('click', onPrev);
    next?.addEventListener('click', onNext);

    viewport.setAttribute('tabindex', '0');
    viewport.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            offsetPx -= getStep();
            apply();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            offsetPx += getStep();
            apply();
        }
    });

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => apply()) : null;
    ro?.observe(viewport);
    requestAnimationFrame(() => apply());
}
