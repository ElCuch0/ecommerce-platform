import React, { useEffect, useState } from "react";
import "./announcement-bar.css"

export function AnnouncementBar () {

    // const [activeAdd, setActiveAdd] = useState("")
    // const [charging, setCharging] = useState(true)

    /* useEffect(() => {
        fetch('http://announcement/selected')
        .then((response) => response.json())
        .then((data) => {
            setActiveAdd(data)
            setCharging(false)
        })
        .catch((err) => {
            console.error("Error al cargar el anuncio: ", err)
            setCharging(false)
        })
    }, []) */

    // if (charging) return <p>Cargando datos...</p>

    return(
        <div className="announcement-bar">
            Anuncio generico
        </div>
    )
}
