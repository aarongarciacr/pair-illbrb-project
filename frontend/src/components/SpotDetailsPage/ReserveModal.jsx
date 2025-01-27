import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { fetchBookings, fetchUpdateBooking } from "../../store/bookings";
import { fetchReserveSpot } from "../../store/spots";
import { useState } from "react";

const ReserveModal = ({ spotId }) => {
  const { closeModal } = useModal();
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [endDate, setEndDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (startDate > endDate) {
      setErrors({ message: "End date must be after start date" });
      return;
    }

    setErrors({});
    try {
      await dispatch(fetchReserveSpot(spotId, { startDate, endDate }));
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
  return (
    <div className="delete-modal-container">
      <h1 className="h1-delete-spot-modal">Reserve Now</h1>
      <h2 className="h2-delete-spot-modal">
        Please, choose the dates for your booking.{" "}
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
          defaultValue={startDate}
          onChange={(e) => setStartDate(e.target.value)}
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
          defaultValue={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      {errors?.endDate && <div className="error">{errors?.endDate}</div>}
      {errors?.message && <div className="error">{errors?.message}</div>}
      <div className="buttons-container">
        <div className="delete-buttons">
          <button
            onClick={handleSubmit}
            className="confirm-button"
            type="button"
          >
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

export default ReserveModal;
