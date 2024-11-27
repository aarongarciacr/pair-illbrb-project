// import "./SpotMainImage.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchSpotPreviewImage } from "../../store/spots";

function SpotMainImage({ previewImage, name, location, id, onImageUrlChange }) {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(previewImage);

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
      <img src={imageUrl} alt={name} />
      <h1>{name}</h1>
      <p>{location}</p>
    </div>
  );
}

export default SpotMainImage;
