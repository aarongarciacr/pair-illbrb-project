import { useDispatch, useSelector } from "react-redux";
import SpotCardOwned from "./SpotCardOwned";
import { useEffect } from "react";
import { fetchSpots } from "../../store/spots";
import "../../components/SpotsHomePage/SpotsGrid/SpotsGrid.css";

function ManageSpotsPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  const spotsOwned = useSelector((state) =>
    Object.values(state.spots?.allSpots || {}).filter(
      (spot) => spot?.ownerId === state.session.user?.id
    )
  );

  if (!spotsOwned || spotsOwned.length === 0) {
    return <p>No spots available</p>;
  }

  return (
    <div className="spots-grid">
      {spotsOwned.map((spot) => (
        <SpotCardOwned key={spot.id} {...spot} />
      ))}
    </div>
  );
}

export default ManageSpotsPage;
