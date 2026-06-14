export default function InvoiceSummary() {
  return (
    <section className="adm-form-card">
      <h2 className="adm-form-card__title">Resumen</h2>
      <div className="adm-invoice-summary">
        <div className="adm-invoice-summary__row">
          <span>Subtotal</span>
          <span>$0</span>
        </div>
        <div className="adm-invoice-summary__row">
          <span>IVA (19%)</span>
          <span>$0</span>
        </div>
        <div className="adm-invoice-summary__row adm-invoice-summary__row--total">
          <span>Total</span>
          <span>$0</span>
        </div>
      </div>
      <div className="adm-form-actions">
        <button type="button" className="adm-btn adm-btn--primary" style={{ width: "100%" }}>
          Emitir factura
        </button>
      </div>
    </section>
  );
}
