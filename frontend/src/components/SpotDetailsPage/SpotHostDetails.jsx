import "./SpotHostDetails.css";

import { useSelector } from "react-redux";

function SpotHostDetails() {
  const spot = useSelector((state) => state.spots.singleSpot);
  return (
    <div className="spot-host-details">
      <h2>
        Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
      </h2>
      <p>{spot.description}</p>
    </div>
  );
}

export default SpotHostDetails;
