import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchBookingsBySpot,
  fetchSingleSpot,
  fetchSpots,
} from "../../store/spots";
import { selectSpotsOwned } from "../../store/spots";
import SpotCard from "../SpotsHomePage/SpotsCard/SpotCard";
import Calendar from "react-calendar";
import "./BookingsPage.css";

function BookingsOwnerPage() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.spots?.singleSpot?.Bookings);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  const spotsOwned = useSelector(selectSpotsOwned);
  console.log("spotowned", spotsOwned);
  useEffect(() => {
    if (spotsOwned.length > 0) {
      for (let spot of spotsOwned) {
        dispatch(fetchSingleSpot(spot.id));
        dispatch(fetchBookingsBySpot(spot.id));
      }
    }
  }, [dispatch, spotsOwned.length]);

  if (!spotsOwned || spotsOwned.length === 0) {
    return <p>No spots available</p>;
  }

  return (
    <main>
      <div className="header-container">
        <h1 className="manage-spots-h1">Manage Your Bookings</h1>
      </div>
      <div className="spots-grid">
        {spotsOwned.map((spot) => {
          return (
            <div key={spot.id} className="spot-card-container">
              <SpotCard {...spot} />
              {bookings?.length > 0 ? (
                <div className="bookings-calendar">
                  <Calendar
                    tileDisabled={({ date }) =>
                      bookings.some(
                        (booking) =>
                          new Date(date) >= new Date(booking.startDate) &&
                          new Date(date) <= new Date(booking.endDate)
                      )
                    }
                    tileClassName={({ date }) =>
                      bookings.some(
                        (booking) =>
                          new Date(date) >= new Date(booking.startDate) &&
                          new Date(date) <= new Date(booking.endDate)
                      )
                        ? "booked-date"
                        : ""
                    }
                  />
                </div>
              ) : (
                <p>No bookings available</p>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default BookingsOwnerPage;
