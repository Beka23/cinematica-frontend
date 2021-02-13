import React from "react"

function LikesDislikes({
    movie,
    onUpdateMovieLikes,
    currentUser,
    addToFavMovies,
    removeFromFavMovies }) {
    
    
 
    // function for LIKING the movie
    function handleLikeMovie() {
        
        if (currentUser) {
            if (movie.disliked === false && movie.liked === false) {
                fetch(`http://localhost:3000/movies/${movie.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        likes: movie.likes + 1,
                        // setting movie's liked attr to TRUE
                        liked: movie.liked = true
                    })
                })
                    .then(r => r.json())
                    .then(data => {
                        onUpdateMovieLikes(data)
                        //adds movie to fav movie list when liked
                        addToFavMovies(movie)
                    })



            } else if (movie.liked === true) {
                fetch(`http://localhost:3000/movies/${movie.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        likes: movie.likes - 1,
                        //setting movie's liked attr to FALSE
                        liked: movie.liked = false
                    })
                })

                    .then(r => r.json())
                    .then(data => {
                        onUpdateMovieLikes(data)
                        //removes movie from fav movie list when like removed
                        removeFromFavMovies(movie.id)
                    })
            } else if (movie.disliked === true && movie.liked === false) {
                fetch(`http://localhost:3000/movies/${movie.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        likes: movie.likes + 1,
                        dislikes: movie.dislikes - 1,
                        liked: movie.liked = true, 
                        disliked: movie.disliked = false
                    })
                })
                    .then(r => r.json())
                    .then(data => {
                        onUpdateMovieLikes(data)
                        addToFavMovies(movie)
                    })
            }
        } else {
            alert("Like this movie? Sign in to make your opinion count.")
        }
    }







    // function for DISLIKING the movie
    function handleDislikeMovie() {
        if (currentUser) {
            if (movie.liked === false && movie.disliked === false) {
                fetch(`http://localhost:3000/movies/${movie.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        dislikes: movie.dislikes + 1,
                        disliked: movie.disliked = true
                    })
                })

                    .then(r => r.json())
                    .then(data => {
                        onUpdateMovieLikes(data)
                    })
            } else if (movie.disliked === true) {

                fetch(`http://localhost:3000/movies/${movie.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        dislikes: movie.dislikes - 1,
                        disliked: movie.disliked = false
                    })
                })

                    .then(r => r.json())
                    .then(data => {
                        onUpdateMovieLikes(data)
                    })
            } else if (movie.liked === true && movie.disliked === false) {
                fetch(`http://localhost:3000/movies/${movie.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        dislikes: movie.dislikes + 1,
                        likes: movie.likes - 1,
                        disliked: movie.disliked = true, 
                        liked: movie.liked = false
                    })
                })

                    .then(r => r.json())
                    .then(data => {
                        onUpdateMovieLikes(data)
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

