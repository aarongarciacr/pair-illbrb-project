import "./SpotCard.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function SpotCard({ id, previewImage, city, state, price, avgRating, name }) {
  const [imageUrl] = useState(previewImage);

  return (
    <Link to={`/spots/${id}`} className="spot-card">
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
  );
}

export default SpotCard;
