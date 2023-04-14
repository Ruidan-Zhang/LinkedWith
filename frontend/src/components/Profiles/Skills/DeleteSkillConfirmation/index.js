import { useDispatch, useSelector } from 'react-redux';
import React from "react";
import { useHistory } from 'react-router-dom';
import { useModal } from '../../../../context/Modal';
import { deleteSkillThunk } from '../../../../store/profile';
import { getUserProfileThunk } from '../../../../store/users';

const DeleteSkillConfirmation = ({ skill }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const currentUser = useSelector(state => state.session.user);

    const deleteHandler = async (e) => {
        e.preventDefault();
        await dispatch(deleteSkillThunk(currentUser.id, skill.id));
        closeModal();
        history.push(`/profile/${currentUser.id}`);
        await dispatch(getUserProfileThunk(currentUser.id));
    };

    const cancelHandler = () => {
        closeModal();
    }

    return (
        <div className='delete-post-confirmation-container'>
            <h2 className='delete-post-title'>Delete skill?</h2>
            <h5 className='delete-post-body'>Are you sure you want to permanently remove this skill?</h5>
            <div className='delete-post-buttons-container'>
                <button className='delete-post-cancel-button' onClick={cancelHandler}>Cancel</button>
                <button className='delete-post-confirmation-button' onClick={deleteHandler}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteSkillConfirmation;
