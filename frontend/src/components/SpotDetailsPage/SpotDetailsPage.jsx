import SpotMainImage from "./SpotMainImage";
import SpotAdditionalImages from "./SpotAdditionalImages";
import SpotHostDetails from "./SpotHostDetails";
import SpotReserveDetails from "./SpotReserveDetails";
import SpotReviews from "./SpotReviews";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchSingleSpot,
  fetchReviews,
  fetchSpotImages,
} from "../../store/spots";
import { useParams } from "react-router-dom";
import "./SpotDetailsPage.css";

function SpotDetailsPage() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.singleSpot);
  const [previewImage, setPreviewImage] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  console.log("spot:", spot);
  useEffect(() => {
    dispatch(fetchSingleSpot(parseInt(spotId)));
    dispatch(fetchSpotImages(parseInt(spotId)));
    dispatch(fetchReviews(parseInt(spotId)));
  }, [dispatch, spotId]);

  if (!spot) return <p>Loading...</p>;
  return (
    <div className="spot-details-page">
      <SpotMainImage
        previewImage={spot.previewImage}
        name={spot.name}
        location={`${spot.city}, ${spot.state}, ${spot.country}`}
        id={spot.id}
        onImageUrlChange={(url) => setPreviewImage(url)}
      />
      <SpotAdditionalImages images={spot.images || []} />
      <SpotHostDetails
        host={{ firstName: spot.hostFirstName, lastName: spot.hostLastName }}
        description={spot.description}
      />
      <SpotReserveDetails
        price={spot.price}
        avgRating={spot.avgRating}
        reviewCount={spot.reviews?.length || 0}
      />
      <SpotReviews reviews={spot.reviews || []} isLoggedIn={!!sessionUser} />
    </div>
  );
}

export default SpotDetailsPage;
