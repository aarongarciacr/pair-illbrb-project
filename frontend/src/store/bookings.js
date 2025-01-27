import { csrfFetch } from "./csrf";

const GET_BOOKINGS = "bookings/GET_BOOKINGS";
const UPDATE_BOOKING = "bookings/UPDATE_BOOKING";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";

const getBookings = (bookings) => ({
  type: GET_BOOKINGS,
  bookings,
});

const updateBooking = (booking) => ({
  type: UPDATE_BOOKING,
  booking,
});

const deleteBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  bookingId,
});

export const fetchBookings = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/current");

  if (response.ok) {
    const bookings = await response.json();
    dispatch(getBookings(bookings));
  }
};

export const fetchUpdateBooking =
  (bookingId, startDate, endDate) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
      method: "PUT",
      body: JSON.stringify({ startDate, endDate }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (response.ok) {
        const updatedBooking = await response.json();
        dispatch(updateBooking(updatedBooking));
        return updatedBooking;
      }
    } catch (e) {
      const data = await e.json();
      console.error("Error updating booking:", data);
      return data;
    }
  };

export const fetchDeleteBooking = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteBooking(bookingId));
  }
};

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS:
      return { ...state, bookings: action.bookings };
    case DELETE_BOOKING: {
      const newBookings = state.bookings.filter(
        (booking) => booking.id !== action.bookingId
      );
      return { ...state, bookings: newBookings };
    }
    case UPDATE_BOOKING: {
      const newBookings = state.bookings.map((booking) => {
        if (booking.id === action.booking.id) {
          return action.booking;
        }
        return booking;
      });
      return { ...state, bookings: newBookings };
    }
    default:
      return state;
  }
};

export default bookingsReducer;
