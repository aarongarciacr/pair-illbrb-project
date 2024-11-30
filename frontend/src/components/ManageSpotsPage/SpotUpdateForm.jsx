import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostImages, fetchSingleSpot } from "../../store/spots";
import { fetchUpdateSpot } from "../../store/spots";

const SpotUpdateForm = () => {
  const { spotId } = useParams();
  const parseSpotId = parseInt(spotId);
  const spot = useSelector((state) => state.spots?.singleSpot);
  // const images = useSelector((state) => state.spots?.singleSpot?.SpotImages);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [previewImg, setPreviewImg] = useState("");
  const [imageUrls, setImageUrls] = useState(["", "", "", ""]);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    name: "",
    description: "",
    price: 0,
    lat: null,
    lng: null,
  });

  useEffect(() => {
    if (!spot || parseSpotId !== spot.id) {
      dispatch(fetchSingleSpot(spotId));
    } else {
      setFormData({
        address: spot.address || "",
        city: spot.city || "",
        state: spot.state || "",
        country: spot.country || "",
        name: spot.name || "",
        description: spot.description || "",
        price: spot.price || 0,
        lat: spot.lat || null,
        lng: spot.lng || null,
      });

      // Set preview image and extra image URLs
      const previewImage =
        spot?.SpotImages?.find((image) => image.id === spot.previewImage)
          ?.url || "";
      setPreviewImg(previewImage);

      // Prepare exactly 4 extra image URLs
      const extraImages =
        spot?.SpotImages?.filter((img) => img.id !== spot.previewImage).map(
          (img) => img.url
        ) || [];
      setImageUrls([...extraImages, "", "", "", ""].slice(0, 4));
    }
  }, [spot, dispatch, spotId, parseSpotId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const urlRegex = /\.(png|jpg|jpeg)$/;
    const newErrors = {};

    if (!previewImg.match(urlRegex)) {
      newErrors.previewImg =
        "Preview Image is required and must end in png, jpg, or jpeg.";
    }

    imageUrls.forEach((url, index) => {
      if (url && !url.match(urlRegex)) {
        newErrors[`imageUrl${index}`] =
          "Image URL needs to end in png, jpg, or jpeg.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const updatedSpot = await dispatch(fetchUpdateSpot(spotId, formData));

      if (updatedSpot) {
        const allImages = [
          { url: previewImg },
          ...imageUrls
            .filter((url) => url.trim() !== "")
            .map((url) => ({ url })),
        ];

        for (const image of allImages) {
          await dispatch(fetchPostImages(updatedSpot.id, image));
        }

        navigate(`/spots/${updatedSpot.id}`);
      }
    } catch (error) {
      if (error instanceof Response) {
        try {
          const data = await error.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        } catch (jsonError) {
          console.error("Failed to parse error response JSON:", jsonError);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <main>
      <h1>Update Your Spot</h1>
      <form onSubmit={onSubmit}>
        <div className="locationInfoContainer container">
          <h2>Where is your place Located?</h2>
          <p>
            Guests will only get your exact address once they book a
            reservation.
          </p>
          <div className="form locationForm">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              name="country"
              placeholder="Country"
              value={formData.country || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            {errors?.country && <p className="error">{errors.country}</p>}
            <label htmlFor="address">Street Address</label>
            <input
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            {errors?.address && <p className="error">{errors.address}</p>}
            <div className="input-pair">
              <div className="city">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  placeholder="City"
                  value={formData.city || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                {errors?.city && <p className="error">{errors.city}</p>}
              </div>
              <div className="state">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  name="state"
                  placeholder="STATE"
                  value={formData.state || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                {errors?.state && <p className="error">{errors.state}</p>}
              </div>
            </div>
            <div className="input-pair">
              <div className="latitude">
                <label htmlFor="latitude">Latitude</label>
                <input
                  id="latitude"
                  name="lat"
                  placeholder="Latitude"
                  value={formData.lat || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                {errors?.lat && <p className="error">{errors.lat}</p>}
              </div>
              <div className="longitude">
                <label htmlFor="longitude">Longitude</label>
                <input
                  id="longitude"
                  name="lng"
                  placeholder="Longitude"
                  value={formData.lng || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                {errors?.lng && <p className="error">{errors.lng}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="descriptionContainer container">
          <h2>Describe your place to guests</h2>
          <p>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <div className="form descriptionForm">
            <textarea
              id="description"
              name="description"
              placeholder="Please write at least 30 characters"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            {errors?.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
        </div>
        <div className="spotTitleContainer container">
          <h2>Create a title for your spot</h2>
          <p>
            Catch guests&apos; attention with a spot title that highlights what
            makes your place special.
          </p>
          <div className="form title">
            <input
              name="name"
              placeholder="Name of your spot"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            {errors?.name && <p className="error">{errors.name}</p>}
          </div>
        </div>
        <div className="priceContainer container">
          <h2>Set a base price for your spot</h2>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <div className="form price">
            <div className="input-container">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                name="price"
                placeholder="Price per night (USD)"
                value={formData.price || 0}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
              {errors?.price && <p className="error">{errors.price}</p>}
            </div>
          </div>
        </div>
        <div className="photosContainer container">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <div className="form photosUrl">
            <input
              placeholder="Preview Image URL"
              value={previewImg || ""}
              onChange={(e) => setPreviewImg(e.target.value)}
            />
            {errors?.previewImg && <p className="error">{errors.previewImg}</p>}
            {imageUrls?.map((url, index) => (
              <div key={index}>
                <input
                  placeholder={`Image URL ${index + 1}`}
                  value={url || ""}
                  onChange={(e) => {
                    const updatedUrls = [...imageUrls];
                    updatedUrls[index] = e.target.value;
                    setImageUrls(updatedUrls);
                  }}
                />
                {errors[`imageUrl${index}`] && (
                  <p className="error">{errors[`imageUrl${index}`]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <button className="updateSpotBtn" type="submit">
          Update Spot
        </button>
      </form>
    </main>
  );
};

export default SpotUpdateForm;
