import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { editPostThunk } from "../../../store/posts";
import { useModal } from "../../../context/Modal";

function EditPostForm({ id }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const { closeModal } = useModal();

  const foundPost = useSelector(state => state.posts[id]);

  const [content, setContent] = useState(foundPost.content);
  const [image, setImage] = useState(foundPost.image);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const updatedPost = {
        ...foundPost,
        content,
        image
    };

    const data = await dispatch(editPostThunk(updatedPost));

    if (data && data.errors) {
        setErrors(data.errors)
    } else {
        closeModal()
        history.push('/feed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='edit-post-form'>
      <h2>Editpost</h2>
        <ul className="edit-post-form-errors">
          {errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>
      <input
        className="edit-post-content"
        type="text"
        placeholder="What do you want to talk about?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="edit-post-submit-button-container">
        <button className="edit-post-submit-button" type="submit">Post</button>
      </div>
    </form>
  );
}

export default EditPostForm;
