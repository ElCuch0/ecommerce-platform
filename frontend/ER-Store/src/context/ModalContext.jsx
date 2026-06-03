import { useEffect, useRef } from "react"

export function ModalContext({ isOpen, onClose, children }) {

    const modalRef = useRef(null)

    useEffect(() => {

        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return(
        <div className="modal-overlay">
                {/* Asignamos la referencia al contenedor del contenido real */}
            <div className="modal-content" ref={modalRef}>
                {/* 3. Lógica para cerrar con el botón (Simple onClick) */}
                {children}
            </div>
        </div>
    )
}
