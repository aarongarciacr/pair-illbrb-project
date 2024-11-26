import { csrfFetch } from "./csrf";

// Action Types
const SET_SPOTS = "spots/setSpots";

// Action Creators
export const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
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
    // console.log(data);
    const spots = normalizedSpots(data.Spots);
    dispatch(setSpots(spots));
  }
};

// Reducer
const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return action.spots;
    default:
      return state;
  }
};

export default spotsReducer;
