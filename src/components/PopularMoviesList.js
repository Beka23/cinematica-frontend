import React from "react";
import PopularMovie from "./PopularMovie";

function MostPopularMovies({ movies }) {

    const popluarMovie = [...movies].sort((a,b) => b.likes-a.likes).slice(0, 5)

    return (
        <div>
            <div><h3 className="most-popular">Most popular</h3></div>
            <div className="cards">
                {popluarMovie.map((movie) => {
                    return <PopularMovie key={movie.id} movie={movie}/>
                })}
            </div>
        </div>
    )
}

export default MostPopularMovies;

