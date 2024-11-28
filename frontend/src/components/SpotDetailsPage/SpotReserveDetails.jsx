import "./SpotReserveDetails.css";
import { useSelector } from "react-redux";

function SpotReserveDetails() {
  const spot = useSelector((state) => state.spots.singleSpot);

  const handleReserveClick = () => {
    alert("Feature Coming Soon...");
  };

  return (
    <div className="spot-reserve-details">
      <p>
        <span className="price">${spot.price} night</span>
        <span className="rating">
          ⭐ {spot.avgStarRating ? spot.avgStarRating.toFixed(1) : "New"}
        </span>
        <span className="reviews">
          {spot.numReviews > 0
            ? `· ${spot.numReviews} ${
                spot.numReviews === 1 ? "review" : "reviews"
              }`
            : ""}
        </span>
      </p>
      <button className="reserve-button" onClick={handleReserveClick}>
        Reserve
      </button>
    </div>
  );
}

export default SpotReserveDetails;
