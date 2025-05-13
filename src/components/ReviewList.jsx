import React from "react";

function ReviewList({ reviews, averageRating }) {
  return (
    <>
      <h2>Average Rating: {averageRating ? averageRating : 'No Ratings Yet'}</h2>
      {reviews.length === 0 && <p>No Reviews Yet</p>}
      {reviews.map((review, index) => (
        <div key={index}>
          <p>{review.reviewerName} Rated {review.rating} /5</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </>
  );
}

export default ReviewList;
