import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteSpot, fetchSpots } from "../../store/spots";

const DeleteSpotModal = ({ spotId }) => {
  console.log("spot:", spotId);
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(fetchDeleteSpot(spotId));
    await dispatch(fetchSpots());
    closeModal();
  };

  return (
    <div className="delete-modal-container">
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this spot from the listings?</h2>
      <div className="buttons-container">
        <div className="delete-buttons">
          <button
            onClick={handleDelete}
            className="confirm-button"
            type="button"
          >
            Yes (Delete Spot)
          </button>
          <button onClick={closeModal} className="cancel-button" type="button">
            No (Keep Spot)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSpotModal;
