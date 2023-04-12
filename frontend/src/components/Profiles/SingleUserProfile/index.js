import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import OpenModalButton from "../../OpenModalButton";
import { useParams } from 'react-router-dom';
import { getAllUserThunk } from '../../../store/users';
import './SingleUserProfile.css';
import workIcon from '../../../assets/working-experience-icon.png';

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
            <div className='profile-page-left-container'>
                <div className='user-profile-bio-container'>
                    <img className='profile-page-user-image' src={targetUser.image} />
                    <div className='user-header-container'>
                        <div className='profile-page-user-name'>{targetUser.firstName} {targetUser.lastName}</div>
                        <div className='profile-page-user-occupation'>{targetUser.occupation}</div>
                    </div>
                </div>
                <div className='user-experiences-container'>
                    <div className='experience-header'>Experience</div>
                    {targetUser.Experiences.map(experience => (
                        <div className='single-experience-card-container'>
                            <img className='working-experience-icon' src={workIcon} />
                            <div className='single-experience-card'>
                                <div className='working-title'>
                                    {experience.jobTitle}
                                </div>
                                <div className='company-name'>
                                    {experience.companyName}
                                </div>
                                <div className='working-timeline'>
                                    {experience.startedAt.slice(0, 7)} - {experience.endedAt.slice(0, 7)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='user-skills-container'>
                    <div className='experience-header'>Skills</div>
                    {targetUser.Skills.map(skill => (
                        <div className='single-skill-card'>{skill.content}</div>
                    ))}
                </div>
            </div>
            <div className='profile-page-right-container'>
                <h3 className="right-card-title">About LinkedWith</h3>
                <h5 className="right-card-description">
                    LinkedWith, a LinkedIn clone website, is a professional social networking platform that allows users to create profiles, connect with other professionals, and showcase their skills and experience.
                </h5>
            </div>
        </div>
    )
};

export default UserProfileComponent;
