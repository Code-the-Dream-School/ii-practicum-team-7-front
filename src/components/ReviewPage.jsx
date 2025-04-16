import React, {useState} from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

function ReviewPage() {
    const [reviews, setReviews] = useState([]);

    //fake user object for now
    const currentUser = {
        id: 1,
        name: 'fake name'
    };

    return (
        <>
            <h1>Leave a Review</h1>
            {/* Place holder id*/}
            <ReviewForm 
                revieweeId={123} 
                setReviews={setReviews}
                currentUser={currentUser}
            />
            <ReviewList reviews={reviews}/>
        </>
    )
}

export default ReviewPage