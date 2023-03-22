import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { editPostThunk } from "../../../store/posts";
import { useModal } from "../../../context/Modal";
import './EditPostsForm.css';

function EditPostForm({ id }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const { closeModal } = useModal();

  const foundPost = useSelector(state => state.posts[id]);
  const currentUser = useSelector(state => state.session.user);

  const [content, setContent] = useState(foundPost.content);
  const [image, setImage] = useState(foundPost.image);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const newErrors = [];

    if (content.length > 2000) newErrors.push('You have exceeded the maximum character limit');

    setErrors(newErrors);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
        ...foundPost,
        content,
        image
    };

    await dispatch(editPostThunk(updatedPost));

    closeModal()
    history.push('/feed');
  };

  return (
    <form onSubmit={handleSubmit} className='edit-post-form-container'>
      <h2 className="edit-post-form-title">Edit post</h2>
      <div className="edit-post-form-user-info">
        <img className="edit-post-form-user-image" src={currentUser.image}/>
        <div className="edit-post-form-user-name">{currentUser.firstName} {currentUser.lastName}</div>
      </div>
      <textarea
        className="edit-post-content"
        type="text"
        placeholder="What do you want to talk about?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="edit-post-form-errors">
        {errors.map((error) => (
          <div>
            <i class="fa-solid fa-ban"></i>{' '}
            {error}
          </div>
        ))}
      </div>
      <div className="edit-post-form-footer">
        <i className="fa-regular fa-image"></i>
        {(content && content.length <= 2000 && content !== foundPost.content) ? (
          <button className="edit-post-submit-button" type="submit">Save</button>
        ) : (
          <button className="edit-post-submit-button-disabled" type="submit" disabled={true}>Save</button>
        )}
      </div>
    </form>
  );
}

export default EditPostForm;
