import "./SpotMainImage.css";

function SpotMainImage({ previewImage, name, location }) {
  return (
    <div className="SpotMainImage">
      <img src={previewImage} alt={name} className="mainImage" />
      <p className="spot-location">{location}</p>
      <h1 className="spot-name">{name}</h1>
    </div>
  );
}

export default SpotMainImage;
