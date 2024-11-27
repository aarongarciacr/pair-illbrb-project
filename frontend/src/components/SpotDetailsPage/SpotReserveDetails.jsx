// import "./SpotReserveDetails.css";

import { useSelector } from "react-redux";

function SpotReserveDetails() {
  const spot = useSelector((state) => state.spots.singleSpot);
  const handleReserveClick = () => {
    alert("Feature Coming Soon...");
  };

  return (
    <div className="spot-reserve-details">
      <p>
        <span className="price">${spot.price.toFixed(2)} night</span>
        <span className="rating">
          ⭐ {spot.avgStarRating.toFixed(1) || "No Rating Yet"}
        </span>
        <span className="reviews">· {spot.numReviews} reviews</span>
      </p>
      <button className="reserve-button" onClick={handleReserveClick}>
        Reserve
      </button>
    </div>
  );
}

export default SpotReserveDetails;
