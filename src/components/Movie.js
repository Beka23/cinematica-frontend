import React from "react"
import {NavLink} from "react-router-dom"

function Movie({movie}) {
    return (
        <div className="card">
            <div className="card-info">
                <ul>
                    <img className="movie-image" src={movie.image} alt={movie.name}>  </img>
                    <br></br>
                    <NavLink className="movie-watch-link" to={`/movies/${movie.id}`}>Watch</NavLink>
                </ul>
            </div>
        </div>
    )
}

export default Movie