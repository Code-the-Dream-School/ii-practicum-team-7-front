import React, {useState} from "react";
import ReviewForm from "./ReviewForm";

function ReviewList({ reviews }) {
    return (
        <>
            {reviews.length === 0 && <p>No reviews Yet</p>}
            {reviews.map((review, index) => (
                <div key={index}>
                    <strong>{review.reviewerName}</strong> rated {review.rating} /5
                    <p>{review.comment}</p>
                    <hr />
                </div>
            ))}
        </>
    );
}

export default ReviewList