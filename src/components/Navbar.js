import React from "react"
import Login from "./Login"
import {useHistory} from "react-router-dom"


function Navbar({currentUser, setCurrentUser}) {

    const history = useHistory()

    function handleFavortieMoviesPage() {
        history.push(`/favorite_movies`) 
    }

    return (
        <div>
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            <button onClick={handleFavortieMoviesPage}>My favortie movies</button>
        </div>
    )
}

export default Navbar