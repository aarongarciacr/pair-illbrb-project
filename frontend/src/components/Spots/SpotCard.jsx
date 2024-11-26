// import "./SpotCard.css";

function SpotCard({ image, city, state, price, rating }) {
  return (
    <div className="spot-card">
      <div className="image-container">
        <img src={image} alt={`${city}, ${state}`} className="spot-image" />
      </div>
      <div className="spot-details">
        <p className="location">
          {city}, {state}
        </p>
        <p className="price">{price}</p>
        <p className="rating">⭐ {rating} </p>
      </div>
    </div>
  );
}

export default SpotCard;
