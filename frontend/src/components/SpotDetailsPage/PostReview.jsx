import "./PostReview.css";

const PostReview = () => {
  return (
    <div className="postReviewBox">
      <form className="reviewForm">
        <label className="rating" htmlFor="rating">
          <p className="starsText"> Stars:</p>
          <select id="stars" name="stars">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label className="reviewTextBox" htmlFor="reviewText">
          <p className="comments">Comments:</p>
          <textarea
            name="review"
            placeholder="Tell everyone about your experience!"
          ></textarea>
        </label>
        <button type="button" className="postReviewButton">
          Post Review
        </button>
      </form>
    </div>
  );
};

export default PostReview;
