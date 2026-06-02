import './search-modals.css'

export function SearchModal() {
    return(
        <dialog className="nav-dialog" id="navSearchDialog" aria-label="Búsqueda">
            <form method="dialog" className="nav-dialog__card">
                <header className="nav-dialog__header">
                    <a className="nav-dialog__brand" href="index.html" aria-label="Ir al inicio">
                        <img src="images/Logo_ER.png" alt="Logo ER Store"/>
                    </a>
                    <h2 className="nav-dialog__title">Buscar</h2>
                    <button className="nav-dialog__close nav-dialog__close--x" value="cancel" aria-label="Cerrar">X</button>
                </header>
                <div className="nav-dialog__body">
                    <label className="nav-dialog__label" for="searchInput">Buscar productos</label>
                    <input id="searchInput" type="search" className="form-input" placeholder="Buscar..." autocomplete="off"/>

                    <div className="search-panels">
                        <section className="search-panel" aria-label="Búsquedas populares">
                            <h3 className="search-panel__title">Búsquedas más concurridas</h3>
                            <div className="search-panel__content" id="popularSearches"></div>
                        </section>

                        <section className="search-panel" aria-label="Productos recomendados">
                            <h3 className="search-panel__title">Recomendados para ti</h3>
                            <div className="search-panel__content" id="searchRecommendations"></div>
                        </section>
                    </div>
                </div>
                <footer className="nav-dialog__footer">
                    <p>Motor de busqueda</p>
                </footer>
            </form>
        </dialog>
    )
}
