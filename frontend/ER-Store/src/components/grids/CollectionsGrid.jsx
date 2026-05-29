import React from "react";
import { CollectionCard } from "../cards/CollectionCard.jsx";
import { collections } from '../../data.jsx'
import './collections-grid.css'

export function CollectionsGrid() {
    return(
        <section className="container-collections">

            <div className="collections-info">
                <h2 className="collections-title">Nuevas colecciones</h2>
                <p className="collections-description">Descubre nuestros nuevos productos.</p>
            </div>
            
            {collections.map(collection => (
                console.log(collection.image),
                <CollectionCard key={collection.id} collection={collection} />
            ))}
        </section>
    )
}
