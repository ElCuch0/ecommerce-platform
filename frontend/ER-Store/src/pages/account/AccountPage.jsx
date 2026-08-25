import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyOrders } from '../../api/orders.api.js'
import { getMyInvoices } from '../../api/invoices.api.js'
import { useAuth } from '../../context/AuthContext.jsx'
import './account-page.css'

const tabs = [
    { id: 'profile', label: 'Información personal' },
    { id: 'orders', label: 'Mis órdenes' },
    { id: 'invoices', label: 'Mis facturas' },
]

function getResponseData(response) {
    const data = response?.data ?? response
    return Array.isArray(data) ? data : data ? [data] : []
}

function formatDate(value) {
    if (!value) return 'Sin fecha'
    return new Date(value).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

function formatCurrency(value) {
    return `$${Number(value || 0).toLocaleString('es-CO')}`
}

function RequestState({ loading, error, emptyMessage, hasData, children }) {
    if (loading) return <p className="account-feedback">Cargando información...</p>
    if (error) return <p className="account-feedback account-feedback--error">{error}</p>
    if (!hasData) return <p className="account-feedback">{emptyMessage}</p>
    return children
}

export function AccountPage() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('profile')
    const [orders, setOrders] = useState([])
    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    useEffect(() => {
        let cancelled = false

        async function loadAccountData() {
            if (!user) {
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError(null)
                const [ordersResponse, invoicesResponse] = await Promise.all([
                    getMyOrders(),
                    getMyInvoices(),
                ])

                if (!cancelled) {
                    setOrders(getResponseData(ordersResponse))
                    setInvoices(getResponseData(invoicesResponse))
                }
            } catch (requestError) {
                if (!cancelled) setError(requestError.message || 'No fue posible cargar tu información')
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        loadAccountData()
        return () => { cancelled = true }
    }, [user])

    if (!user) {
        return (
            <main className="account-page">
                <div className="account-empty">
                    <h1>Inicia sesión para ver tu cuenta</h1>
                    <p>Aquí encontrarás tu información, órdenes y facturas.</p>
                    <button type="button" className="account-button" onClick={() => navigate('/')}>Volver a la tienda</button>
                </div>
            </main>
        )
    }

    return (
        <main className="account-page">
            <div className="account-shell">
                <header className="account-header">
                    <div>
                        <p className="account-kicker">Mi cuenta</p>
                        <h1>Hola, {user.name || 'cliente'}</h1>
                        <p>Administra tus datos y consulta el historial de tus compras.</p>
                    </div>
                    <div className="account-header-actions">
                        <button type="button" className="account-back-button" onClick={() => navigate('/')}>Volver a la tienda</button>
                        <button type="button" className="account-logout-button" onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                </header>

                <div className="account-layout">
                    <nav className="account-tabs" aria-label="Secciones de la cuenta">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                className={activeTab === tab.id ? 'account-tab account-tab--active' : 'account-tab'}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span>{tab.label}</span>
                                {tab.id === 'orders' && <strong>{orders.length}</strong>}
                                {tab.id === 'invoices' && <strong>{invoices.length}</strong>}
                            </button>
                        ))}
                    </nav>

                    <section className="account-panel">
                        {activeTab === 'profile' && (
                            <div>
                                <div className="account-panel-heading">
                                    <p className="account-kicker">Perfil</p>
                                    <h2>Información personal</h2>
                                </div>
                                <div className="profile-grid">
                                    <div className="profile-field"><span>Nombre</span><strong>{user.name || 'No disponible'}</strong></div>
                                    <div className="profile-field"><span>Apellido</span><strong>{user.lastname || 'No disponible'}</strong></div>
                                    <div className="profile-field"><span>Correo electrónico</span><strong>{user.email || 'No disponible'}</strong></div>
                                    <div className="profile-field"><span>Teléfono</span><strong>{user.phone || 'No disponible'}</strong></div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div>
                                <div className="account-panel-heading">
                                    <p className="account-kicker">Historial</p>
                                    <h2>Mis órdenes</h2>
                                </div>
                                <RequestState loading={loading} error={error} hasData={orders.length > 0} emptyMessage="Todavía no tienes órdenes registradas.">
                                    <div className="account-list">
                                        {orders.map((order) => (
                                            <article className="account-record" key={order.id}>
                                                <div>
                                                    <span className="record-label">Orden #{order.id}</span>
                                                    <h3>{formatDate(order.createdAt)}</h3>
                                                    <p>{order.items?.length || 0} producto(s)</p>
                                                </div>
                                                <div className="record-side">
                                                    <span className={`record-status record-status--${String(order.status || 'pending').toLowerCase()}`}>{order.status || 'Pendiente'}</span>
                                                    <strong>{formatCurrency(order.total)}</strong>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </RequestState>
                            </div>
                        )}

                        {activeTab === 'invoices' && (
                            <div>
                                <div className="account-panel-heading">
                                    <p className="account-kicker">Documentos</p>
                                    <h2>Mis facturas</h2>
                                </div>
                                <RequestState loading={loading} error={error} hasData={invoices.length > 0} emptyMessage="Todavía no tienes facturas registradas.">
                                    <div className="account-list">
                                        {invoices.map((invoice) => (
                                            <article className="account-record" key={invoice.id}>
                                                <div>
                                                    <span className="record-label">Factura</span>
                                                    <h3>{invoice.invoiceNumber || `#${invoice.id}`}</h3>
                                                    <p>Emitida el {formatDate(invoice.issueDate)}</p>
                                                </div>
                                                <div className="record-side">
                                                    <span className="record-label">Orden #{invoice.orderId || invoice.order?.id || 'N/A'}</span>
                                                    <strong>{formatCurrency(invoice.total)}</strong>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </RequestState>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    )
}
