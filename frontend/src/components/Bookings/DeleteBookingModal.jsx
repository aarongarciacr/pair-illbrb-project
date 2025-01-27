import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./DeleteBookingModal.css";
import { fetchBookings, fetchDeleteBooking } from "../../store/bookings";

const DeleteBookModal = ({ bookingId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(fetchDeleteBooking(bookingId));
    await dispatch(fetchBookings());
    closeModal();
  };

  return (
    <div className="delete-modal-container">
      <h1 className="h1-delete-spot-modal">Confirm Delete</h1>
      <h2 className="h2-delete-spot-modal">
        Are you sure you want to remove this booking from the listings?
      </h2>
      <div className="buttons-container">
        <div className="delete-buttons">
          <button
            onClick={handleDelete}
            className="confirm-button"
            type="button"
          >
            Yes (Delete Booking)
          </button>
          <button onClick={closeModal} className="cancel-button" type="button">
            No (Keep Booking)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookModal;
