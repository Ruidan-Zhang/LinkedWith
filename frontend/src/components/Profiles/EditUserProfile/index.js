import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { editUserProfileThunk } from "../../../store/session";
import { getUserProfileThunk } from "../../../store/users";
import { useModal } from "../../../context/Modal";

function EditProfileForm() {
  const dispatch = useDispatch();
  const history = useHistory()
  const { closeModal } = useModal();

  const currentUser = useSelector(state => state.session.user);

  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [occupation, setOccupation] = useState(currentUser.occupation);
  const [image, setImage] = useState(currentUser.image);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const newErrors = [];

    if (firstName.length > 30) newErrors.push('You have exceeded the maximum character limit (30)');
    if (lastName.length > 30) newErrors.push('You have exceeded the maximum character limit (30)');
    if (occupation.length > 50) newErrors.push('You have exceeded the maximum character limit (50)');

    setErrors(newErrors);
  }, [firstName, lastName, occupation]);

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProfile = {
        ...currentUser,
        firstName,
        lastName,
        occupation,
        image
    };

    await dispatch(editUserProfileThunk(updatedProfile));

    closeModal()
    history.push(`/profile/${currentUser.id}`);

    await dispatch(getUserProfileThunk(currentUser.id));
  };

  return (
        <form onSubmit={handleSubmit} className='create-experience-form-main-container'>
            <h2 className="create-experience-form-title">Edit intro</h2>
            <div className="create-experience-form-body-container">
                <div className="create-experience-form-inputs-container">
                    <div className="create-experience-form-each-input">
                        <div className="create-experience-input-title">First name</div>
                        <input
                            type="text"
                            className="create-experience-form-input"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="create-experience-form-each-input">
                        <div className="create-experience-input-title">Last name</div>
                        <input
                            type="text"
                            className="create-experience-form-input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="create-experience-form-each-input">
                        <div className="create-experience-input-title">Occupation</div>
                        <input
                            type="text"
                            className="create-experience-form-input"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="create-experience-form-errors">
                    {errors.map((error) => (
                    <div>
                        <i className="fa-solid fa-ban"></i>{' '}
                        {error}
                    </div>
                    ))}
                </div>
                <div className="edit-post-form-footer">
                    <label htmlFor='file-upload' className="create-post-image-upload">
                    <i className="fa-regular fa-image"></i>
                    <div className="create-post-file-name">{image?.name}</div>
                    </label>
                    <input type='file' accept="image/jpeg, image/png" id="file-upload" onChange={updateFile}/>
                    <button className="create-experience-submit-button" type="submit">Save</button>
                </div>
            </div>
        </form>
  );
}

export default EditProfileForm;
