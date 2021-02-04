import React from "react"
import Login from "./Login"

function Navbar({currentUser, setCurrentUser}) {
    return (
        <div>
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </div>
    )
}

export default Navbar