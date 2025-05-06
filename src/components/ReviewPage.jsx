import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

function ReviewPage() {
    const { id: revieweeId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [canReview, setCanReview] = useState(false);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const { data } = await axios.get("http://localhost:8000/api/v1/auth/current-user", {
                    withCredentials: true,
                });
                setCurrentUser({ id: data.userId, name: data.name });
            } catch (error) {
                console.error('error fetching current user', error)
            }
        }
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const fetchReviewPermission = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/v1/reviews/can-review/${revieweeId}`, {
                    withCredentials: true,
                });
                setCanReview(data.canReview)
            } catch (error) {
                console.error('error fetching permission', error)

            }
        }
        if (currentUser) {
            fetchReviewPermission();
        }
    }, [currentUser, revieweeId])

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/reviews/${revieweeId}`)
                const data = await response.data;
                setReviews(data.reviews);
                setAverageRating(data.averageRating);
            } catch (error) {
                console.error('error fetching review data', error)
            }
        }
        fetchReviews();

    }, [revieweeId]);

    return (
        <>
            <h3>Leave a Review</h3>
            {currentUser && currentUser.id !== revieweeId ? (
                canReview ? (
                    <ReviewForm
                        revieweeId={revieweeId}
                        setReviews={setReviews}
                        currentUser={currentUser}
                    />
                ) : (
                    <p>You can only review someone you’ve worked with.</p>
                )
            ) : (
                <p>Can't Rate Yourself</p>
            )}
            <ReviewList reviews={reviews} averageRating={averageRating} />

        </>
    )


}


export default ReviewPage