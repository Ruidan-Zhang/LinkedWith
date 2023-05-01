import { useDispatch } from 'react-redux';
import React from "react";
import { deleteCommentThunk } from '../../../store/comments';
import { getAllPostsThunk } from '../../../store/posts';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../../context/Modal";
import './DeleteComments.css';

const DeleteCommentConfirmation = ({ id }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const deleteHandler = async (e) => {
        e.preventDefault();
        await dispatch(deleteCommentThunk(id));
        closeModal();
        history.push('/feed');
        await dispatch(getAllPostsThunk());
    };

    const cancelHandler = () => {
        closeModal();
    }

    return (
        <div className='delete-post-confirmation-container'>
            <h2 className='delete-post-title'>Delete comment?</h2>
            <h5 className='delete-post-body'>Are you sure you want to permanently remove this comment?</h5>
            <div className='delete-post-buttons-container'>
                <button className='delete-post-cancel-button' onClick={cancelHandler}>Cancel</button>
                <button className='delete-post-confirmation-button' onClick={deleteHandler}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteCommentConfirmation;
