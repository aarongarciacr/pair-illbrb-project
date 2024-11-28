import { useDispatch } from "react-redux";
import "./CreateSpot.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCreateSpot, fetchPostImages } from "../../store/spots";

const CreateSpot = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState({});
  const [previewImg, setPreviewImg] = useState("");
  const [imageUrls, setImageUrls] = useState(["", "", "", ""]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    const newSpot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };

    try {
      // Step 1: Create the spot
      const createdSpot = await dispatch(fetchCreateSpot(newSpot));

      if (createdSpot) {
        // Step 2: Post images for the created spot
        const allImages = [
          { url: previewImg },
          ...imageUrls
            .filter((url) => url.trim() !== "")
            .map((url) => ({ url })),
        ];

        for (const image of allImages) {
          await dispatch(fetchPostImages(createdSpot.id, image));
        }

        // Step 3: Navigate to the created spot's details page
        navigate(`/spots/${createdSpot.id}`);
      }
    } catch (error) {
      const data = await error.json();
      if (data?.errors) {
        setErrors(data.errors);
      }
    }
  };

  return (
    <main>
      <h1>Create a New Spot</h1>
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
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            {errors?.country && <p className="error">{errors.country}</p>}
            <label htmlFor="address">Street Address</label>
            <input
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors?.address && <p className="error">{errors.address}</p>}
            <div className="input-pair">
              <div className="city">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {errors?.city && <p className="error">{errors.city}</p>}
              </div>
              <div className="state">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  placeholder="STATE"
                  value={state}
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
                  placeholder="Latitude"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                />
                {errors?.lat && <p className="error">{errors.lat}</p>}
              </div>
              <div className="longitude">
                <label htmlFor="longitude">Longitude</label>
                <input
                  id="longitude"
                  placeholder="Longitude"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
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
              placeholder="Please write at least 30 characters"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              placeholder="Name of your spot"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                placeholder="Price per night (USD)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
              value={previewImg}
              onChange={(e) => setPreviewImg(e.target.value)}
            />
            {errors?.previewImg && <p className="error">{errors.previewImg}</p>}
            {imageUrls.map((url, index) => (
              <div key={index}>
                <input
                  placeholder={`Image URL ${index + 1}`}
                  value={imageUrls[index]}
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
        <button className="createSpotBtn" type="submit">
          Create Spot
        </button>
      </form>
    </main>
  );
};

export default CreateSpot;
