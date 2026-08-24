import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { products } from '../../data.jsx'
import { useCart } from '../../context/cartContext.jsx'
import './product-detail.css'

export function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [message, setMessage] = useState('')
    const { addItem } = useCart()

    useEffect(() => {
        const productId = Number(id)
        const found = products.find(item => item.id === productId)
        setProduct(found || null)
        setMessage('')
    }, [id])

    if (!product) {
        return (
            <main className="product-detail-page">
                <div className="product-detail-empty">
                    <h1>Producto no encontrado</h1>
                    <p>El producto que buscas no existe o fue movido.</p>
                    <button type="button" className="btn-primary" onClick={() => navigate('/')}>Volver al inicio</button>
                </div>
            </main>
        )
    }

    const handleAddToCart = async () => {
        await addItem(product.id)
        setMessage('Producto agregado al carrito')
    }

    const handleBuyNow = async () => {
        await addItem(product.id)
        navigate('/checkout')
    }

    return (
        <main className="product-detail-page">
            <div className="product-detail-container">
                <div className="product-detail-image-card">
                    <img src={product.image} alt={product.name} />
                </div>

                <div className="product-detail-info-card">
                    <span className="product-detail-category">{product.category}</span>
                    <h1>{product.name}</h1>
                    <p className="product-detail-description">{product.alternative || product.description}</p>

                    <div className="product-detail-meta">
                        <div>
                            <span>Precio</span>
                            <strong>${product.price.toLocaleString()}</strong>
                        </div>
                        <div>
                            <span>Stock</span>
                            <strong>{product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}</strong>
                        </div>
                    </div>

                    <div className="product-detail-options">
                        <div>
                            <span>Tallas</span>
                            <p>{product.sizes?.join(' · ')}</p>
                        </div>
                        <div>
                            <span>Colores</span>
                            <p>{product.colors?.join(' · ')}</p>
                        </div>
                    </div>

                    <div className="product-detail-actions">
                        <button
                            type="button"
                            className="btn-primary"
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0}
                        >
                            Añadir al carrito
                        </button>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={handleBuyNow}
                            disabled={product.stock <= 0}
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
