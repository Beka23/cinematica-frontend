import React, { useState } from "react"
import EditReview from "./EditReview"

function Reviews({ review, currentUser, onDeleteReview, onUpdateReview }) {

    const [isEditing, setIsEditing] = useState(false)

    function handleDeleteReview(e) {
       if(window.confirm("Delete review permanently?")) {
        fetch(`http://localhost:3000/reviews/${review.id}`, {
            method: "DELETE"
        })

        onDeleteReview(review.id)
       }
    }

    function handleEditReview() {
        setIsEditing(!isEditing)
    }

    function handleUpdateReview(updatedReview) {
        onUpdateReview(updatedReview) 
        setIsEditing(false)
    }

    return (
        <div className="reviews" >
            {isEditing ? <EditReview onUpdateReview={handleUpdateReview} review={review} /> :  `${review.user_username}: ${review.content}` }
            {currentUser ? <button onClick={handleDeleteReview}>🗑️</button> : ""} {currentUser ? <button onClick={handleEditReview}>✏️</button> : ""}
        </div>
    )
}

export default Reviews


