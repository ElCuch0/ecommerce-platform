import { ModalContext } from '../../context/ModalContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import './login-modal.css'
import { IconClose } from '../assets/Icons.jsx'
import { useState } from 'react'

export function LoginModal({ isOpen, onClose }) {

    const navigate = useNavigate()
    
    const { login, loading } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (event) => {

        event.preventDefault()

        setError("")

        try {

            const response = await login({
                email,
                password
            })

            const authenticatedUser = response.userWithoutPassword
            const userRole = typeof authenticatedUser.role === 'string'
                ? authenticatedUser.role
                : authenticatedUser.role?.name

            navigate(userRole?.toUpperCase() === 'ADMIN' ? "/admin" : "/")

            onClose()

        }catch (error) {

            setError(
                error.message ||
                "Credenciales incorrectas"
            )
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="loginPassword"
                            name="password"
                            className="form-input"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                {error && (
                    <p>{error}</p>
                )}

                <footer className="modal-footer">
                    <button type="submit" className="btn-register" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
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
