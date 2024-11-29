import PostReview from "./PostReview";
import "./SpotReviews.css";

import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

function SpotReviews({ isLoggedIn }) {
  const spot = useSelector((state) => state.spots.singleSpot);
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = spot?.reviews || [];

  const isOwner = sessionUser?.id === spot?.Owner?.id;
  const reviewedByUser = spot?.reviews?.some(
    (review) => review.userId === sessionUser?.id
  );

  return (
    <div className="spot-reviews">
      <h2>
        ⭐{" "}
        {spot.avgStarRating ? (
          <>
            {spot.avgStarRating.toFixed(1)} · {spot.numReviews}{" "}
            {spot.numReviews === 1 ? "review" : "reviews"}
          </>
        ) : (
          "New"
        )}
      </h2>

      {isLoggedIn && !isOwner && !reviewedByUser && (
        //   <button
        //     className="post-review-button"
        //     onClick={() => setReviewBox(!reviewBox)}
        //   >
        //     Post Your Review
        //   </button>
        <OpenModalButton
          modalComponent={<PostReview spotId={spot.id} />}
          buttonText={"Post Your Review"}
          className="post-review-button"
        />
      )}
      {/* // {reviewBox && <PostReview />} */}

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <h3 className="userFirstNameReview">{review.User?.firstName}</h3>{" "}
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
