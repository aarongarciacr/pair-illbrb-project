import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReviewModal from "./DeleteReviewModal";
import UpdateReviewModal from "./UpdateReviewModal";
import "./ManageReviewsPage.css";

const ManageReviewsPage = () => {
  const userReviews = useSelector((state) => state.reviews?.userReviews || {});
  const userReviewsArray = Object.values(userReviews).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserReviews());
  }, [dispatch]);

  if (!userReviewsArray) {
    return <h1>No reviews available.</h1>;
  }

  return (
    <div className="main-container">
      <h1>Manage Reviews</h1>
      <div className="reviews-list">
        {userReviewsArray?.map((review) => (
          <div key={review.id} className="review">
            <h2 className="spot-name">{review?.Spot?.name}</h2>
            <h3 className="userFirstNameReview">{review?.User?.firstName}</h3>
            <p className="dateReview">
              {new Date(review?.createdAt).toLocaleDateString("es-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="ratingReview"> Rating: ⭐ {review?.stars}</p>
            <p className="reviewText">{review?.review}</p>
            <div className="buttons-container-manage-reviews">
              <OpenModalButton
                modalComponent={<UpdateReviewModal oldReview={review} />}
                buttonText={"Update"}
                className="update-review-button-details-page"
              />
              <OpenModalButton
                modalComponent={
                  <DeleteReviewModal
                    reviewId={review?.id}
                    spotId={review?.spotId}
                  />
                }
                buttonText={"Delete"}
                className="delete-review-button-details-page"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviewsPage;
