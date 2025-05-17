import React from "react";

function ReviewList({ reviews, averageRating }) {
  const numRating = Number(averageRating);

  return (
    <div className="flex flex-col pt-4">
      <h4 className="pb-8">
        Average Rating:{" "}
        {averageRating
        ? `${"★".repeat(Math.round(numRating))}${"☆".repeat(5 - Math.round(numRating))} (${numRating.toFixed(1)})`
        : 'No Ratings Yet'}
      </h4>

      {reviews.map((review, index) => (
        <div key={index} className="bg-white p-6 rounded-md shadow-md mx-auto w-2/3 lg:w-1/3 text-center mt-6">
          <p>
            <span className="text-ny-pink font-semibold">{review.reviewerName}</span> rated:{" "}
            {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)} ({review.rating}/5)
          </p>
          <p className="mt-2 text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
