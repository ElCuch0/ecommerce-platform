export default function ProductDetailTable() {
  return (
    <section className="adm-form-card">
      <h2 className="adm-form-card__title">Detalle del pedido</h2>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} style={{ color: "var(--adm-muted)", fontSize: "0.9rem" }}>
                No hay líneas en este pedido.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
