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
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);

  const currentUser = useSelector(state => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newPost = {
        content,
        image
    };

    const data = await dispatch(createPostThunk(newPost));

    if (data && data.errors) {
      setErrors(data.errors)
    } else {
      closeModal()
      history.push('/feed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='create-post-form-container'>
      <h2 className="create-post-form-title">Create a post</h2>
      <ul className="create-post-form-errors">
        {errors.map((error, index) => <li key={index}>{error}</li>)}
      </ul>
      <div className="create-post-form-user-info">
        <img className="create-post-form-user-image" src={currentUser.image}/>
        <div className="create-post-form-user-name">{currentUser.firstName} {currentUser.lastName}</div>
      </div>
      <input
        className="create-post-content"
        type="text"
        placeholder="What do you want to talk about?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="create-post-submit-button-container">
        <button className="create-post-submit-button" type="submit">Post</button>
      </div>
    </form>
  );
}

export default CreatePostForm;
