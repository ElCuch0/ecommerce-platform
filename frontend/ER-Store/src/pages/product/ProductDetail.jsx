import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../../api/products.api.js'
import { useCart } from '../../context/CartContext.jsx'
import './product-detail.css'

export function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const { addItem } = useCart()

    useEffect(() => {
        let mounted = true

        async function loadProduct() {
            try {
                setLoading(true)
                setError('')
                const response = await getProductById(id)
                if (mounted) {
                    setProduct(response.data)
                    setQuantity(1)
                }
            } catch (loadError) {
                if (mounted) {
                    setProduct(null)
                    setError(loadError.message || 'No se pudo cargar el producto')
                }
            } finally {
                if (mounted) setLoading(false)
            }
        }

        loadProduct()
        return () => { mounted = false }
    }, [id])

    const stock = product?.inventory?.stock ?? product?.stock ?? 0

    const changeQuantity = (value) => {
        const nextQuantity = Math.min(stock, Math.max(1, Number(value) || 1))
        setQuantity(nextQuantity)
    }

    if (loading) {
        return <main className="product-detail-page"><p className="product-detail-status">Cargando producto...</p></main>
    }

    if (!product) {
        return (
            <main className="product-detail-page">
                <div className="product-detail-empty">
                    <h1>Producto no encontrado</h1>
                    <p>{error || 'El producto que buscas no existe o fue movido.'}</p>
                    <button type="button" className="btn-primary" onClick={() => navigate('/')}>Volver al inicio</button>
                </div>
            </main>
        )
    }

    const handleAddToCart = async (redirect = false) => {
        try {
            setSubmitting(true)
            setMessage('')
            await addItem(product.id, quantity)
            if (redirect) {
                navigate('/checkout')
            } else {
                setMessage(`${quantity} producto${quantity === 1 ? '' : 's'} agregado${quantity === 1 ? '' : 's'} al carrito`)
            }
        } catch (addError) {
            setMessage(addError.message || 'No se pudo agregar el producto al carrito')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main className="product-detail-page">
            <div className="product-detail-container">
                <div className="product-detail-image-card">
                    <img src={product.image || 'https://via.placeholder.com/800x800/f3f4f6/111827?text=Producto'} alt={product.name} />
                </div>

                <div className="product-detail-info-card">
                    <h1>{product.name}</h1>
                    <p className="product-detail-description">{product.description || 'Conoce todos los detalles de este producto.'}</p>

                    <div className="product-detail-meta">
                        <div>
                            <span>Precio</span>
                            <strong>${Number(product.price).toLocaleString('es-CO')}</strong>
                        </div>
                        <div>
                            <span>Stock</span>
                            <strong>{stock > 0 ? `${stock} disponibles` : 'Agotado'}</strong>
                        </div>
                    </div>

                    <div className="product-detail-options">
                        <div><span>Referencia</span><p>{product.reference}</p></div>
                        <div><span>Marca</span><p>{product.brand || 'Sin marca'}</p></div>
                    </div>

                    <div className="product-detail-quantity">
                        <label htmlFor="product-quantity">Cantidad</label>
                        <div className="quantity-control">
                            <button type="button" onClick={() => changeQuantity(quantity - 1)} disabled={quantity <= 1 || stock <= 0}>-</button>
                            <input
                                id="product-quantity"
                                type="number"
                                min="1"
                                max={stock}
                                value={stock > 0 ? quantity : 0}
                                onChange={(event) => changeQuantity(event.target.value)}
                                disabled={stock <= 0}
                            />
                            <button type="button" onClick={() => changeQuantity(quantity + 1)} disabled={quantity >= stock}>+</button>
                        </div>
                    </div>

                    <div className="product-detail-actions">
                        <button
                            type="button"
                            className="btn-primary"
                            onClick={() => handleAddToCart()}
                            disabled={stock <= 0 || submitting}
                        >
                            {submitting ? 'Agregando...' : 'Añadir al carrito'}
                        </button>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => handleAddToCart(true)}
                            disabled={stock <= 0 || submitting}
                        >
                            Comprar ahora
                        </button>
                    </div>

                    {message ? <p className="product-detail-message">{message}</p> : null}
                </div>
            </div>
        </main>
    )
}
