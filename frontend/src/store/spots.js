import { csrfFetch } from "./csrf";

// Action Types
const SET_SPOTS = "spots/setSpots";
const SET_SINGLE_SPOT = "spot/SET_SINGLE_SPOT";
const GET_SPOT_IMAGE_PREVIEW = "spot/GET_SPOT_IMAGE_PREVIEW";
const GET_ADDITIONAL_IMAGES = "spot/GET_ADDITIONAL_IMAGES";
const GET_REVIEWS = "spot/GET_REVIEWS";
const CREATE_SPOT = "spot/SET_CREATE_SPOT";
const POST_IMAGES = "spotPOST_IMAGES";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const UPDATE_SPOT = "spot/UPDATE_SPOT";
const DELETE_SPOT = "spot/DELETE_SPOT";

// Action Creators
export const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

export const setSingleSpot = (spot) => ({
  type: SET_SINGLE_SPOT,
  spot,
});

export const getSpotImagePreview = (spotId, previewImage) => ({
  type: GET_SPOT_IMAGE_PREVIEW,
  spotId,
  previewImage,
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

export const postImages = (spotId, images) => ({
  type: POST_IMAGES,
  spotId,
  images,
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

//normalized data
const normalizedSpots = (spotsArray) => {
  return spotsArray.reduce((normalized, spot) => {
    normalized[spot.id] = spot; // Use id as the key and spot as the value
    return normalized; // Return the updated normalized object
  }, {}); // Start with an empty object
};

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
    console.log("spot:", spot);
    dispatch(setSingleSpot(spot));
  }
};

export const fetchSpotPreviewImage = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/prevImage`);
  if (response.ok) {
    const image = await response.json();
    console.log("image,", image);
    dispatch(getSpotImagePreview(image));
    return image;
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
    return spot;
  }
};

export const fetchPostImages = (spotId, images) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(images),
  });
  if (response.ok) {
    const images = await response.json();
    dispatch(postImages(spotId, images));
    return images;
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
    case GET_SPOT_IMAGE_PREVIEW: {
      const { spotId, previewImage } = action;
      const updatedSpots = { ...state.allSpots };
      if (updatedSpots[spotId]) {
        updatedSpots[spotId] = { ...updatedSpots[spotId], previewImage };
      }
      return { ...state, allSpots: updatedSpots };
    }
    case GET_REVIEWS: {
      const { spotId, reviews } = action;
      if (state.singleSpot?.id === spotId) {
        return {
          ...state,
          singleSpot: {
            ...state.singleSpot,
            reviews,
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
          ...state.allSpots,
          [newSpot.id]: newSpot,
        },
      };
    }
    case POST_IMAGES: {
      const { spotId, images } = action;
      const updatedSpot = { ...state.singleSpot };

      if (updatedSpot.id === spotId) {
        updatedSpot.SpotImages = images;
      }

      return { ...state, singleSpot: updatedSpot };
    }
    case CREATE_REVIEW: {
      const { spotId, newReview } = action;
      const updatedSpot = { ...state.singleSpot };

      if (updatedSpot.id === spotId) {
        updatedSpot.reviews = [...updatedSpot.reviews, newReview];
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
    default:
      return state;
  }
};

export default spotsReducer;
