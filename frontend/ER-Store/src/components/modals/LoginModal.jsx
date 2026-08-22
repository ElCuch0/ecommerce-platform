import { ModalContext } from '../../context/ModalContext.jsx'
import { useAuth } from '../../context/useAuth.js'
import './login-modal.css'
import { IconClose } from '../assets/Icons.jsx'
import { useState } from 'react'

export function LoginModal({ isOpen, onClose }) {
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        setIsSubmitting(true)

        const formData = new FormData(event.currentTarget)

        try {
            await login({
                email: formData.get('email'),
                password: formData.get('password'),
            })
            event.currentTarget.reset()
            onClose()
        } catch (submitError) {
            setError(submitError.message)
        } finally {
            setIsSubmitting(false)
        }
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
                            name="email"
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
                            name="password"
                            className="form-input"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                {error && <p className="form-error" role="alert">{error}</p>}

                <footer className="modal-footer">
                    <button type="submit" className="btn-register" style={{ width: '100%' }} disabled={isSubmitting}>
                        {isSubmitting ? 'Ingresando...' : 'Entrar'}
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
