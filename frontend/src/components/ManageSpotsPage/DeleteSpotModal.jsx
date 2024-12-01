import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { fetchDeleteSpot, fetchSpots } from "../../store/spots";
import "./DeleteSpotModal.css";

const DeleteSpotModal = ({ spotId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(fetchDeleteSpot(spotId));
    await dispatch(fetchSpots());
    closeModal();
  };

  return (
    <div className="delete-modal-container">
      <h1 className="h1-delete-spot-modal">Confirm Delete</h1>
      <h2 className="h2-delete-spot-modal">
        Are you sure you want to remove this spot from the listings?
      </h2>
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
