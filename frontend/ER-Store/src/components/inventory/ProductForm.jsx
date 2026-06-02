export default function ProductForm() {
  return (
    <form>

      <input
        type="text"
        placeholder="Nombre del producto"
      />

      <select>
        <option>Seleccionar categoría</option>
      </select>

      <textarea
        placeholder="Descripción"
      />

      <input
        type="number"
        placeholder="Precio"
      />

    </form>
  );
}
