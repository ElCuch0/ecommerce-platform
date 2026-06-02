export default function StockSection() {
  return (
    <>
      <input
        type="number"
        placeholder="Cantidad"
      />

      <input
        type="text"
        placeholder="Ubicación"
      />

      <label>
        Visible
        <input type="checkbox" />
      </label>
    </>
  );
}
