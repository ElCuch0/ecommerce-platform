import { HeaderNav } from "../../components/HeaderNav.jsx";
import { ErFooter } from "../../components/ErFooter.jsx";
import "./register-page.css";

export function RegisterPage() {
  return(
    <>
      <HeaderNav />
      <section className = "register-card">
            <form className = "register-form" action="./process_register.js" method="post">
                <h2>Crear cuenta</h2>
                <div className = "field">
                    <label for="fname">Nombre: </label>
                    <input type="text"/>
                </div>
                <div className = "field">
                    <label for="fsurname">Apellido: </label>
                    <input type="text"/>
                </div>
                <div className = "field">
                    <label for="femail">Correo electrónico: </label>
                    <input type="email"/>
                </div>
                <div className = "field">
                    <label for="fpassword">Contraseña: </label>
                    <input type="password"/>
                </div>
                <div className = "field">
                    <label for="fphone" pattern="[0-9]{10}">Teléfono: </label>
                    <input type="tel" />
                </div>
                <button className = "register-button">Registrarme</button>
                <p className = "register-footer">¿Ya tienes una cuenta?<a>Iniciar sesión</a></p>
            </form>
        </section>
      <ErFooter />
    </>
  )
}