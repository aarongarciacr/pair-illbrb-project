import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./EditBookingModal.css";
import { fetchBookings, fetchUpdateBooking } from "../../store/bookings";
import { useState } from "react";

const EditBookingModal = ({ bookingId, startDate, endDate }) => {
  const { closeModal } = useModal();
  const [newStartDate, setNewStartDate] = useState(
    new Date(startDate).toLocaleDateString("en-CA")
  );
  const [newEndDate, setNewEndDate] = useState(
    new Date(endDate).toLocaleDateString("en-CA")
  );
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleEdit = async () => {
    if (newStartDate > newEndDate) {
      setErrors({ message: "End date must be after start date" });
      return;
    }

    setErrors({});
    try {
      await dispatch(fetchUpdateBooking(bookingId, newStartDate, newEndDate));
      await dispatch(fetchBookings());
      closeModal();
    } catch (e) {
      if (e.json) {
        const data = await e.json();
        setErrors(data.errors);
      } else {
        console.error("Unexpected error:", e);
        setErrors(["An unexpected error occurred. Please try again later."]);
      }
    }
  };
  console.log(errors);
  return (
    <div className="delete-modal-container">
      <h1 className="h1-delete-spot-modal">Edit Your Booking</h1>
      <h2 className="h2-delete-spot-modal">
        Please, choose the new dates for your booking.{" "}
      </h2>
      <div className="dates-container">
        <label htmlFor="startDate" className="label">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          className="input"
          defaultValue={newStartDate}
          onChange={(e) => setNewStartDate(e.target.value)}
        />
        {errors?.startDate && <div className="error">{errors?.startDate}</div>}
        <label htmlFor="endDate" className="label">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          className="input"
          defaultValue={newEndDate}
          onChange={(e) => setNewEndDate(e.target.value)}
        />
      </div>
      {errors?.endDate && <div className="error">{errors?.endDate}</div>}
      {errors?.message && <div className="error">{errors?.message}</div>}
      <div className="buttons-container">
        <div className="delete-buttons">
          <button onClick={handleEdit} className="confirm-button" type="button">
            Submit
          </button>
          <button onClick={closeModal} className="cancel-button" type="button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;
