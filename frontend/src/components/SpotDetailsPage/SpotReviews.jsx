import PostReview from "./PostReview";
import "./SpotReviews.css";

import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReviewModal from "../ManageReviews/DeleteReviewModal";
import UpdateReviewModal from "../ManageReviews/UpdateReviewModal";
import { useEffect } from "react";
import { fetchReviews } from "../../store/spots";

function SpotReviews({ isLoggedIn }) {
  const spot = useSelector((state) => state.spots.singleSpot);
  console.log("spot:", spot);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const reviews = spot?.reviews || [];

  const isOwner = sessionUser?.id === spot?.Owner?.id;
  const reviewedByUser = spot?.reviews?.some(
    (review) => review.userId === sessionUser?.id
  );

  // useEffect(() => {
  //   dispatch(fetchReviews(spot.id));
  // }, [dispatch]);

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
        <OpenModalButton
          modalComponent={<PostReview spotId={spot.id} />}
          buttonText={"Post Your Review"}
          className="post-review-button"
        />
      )}

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
            {!!(sessionUser?.id === review.User?.id) && (
              <div className="update-delete-buttons-container">
                <OpenModalButton
                  modalComponent={
                    <UpdateReviewModal
                      oldReview={review}
                      reviewId={review.id}
                      spotId={spot.id}
                    />
                  }
                  buttonText={"Update"}
                  className="update-review-button-details-page"
                />
                <OpenModalButton
                  modalComponent={
                    <DeleteReviewModal reviewId={review.id} spotId={spot.id} />
                  }
                  buttonText={"Delete"}
                  className="delete-review-button-details-page"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpotReviews;
