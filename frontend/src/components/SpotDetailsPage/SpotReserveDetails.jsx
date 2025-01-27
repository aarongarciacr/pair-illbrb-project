import "./SpotReserveDetails.css";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReserveModal from "./ReserveModal";

function SpotReserveDetails() {
  const spot = useSelector((state) => state.spots.singleSpot);

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
        <OpenModalButton
          modalComponent={<ReserveModal spotId={spot?.id} />}
          buttonText={"Reserve"}
          className={"reserve-button"}
        />
      </div>
    </div>
  );
}

export default SpotReserveDetails;
