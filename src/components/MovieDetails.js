import { React, useEffect, useState } from "react"
import ReactPlayer from 'react-player'
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";


function MovieDetails({currentUser}) {

    const [movie, setMovie] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const params = useParams()
    const [reviewContent, setReviewContent] = useState("")
    const [reviews, setReviews] = useState([])
    
   

    useEffect(() => {
        fetch(`http://localhost:3000/movies/${params.id}`)
            .then(r => r.json())
            .then((movie) => {
                setMovie(movie)
                setIsLoaded(true)
                setReviews(movie.reviews)
            })
    }, [params.id])

    if (!isLoaded) return <h2>Loading...</h2>;

    

    function handleReviews(e) {
        e.preventDefault()
        if(currentUser) {
            fetch("http://localhost:3000/reviews" , {
                method: "POST", 
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    user_id: currentUser.id,
                    movie_id: movie.id,
                    content: reviewContent
                })
            })
    
                
                .then(r => r.json())
                .then(data => {
                    addReview(data)
                })
    
                setReviewContent("")
        }else {
            alert("Please sign in in order to leave a review")
        }
    }  
        
        function addReview(newReview) {
            const addReview = [...reviews, newReview]
            setReviews(addReview)
        }

        function handleDeleteReview(id) {
            const deletedReview = reviews.filter((review) => {
                return review.id !== id
            })
            setReviews(deletedReview)
        }

        function handleUpdateReview(updatedReviewObj) {
            const updateReviews = reviews.map((review) => {
                 if(review.id === updatedReviewObj.id ) {
                     return updatedReviewObj
                 }else {
                     return review
                 }
            })
               
        }
        
        
    

    return (

        <div>
            <ReactPlayer className="movie" url={movie.youtube_url} controls />
            <p className="movie-p-tag">{movie.description}</p>
            <div className="movie-info">
                <h2> Genres: {movie.genre.name}</h2>
                <h3>Rating: {movie.rating}</h3>
                <h4>Likes: {movie.likes}  Dislikes: {movie.dislikes}</h4>
                <h3>Reviews:</h3>

                <div className="review">
                    {reviews.map((review) => {
                        return <Reviews key={review.id} review={review} currentUser={currentUser} onDeleteReview={handleDeleteReview} onUpdateReview={handleUpdateReview} />
                    })}
                    <form onSubmit={handleReviews} >
                        <input 
                        type="text" 
                        name="comment" 
                        value={reviewContent} 
                        autoComplete="off"
                        placeholder="Add a review" 
                        onChange={(e) => {setReviewContent(e.target.value)}}></input>
                        <button type="submit">Post</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default MovieDetails