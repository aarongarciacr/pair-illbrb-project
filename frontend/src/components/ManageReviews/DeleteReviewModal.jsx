import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchDeleteReview, fetchUserReviews } from "../../store/reviews";
import { fetchReviews, fetchSingleSpot } from "../../store/spots";

function DeleteReviewModal({ reviewId, spotId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(fetchDeleteReview(reviewId));
      await dispatch(fetchSingleSpot(spotId));
      await dispatch(fetchReviews(spotId));
      await dispatch(fetchUserReviews());
      closeModal();
    } catch (err) {
      console.error("Failed:", err);
    }
  };

  return (
    <div className="delete-modal-container">
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to delete this review?</h2>
      <div className="buttons-container">
        <div className="delete-buttons">
          <button
            onClick={handleDelete}
            className="confirm-button"
            type="button"
          >
            Yes (Delete Review)
          </button>
          <button onClick={closeModal} className="cancel-button" type="button">
            No (Keep Review)
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteReviewModal;
