import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './cart-page.css'
import { CartGrid } from '../../components/grids/CartGrid.jsx'

export function CartPage() {
    const [items, setItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setItems(JSON.parse(localStorage.getItem('cart')) || [])
    }, [])

    const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)

    return (
        <main className="cart-page">
            <div className="cart-page-container">
                <header className="cart-page-header">
                    <div>
                        <h1>Tu carrito</h1>
                        <p>Revisa y ajusta tus productos antes de completar la compra.</p>
                    </div>
                </header>

                <section className="cart-page-content">
                    <div className="cart-page-list">
                        <CartGrid items={items} />
                    </div>

                    {items.length > 0 ? (
                        <aside className="cart-page-summary">
                            <h2>Resumen de compra</h2>
                            <div className="cart-page-summary-row">
                                <span>Subtotal</span>
                                <strong>${total.toLocaleString()}</strong>
                            </div>
                            <p className="cart-page-summary-note">Los impuestos y el envío se calcularán en el siguiente paso.</p>
                            <button type="button" className="btn btn-primary" onClick={() => navigate('/checkout')}>Continuar</button>
                        </aside>
                    ) : null}
                </section>
            </div>
        </main>
    )
}
