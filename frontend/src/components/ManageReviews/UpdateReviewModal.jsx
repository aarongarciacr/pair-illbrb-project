import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../context/Modal";

const UpdateReviewModal = ({ reviewId, oldReview }) => {
  console.log("oldREview:", oldReview);
  //   const currentReview = useSelector(
  //     (state) => state.reviews?.userReviews?.[reviewId] || {}
  //   );
  const [review, setReview] = useState(oldReview?.review || "");
  const [stars, setStars] = useState(oldReview?.stars || 0);
  const [isDisable, setIsDisable] = useState(true);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  console.log("review:", review);

  const handleStarClick = (star) => {
    setStars(star);
  };

  useEffect(() => {
    setIsDisable(!(review?.length > 10 && stars > 0));
  }, [review, stars]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the logic to update the review here
    console.log("Updating review:", { review, stars });
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="update-review-container">
        <h1>How was your stay at {oldReview.Spot?.name || "this spot"}?</h1>
        <textarea
          name="review"
          placeholder="Tell everyone about your experience!"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <div className="rating-container">
          <p className="starsText">Stars</p>
          <div className="stars-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                icon={faStar}
                className={`star-icon ${star <= stars ? "filled" : ""}`}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={isDisable ? "post-disabled-button" : "post-enabled-button"}
        disabled={isDisable}
      >
        Update Review
      </button>
    </form>
  );
};

export default UpdateReviewModal;
