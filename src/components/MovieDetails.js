import { React, useEffect, useState } from "react"
import ReactPlayer from 'react-player'
import { useParams } from "react-router-dom";
import LikesDislikes from "./LikesDislikes";
import Reviews from "./Reviews";



function MovieDetails({ currentUser, addToFavMovies, removeFromFavMovies }) {

    const [movie, setMovie] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const params = useParams()
    const [reviewContent, setReviewContent] = useState("")
    const [reviews, setReviews] = useState([])

    const [isLiked, setIsLiked] = useState(false)
    const [isDisLiked, setIsDisliked] = useState(false)


   console.log(isLiked)
   console.log(isDisLiked)

    useEffect(() => {
        fetch(`http://localhost:3000/movies/${params.id}`)
            .then(r => r.json())
            .then((movie) => {
                setMovie(movie)
                setIsLoaded(true)
                setReviews(movie.reviews)
            })
    }, [])






    if (!isLoaded) return <h2 className="white-texts movie-info">Loading...</h2>;



    //function for reviewing a movie
    function handleReviews(e) {
        e.preventDefault()
        if (currentUser) {
            fetch("http://localhost:3000/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: currentUser.id,
                    user_username: currentUser.username,
                    movie_id: movie.id,
                    content: reviewContent
                })
            })


                .then(r => r.json())
                .then(data => {
                    addReview(data)
                })

            setReviewContent("")
        } else {
            alert("Please sign in to leave a review")
        }
    }
    //adds movie review to the page
    function addReview(newReview) {
        const addReview = [...reviews, newReview]
        setReviews(addReview)
    }


    //deletes review from the page
    function handleDeleteReview(id) {
        const deletedReview = reviews.filter((review) => {
            return review.id !== id
        })
        setReviews(deletedReview)
    }

    //updates the review on the page
    function handleUpdateReview(updatedReviewObj) {
        const updateReviews = reviews.map((review) => {
            if (review.id === updatedReviewObj.id) {
                return updatedReviewObj
            } else {
                return review
            }
        })
        setReviews(updateReviews)
    }


    //updates the movie likes and dislikes on the page
    function onUpdateMovieLikes(updatedMovieObj) {
        setMovie(updatedMovieObj)
    }



    return (

        <div>
            <h5 className="movie-detail-name">{movie.name}</h5>
            <ReactPlayer className="movie" url={movie.youtube_url} controls />
            <h5 className="movie-detail-genre"> Genres: {movie.genre.name}</h5>
            <p className="movie-p-tag">{movie.description}</p>
            <div className="movie-info">

                <LikesDislikes
                    movie={movie}
                    onUpdateMovieLikes={onUpdateMovieLikes}
                    currentUser={currentUser}
                    addToFavMovies={addToFavMovies}
                    isLiked={isLiked}
                    setIsLiked={setIsLiked}
                    isDisLiked={isDisLiked}
                    setIsDisliked={setIsDisliked}
                    removeFromFavMovies={removeFromFavMovies}
                />

             



                <h3>Reviews: </h3>

                <div className="review">
                    <form onSubmit={handleReviews} >
                        <input
                            className="review-input"
                            type="text"
                            value={reviewContent}
                            autoComplete="off"
                            placeholder="Add a review"
                            onChange={(e) => { setReviewContent(e.target.value) }}></input>
                        <button type="submit">Post</button>
                    </form>
                    <br></br>
                    {reviews.map((review) => {
                        return <Reviews key={review.id} review={review} currentUser={currentUser} onDeleteReview={handleDeleteReview} onUpdateReview={handleUpdateReview} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default MovieDetails