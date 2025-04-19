import React, { useState } from "react";

function ReviewForm({ revieweeId, setReviews, currentUser }) {
    const [revieweeName, setRevieweeName] = useState('');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!currentUser) {
            alert('You need to be logged in to submit a review!');
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('No token found. Please log in again.');
            return;
        }

        const newReview = {
            revieweeId,
            rating: Number(rating),
            comment
        };

        fetch('http://localhost:8000/api/v1/review', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(newReview)
        })
            .then((response) => response.json())
            .then((addedReview) => {
                setReviews((prevReviews) => [addedReview, ...prevReviews]);
                setRevieweeName('');
                setRating('');
                setComment('');
            })
            .catch((error) => {
                console.error('Error submitting review:', error);
                alert('Something went wrong while submitting your review.');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Reviewee Name:
                <input
                    type="text"
                    value={revieweeName}
                    onChange={(e) => setRevieweeName(e.target.value)}
                    placeholder="Enter freelancer's name"
                    required
                />
            </label>
            <br />

            <label>
                Rating:
                <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                >
                    <option value="" disabled>Select rating</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </label>
            <br />

            <textarea
                value={comment}
                placeholder="Leave a Review"
                onChange={(e) => setComment(e.target.value)}
                required
            />
            <br />

            <button type="submit">Submit Review</button>
        </form>
    );
}

export default ReviewForm;
