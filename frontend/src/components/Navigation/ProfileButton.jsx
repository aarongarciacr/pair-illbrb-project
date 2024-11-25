import { useState } from "react";
import { useDispatch } from "react-redux";
import { VscAccount } from "react-icons/vsc";
import * as sessionActions from "../../store/session";

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className="profile-button">
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
      <ul className="profile-dropdown">
        <li id="username">{user.username}</li>
        <li id="name">
          {user.firstName} {user.lastName}
        </li>
        <li id="email">{user.email}</li>
        <li>
          <button id="logout" onClick={logout}>
            Log Out
          </button>
        </li>
      </ul>
    </>
  );
};

export default ProfileButton;
