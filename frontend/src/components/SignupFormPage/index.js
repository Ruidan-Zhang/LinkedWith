// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, firstName, lastName, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="sign-up-page-container">
      <div  className='sign-up-form-title'>Make the most of your proessional life</div>
      <form className="sign-up-form-container" onSubmit={handleSubmit}>
        {/* <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}
        <label className='sign-up-form-label'>
          Email
        </label>
          <input
            type="text"
            className='sign-up-form-input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label className='sign-up-form-label'>
          First Name
        </label>
          <input
            type="text"
            className='sign-up-form-input'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        <label className='sign-up-form-label'>
          Last Name
        </label>
          <input
            type="text"
            className='sign-up-form-input'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        <label className='sign-up-form-label'>
          Password
        </label>
          <input
            type="password"
            className='sign-up-form-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <label className='sign-up-form-label'>
          Confirm Password
        </label>
          <input
            type="password"
            className='sign-up-form-input'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        <button type="submit" className='sign-up-form-button'>Join</button>
      </form>
    </div>

  );
}

export default SignupFormPage;
