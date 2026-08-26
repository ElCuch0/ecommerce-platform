import { useEffect, useState } from "react";
import { getCategories } from "../../api/categories.api.js";
import {
  createCategory,
  toggleCategoryStatus,
  updateCategory
} from "../../api/adminCategories.api.js";

const emptyForm = { name: "", description: "" };

function getErrorMessage(error, fallback) {
  return error?.message || error?.error || fallback;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    getCategories()
      .then((response) => setCategories(response.data ?? response ?? []))
      .catch((requestError) => setError(getErrorMessage(requestError, "No fue posible cargar las categorías")))
      .finally(() => setLoading(false));
  }, []);

  const filteredCategories = categories.filter((category) => {
    const query = search.toLowerCase().trim();
    return !query || [category.name, category.description]
      .some((value) => String(value || "").toLowerCase().includes(query));
  });

  const handleChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value
    }));
  };

  const startEditing = (category) => {
    setEditingId(category.id);
    setForm({ name: category.name, description: category.description || "" });
    setError(null);
    setNotice(null);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setNotice(null);

    try {
      if (editingId) {
        const response = await updateCategory(editingId, form);
        const updatedCategory = response.data;
        setCategories((currentCategories) => currentCategories.map((category) => (
          category.id === editingId ? updatedCategory : category
        )));
        setNotice("Categoría actualizada correctamente.");
      } else {
        const response = await createCategory(form);
        setCategories((currentCategories) => [...currentCategories, response.data]);
        setNotice("Categoría creada correctamente.");
      }
      resetForm();
    } catch (requestError) {
      setError(getErrorMessage(requestError, "No fue posible guardar la categoría"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (category) => {
    setError(null);
    setNotice(null);

    try {
      const response = await toggleCategoryStatus(category.id, category.isActive);
      const updatedCategory = response.data;
      setCategories((currentCategories) => currentCategories.map((item) => (
        item.id === category.id ? updatedCategory : item
      )));
      setNotice(`Categoría ${category.isActive ? "desactivada" : "activada"} correctamente.`);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "No fue posible cambiar el estado de la categoría"));
    }
  };

  return (
    <>
      <h1 className="adm-page-title">Categorías</h1>
      <p className="adm-page-subtitle">
        Administra las categorías disponibles para organizar tus productos.
      </p>

      {error && <p className="adm-muted-banner">{error}</p>}
      {notice && <p className="adm-muted-banner">{notice}</p>}

      <div className="adm-form-grid">
        <section className="adm-form-card">
          <h2 className="adm-form-card__title">
            {editingId ? "Editar categoría" : "Nueva categoría"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="adm-field">
              <label className="adm-label" htmlFor="categoryName">Nombre</label>
              <input
                id="categoryName"
                name="name"
                className="adm-input"
                value={form.name}
                onChange={handleChange}
                minLength={2}
                maxLength={100}
                required
              />
            </div>
            <div className="adm-field">
              <label className="adm-label" htmlFor="categoryDescription">Descripción</label>
              <textarea
                id="categoryDescription"
                name="description"
                className="adm-textarea"
                value={form.description}
                onChange={handleChange}
                maxLength={500}
              />
            </div>
            <div className="adm-form-actions">
              <button type="submit" className="adm-btn adm-btn--primary" disabled={submitting}>
                {submitting ? "Guardando..." : editingId ? "Guardar cambios" : "Crear categoría"}
              </button>
              {editingId && (
                <button type="button" className="adm-btn adm-btn--outline" onClick={resetForm}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="adm-card">
          <div className="adm-card__head">
            <h2 className="adm-card__title">Resumen</h2>
            <span className="adm-card__meta">{categories.length} categorías</span>
          </div>
          <p className="adm-card__meta">Las categorías activas aparecen disponibles al crear o editar productos.</p>
        </section>
      </div>

      <div className="adm-toolbar">
        <div className="adm-toolbar__grow">
          <label className="adm-label" htmlFor="categorySearch">Buscar categoría</label>
          <input
            id="categorySearch"
            type="search"
            className="adm-input"
            placeholder="Nombre o descripción"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <section className="adm-card">
        <div className="adm-card__head">
          <h2 className="adm-card__title">Listado de categorías</h2>
          <span className="adm-card__meta">{filteredCategories.length} resultados</span>
        </div>
        {loading && <p className="adm-card__meta">Cargando categorías...</p>}
        {!loading && !filteredCategories.length && <p className="adm-card__meta">No hay categorías para mostrar.</p>}
        {!loading && filteredCategories.length > 0 && (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>{category.description || "Sin descripción"}</td>
                    <td>
                      <span className={`adm-badge ${category.isActive ? "adm-badge--ok" : "adm-badge--warn"}`}>
                        {category.isActive ? "Activa" : "Inactiva"}
                      </span>
                    </td>
                    <td className="adm-table__actions">
                      <button type="button" onClick={() => startEditing(category)}>Editar</button>
                      <button type="button" onClick={() => handleToggleStatus(category)}>
                        {category.isActive ? "Desactivar" : "Activar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
