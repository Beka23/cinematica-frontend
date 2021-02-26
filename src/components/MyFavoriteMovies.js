import React from "react"
import MyFavoriteMoviesList from "./MyFavoriteMoviesList"



function MyFavoriteMovies({ favMovie }) {

    return (
        <div>
            <h1 className="movie-detail-name">Your favorite movies:</h1>
            <div className="cards">
                {favMovie.map((movie) => {
                    return <MyFavoriteMoviesList key={movie.id} movie={movie} />
                })}
            </div>
        </div>
    )

}

export default MyFavoriteMovies

