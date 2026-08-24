import './cart-grid.css'

export function CartGrid({ items = [], onUpdateQuantity, onRemove }) {
    return items.length > 0 ? (
        <div className="cart-grid">
            {items.map((item) => (
                <article className="cart-grid-item" key={item.id || item.name}>
                    {item.image ? (
                        <img
                            className="cart-grid-item-image"
                            src={item.image}
                            alt={item.name}
                        />
                    ) : null}

                    <div className="cart-grid-item-body">
                        <h3 className="cart-grid-item-title">{item.name}</h3>
                        {(item.alternative || item.description) ? (
                            <p className="cart-grid-item-description">{item.alternative || item.description}</p>
                        ) : null}

                        <div className="cart-grid-item-meta">
                            <label>
                                Cantidad:{' '}
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(event) => {
                                        const quantity = Number(event.target.value)
                                        if (quantity > 0) onUpdateQuantity?.(item.productId, quantity)
                                    }}
                                />
                            </label>
                            <span>Precio: ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                        </div>
                        <button type="button" onClick={() => onRemove?.(item.productId)}>
                            Eliminar
                        </button>
                    </div>
                </article>
            ))}
        </div>
    ) : (
        <div className="cart-grid-empty">No hay productos en el carrito.</div>
    )
}
