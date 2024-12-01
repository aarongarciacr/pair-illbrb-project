import { useDispatch, useSelector } from "react-redux";
import SpotCardOwned from "./SpotCardOwned";
import { useEffect } from "react";
import { fetchSpots } from "../../store/spots";
import "../../components/SpotsHomePage/SpotsGrid/SpotsGrid.css";
import { useNavigate } from "react-router-dom";
import "./ManageSpotsPage.css";

function ManageSpotsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <main>
      <div className="header-container">
        <h1 className="manage-spots-h1">Manage Your Spots</h1>
        <button
          className="create-spot-button"
          type="button"
          onClick={() => navigate("/spots/new")}
        >
          Create a New Spot
        </button>
      </div>
      <div className="spots-grid">
        {spotsOwned.map((spot) => (
          <SpotCardOwned key={spot.id} {...spot} />
        ))}
      </div>
    </main>
  );
}

export default ManageSpotsPage;
