import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";
import SpotsGrid from "./components/SpotsHomePage/SpotsGrid/SpotsGrid";
import SpotDetailsPage from "./components/SpotDetailsPage/SpotDetailsPage";
import SpotCreation from "./components/SpotCreation/SpotCreation";
import ManageSpotsPage from "./components/ManageSpotsPage/ManageSpotsPage";
import SpotUpdateForm from "./components/ManageSpotsPage/SpotUpdateForm";
import ManageReviewPage from "./components/ManageReviews/ManageReviewsPage";
import BookingsPage from "./components/Bookings/BookingsPage";
import BookingsOwnerPage from "./components/Bookings/BookingsOwnerPage";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SpotsGrid />,
      },
      {
        path: "/spots/:spotId",
        element: <SpotDetailsPage />,
      },
      {
        path: "/spots/new",
        element: <SpotCreation />,
      },
      {
        path: "/spots/current",
        element: <ManageSpotsPage />,
      },
      {
        path: "/spots/:spotId/edit",
        element: <SpotUpdateForm />,
      },
      {
        path: "/reviews/current",
        element: <ManageReviewPage />,
      },
      {
        path: "/bookings/current",
        element: <BookingsPage />,
      },
      {
        path: "/bookings/owner",
        element: <BookingsOwnerPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
