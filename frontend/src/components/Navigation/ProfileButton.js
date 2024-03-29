// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push('/login');
  };

  const goToProfile = async (e) => {
    history.push(`/profile/${user.id}`);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="nav-bar-drop-down-menu-container">
      <button className="nav-bar-user-container" onClick={openMenu}>
        <img className="nav-bar-user-image" src={user.image}/>
        <div className="nav-bar-user-down-arrow">
          Me
          <i className="fa-solid fa-sort-down"></i>
        </div>
      </button>
      <div className={ulClassName} ref={ulRef}>
        <div className="drop-down-user-info">
          <img className="drop-down-user-image" src={user.image} />
          <div>
            <div className="drop-down-user-name">{user.firstName} {user.lastName}</div>
            <div className="drop-down-user-occupation">{user.occupation}</div>
          </div>
        </div>
        <div className="drop-down-menu-buttons">
          <button className="drop-down-view-profile-button" onClick={goToProfile}>View Profile</button>
          <button className="drop-down-log-out-button" onClick={logout}>Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileButton;
