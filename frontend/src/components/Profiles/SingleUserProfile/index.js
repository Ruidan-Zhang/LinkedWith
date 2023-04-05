import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import OpenModalButton from "../../OpenModalButton";
import { useParams } from 'react-router-dom';
import { getAllUserThunk } from '../../../store/users';
import './SingleUserProfile.css';


const UserProfileComponent = () => {
    const dispatch = useDispatch();

    const { userId } = useParams();
    const targetUser = useSelector(state => state.allUsers[userId]);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAllUserThunk());
    }, [dispatch]);

    if (!targetUser) return null;

    return (
        <div className='user-profile-main-container'>
            <div className='user-profile-bio-container'>
                <img src={targetUser.image} />
                <div className='user-header-container'>
                    <div>{targetUser.firstName} {targetUser.lastName}</div>
                    <div>{targetUser.occupation}</div>
                </div>
            </div>
            <div className='user-experiences-container'>
                {targetUser.Experiences.map(experience => (
                    <div>
                        <div>
                            {experience.jobTitle}
                        </div>
                        <div>
                            {experience.companyName}
                        </div>
                        <div>
                            {experience.startedAt} - {experience.endedAt}
                        </div>
                    </div>
                ))}
            </div>
            <div className='user-skills-container'>
                {targetUser.Skills.map(skill => (
                    <div>{skill.content}</div>
                ))}
            </div>
        </div>
    )
};

export default UserProfileComponent;
