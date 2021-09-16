import React from "react";
import { useHistory } from "react-router-dom";

function WatchLaterMovie({ movie, deleteWatchLaterMovie }) {

    const history = useHistory()

    function movieDetails() {
        history.push(`/movies/${movie.id}`)
    }

    function deleteFromWatchList() {
        deleteWatchLaterMovie(movie.id)
    }

    return (
        <div>
            <div className="card">
                <div className="card-info">
                    <ul>
                        <img className="movie-image" src={movie.image} alt={movie.name} onClick={movieDetails}></img>
                        <br></br>
                        <button className="button" onClick={deleteFromWatchList}>Delete from watch list</button>
                    </ul>
                </div>
            </div>
            
        </div>

    )
}

export default WatchLaterMovie;
