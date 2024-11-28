import { useState } from "react";
import PostReview from "./PostReview";
import "./SpotReviews.css";

import { useSelector } from "react-redux";

function SpotReviews({ reviews, isLoggedIn }) {
  const spot = useSelector((state) => state.spots.singleSpot);
  const sessionUser = useSelector((state) => state.session.user);
  const [reviewBox, setReviewBox] = useState(false);

  const isOwner = sessionUser?.id === spot?.Owner?.id;

  return (
    <div className="spot-reviews">
      <h2>
        ⭐{" "}
        {spot.avgStarRating ? spot.avgStarRating.toFixed(1) : "No Rating Yet"} ·{" "}
        {spot.numReviews} reviews
      </h2>

      {isLoggedIn && !isOwner && (
        <button
          className="post-review-button"
          onClick={() => setReviewBox(!reviewBox)}
        >
          Post Your Review
        </button>
      )}
      {reviewBox && <PostReview />}

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <h3 className="userFirstNameReview">{review.User.firstName}</h3>{" "}
            <p className="dateReview">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="ratingReview">Rating: ⭐ {review.stars}</p>
            <p className="reviewText">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpotReviews;
