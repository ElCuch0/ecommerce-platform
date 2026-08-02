import React from "react";
import { AnnouncementBar } from "./header/AnnouncementBar";
import { HeaderElements } from './header/HeaderElements'

export function HeaderNav ({ onOpenSearch, onOpenLogin, onOpenCart }) {
    return(
        <header className = "header">
            <AnnouncementBar />
            <HeaderElements
                onOpenSearch={onOpenSearch}
                onOpenLogin={onOpenLogin}
                onOpenCart={onOpenCart}
            />
        </header>
    )
}
