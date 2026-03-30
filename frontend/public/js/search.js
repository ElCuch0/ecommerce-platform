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

// Crear instancia global del gestor de búsqueda
const searchManager = new SearchManager();

// Función para scroll a productos
function scrollToProducts() {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
