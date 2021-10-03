import React from "react"
import Navbar from "./Navbar"
import ReactPlayer from 'react-player';

function Header({ currentUser, setCurrentUser}) {

    return (
        <div className="Header">
            <h1 className="title">Cinematica<img ></img></h1>
            <Navbar className="main-navbar" currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </div>
    )
}

export default Header

