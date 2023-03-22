import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { createCommentThunk } from "../../../store/comments";
import { useModal } from "../../../context/Modal";
import './CreateCommentsForm.css';

function CreateCommentForm({ id }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const { closeModal } = useModal();

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const currentUser = useSelector(state => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newComment = {
        content
    };

    const data = await dispatch(createCommentThunk(id, newComment));

    if (data && data.errors) {
      setErrors(data.errors)
    } else {
      closeModal()
      history.push('/feed');
    }

    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className='create-comment-form-container'>
      {/* <ul className="create-comment-form-errors">
        {errors.map((error, index) => <li key={index}>{error}</li>)}
      </ul> */}
      <div className="create-comment-form-input-container">
        <img className="create-comment-form-user-image" src={currentUser.image}/>
        <textarea
          className="create-comment-content"
          type="text"
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="create-comment-submit-button-container">
        {content && (
          <button className="create-comment-submit-button" type="submit">Post</button>
        )}
      </div>
    </form>
  );
}

export default CreateCommentForm;
