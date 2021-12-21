import { React, useEffect, useState } from "react";
import ReactPlayer from 'react-player'
import { useParams } from "react-router-dom"
import LikesDislikes from "./LikesDislikes"
import Reviews from "./Reviews"
import { Button, Form } from 'semantic-ui-react'
import { useAlert } from 'react-alert'


function MovieDetails({ currentUser, addToFavMovies, removeFromFavMovies, watchLaterList, addToWatchLaterList}) {

    const [movie, setMovie] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const params = useParams()
    const [reviewContent, setReviewContent] = useState("")
    const [reviews, setReviews] = useState([])
    const alert = useAlert()



    useEffect(() => {
        fetch(`http://localhost:3000/movies/${params.id}`)
            .then(r => r.json())
            .then((movie) => {
                setMovie(movie)
                setIsLoaded(true)
                setReviews(movie.reviews)
            })
    }, [params.id])






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
            alert.show("Please sign in to leave a review")
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



    // adds movie to watch later list
    function handleAddToWatchList() {
        if (currentUser && !watchLaterList.includes(movie)) {
            addToWatchLaterList(movie)
            alert.show(`${movie.name} has been added to your watch later list.`)
        } else if(watchLaterList.includes(movie)) {
            alert.show(`${movie.name} is already in your watch list.`)
        }  else {
            alert.show('Please login or signup.')
        }
    }

   

    return (

        <div>
            <h2 className="movie-detail-name">{movie.name}</h2>
            <ReactPlayer className="movie" url={movie.youtube_url} controls />
            <div className="movie-detail-name">
            </div>
            <h4 className="movie-detail-genre"> Genres: {movie.genre.name}</h4>
            <p className="movie-p-tag">{movie.description}</p>
            <div className="movie-info">
                <LikesDislikes
                    movie={movie}
                    onUpdateMovieLikes={onUpdateMovieLikes}
                    currentUser={currentUser}
                    addToFavMovies={addToFavMovies}
                    removeFromFavMovies={removeFromFavMovies}
                />
                 <button className="button" onClick={handleAddToWatchList}> Watch later</button>
                <h3>
                    Reviews
                    <div class="line-1"></div>
                </h3>
                <div className="review-content">
                {reviews.map((review) => {
                        return <Reviews key={review.id} review={review} currentUser={currentUser} onDeleteReview={handleDeleteReview} onUpdateReview={handleUpdateReview} />
                    })}
                </div>
                    <br></br>
                     {/* <div className="review"> */}
                    <form onSubmit={handleReviews}>
                        <Form.TextArea
                            className="review-input"
                            type="text"
                            value={reviewContent}
                            autoComplete="off"
                            placeholder="Add a review"
                            onChange={(e) => { setReviewContent(e.target.value) }}></Form.TextArea>
                        <Button type="submit"  labelPosition='left' icon='edit' primary>Post</Button>
                    </form>
                {/* </div> */}
            </div>
        </div>
    )
}

export default MovieDetails;
