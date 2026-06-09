import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartGrid } from '../../components/grids/CartGrid.jsx'
import './checkout-page.css'

export function CheckoutPage() {
    const [items, setItems] = useState([])
    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
    })
    const [orderPlaced, setOrderPlaced] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setItems(JSON.parse(localStorage.getItem('cart')) || [])
    }, [])

    const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!items.length) return
        localStorage.removeItem('cart')
        setOrderPlaced(true)
    }

    if (!items.length && !orderPlaced) {
        return (
            <main className="checkout-page">
                <div className="checkout-empty">
                    <h1>No hay productos en el carrito</h1>
                    <p>Añade productos a tu carrito antes de continuar con el pago.</p>
                    <button type="button" className="btn-primary" onClick={() => navigate('/')}>Volver a la tienda</button>
                </div>
            </main>
        )
    }

    if (orderPlaced) {
        return (
            <main className="checkout-page">
                <div className="checkout-empty">
                    <h1>Compra completada</h1>
                    <p>Gracias por tu pedido. En breve recibirás un correo con los detalles.</p>
                    <button type="button" className="btn-primary" onClick={() => navigate('/')}>Seguir comprando</button>
                </div>
            </main>
        )
    }

    return (
        <main className="checkout-page">
            <div className="checkout-container">
                <section className="checkout-form-card">
                    <h1>Finalizar compra</h1>
                    <p>Completa tus datos para procesar el pago.</p>

                    <form onSubmit={handleSubmit} className="checkout-form">
                        <label>
                            Nombre completo
                            <input type="text" name="name" value={form.name} onChange={handleChange} required />
                        </label>
                        <label>
                            Correo electrónico
                            <input type="email" name="email" value={form.email} onChange={handleChange} required />
                        </label>
                        <label>
                            Dirección
                            <input type="text" name="address" value={form.address} onChange={handleChange} required />
                        </label>
                        <label>
                            Ciudad
                            <input type="text" name="city" value={form.city} onChange={handleChange} required />
                        </label>
                        <label>
                            Código postal
                            <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} required />
                        </label>
                        <button type="submit" className="btn-primary">Realizar pedido</button>
                    </form>
                </section>

                <aside className="checkout-summary-card">
                    <h2>Resumen de pedido</h2>
                    <CartGrid items={items} />
                    <div className="checkout-summary-total">
                        <span>Total</span>
                        <strong>${total.toLocaleString()}</strong>
                    </div>
                </aside>
            </div>
        </main>
    )
}
