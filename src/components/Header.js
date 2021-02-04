import React from "react"
import Navbar from "./Navbar"

function Header({currentUser, setCurrentUser}) {
    return (
        <div>
            <h1 className="title">Cinematica</h1>
            <Navbar   currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </div>
    )
}

export default Header