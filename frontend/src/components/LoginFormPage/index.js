// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    history.push('/feed');
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const demoUserSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    history.push('/feed');
    return dispatch(sessionActions.login({ credential: "user1@user.io", password: "password1" }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='log-in-page-container'>
      <form className='log-in-form-container' onSubmit={handleSubmit}>
        <div className='log-in-form-title'>
          Welcome to your professional community
        </div>
        <ul>
          {errors.map((error, idx) => <li className='log-in-form-errors' key={idx}>*{error}</li>)}
        </ul>
        <div className='log-in-form-body'>
          <label className='log-in-form-label'>
            Email
          </label>
          <input
            type="text"
            className='log-in-form-input'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <label className='log-in-form-label'>
            Password
          </label>
          <input
            type="password"
            className='log-in-form-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className='log-in-form-button'>Log In</button>
          <p className='log-in-form-divider'>
            <span>
              or
            </span>
          </p>
          <button type="submit" className='log-in-form-demo-user-button' onClick={demoUserSubmit}>Demo User</button>
        </div>
      </form>
      <img className='log-in-page-image' src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4" alt='log-in-page'></img>
    </div>
  );
}

export default LoginFormPage;
