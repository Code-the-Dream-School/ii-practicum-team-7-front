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
    <div className="flex flex-col space-y-8 py-16 bg-monte-carlo-light">
      <h2>Rate our app!</h2>
      <ReviewForm setReviews={setReviews} />
      <ReviewList reviews={reviews} averageRating={averageRating} />
    </div>
  );
}

export default ReviewPage;
