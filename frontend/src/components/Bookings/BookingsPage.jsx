import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpots } from "../../store/spots";
import { fetchBookings } from "../../store/bookings";
import SpotCard from "../SpotsHomePage/SpotsCard/SpotCard";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteBookModal from "./DeleteBookingModal";
import EditBookingModal from "./EditBookingModal";
import "./BookingsPage.css";

function BookingsPage() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings?.bookings);
  const activeBookings = bookings?.filter(
    (booking) => booking.endDate > new Date().toLocaleDateString("en-CA")
  );
  const pastBookings = bookings?.filter(
    (booking) => booking.endDate < new Date().toLocaleDateString("en-CA")
  );

  useEffect(() => {
    dispatch(fetchBookings());
    dispatch(fetchSpots());
  }, [dispatch]);

  if (!bookings || bookings?.length === 0) {
    return <p>No bookings available</p>;
  }
  console.log("BOOKINGS", bookings);

  return (
    <main>
      <div className="header-container">
        <h1 className="manage-spots-h1">Manage Your Bookings</h1>
      </div>
      <div className="active-bookings">
        <h2>Active Bookings</h2>
        <div className="spots-grid">
          {activeBookings?.map((booking) => {
            const spot = booking.Spot;
            return (
              <div key={booking.id} className="spot-card-container">
                <SpotCard {...spot} />
                <div className="booking-details">
                  <h4>
                    Entering date:{" "}
                    {new Date(booking.startDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h4>
                  <h4>
                    Leaving date:{" "}
                    {new Date(booking.endDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h4>
                  <div className="booking-buttons">
                    <OpenModalButton
                      modalComponent={
                        <EditBookingModal
                          bookingId={booking.id}
                          startDate={booking.startDate}
                          endDate={booking.endDate}
                        />
                      }
                      buttonText={"Edit Booking"}
                      className={"update-btn"}
                    />
                    <OpenModalButton
                      modalComponent={
                        <DeleteBookModal bookingId={booking.id} />
                      }
                      buttonText={"Delete Booking"}
                      className={"delete-btn"}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="past-bookings">
        <h2>Past Bookings</h2>
        <div className="spots-grid">
          {pastBookings?.map((booking) => {
            const spot = booking.Spot;
            return (
              <div key={booking.id} className="spot-card-container">
                <SpotCard {...spot} />
                <div className="booking-details">
                  <h4>
                    Entering date:{" "}
                    {new Date(booking.startDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h4>
                  <h4>
                    Leaving date:{" "}
                    {new Date(booking.endDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default BookingsPage;
