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

  useEffect(() => {
    const newErrors = [];

    if (content.length > 500) newErrors.push('You have exceeded the maximum character limit (500)');

    setErrors(newErrors);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
        content
    };

    await dispatch(createCommentThunk(id, newComment));

    closeModal()
    history.push('/feed');

    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className='create-comment-form-container'>
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
      <div className="create-comment-form-errors">
        {errors.map((error) => (
          <div>
            <i class="fa-solid fa-ban"></i>{' '}
            {error}
          </div>
        ))}
      </div>
      <div className="create-comment-form-footer">
        {content && content.length <= 500 && (
          <button className="create-comment-submit-button" type="submit">Post</button>
        )}
        {(content.length > 500) && (
          <button className="create-comment-submit-button-disabled" type="submit" disabled={true}>Post</button>
        )}
      </div>
    </form>
  );
}

export default CreateCommentForm;
