import { ModalContext } from '../../context/ModalContext.jsx'
import './login-modal.css'
import { IconClose } from '../assets/Icons.jsx'

export function LoginModal({ isOpen, onClose }) {
    const handleSubmit = (event) => {
        event.preventDefault()
        onClose()
    }

    return (
        <ModalContext isOpen={isOpen} onClose={onClose}>
            <form className="modal-card" onSubmit={handleSubmit}>
                <header className="modal-header">
                    <h2>Iniciar sesión</h2>

                    <button
                        type="button"
                        className="nav-dialog-close"
                        aria-label="Cerrar"
                        onClick={onClose}
                    >
                        <IconClose />
                    </button>
                </header>

                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="loginEmail">Correo electrónico</label>
                        <input
                            type="email"
                            id="loginEmail"
                            className="form-input"
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="loginPassword">Contraseña</label>
                        <input
                            type="password"
                            id="loginPassword"
                            className="form-input"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <footer className="modal-footer">
                    <button type="submit" className="btn-register" style={{ width: '100%' }}>
                        Entrar
                    </button>

                    <a href="/forgot-password" className="btn-link">
                        ¿Olvidaste tu contraseña?
                    </a>

                    <a href="/register" className="btn-link">
                        ¿No tienes cuenta? Regístrate
                    </a>

                </footer>
            </form>
        </ModalContext>
    )
}
