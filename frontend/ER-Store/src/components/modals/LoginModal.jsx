import { ModalContext } from '../../context/ModalContext.jsx'

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
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Entrar
                    </button>

                    <a href="/forgot-password" className="btn btn-link">
                        ¿Olvidaste tu contraseña?
                    </a>

                    <a href="/register" className="btn btn-link">
                        ¿No tienes cuenta? Regístrate
                    </a>

                </footer>
            </form>
        </ModalContext>
    )
}
