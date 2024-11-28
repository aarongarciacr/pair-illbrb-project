import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";
import SpotsGrid from "./components/SpotsHomePage/SpotsGrid/SpotsGrid";
import SpotDetailsPage from "./components/SpotDetailsPage/SpotDetailsPage";
import SpotCreation from "./components/SpotCreation/SpotCreation";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
