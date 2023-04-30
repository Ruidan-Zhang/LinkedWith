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
  };

  const demoUserSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    history.push('/feed');
    return dispatch(sessionActions.login({ credential: "user1@user.io", password: "password1" }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const goToSignUp = async (e) => {
    e.preventDefault();
    history.push('/signup');
  };

  return (
    <div className='log-in-page-main-container'>
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
      <div className='log-in-page-down-area'>
        <img className='log-in-page-down-image' src="https://vancomputer.ca/public/img/blog/svg/4.svg" alt='log-in-page'></img>
        <div className='log-in-page-down-statement-and-button'>
          <div className='log-in-page-down-statement'>Join your colleagues, classmates, and friends on</div>
          <div className='log-in-page-down-statement'>LinkedWith.</div>
          <button className='log-in-page-down-button' onClick={goToSignUp}>Get started</button>
        </div>
        <div className='log-in-page-footer'>
          <div>
            Ruidan Zhang © 2023 <a href = "https://github.com/Ruidan-Zhang" target="_blank" className='log-in-footer-icon' rel="noopener noreferrer"><i class="fa-brands fa-github"></i> </a>
            <a href = "https://www.linkedin.com/in/ruidan-meredith-zhang/" target="_blank" className='log-in-footer-icon' rel="noopener noreferrer"><i class="fa-brands fa-linkedin"></i></a>
          </div>
          <div>
            Javascript | Express | React | Redux | SqlAlchemy | PostgresSQL | HTML | CSS | AWS | Hosted on Render
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
