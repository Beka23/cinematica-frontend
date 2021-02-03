import React from "react"
import {NavLink} from "react-router-dom"

function Movie({movie}) {
    return (
        <div className="card">
            <div className="card-info">
                <ul>
                    <img className="movie-image" src={movie.image} alt={movie.name}></img>
                    <h5>{movie.name}</h5>
                    <NavLink to={`/movies/${movie.id}`}>Watch</NavLink>
                </ul>
            </div>
        </div>
    )
}

export default Movie