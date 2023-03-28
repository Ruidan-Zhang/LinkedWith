// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import homeLogo from '../../assets/favicon_io/logo.png';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-bar-user-button-container'>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className='nav-bar-buttons-container'>
        <NavLink className='nav-bar-sign-up-button' to="/signup">Sign Up</NavLink>
        <NavLink className='nav-bar-log-in-button' to="/">Log In</NavLink>
      </div>
    );
  }

  return (
    <div className='nav-bar-container'>
      {sessionUser ? (
        <NavLink exact to="/feed" className='nav-bar-logo-container'>
          <div className='nav-bar-logo-name'>Linked</div>
          <img className='nav-bar-logo' src={homeLogo}/>
        </NavLink>
      ) : (
        <NavLink exact to="/" className='nav-bar-logo-container'>
          <div className='nav-bar-logo-name'>Linked</div>
          <img className='nav-bar-logo' src={homeLogo}/>
        </NavLink>
      )}
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
