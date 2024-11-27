// import "./SpotReviews.css";

import { useSelector } from "react-redux";

function SpotReviews({ reviews, isLoggedIn }) {
  const spot = useSelector((state) => state.spots.singleSpot);

  //   useEffect(() => {
  //     dispatch(getReviews(spot.id));
  //   }, [dispatch]);
  //   console.log(spot);
  return (
    <div className="spot-reviews">
      <h2>
        ⭐{" "}
        {spot.avgStarRating ? spot.avgStarRating.toFixed(1) : "No Rating Yet"} ·{" "}
        {spot.numReviews} reviews
      </h2>

      {isLoggedIn && (
        <button className="post-review-button">Post Your Review</button>
      )}

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <h3>{review.User.firstName}</h3>{" "}
            <p>
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                month: "long",
              })}
            </p>
            <p>Rating: ⭐ {review.stars}</p>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpotReviews;
