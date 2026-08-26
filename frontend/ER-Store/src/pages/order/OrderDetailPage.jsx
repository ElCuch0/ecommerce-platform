import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMyOrderById } from '../../api/orders.api.js'
import { useAuth } from '../../context/AuthContext.jsx'
import './order-detail-page.css'

function formatDate(value) {
    if (!value) return 'Sin fecha'
    return new Date(value).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

function formatCurrency(value) {
    return `$${Number(value || 0).toLocaleString('es-CO')}`
}

export function OrderDetailPage() {
    const { user } = useAuth()
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false

        async function loadOrder() {
            if (!user) {
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError(null)
                const response = await getMyOrderById(id)
                const data = response?.data ?? response
                if (!cancelled) setOrder(data)
            } catch (requestError) {
                if (!cancelled) setError(requestError.message || 'No fue posible cargar la orden')
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        loadOrder()
        return () => { cancelled = true }
    }, [id, user])

    if (!user) {
        return (
            <main className="order-detail-page">
                <div className="order-detail-feedback">
                    <h1>Inicia sesión para ver esta orden</h1>
                    <button type="button" className="order-detail-button" onClick={() => navigate('/')}>Volver a la tienda</button>
                </div>
            </main>
        )
    }

    if (loading) {
        return (
            <main className="order-detail-page">
                <div className="order-detail-feedback">Cargando detalles de la orden...</div>
            </main>
        )
    }

    if (error || !order) {
        return (
            <main className="order-detail-page">
                <div className="order-detail-feedback order-detail-feedback--error">
                    <h1>No se pudo cargar la orden</h1>
                    <p>{error || 'La orden no existe.'}</p>
                    <button type="button" className="order-detail-button" onClick={() => navigate('/account')}>Volver a mi cuenta</button>
                </div>
            </main>
        )
    }

    return (
        <main className="order-detail-page">
            <div className="order-detail-shell">
                <button type="button" className="order-detail-back" onClick={() => navigate('/account')}>
                    ← Volver a mis órdenes
                </button>

                <header className="order-detail-header">
                    <div>
                        <p className="order-detail-kicker">Detalle de compra</p>
                        <h1>Orden #{order.id}</h1>
                        <p>Realizada el {formatDate(order.createdAt)}</p>
                    </div>
                    <span className={`order-detail-status order-detail-status--${String(order.status || 'pending').toLowerCase()}`}>
                        {order.status || 'Pendiente'}
                    </span>
                </header>

                <section className="order-detail-card">
                    <div className="order-detail-card-heading">
                        <div>
                            <p className="order-detail-kicker">Productos</p>
                            <h2>Artículos de la orden</h2>
                        </div>
                        <span>{order.items?.length || 0} producto(s)</span>
                    </div>

                    <div className="order-item-list">
                        {(order.items || []).map((item) => (
                            <article className="order-item" key={item.id}>
                                <div>
                                    <h3>{item.product?.name || `Producto #${item.productId}`}</h3>
                                    {item.product?.reference && <p>Referencia: {item.product.reference}</p>}
                                </div>
                                <div className="order-item-values">
                                    <span>{item.quantity} x {formatCurrency(item.unitPrice)}</span>
                                    <strong>{formatCurrency(item.subtotal)}</strong>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="order-detail-total">
                        <span>Total de la orden</span>
                        <strong>{formatCurrency(order.total)}</strong>
                    </div>
                </section>

                {order.invoice && (
                    <section className="order-detail-invoice">
                        <div>
                            <p className="order-detail-kicker">Factura</p>
                            <h2>{order.invoice.invoiceNumber}</h2>
                            <p>Emitida el {formatDate(order.invoice.issueDate)}</p>
                        </div>
                        <strong>{formatCurrency(order.invoice.total)}</strong>
                    </section>
                )}
            </div>
        </main>
    )
}
