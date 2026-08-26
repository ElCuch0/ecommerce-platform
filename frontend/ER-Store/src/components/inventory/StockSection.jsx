export default function StockSection({ defaultStock = 0 }) {
  return (
    <div className="adm-form-card">
      <h2 className="adm-form-card__title">Stock</h2>

      <div className="adm-switch-row">
        <span>Cantidad en almacén</span>
        <input type="checkbox" defaultChecked aria-label="Control de cantidad" />
      </div>

      <div className="adm-field" style={{ marginTop: "0.75rem" }}>
        <label className="adm-label" htmlFor="admStockQty">
          Unidades
        </label>
        <input
          id="admStockQty"
          type="number"
          className="adm-input"
          placeholder="Cantidad"
          min={0}
          defaultValue={defaultStock}
        />
      </div>

      <div className="adm-field">
        <label className="adm-label" htmlFor="admStockLoc">
          Stock Mínimo
        </label>
        <input id="admStockLoc" type="text" className="adm-input" placeholder="Ej. Pasillo A-3" />
      </div>
    </div>
  );
}
