import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpots } from "../../../store/spots";
import { selectSpotsArray } from "../../../store/spots";
import "./SpotsGrid.css";
import SpotCard from "../../ManageSpotsPage/SpotCardOwned";

function SpotsGrid() {
  const dispatch = useDispatch();
  const spots = useSelector(selectSpotsArray);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  if (!spots || spots?.length === 0) {
    return <p>No spots available</p>;
  }

  return (
    <main>
      <div className="spots-grid">
        {spots.map((spot) => (
          <SpotCard key={spot?.id} {...spot} />
        ))}
      </div>
    </main>
  );
}

export default SpotsGrid;
