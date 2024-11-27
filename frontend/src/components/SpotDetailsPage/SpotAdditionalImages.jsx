import "./SpotAdditionalImages.css";

import { useDispatch, useSelector } from "react-redux";

function SpotAdditionalImages() {
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot);

  const images = spot.SpotImages;
  //   useEffect(() => {
  //     dispatch(fetchSpotImages(images));
  //   }, [dispatch]);

  return (
    <div className="spot-additional-images">
      {images.map((image) => (
        <div key={image.id} className="additional-image-container">
          <img
            src={image.url}
            className="image"
            id={`image-${image.id}`}
            alt={`Spot Image ${image.id + 1}`}
          />
        </div>
      ))}
    </div>
  );
}

export default SpotAdditionalImages;
