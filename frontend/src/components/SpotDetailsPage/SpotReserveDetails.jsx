import "./SpotReserveDetails.css";
import { useSelector } from "react-redux";

function SpotReserveDetails() {
  const spot = useSelector((state) => state.spots.singleSpot);

  const handleReserveClick = () => {
    alert("Feature Coming Soon...");
  };

  return (
    <div className="spot-reserve-details">
      <div className="details-spot">
        <span className="price">${spot.price} night</span>
        <span className="rating">
          ⭐ {spot.avgStarRating ? spot.avgStarRating.toFixed(1) : "New"}
        </span>
        <span className="reviews">
          {spot.numReviews > 0
            ? `${spot.numReviews} ${
                spot.numReviews === 1 ? "review" : "reviews"
              }`
            : ""}
        </span>
      </div>
      <div className="button-container-reserve-details">
        <button className="reserve-button" onClick={handleReserveClick}>
          Reserve
        </button>
      </div>
    </div>
  );
}

export default SpotReserveDetails;
