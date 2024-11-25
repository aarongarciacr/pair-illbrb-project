import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
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
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </li>
      <li id="signup-link">
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
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
