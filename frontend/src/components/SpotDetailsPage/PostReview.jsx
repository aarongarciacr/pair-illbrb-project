import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./PostReview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  fetchCreateReview,
  fetchReviews,
  fetchSingleSpot,
} from "../../store/spots";
import { useModal } from "../../context/Modal";

const PostReview = ({ spotId }) => {
  const [stars, setStars] = useState(0); // Rename rating to stars
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisable, setIsDisable] = useState(true);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleStarClick = (star) => {
    setStars(star); // Update stars
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newReview = {
      review,
      stars, // Ensure the key matches the backend expectation
    };

    try {
      await dispatch(fetchCreateReview(spotId, newReview));
      await dispatch(fetchSingleSpot(spotId));
      await dispatch(fetchReviews(spotId));
      closeModal();
    } catch (res) {
      const data = await res.json();
      if (data?.errors) {
        setErrors(data.errors);
      }
    }
  };

  useEffect(() => {
    setIsDisable(!(review.length >= 10));
  }, [review]);

  return (
    <div className="postReviewBox">
      <form className="reviewForm" onSubmit={handleSubmit}>
        <label className="reviewTextBox" htmlFor="reviewText">
          <p className="comments">How was your stay?</p>
          <textarea
            name="review"
            placeholder="Tell everyone about your experience!"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </label>
        <label className="rating" htmlFor="rating">
          <div className="rating-container">
            <p className="starsText"> Stars</p>
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
        </label>
        <button
          type="submit"
          className={isDisable ? "post-disabled-button" : "post-enabled-button"}
          disabled={isDisable}
        >
          Post Review
        </button>
      </form>
    </div>
  );
};

export default PostReview;
