import { useState } from 'react'

export function TwitterFollowCard ({userName, name}) {

    const [isFollowing, setIsFollowing] = useState(false)

    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const btnClassName = isFollowing 
        ? 'tw-followCard-btn is-following'
        : 'tw-followCard-btn'

    const handleCLick = () => {
        setIsFollowing(!isFollowing)
    }

    return(
        <article className = 'tw-followCard'>
            <header className = 'tw-followCard-header'>
                <img
                className = 'tw-followCard-avatar'
                src= {`https://unavatar.io/github/${userName}`}
                alt= "Foto de perfil"/>
                <div className = 'tw-followCard-info'>
                    <strong>{name}</strong>
                    <span className = 'tw-followCard-usuario'>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className = {btnClassName} onClick={handleCLick}>
                    {text}
                </button>
            </aside>
        </article>
    )
}
