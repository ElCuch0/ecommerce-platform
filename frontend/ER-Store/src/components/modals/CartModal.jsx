import { ModalContext } from '../../context/ModalContext.jsx'

export function CartModal({ isOpen, onClose, items = [] }) {
    const hasItems = items.length > 0
    const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)

    return (
        <ModalContext isOpen={isOpen} onClose={onClose}>
            <div className="modal-card">
                <header className="modal-header">
                    <h2>Tu carrito</h2>
                </header>

                <div className="modal-body">
                    {hasItems ? (
                        <ul className="nav-cart-list">
                            {items.map((item) => (
                                <li className="nav-cart-item" key={item.id || item.name}>
                                    {item.image ? (
                                        <img className="nav-cart-item__img" src={item.image} alt={item.name} />
                                    ) : null}
                                    <div className="nav-cart-item__meta">
                                        <p className="nav-cart-item__name">{item.name}</p>
                                        <p className="nav-cart-item__sub">
                                            {item.quantity} × ${item.price?.toLocaleString()}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="nav-cart-empty">
                            <p className="nav-cart-empty__icon">🛒</p>
                            <p>Tu carrito está vacío.</p>
                        </div>
                    )}
                </div>

                <footer className="modal-footer modal-cart-footer">
                    <div>
                        <span className="cart-total-label">Total</span>
                        <strong className="cart-total-value">${total.toLocaleString()}</strong>
                    </div>
                    <button type="button" className="btn btn-outline" onClick={onClose}>
                        Cerrar
                    </button>
                </footer>
            </div>
        </ModalContext>
    )
}
