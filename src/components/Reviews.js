import React, { useState } from "react"
import EditReview from "./EditReview"

function Reviews({ review, currentUser, onDeleteReview, onUpdateReview }) {

    const [isEditing, setIsEditing] = useState(false)

    function handleDeleteReview(e) {
        fetch(`http://localhost:3000/reviews/${review.id}`, {
            method: "DELETE"
        })

        onDeleteReview(review.id)
    }

    function handleEditReview() {
        setIsEditing(!isEditing)
    }

    function handleUpdateReview(updatedReview) {
        setIsEditing(false)
        onUpdateReview(updatedReview) 
    }

    return (
        <div className="comments">
            {isEditing ? <EditReview onUpdateReview={handleUpdateReview} review={review} /> : review.content}
            {currentUser ? <button onClick={handleDeleteReview}>🗑️</button> : ""} {currentUser ? <button onClick={handleEditReview}>✏️</button> : ""}
        </div>
    )
}

export default Reviews