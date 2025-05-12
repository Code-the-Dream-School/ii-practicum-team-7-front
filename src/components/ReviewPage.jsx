import React, { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

function ReviewPage() {
  const [reviews, setReviews] = useState(() => {
    const stored = localStorage.getItem('app-reviews');
    return stored ? JSON.parse(stored) : [];
  });

  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    if (reviews.length > 0) {
      const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      setAverageRating(avg.toFixed(1));
    } else {
      setAverageRating(null);
    }

    localStorage.setItem('app-reviews', JSON.stringify(reviews));
  }, [reviews]);

  return (
    <>
      <h3>Leave a Review</h3>
      <ReviewForm setReviews={setReviews} />
      <ReviewList reviews={reviews} averageRating={averageRating} />
    </>
  );
}

export default ReviewPage;
