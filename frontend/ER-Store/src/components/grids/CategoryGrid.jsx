import { useEffect, useState } from "react";
import { getCategories } from "../../api/categories.api.js";
import "./category-grid.css"

export function CategoryGrid() {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadCategories() {
            try {
                const response = await getCategories()
                setCategories(response.data.slice(0, 5) ?? [])
            } catch (requestError) {
                setError(requestError)
            } finally {
                setLoading(false)
            }
        }

        loadCategories()
    }, [])

    return(
        <section className="section-categories">

            <h2 className="categories-title">Categorías destacadas</h2>
            <p className="categories-description"> Explora lo más popular y encuentra tu estilo en segundos. </p>

            <div className="categories-grid">
                {loading &&
                <p>Cargando categorías...</p>
                }
                {error &&
                <p>No fue posible cargar las categorías.</p>
                }
                {!loading && !error && categories.length === 0 && (
                    <p>No hay categorías disponibles.</p>
                )}
                {!loading && !error && categories.map((category) => (
                    <a
                        className="category-card"
                        href="#products-section"
                        data-category-jump={category.name.toLowerCase()}
                        key={category.id}
                    >
                        {category.name}
                    </a>
                ))}
            </div>
        </section>
    )
}
