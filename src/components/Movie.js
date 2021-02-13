import React from "react"
import {useHistory} from "react-router-dom"


function Movie({movie}) {
    
    const history = useHistory()
    
    function movieDetails() { 
        history.push(`/movies/${movie.id}`) 
    }

    return (
        <div className="card">
            <div className="card-info">
                <ul>
                    <img className="movie-image" src={movie.image} alt={movie.name} onClick={movieDetails}></img>
                </ul>
            </div>
        </div>
    )
}

export default Movie