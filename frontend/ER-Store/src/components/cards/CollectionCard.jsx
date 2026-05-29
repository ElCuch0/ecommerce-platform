import React from "react";
import './collection-card.css'

export function CollectionCard({collection}) {
    return(
        <div className="collection-card">
            <a href={collection.redirect}>
                <img src={collection.image} alt={collection.alternative} />
                <h3>{collection.name}</h3>
                <p>{collection.description}</p>
            </a>
        </div>
    )
}
