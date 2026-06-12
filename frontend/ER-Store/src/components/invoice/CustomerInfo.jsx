export default function CustomerInfo() {
  return (
    <section className="adm-form-card">
      <h2 className="adm-form-card__title">Cliente</h2>
      <div className="adm-toolbar" style={{ marginBottom: 0 }}>
        <div className="adm-toolbar__grow">
          <label className="adm-label" htmlFor="admCustSearch">
            Buscar cliente
          </label>
          <input id="admCustSearch" className="adm-input" placeholder="Nombre o documento" />
        </div>
        <button type="button" className="adm-btn adm-btn--primary adm-btn--sm">
          Buscar
        </button>
      </div>
    </section>
  );
}
