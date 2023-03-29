import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { createPostThunk } from "../../../store/posts";
import { useModal } from "../../../context/Modal";
import './CreatePostsForm.css';

function CreatePostForm() {
  const dispatch = useDispatch();
  const history = useHistory()
  const { closeModal } = useModal();

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    const newErrors = [];

    if (content.length > 2000) newErrors.push('You have exceeded the maximum character limit (2000)');

    setErrors(newErrors);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
        content,
        image
    };

    await dispatch(createPostThunk(newPost));

    closeModal()
    history.push('/feed');
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

  return (
    <form onSubmit={handleSubmit} className='create-post-form-container'>
      <h2 className="create-post-form-title">Create a post</h2>
      <div className="create-post-form-user-info">
        <img className="create-post-form-user-image" src={currentUser.image}/>
        <div className="create-post-form-user-name">{currentUser.firstName} {currentUser.lastName}</div>
      </div>
      <textarea
        className="create-post-content"
        type="text"
        placeholder="What do you want to talk about?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="create-post-form-errors">
        {errors.map((error) => (
          <div>
            <i class="fa-solid fa-ban"></i>{' '}
            {error}
          </div>
        ))}
      </div>
      <div className="create-post-form-footer">
        <label htmlFor='file-upload' className="create-post-image-upload">
          <i className="fa-regular fa-image"></i>
          <div className="create-post-file-name">{image?.name}</div>
        </label>
        <input type='file' accept="image/jpeg, image/png" id="file-upload" onChange={updateFile}/>
        {(content && content.length <= 2000) ? (
          <button className="create-post-submit-button" type="submit">Post</button>
        ) : (
          <button className="create-post-submit-button-disabled" type="submit" disabled={true}>Post</button>
        )}
      </div>
    </form>
  );
}

export default CreatePostForm;
