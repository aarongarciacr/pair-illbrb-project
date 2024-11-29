import { csrfFetch } from "./csrf";

//action types
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
const GET_USER_REVIEWS = "reviews/GET_USER_REVIEWS";

//action creators

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

const getUserReviews = (reviews) => ({
  type: GET_USER_REVIEWS,
  reviews,
});

// normilize data
const normalizedReviews = (reviewsArray) => {
  return reviewsArray.reduce((normalized, review) => {
    normalized[review.id] = review;
    return normalized;
  }, {});
};

//thunk
export const fetchDeleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteReview(reviewId));
  }
};

export const fetchUserReviews = () => async (dispatch) => {
  const response = await csrfFetch("/api/reviews/current");

  if (response.ok) {
    const data = await response.json();
    const reviews = normalizedReviews(data.Reviews);
    dispatch(getUserReviews(reviews));
  }
};

//Reducer
const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW: {
      const newState = {
        ...state,
        singleSpot: {
          ...state.singleSpot,
          reviews: state.singleSpot?.reviews
            ? state.singleSpot.reviews.filter(
                (review) => review.id !== action.reviewId
              )
            : [],
        },
      };

      return newState;
    }
    case GET_USER_REVIEWS: {
      return {
        ...state,
        userReviews: action.reviews,
      };
    }
    default:
      return state;
  }
};

export default reviewReducer;
