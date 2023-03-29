import { useDispatch } from 'react-redux';
import React from "react";
import { deletePostThunk } from '../../../store/posts';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../../context/Modal";
import './DeletePosts.css';

const DeletePostConfirmation = ({ id }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const deletePostHandler = async (e) => {
        e.preventDefault();
        await dispatch(deletePostThunk(id));
        closeModal();
        history.push('/feed');
    };

    const cancelHandler = () => {
        closeModal();
    }

    return (
        <div className='delete-post-confirmation-container'>
            <h2 className='delete-post-title'>Delete post?</h2>
            <h5 className='delete-post-body'>Are you sure you want to permanently remove this post from LinkedWith?</h5>
            <div className='delete-post-buttons-container'>
                <button className='delete-post-cancel-button' onClick={cancelHandler}>Cancel</button>
                <button className='delete-post-confirmation-button' onClick={deletePostHandler}>Delete</button>
            </div>
        </div>
    )
}

export default DeletePostConfirmation;
