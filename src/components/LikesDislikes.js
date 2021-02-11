import React from "react"

function LikesDislikes({
    movie,
    onUpdateMovieLikes,
    currentUser,
    addToFavMovies,
    isLiked,
    setIsLiked,
    isDisLiked,
    setIsDisliked,
    removeFromFavMovies }) {
    

    
    
   
    // function for LIKING the movie
    function handleLikeMovie() {
        
        if (currentUser) {
            
            if (isDisLiked === false && isLiked === false) {
                fetch(`http://localhost:3000/movies/${movie.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        likes: movie.likes + 1
                    })
                })
                    .then(r => r.json())
                    .then(data => {
                        onUpdateMovieLikes(data)
                        setIsLiked(true)
                        //adds movie to fav movie list when liked
                        addToFavMovies(movie)
                    })



            } else if (isLiked === true) {
                fetch(`http://localhost:3000/movies/${movie.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        likes: movie.likes - 1
                    })
                })

                    .then(r => r.json())
                    .then(data => {
                        onUpdateMovieLikes(data)
                        setIsLiked(false)
                        //removes movie from fav movie list when like removed
                        removeFromFavMovies(movie.id)
                    })
            } else if (isDisLiked === true && isLiked === false) {
                fetch(`http://localhost:3000/movies/${movie.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        likes: movie.likes + 1,
                        dislikes: movie.dislikes - 1
                    })
                })
                    .then(r => r.json())
                    .then(data => {
                        onUpdateMovieLikes(data)
                        setIsLiked(true)
                        addToFavMovies(movie)
                        setIsDisliked(false)
                    })
            }
        } else {
            alert("Like this movie? Sign in to make your opinion count.")
        }
    }







    // function for DISLIKING the movie
    function handleDislikeMovie() {
        if (currentUser) {
            if (isLiked === false && isDisLiked === false) {
                fetch(`http://localhost:3000/movies/${movie.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        dislikes: movie.dislikes + 1
                    })
                })

                    .then(r => r.json())
                    .then(data => {
                        onUpdateMovieLikes(data)
                        setIsDisliked(true)
                    })
            } else if (isDisLiked === true) {

                fetch(`http://localhost:3000/movies/${movie.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        dislikes: movie.dislikes - 1,
                    })
                })

                    .then(r => r.json())
                    .then(data => {
                        onUpdateMovieLikes(data)
                        setIsDisliked(false)
                    })
            } else if (isLiked === true && isDisLiked === false) {
                fetch(`http://localhost:3000/movies/${movie.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        dislikes: movie.dislikes + 1,
                        likes: movie.likes - 1
                    })
                })

                    .then(r => r.json())
                    .then(data => {
                        onUpdateMovieLikes(data)
                        setIsDisliked(true)
                        setIsLiked(false)
                        removeFromFavMovies(movie.id)
                    })
            }
        } else {
            alert("Dislike this movie? Sign in to make your opinion count.")
        }
    }

    

    return (
        <div>
            <button onClick={handleLikeMovie}>👍🏼{movie.likes}</button>
            
            <button onClick={handleDislikeMovie}>👎🏼{movie.dislikes}</button>
        </div>
    )
}

export default LikesDislikes