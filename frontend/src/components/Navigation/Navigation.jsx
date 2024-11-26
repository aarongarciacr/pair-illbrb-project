import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { VscHome } from "react-icons/vsc";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="nav-box">
      <li id="home-link">
        <Link to="/">
          <VscHome style={{ height: "2em", width: "2em" }} />
        </Link>
      </li>
      {isLoaded && (
        <li className="profile-box">
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
