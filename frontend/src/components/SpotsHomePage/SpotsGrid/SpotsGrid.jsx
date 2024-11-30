import { useDispatch, useSelector } from "react-redux";
import SpotCard from "../SpotsCard/SpotCard";
import { useEffect } from "react";
import { fetchSpots } from "../../../store/spots";
import { selectSpotsArray } from "../../../store/spots";
import "./SpotsGrid.css";

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
    <div className="spots-grid">
      {spots.map((spot) => (
        <SpotCard key={spot?.id} {...spot} />
      ))}
    </div>
  );
}

export default SpotsGrid;
