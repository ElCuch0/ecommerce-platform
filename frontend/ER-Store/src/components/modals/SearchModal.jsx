import { useEffect, useMemo, useRef, useState } from 'react'
import { ModalContext } from '../../context/ModalContext.jsx'
import logoEr from '../../assets/images/Logo_ER.png'

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
            return products.slice(0, 4)
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
            <section className="nav-dialog nav-dialog--topbar" aria-label="Búsqueda">
                <div className="nav-dialog__card">
                    <header className="nav-dialog__header">
                        <a className="nav-dialog__brand" href="/" aria-label="Ir al inicio">
                            <img src={logoEr} alt="Logo ER Store" />
                        </a>
                        <h2 className="nav-dialog__title">Buscar</h2>
                        <button
                            type="button"
                            className="nav-dialog__close nav-dialog__close--x"
                            aria-label="Cerrar"
                            onClick={onClose}
                        >
                            ×
                        </button>
                    </header>

                    <div className="nav-dialog__body">
                        <label className="nav-dialog__label" htmlFor="searchInput">Buscar productos</label>
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
                                className="btn btn-primary search-submit"
                                onClick={() => handleSearch(query)}
                            >
                                Buscar
                            </button>
                        </div>

                        <div className="search-panels">
                            <section className="search-panel" aria-label="Búsquedas populares">
                                <h3 className="search-panel__title">Búsquedas más concurridas</h3>
                                <div className="search-panel__content popular-searches">
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
                                <h3 className="search-panel__title">Recomendados para ti</h3>
                                <div className="search-panel__content search-rec-carousel--horizontal">
                                    <div className="search-rec-carousel__strip">
                                        {recommendations.length > 0 ? (
                                            recommendations.map((product) => (
                                                <article className="card recommendation-card" key={product.id}>
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="recommendation-card__image"
                                                    />
                                                    <div className="recommendation-card__body">
                                                        <p className="recommendation-card__title">{product.name}</p>
                                                        <p className="recommendation-card__category">{product.category}</p>
                                                        <strong className="recommendation-card__price">
                                                            ${product.price?.toLocaleString()}
                                                        </strong>
                                                    </div>
                                                </article>
                                            ))
                                        ) : (
                                            <p>No hay recomendaciones para esa búsqueda.</p>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <footer className="nav-dialog__footer">
                        <p>Motor de búsqueda</p>
                    </footer>
                </div>
            </section>
        </ModalContext>
    )
}
