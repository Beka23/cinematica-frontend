import React from "react"
import PopularMoviesList from "./PopularMoviesList"
import Navbar from "./Navbar"
import {useHistory} from "react-router-dom"

function Header({ currentUser, setCurrentUser, movies }) {

    const history = useHistory()

    function handleGoBackToHome() {
        history.push('/home')
    }

    return (
        <div className="Header">
            <h1 className="title">Cinematica<img className="title-img" src="https://www.flaticon.com/svg/vstatic/svg/3658/3658959.svg?token=exp=1612731620~hmac=242ae19691bc172288b9c1dbe42e3ca1"  alt="title-img"></img></h1>
            <button className="button" onClick={handleGoBackToHome}>Home</button>
            <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
            {/* <PopularMoviesList movies={movies}/> */}
        </div>
    )
}

export default Header