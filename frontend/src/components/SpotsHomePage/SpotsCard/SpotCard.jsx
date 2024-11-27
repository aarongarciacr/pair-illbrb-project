import "./SpotCard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSpotPreviewImage } from "../../../store/spots";

function SpotCard({ id, previewImage, city, state, price, avgRating, name }) {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(previewImage);

  useEffect(() => {
    async function getPreviewImage() {
      const response = await dispatch(fetchSpotPreviewImage(id));
      if (response) {
        setImageUrl(response.url);
      }
    }
    getPreviewImage();
  }, [dispatch, id, previewImage]);
  // console.log("previewImage:", previewImage);/

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
          <p className="rating">⭐ {avgRating ? avgRating : "N/A"} </p>
        </div>
      </div>
    </Link>
  );
}

export default SpotCard;
