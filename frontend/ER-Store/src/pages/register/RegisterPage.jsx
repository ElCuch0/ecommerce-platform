import { HeaderNav } from "../../components/HeaderNav.jsx";
import { ErFooter } from "../../components/ErFooter.jsx";
import { useAuth } from "../../context/useAuth.js";
import { useState } from "react";
import "./register-page.css";

export function RegisterPage() {
  const { register } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);

    try {
      await register(Object.fromEntries(formData.entries()));
      window.location.assign("/");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return(
    <>
      <HeaderNav />
      <section className = "register-card">
            <form className = "register-form" onSubmit={handleSubmit}>
                <h2>Crear cuenta</h2>
                <div className = "field">
                    <label htmlFor="fname">Nombre: </label>
                    <input id="fname" name="name" type="text" required minLength="2"/>
                </div>
                <div className = "field">
                    <label htmlFor="fsurname">Apellido: </label>
                    <input id="fsurname" name="lastname" type="text" required minLength="2"/>
                </div>
                <div className = "field">
                    <label htmlFor="femail">Correo electrónico: </label>
                    <input id="femail" name="email" type="email" required/>
                </div>
                <div className = "field">
                    <label htmlFor="fpassword">Contraseña: </label>
                    <input id="fpassword" name="password" type="password" required minLength="8"/>
                </div>
                <div className = "field">
                    <label htmlFor="fphone">Teléfono: </label>
                    <input id="fphone" name="phone" type="tel" pattern="[0-9]{10}" />
                </div>
                  {error && <p className="form-error" role="alert">{error}</p>}
                  <button className = "register-button" disabled={isSubmitting}>{isSubmitting ? "Registrando..." : "Registrarme"}</button>
                <p className = "register-footer">¿Ya tienes una cuenta?<a>Iniciar sesión</a></p>
            </form>
        </section>
      <ErFooter />
    </>
  )
}