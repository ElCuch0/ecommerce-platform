import { useEffect, useRef, useState } from 'react'
import { ModalContext } from '../../context/ModalContext.jsx'
import { IconClose, IconEr } from '../assets/Icons.jsx'
import { ProductCard } from '../cards/ProductCard.jsx'
import { getProducts } from '../../api/products.api.js'
import './search-modal.css'

const popularSearchTerms = [
    'Camisas',
    'Pantalones',
    'Vestidos',
    'Zapatos',
    'Accesorios'
]

export function SearchModal({ isOpen, onClose, onSearch, onAddToCart }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        const previousOverflow = document.body.style.overflow

        if (!isOpen) return undefined

        document.body.style.overflow = 'hidden'

        requestAnimationFrame(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        })

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [isOpen])

    const handleClose = () => {
        setQuery('')
        setResults([])
        setError('')
        onClose()
    }

    const handleSearch = async (value) => {
        const trimmed = (value || query).trim()
        if (!trimmed) return

        setLoading(true)
        setError('')

        try {
            const response = await getProducts(trimmed)
            setResults(response.data || [])
            onSearch?.(trimmed)
        } catch {
            setResults([])
            setError('No fue posible realizar la búsqueda.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <ModalContext isOpen={isOpen} onClose={handleClose}>
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
                            onClick={handleClose}
                        >
                            <IconClose />
                        </button>
                    </header>

                    <div className="nav-dialog-body">
                        <label className="nav-dialog-label" htmlFor="searchInput">Buscar productos</label>
                        <form className="search-input-row" onSubmit={(event) => {
                            event.preventDefault()
                            handleSearch(query)
                        }}>
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
                                type="submit"
                                className="search-submit"
                            >
                                Buscar
                            </button>
                        </form>

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

                            <section className="search-panel search-results-panel" aria-live="polite" aria-label="Resultados de búsqueda">
                                <h3 className="search-panel-title">Resultados</h3>
                                {loading && <p>Buscando productos...</p>}
                                {error && <p>{error}</p>}
                                {!loading && !error && results.length === 0 && <p>Realiza una búsqueda para ver los productos.</p>}
                                {!loading && !error && results.length > 0 && (
                                    <ul className="search-results-grid">
                                        {results.map((product) => (
                                            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                                        ))}
                                    </ul>
                                )}
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
