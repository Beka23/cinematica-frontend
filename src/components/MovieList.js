import React from "react"
import Movie from "./Movie"

function MovieList({movies}) {
    return (
        <div className="cards">
            {movies.map((movie) => {
                return <Movie movie={movie}/>
            })}
        </div>
    )
}

export default MovieList