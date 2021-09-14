import React, { useState } from "react"

function EditReview({ review, onUpdateReview }) {

    const {id,  content} = review
    const [reviewBody, setReviewBody] = useState(content)

    function handleFormSubmit(e) {
        e.preventDefault()
         fetch(`http://localhost:3000/reviews/${id}`, {
             method: "PATCH",
             headers: {
                 "Content-Type" : "application/json"
             },
             body: JSON.stringify({
                 content: reviewBody
             })
         })

            .then(r => r.json())
            .then(updatedReview => {
                onUpdateReview(updatedReview)
            })
    }



    return (
        <div>

            <form className="edit-message" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    className="form-input"
                    autoComplete="off"
                    value={reviewBody}
                    onChange={(e) => setReviewBody(e.target.value)}
                />
                <input type="submit" className="button" value="Save" />
            </form>

        </div>
    )
}

export default EditReview
