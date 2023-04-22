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

    if (content.length > 2000) newErrors.push('You have exceeded the maximum character limit (2000)');

    setErrors(newErrors);
  }, [content]);

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

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
        {(content && content.length <= 2000) ? (
          <button className="edit-post-submit-button" type="submit">Save</button>
        ) : (
          <button className="edit-post-submit-button-disabled" type="submit" disabled={true}>Save</button>
        )}
      </div>
    </form>
  );
}

export default EditPostForm;
