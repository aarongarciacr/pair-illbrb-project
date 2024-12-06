import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteSpotModal from "./DeleteSpotModal";
import "./SpotCardOwned.css";

function SpotCardOwned({
  id,
  previewImage,
  city,
  state,
  price,
  avgRating,
  name,
}) {
  const navigate = useNavigate();
  const [imageUrl] = useState(previewImage);

  return (
    <div className="spot-card-owned">
      <Link to={`/spots/${id}`} className="spot-link">
        <div title={name}>
          <div className="image-container">
            <img
              src={imageUrl}
              alt={`${city}, ${state}`}
              className="spot-image"
            />
          </div>
          <div className="spot-details">
            <p className="location">
              {city}, {state}
            </p>
            <p className="price">${price} night</p>
            <p className="rating">⭐ {avgRating ? avgRating : "New"} </p>
          </div>
        </div>
      </Link>
      <div className="buttons-container-spots-owned">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/spots/${id}/edit`);
          }}
          className="update-btn"
        >
          Update
        </button>
        <OpenModalButton
          modalComponent={<DeleteSpotModal spotId={id} />}
          buttonText={"Delete"}
          className={"delete-btn"}
        />
      </div>
    </div>
  );
}

export default SpotCardOwned;
