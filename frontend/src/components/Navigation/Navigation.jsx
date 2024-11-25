import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import * as sessionActions from "../../store/session";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const sessionLinks = sessionUser ? (
    <>
      <li>
        <ProfileButton user={sessionUser} />
      </li>
      <li>
        <button onClick={logout}>Log Out</button>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to="/login">Log In</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
    </>
  );

  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
