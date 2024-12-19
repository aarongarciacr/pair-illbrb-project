import "./SpotAdditionalImages.css";

import { useSelector } from "react-redux";

function SpotAdditionalImages() {
  const spot = useSelector((state) => state.spots?.singleSpot);
  const addImages = Array.isArray(spot?.SpotImages) ? spot?.SpotImages : [];
  const filterImages = addImages?.filter((image) => !image?.preview);

  if (!filterImages?.length) {
    return (
      <p className="spot-additional-images no-images">
        No additional images available.
      </p>
    );
  }

  return (
    <div className="spot-additional-images">
      {filterImages?.map((image) => (
        <div key={image?.id} className="additional-image-container">
          <img
            src={image?.url}
            className="image"
            id={`image-${image?.id}`}
            alt={`Spot Image ${image?.id + 1}`}
          />
        </div>
      ))}
    </div>
  );
}

export default SpotAdditionalImages;
