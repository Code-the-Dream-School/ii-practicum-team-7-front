import React, { useState } from "react";
import { sendReviewNotification } from "../util/sendJobUpdateEmail";
function ReviewForm({ setReviews }) {
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      reviewerName,
      rating: Number(rating),
      comment,
    };

    setReviews(prev => [newReview, ...prev]);

    sendReviewNotification({
    reviewerName,
    rating: Number(rating),
  });

    setReviewerName('');
    setRating('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Your Name:
        <input
          type="text"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
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
        placeholder="Leave a review"
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <br />

      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
