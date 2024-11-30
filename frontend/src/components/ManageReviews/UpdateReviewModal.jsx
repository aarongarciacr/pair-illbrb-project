import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../context/Modal";
import { fetchUpdateReview } from "../../store/reviews";
import { fetchReviews, fetchSingleSpot } from "../../store/spots";

const UpdateReviewModal = ({ oldReview }) => {
  const [review, setReview] = useState(oldReview?.review || "");
  const [stars, setStars] = useState(oldReview?.stars || 0);
  const [isDisable, setIsDisable] = useState(true);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleStarClick = (star) => {
    setStars(star);
  };

  useEffect(() => {
    setIsDisable(!(review?.length > 10 && stars > 0));
  }, [review, stars]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = { review, stars };

    try {
      await dispatch(fetchUpdateReview(oldReview?.id, reviewData));
      await dispatch(fetchSingleSpot(oldReview?.spotId));
      await dispatch(fetchReviews(oldReview?.spotId));
      //   await dispatch(fetchSpots());
      closeModal();
    } catch (error) {
      const data = await error.json();
      if (data?.errors) {
        setErrors(data.errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="update-review-container">
        <h1>How was your stay at {oldReview?.Spot?.name || "this spot"}?</h1>
        {errors.errors && <div className="error">{errors.error}</div>}
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
