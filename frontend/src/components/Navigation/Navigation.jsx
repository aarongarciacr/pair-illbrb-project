import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const navClass = sessionUser ? "nav flex-layout" : "nav grid-layout";

  const sessionLinks = sessionUser ? (
    <li className="logged-navlinks">
      <ProfileButton user={sessionUser} />
    </li>
  ) : (
    <>
      <li id="login-link">
        <Link to="/login">Log In</Link>
      </li>
      <li id="signup-link">
        <Link to="/signup">Sign Up</Link>
      </li>
    </>
  );

  return (
    <ul className={navClass}>
      <li id="home-link">
        <Link to="/">Home</Link>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
