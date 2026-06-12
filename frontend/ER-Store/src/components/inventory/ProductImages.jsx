export default function ProductImages() {
  return (
    <>
      <div className="adm-form-card">
        <h2 className="adm-form-card__title">Imágenes</h2>
        <label className="adm-upload">
          <input type="file" accept="image/*" multiple hidden />
          <p className="adm-upload__text">
            Arrastra tu imagen aquí o haz clic para seleccionar las imágenes.
          </p>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </label>
      </div>

      <div className="adm-form-card">
        <h2 className="adm-form-card__title">Visibilidad</h2>
        <label className="adm-check">
          <input type="checkbox" defaultChecked />
          En catálogo
        </label>
        <label className="adm-check">
          <input type="checkbox" />
          Oculto
        </label>
      </div>
    </>
  );
}
