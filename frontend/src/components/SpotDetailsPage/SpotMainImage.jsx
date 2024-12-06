import "./SpotMainImage.css";

function SpotMainImage({ previewImage, name, location }) {
  // useEffect(() => {
  //   async function getPreviewImage() {
  //     const response = await dispatch(fetchSpotPreviewImage(id));
  //     if (response) {
  //       setImageUrl(response.url);
  //       onImageUrlChange(response.url);
  //     }
  //   }
  //   getPreviewImage();
  // }, [dispatch, id, previewImage, onImageUrlChange]);

  return (
    <div className="SpotMainImage">
      <img src={previewImage} alt={name} className="mainImage" />
      <p className="spot-location">{location}</p>
      <h1 className="spot-name">{name}</h1>
    </div>
  );
}

export default SpotMainImage;
