import { React, useEffect, useState } from "react"
import ReactPlayer from 'react-player'
import { useParams } from "react-router-dom";


function MovieDetails() {

    const [movie, setMovie] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:3000/movies/${params.id}`)
         .then(r => r.json())
         .then((movie) => {
         setMovie(movie)
         setIsLoaded(true)
         })
    },[params.id])

    if (!isLoaded) return <h2>Loading...</h2>;

    return (

        <div>
            <ReactPlayer className="movie" url={movie.youtube_url} controls/>
                <p className="movie-p-tag">{movie.description}</p>
            <div className="movie-info">
                <h2> Genres: {movie.genre.name}</h2>
                <h3>Rating: {movie.rating}</h3>
                <h4>Likes: {movie.likes}  Dislikes: {movie.dislikes}</h4>
            </div>
                
        </div>
    )
}

export default MovieDetails