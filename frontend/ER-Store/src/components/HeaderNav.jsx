import React from "react";
import { AnnouncementBar } from "./header/AnnouncementBar";
import { HeaderElements } from './header/HeaderElements'

export function HeaderNav () {
    return(
        <header className = "header">
            <AnnouncementBar />
            <HeaderElements />
        </header>
    )
}
