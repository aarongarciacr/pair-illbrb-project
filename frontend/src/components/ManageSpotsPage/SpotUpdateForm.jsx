import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostImages, fetchSingleSpot } from "../../store/spots";
import { fetchUpdateSpot } from "../../store/spots";
import "./SpotUpdateForm.css";

const SpotUpdateForm = () => {
  const { spotId } = useParams();
  const parseSpotId = parseInt(spotId);
  const spot = useSelector((state) => state.spots?.singleSpot);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState("");
  const [imageUrls, setImageUrls] = useState(["", "", "", ""]);

  useEffect(() => {
    if (!spot || parseSpotId !== spot.id) {
      dispatch(fetchSingleSpot(spotId));
    } else {
      setAddress(spot.address || "");
      setCity(spot.city || "");
      setState(spot.state || "");
      setCountry(spot.country || "");
      setLat(spot.lat || null);
      setLng(spot.lng || null);
      setName(spot.name || "");
      setDescription(spot.description || "");
      setPrice(spot.price || "");
      setPreviewImage(spot.previewImage || "");

      const extraImages =
        spot?.SpotImages?.filter((img) => img.url !== spot.previewImage).map(
          (img) => img.url
        ) || [];
      setImageUrls([...extraImages, "", "", "", ""].slice(0, 4));
    }
  }, [spot, dispatch, spotId, parseSpotId]);

  // const previewImage =
  //   spot?.SpotImages?.find((image) => image.id === spot.previewImage)
  //     ?.url || "";
  // setPreviewImg(previewImage);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const urlRegex = /\.(png|jpg|jpeg)$/;
    const newErrors = {};

    if (!address.trim()) newErrors.address = "Address is required.";
    if (!city.trim()) newErrors.city = "City is required.";
    if (!state.trim()) newErrors.state = "State is required.";
    if (!country.trim()) newErrors.country = "Country is required.";
    if (!description.trim() || description.length < 30)
      newErrors.description = "Description needs a minimum of 30 characters.";
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!price) newErrors.price = "Price is required.";

    if (lat && isNaN(lat)) newErrors.lat = "Latitude must be a number.";
    if (lng && isNaN(lng)) newErrors.lng = "Longitude must be a number.";

    if (!previewImage.match(urlRegex)) {
      newErrors.previewImage =
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

    const updatedSpot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
    };

    try {
      const updatedSpotData = await dispatch(
        fetchUpdateSpot(parseSpotId, updatedSpot)
      );

      if (updatedSpotData) {
        const allImages = [
          // { url: previewImage, isPreview: true },
          ...imageUrls
            .filter((url) => url.trim() !== "")
            .map((url) => ({ url, isPreview: false })),
        ];

        for (const image of allImages) {
          await dispatch(fetchPostImages(updatedSpotData.id, image.url));
        }

        navigate(`/spots/${updatedSpotData.id}`);
      }
    } catch (error) {
      if (error instanceof Response) {
        const data = await error.json();
        if (data?.errors) {
          setErrors(data.errors);
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
          <h2 className="header2">Where is your place Located?</h2>
          <p className="p-descriptions">
            Guests will only get your exact address once they book a
            reservation.
          </p>
          <div className="form locationForm">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              name="country"
              placeholder="Country"
              value={country || ""}
              onChange={(e) => setCountry(e.target.value)}
            />
            {errors?.country && <p className="error">{errors.country}</p>}
            <label htmlFor="address">Street Address</label>
            <input
              id="address"
              name="address"
              placeholder="Address"
              value={address || ""}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors?.address && <p className="error">{errors.address}</p>}
            <div className="input-pair">
              <div className="city">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  placeholder="City"
                  value={city || ""}
                  onChange={(e) => setCity(e.target.value)}
                />
                {errors?.city && <p className="error">{errors.city}</p>}
              </div>
              <div className="state">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  name="state"
                  placeholder="STATE"
                  value={state || ""}
                  onChange={(e) => setState(e.target.value)}
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
                  value={lat || ""}
                  onChange={(e) => setLat(e.target.value)}
                />
                {errors?.lat && <p className="error">{errors.lat}</p>}
              </div>
              <div className="longitude">
                <label htmlFor="longitude">Longitude</label>
                <input
                  id="longitude"
                  name="lng"
                  placeholder="Longitude"
                  value={lng || ""}
                  onChange={(e) => setLng(e.target.value)}
                />
                {errors?.lng && <p className="error">{errors.lng}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="descriptionContainer container">
          <h2 className="header2">Describe your place to guests</h2>
          <p className="p-descriptions">
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <div className="form descriptionForm">
            <textarea
              id="description"
              name="description"
              placeholder="Please write at least 30 characters"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors?.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
        </div>
        <div className="spotTitleContainer container">
          <h2 className="header2">Create a title for your spot</h2>
          <p className="p-descriptions">
            Catch guests&apos; attention with a spot title that highlights what
            makes your place special.
          </p>
          <div className="form title">
            <input
              name="name"
              placeholder="Name of your spot"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
            {errors?.name && <p className="error">{errors.name}</p>}
          </div>
        </div>
        <div className="priceContainer container">
          <h2 className="header2">Set a base price for your spot</h2>
          <p className="p-descriptions">
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
                value={price || 0}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors?.price && <p className="error">{errors.price}</p>}
            </div>
          </div>
        </div>
        <div className="photosContainer container">
          <h2 className="header2">Liven up your spot with photos</h2>
          <p className="p-descriptions">
            Submit a link to at least one photo to publish your spot.
          </p>
          <div className="form photosUrl">
            <input
              placeholder="Preview Image URL"
              value={previewImage || ""}
              onChange={(e) => setPreviewImage(e.target.value)}
            />
            {errors?.previewImage && (
              <p className="error">{errors.previewImage}</p>
            )}
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
