import React from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

export function App () {
    return(
        <section className = "container-followCards">
            <TwitterFollowCard isFollowing = {false} userName = "midudev" name = "Miguel Ángel Durán"/>
            <TwitterFollowCard isFollowing userName = "ElCuch0" name = "Ronald Silva"/>
            <TwitterFollowCard isFollowing userName = "Brooklyn2802" name = "Larry Silva"/>
        </section>
    )
}
