import React from "react"
import WatchLaterMovie from "./WatchLaterMovie"

function WatchLaterPage({watchLaterList, deleteWatchLaterMovie}) {

    
    return(
        <div>
            <h1 className="movie-detail-name">Your watch later list:</h1>
            <div className="cards">
                {watchLaterList.map((movie) => {
                    return <WatchLaterMovie key={movie.id} movie={movie} deleteWatchLaterMovie={deleteWatchLaterMovie} />
                })}
            </div>
        </div>
    )
}

export default WatchLaterPage;
