import { csrfFetch } from "./csrf";

// Action Types
const SET_SPOTS = "spots/setSpots";
const SET_SINGLE_SPOT = "spot/SET_SINGLE_SPOT";
const GET_SPOT_IMAGE_PREVIEW = "spot/GET_SPOT_IMAGE_PREVIEW";
const GET_ADDITIONAL_IMAGES = "spot/GET_ADDITIONAL_IMAGES";
const GET_REVIEWS = "spot/GET_REVIEWS";

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
    dispatch(setSingleSpot(spot));
  }
};

export const fetchSpotPreviewImage = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/image`);
  if (response.ok) {
    const image = await response.json();
    dispatch(getSpotImagePreview(image));
    return image;
  }
};

export const fetchSpotImages = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/`);
  if (response.ok) {
    const spot = response.json();

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

// Reducer
const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SPOTS: {
      return { ...state, allSpots: action.spots };
    }
    case SET_SINGLE_SPOT: {
      return { ...state, singleSpot: action.spot };
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
    default:
      return state;
  }
};

export default spotsReducer;
