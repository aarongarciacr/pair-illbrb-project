import "./SpotMainImage.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchSpotPreviewImage } from "../../store/spots";

function SpotMainImage({ previewImage, name, location, id, onImageUrlChange }) {
  const dispatch = useDispatch();
  // const spot = useSelector((state) => state.spots.singleSpot);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function getPreviewImage() {
      const response = await dispatch(fetchSpotPreviewImage(id));
      if (response) {
        setImageUrl(response.url);
        onImageUrlChange(response.url);
      }
    }
    getPreviewImage();
  }, [dispatch, id, previewImage, onImageUrlChange]);

  return (
    <div className="SpotMainImage">
      <img src={imageUrl} alt={name} className="mainImage" />
      <p>{location}</p>
      <h1>{name}</h1>
    </div>
  );
}

export default SpotMainImage;
