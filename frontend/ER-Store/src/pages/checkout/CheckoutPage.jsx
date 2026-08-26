import { useState } from 'react'
import { useCart } from "../../context/CartContext.jsx"
import { processCheckout } from '../../api/checkout.api.js'
import { useNavigate } from 'react-router-dom'
import { CartGrid } from '../../components/grids/CartGrid.jsx'
import './checkout-page.css'
import { useAuth } from '../../context/AuthContext.jsx'

export function CheckoutPage() {

    const { user } = useAuth()

    const { items, loading: cartLoading, error: cartError, refreshCart } = useCart()
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ success, setSuccess ] = useState(false)
    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        address: '',
        city: '',
        postalCode: '',
    })
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((previousForm) => ({ ...previousForm, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!items.length) return

        try {
            setLoading(true)
            setError(null)

            await processCheckout()

            setSuccess(true)

            await refreshCart()
        }catch (error) {
            setError(error.message || "Error al procesar la compra")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div>
                <h2>!Compra realizada con éxito</h2>
                <p>Tu orden y factura han sido generadas correctamente.</p>
            </div>
        )
    }

    const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)

    if (cartLoading) {
        return (
            <main className="checkout-page">
                <div className="checkout-empty">
                    <p>Cargando carrito...</p>
                </div>
            </main>
        )
    }

    if (cartError) {
        return (
            <main className="checkout-page">
                <div className="checkout-empty">
                    <h1>No se pudo cargar el carrito</h1>
                    <p>{cartError}</p>
                    <button type="button" className="btn-primary" onClick={() => navigate('/cart')}>Volver al carrito</button>
                </div>
            </main>
        )
    }

    if (!items.length) {
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

    return (
        <main className="checkout-page">
            <div className="checkout-container">
                <section className="checkout-form-card">
                    <h1>Finalizar compra</h1>
                    <p>Completa tus datos para procesar el pago.</p>

                    {error && <p role="alert">{error}</p>}
                    <form onSubmit={handleSubmit} className="checkout-form">
                        <label>
                            Nombre completo
                            <input type="text" name="name" value={form.name} onChange={handleChange} disabled />
                        </label>
                        <label>
                            Correo electrónico
                            <input type="email" name="email" value={form.email} onChange={handleChange} disabled />
                        </label>
                        <label>
                            Dirección
                            <input type="text" name="address" value={form.address} onChange={handleChange} />
                        </label>
                        <label>
                            Ciudad
                            <input type="text" name="city" value={form.city} onChange={handleChange} />
                        </label>
                        <label>
                            Código postal
                            <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} />
                        </label>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Procesando pedido...' : 'Realizar pedido'}
                        </button>
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
