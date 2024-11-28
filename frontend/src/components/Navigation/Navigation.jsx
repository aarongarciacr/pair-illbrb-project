import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import Logo from "../../assets/Logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const showCreateSpot = !!sessionUser;

  console.log(showCreateSpot);
  console.log(isLoaded);
  return (
    <ul className="nav-box">
      <li id="home-link-container">
        <Link to="/" className="home-link">
          <img src={Logo} className="logo"></img>

          <p className="illBRB">I'll BRB</p>
        </Link>
      </li>
      {isLoaded && (
        <li className="profile-box">
          {showCreateSpot && (
            <Link to="spots/new" className="createSpot">
              <p id="createSpotText">Create a New Spot</p>
            </Link>
          )}
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
