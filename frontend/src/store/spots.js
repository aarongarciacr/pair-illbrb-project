import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

// Action Types
const SET_SPOTS = "spots/setSpots";
const SET_SINGLE_SPOT = "spot/SET_SINGLE_SPOT";
const GET_ADDITIONAL_IMAGES = "spot/GET_ADDITIONAL_IMAGES";
const GET_REVIEWS = "spot/GET_REVIEWS";
const CREATE_SPOT = "spot/SET_CREATE_SPOT";
const POST_IMAGES = "spotPOST_IMAGES";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const UPDATE_SPOT = "spot/UPDATE_SPOT";
const DELETE_SPOT = "spot/DELETE_SPOT";
const RESERVE_SPOT = "spot/RESERVE_SPOT";
const GET_BOOKINGS_BY_SPOT = "spot/GET_BOOKINGS_BY_SPOT";

// Action Creators
export const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

export const setSingleSpot = (spot) => ({
  type: SET_SINGLE_SPOT,
  spot,
});

export const getAdditionalImages = (spotId) => ({
  type: GET_ADDITIONAL_IMAGES,
  spotId,
});

export const getReviews = (spotId, reviews) => ({
  type: GET_REVIEWS,
  spotId,
  reviews,
});

export const createSpot = (newSpot) => ({
  type: CREATE_SPOT,
  newSpot,
});

export const postImage = (spotId, image) => ({
  type: POST_IMAGES,
  spotId,
  image,
});

const createReview = (spotId, newReview) => ({
  type: CREATE_REVIEW,
  spotId,
  newReview,
});

const updateSpot = (spotId, updatedSpot) => ({
  type: UPDATE_SPOT,
  spotId,
  updatedSpot,
});

const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId,
});

const removeImage = (imageId) => ({
  type: "REMOVE_IMAGE",
  imageId,
});

const reserveSpot = (spotId, newBooking) => ({
  type: RESERVE_SPOT,
  spotId,
  newBooking,
});

const getBookingsBySpot = (spotId, bookings) => ({
  type: GET_BOOKINGS_BY_SPOT,
  spotId,
  bookings,
});

//normalized data
const normalizedSpots = (spotsArray) => {
  return spotsArray.reduce((normalized, spot) => {
    normalized[spot.id] = spot;
    return normalized;
  }, {});
};

//memoized
export const selectAllSpots = (state) => state.spots?.allSpots || {};

export const selectSpotsArray = createSelector([selectAllSpots], (allSpots) =>
  allSpots
    ? Object.values(allSpots).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : []
);

export const selectSpotsOwned = createSelector(
  [selectAllSpots, (state) => state.session.user?.id],
  (allSpots, userId) =>
    Object.values(allSpots).filter((spot) => spot.ownerId === userId)
);

// Thunk
export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const data = await response.json();
    const spots = normalizedSpots(data.Spots);
    dispatch(setSpots(spots));
  }
};

export const fetchSingleSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(setSingleSpot(spot));
  }
};

export const fetchSpotImages = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/`);
  if (response.ok) {
    const spot = await response.json();

    const images = spot.SpotImages;
    dispatch(getAdditionalImages(images));
    return images;
  }
};

export const fetchReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getReviews(spotId, data.Reviews));
    return data.Reviews;
  }
};

export const fetchCreateSpot = (newSpot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSpot),
  });
  if (response.ok) {
    const spot = await response.json();
    dispatch(createSpot(spot));
    dispatch(fetchSpots());
    return spot;
  }
};

export const fetchPostImages = (spotId, url) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  if (response.ok) {
    const image = await response.json();
    dispatch(postImage(spotId, image));
    return image;
  }
};

export const deleteSpotImage = (imageId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spot-images/${imageId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeImage(imageId));
  }
};

export const fetchCreateReview = (spotId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const newReview = await response.json();
    dispatch(createReview(spotId, newReview));
    // dispatch(fetchReviews(spotId));
    return newReview;
  }
};

export const fetchUpdateSpot = (spotId, updatedSpot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify(updatedSpot),
  });
  if (response.ok) {
    const spot = await response.json();
    dispatch(updateSpot(spotId, spot));
    return spot;
  }
};

export const fetchDeleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteSpot(spotId));
  }
};

export const fetchReserveSpot = (spotId, newBooking) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBooking),
  });
  if (response.ok) {
    const booking = await response.json();
    dispatch(reserveSpot(spotId, booking));
    return booking;
  }
};

export const fetchBookingsBySpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getBookingsBySpot(spotId, data.Bookings));
    return data.Bookings;
  }
};

// Reducer
const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SPOTS: {
      return { ...state, allSpots: action.spots };
    }
    case SET_SINGLE_SPOT: {
      return {
        ...state,
        singleSpot: { ...action.spot, previewImage: action.spot.previewImage },
      };
    }

    case GET_REVIEWS: {
      const { spotId, reviews } = action;

      const sortedReviews = [...reviews].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      if (state.singleSpot?.id === spotId) {
        return {
          ...state,
          singleSpot: {
            ...state.singleSpot,
            reviews: sortedReviews,
          },
        };
      }
      return state;
    }
    case CREATE_SPOT: {
      const { newSpot } = action;
      return {
        ...state,
        allSpots: {
          [newSpot.id]: newSpot,
          ...state.allSpots,
        },
      };
    }
    case POST_IMAGES: {
      const { spotId, url } = action;
      const updatedSpot = { ...state.singleSpot };

      if (updatedSpot.id === spotId) {
        updatedSpot.SpotImages = [...(updatedSpot.SpotImages || []), url];
      }

      return { ...state, singleSpot: updatedSpot };
    }
    case CREATE_REVIEW: {
      const { spotId, newReview } = action;
      const updatedSpot = { ...state.singleSpot };

      if (updatedSpot.id === spotId) {
        updatedSpot.reviews = [newReview, ...updatedSpot.reviews];
      }

      return { ...state, singleSpot: updatedSpot };
    }
    case UPDATE_SPOT: {
      const { spotId, spot } = action;
      return {
        ...state,
        allSpots: {
          ...state.allSpots,
          [spotId]: spot,
        },
        singleSpot: state.singleSpot?.id === spotId ? spot : state.singleSpot,
      };
    }
    case DELETE_SPOT: {
      const newState = { ...state, allSpots: { ...state.all } };
      delete newState.allSpots[action.spotId];

      if (state.singleSpot?.id === action.spotId) {
        newState.singleSpot = null;
      }
      return newState;
    }
    case RESERVE_SPOT: {
      const { spotId, newBooking } = action;
      const updatedSpot = { ...state.singleSpot };

      if (updatedSpot.id === spotId) {
        updatedSpot.Bookings = [...(updatedSpot.Bookings || []), newBooking];
      }

      return { ...state, singleSpot: updatedSpot };
    }
    case GET_BOOKINGS_BY_SPOT: {
      const { spotId, bookings } = action;
      const updatedSpot = { ...state.singleSpot };

      if (updatedSpot.id === spotId) {
        updatedSpot.Bookings = bookings;
      }

      return { ...state, singleSpot: updatedSpot };
    }
    default:
      return state;
  }
};

export default spotsReducer;
