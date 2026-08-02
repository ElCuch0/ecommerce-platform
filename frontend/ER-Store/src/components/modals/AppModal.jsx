import { ModalContext } from '../../context/ModalContext.jsx'

export function AppModal({ isOpen, onClose, title = 'Modal', children }) {
    return (
        <ModalContext isOpen={isOpen} onClose={onClose}>
            <div className="modal-card">
                <header className="modal-header">
                    <h2>{title}</h2>
                </header>
                <div className="modal-body">{children}</div>
            </div>
        </ModalContext>
    )
}
