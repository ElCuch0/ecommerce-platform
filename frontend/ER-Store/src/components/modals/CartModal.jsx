import { useNavigate } from 'react-router-dom'
import { ModalContext } from '../../context/ModalContext.jsx'
import './cart-modal.css'
import { IconClose } from '../assets/Icons.jsx'
import { CartGrid } from '../grids/CartGrid.jsx'
import { useCart } from '../../context/CartContext.jsx'

export function CartModal({ isOpen, onClose, items = [] }) {
    const { updateQuantity, removeItem } = useCart()
    const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
    const navigate = useNavigate()

    return (
        <ModalContext isOpen={isOpen} onClose={onClose}>
            <div className="modal-card-cart">
                <header className="modal-header-cart">
                    <h2>Tu carrito</h2>

                    <button
                        type="button"
                        className="nav-dialog-close"
                        aria-label="Cerrar"
                        onClick={onClose}
                    >
                        <IconClose />
                    </button>
                </header>

                <div className="modal-body-cart">
                    <CartGrid
                        items={items}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                    />
                </div>

                <footer className="modal-cart-footer">
                    <div>
                        <span className="cart-total-label">Total</span>
                        <strong className="cart-total-value">${total.toLocaleString()}</strong>
                    </div>
                    <button type="button" className="btn-cart-view" onClick={() => navigate('/cart')}>
                            Ver carrito
                    </button>
                </footer>
            </div>
        </ModalContext>
    )
}
