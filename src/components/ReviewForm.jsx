import React, { useState } from "react";

function ReviewForm({ revieweeId, setReviews }) {
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState('');

   const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            reviewerId: 1, // Hardcoded for now, replace with logged-in user's ID
            reviewerName: "Your Name", // Replace with logged-in user's name
            revieweeId,
            revieweeName: "Freelancer", // Replace with the freelancer's name
            rating,
            comment,
        };

        fetch('Fake URL', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReview)
        })
            .then((response) => response.json())
            .then((addedReview) => {
                setReviews((PrevReviews) => [addedReview, ...PrevReviews])
                setRating(null)
                setComment('')
            })
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Rating:
                    <select value={rating} onChange={(e) => (setRating(e.target.value))}>
                        {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </label>

                    <br />
                <textarea 
                    value={comment}
                    placeholder="Leave a Review"
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type='submit'>Submit Review</button>
            </form>
        </>
    )
}

export default ReviewForm