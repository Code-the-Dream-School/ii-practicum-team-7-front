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
      <div className="flex flex-col items-center w-full">
        <div className="bg-ny-pink-light p-6 rounded-md shadow-md mx-auto w-2/3 lg:w-1/3 text-center md:mx-0 mt-6">
          <div className="mb-4">
            <label>
              Your Name:{" "}
              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                required
                className="bg-inherit border-b border-gray-400 outline-none flex-1 leading-none"
              />
            </label>
          </div>

          <div className="mb-4">
            <label>
              Rating:{" "}
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
                className="md:w-1/2 bg-inherit border border-gray-400 rounded p-1 cursor-pointer"
              >
                <option value="" disabled>Select rating</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                     ({n}) {"★".repeat(n) + "☆".repeat(5 - n)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <textarea
              value={comment}
              placeholder="Leave a review"
              onChange={(e) => setComment(e.target.value)}
              required
              className="border border-gray-400 rounded p-2 w-full bg-inherit"
            />
          </div>
        </div>
      </div>

      <button type="submit" className="btn-blk mt-4">Submit</button>
    </form>
  );
}

export default ReviewForm;
