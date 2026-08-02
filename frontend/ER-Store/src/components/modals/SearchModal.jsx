import { useEffect, useMemo, useRef, useState } from 'react'
import { ModalContext } from '../../context/ModalContext.jsx'
import { IconClose, IconEr } from '../assets/Icons.jsx'
import { ProductCard } from '../cards/ProductCard.jsx'
import './search-modal.css'

const popularSearchTerms = [
    'Camisas',
    'Pantalones',
    'Vestidos',
    'Zapatos',
    'Accesorios'
]

export function SearchModal({ isOpen, onClose, products = [], onSearch }) {
    const [query, setQuery] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        if (!isOpen) {
            setQuery('')
            return
        }

        requestAnimationFrame(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        })
    }, [isOpen])

    const recommendations = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()
        if (!normalizedQuery) {
            return products.slice(0, 7)
        }

        return products
            .filter((product) => {
                const name = product.name.toLowerCase()
                const category = (product.category || '').toLowerCase()
                const alt = (product.alternative || '').toLowerCase()
                return (
                    name.includes(normalizedQuery) ||
                    category.includes(normalizedQuery) ||
                    alt.includes(normalizedQuery)
                )
            })
            .slice(0, 4)
    }, [products, query])

    const handleSearch = (value) => {
        const trimmed = (value || query).trim()
        if (!trimmed) return

        onSearch?.(trimmed)
        onClose()
        const section = document.getElementById('products-section')
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <ModalContext isOpen={isOpen} onClose={onClose}>
            <section className="nav-dialog" aria-label="Búsqueda">
                <div className="nav-dialog-card">
                    <header className="nav-dialog-header">
                        <a className="nav-dialog-brand" href="/" aria-label="Ir al inicio">
                            <IconEr />
                        </a>
                        <h2 className="nav-dialog-title">Buscar</h2>
                        <button
                            type="button"
                            className="nav-dialog-close"
                            aria-label="Cerrar"
                            onClick={onClose}
                        >
                            <IconClose />
                        </button>
                    </header>

                    <div className="nav-dialog-body">
                        <label className="nav-dialog-label" htmlFor="searchInput">Buscar productos</label>
                        <div className="search-input-row">
                            <input
                                id="searchInput"
                                ref={inputRef}
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                type="search"
                                className="form-input"
                                placeholder="Buscar..."
                                autoComplete="off"
                            />
                            <button
                                type="button"
                                className="search-submit"
                                onClick={() => handleSearch(query)}
                            >
                                Buscar
                            </button>
                        </div>

                        <div className="search-panels">
                            <section className="search-panel" aria-label="Búsquedas populares">
                                <h3 className="search-panel-title">Búsquedas más concurridas</h3>
                                <div className="popular-searches">
                                    {popularSearchTerms.map((term) => (
                                        <button
                                            type="button"
                                            key={term}
                                            className="popular-search-item"
                                            onClick={() => handleSearch(term)}
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section className="search-panel" aria-label="Productos recomendados">
                                <h3 className="search-panel-title">Recomendados para ti</h3>
                                <div className="search-rec-carousel-horizontal">
                                    <div className="search-rec-carousel-strip">
                                        {recommendations.length > 0 ? (
                                            recommendations.map((product) => (
                                                <ProductCard key={product.id} product={product} onClick={() => handleSearch(product.name)} />
                                            ))
                                        ) : (
                                            <p>No hay recomendaciones para esa búsqueda.</p>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <footer className="nav-dialog-footer">
                        <p>Motor de búsqueda</p>
                    </footer>
                </div>
            </section>
        </ModalContext>
    )
}
