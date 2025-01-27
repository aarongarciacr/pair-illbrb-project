import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { VscAccount } from "react-icons/vsc";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import { useNavigate, Link } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? " shown" : " hidden");

  return (
    <>
      <button onClick={toggleMenu} className="profile-button">
        <VscAccount
          style={{
            height: "1.8em",
            width: "1.8em",
            display: "flex",
            margin: "auto",
            color: "white",
          }}
        />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li id="username">Hello, {user.username}!</li>

            <li id="email">{user.email}</li>
            <div className="manage-container">
              <div className="owner-manage">
                <p className="owner">Owner</p>
                <Link to="/spots/current" id="manage-spots">
                  Manage Spots
                </Link>
                <Link to="bookings/owner" id="manage-bookings">
                  Manage Bookings
                </Link>
              </div>
              <div className="renter-manage">
                <p className="renter">Renter</p>
                <Link to="/bookings/current" id="manage-bookings">
                  Manage Bookings
                </Link>
                <Link to="/reviews/current" id="manage-reviews">
                  Manage Reviews
                </Link>
              </div>
            </div>
            <li>
              <button id="logout" onClick={logout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal navigate={navigate} />}
              id={"login-link"}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal navigate={navigate} />}
              id={"signup-link"}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
