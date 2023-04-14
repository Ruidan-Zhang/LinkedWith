import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from "react";
import OpenModalButton from "../../OpenModalButton";
import { useParams } from 'react-router-dom';
import CreateExperienceForm from '../Experiences/CreateExperiences';
import EditExperienceForm from '../Experiences/EditExperiences';
import DeleteExperienceConfirmation from '../Experiences/DeleteExperienceConfirmation';
import CreateEducationForm from '../Educations/CreateEducations';
import EditEducationForm from '../Educations/EditEducations';
import DeleteEducationConfirmation from '../Educations/DeleteEducationConfirmation';
import CreateSkillForm from '../Skills/CreateSkills';
import EditSkillForm from '../Skills/EditSkills';
import DeleteSkillConfirmation from '../Skills/DeleteSkillConfirmation';
import workIcon from '../../../assets/working-experience-icon.png';
import educationIcon from '../../../assets/educationIcon.png';
import { getUserProfileThunk } from '../../../store/users';
import { cleanUpProfileAction } from '../../../store/users';
import './SingleUserProfile.css';

const UserProfileComponent = () => {
    const dispatch = useDispatch();

    const { userId } = useParams();

    const targetUserProfileObj = useSelector(state => state.users);
    const targetUser = targetUserProfileObj[userId];
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getUserProfileThunk(userId));
        return () => dispatch(cleanUpProfileAction());
    }, [dispatch, userId]);

    if (!targetUserProfileObj || !targetUser) return null;

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
                {(targetUser.Experiences.length > 0) && (
                    <div className='user-experiences-container'>
                        <div className='experience-header-container'>
                            <div className='experience-header'>Experience</div>
                            {targetUser.id === currentUser.id && (
                            <div>
                                    <OpenModalButton
                                    buttonText={<i className="fa-thin fa-plus fa-2xl"></i>}
                                    modalComponent={<CreateExperienceForm />}
                                    className='add-experience-button'
                                />
                            </div>
                            )}
                        </div>
                        {targetUser.Experiences.sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt)).map(experience => (
                            <div className='single-experience-card-container'>
                                <div className='single-experience-left-container'>
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
                                {targetUser.id === currentUser.id && (
                                    <div className='single-experience-right-container'>
                                        <div>
                                            <OpenModalButton
                                            buttonText={<i className="fa-solid fa-pen-to-square"></i>}
                                            modalComponent={<EditExperienceForm experience={experience}/>}
                                            className='single-post-edit-button'
                                            />
                                        </div>
                                        <div>
                                            <OpenModalButton
                                            buttonText={<i className="fa-regular fa-trash-can"></i>}
                                            modalComponent={<DeleteExperienceConfirmation experience={experience}/>}
                                            className='single-post-delete-button'
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {(targetUser.Education.length > 0) && (
                    <div className='user-experiences-container'>
                        <div className='experience-header-container'>
                            <div className='experience-header'>Education</div>
                            {targetUser.id === currentUser.id && (
                            <div>
                                    <OpenModalButton
                                    buttonText={<i className="fa-thin fa-plus fa-2xl"></i>}
                                    modalComponent={<CreateEducationForm />}
                                    className='add-experience-button'
                                />
                            </div>
                            )}
                        </div>
                        {targetUser.Education.sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt)).map(education => (
                            <div className='single-experience-card-container'>
                                <div className='single-experience-left-container'>
                                    <img className='working-experience-icon' src={educationIcon} />
                                    <div className='single-experience-card'>
                                        <div className='company-name'>
                                            {education.schoolName}
                                        </div>
                                        <div className='working-timeline'>
                                            {education.startedAt.slice(0, 7)} - {education.endedAt.slice(0, 7)}
                                        </div>
                                    </div>
                                </div>
                                {targetUser.id === currentUser.id && (
                                    <div className='single-experience-right-container'>
                                        <div>
                                            <OpenModalButton
                                            buttonText={<i className="fa-solid fa-pen-to-square"></i>}
                                            modalComponent={<EditEducationForm education={education}/>}
                                            className='single-post-edit-button'
                                            />
                                        </div>
                                        <div>
                                            <OpenModalButton
                                            buttonText={<i className="fa-regular fa-trash-can"></i>}
                                            modalComponent={<DeleteEducationConfirmation education={education}/>}
                                            className='single-post-delete-button'
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {/* <div className='user-skills-container'>
                    <div className='experience-header'>Skills</div>
                    {targetUser.Skills.map(skill => (
                        <div className='single-skill-card'>{skill.content}</div>
                    ))}
                </div> */}
                {(targetUser.Skills.length > 0) && (
                    <div className='user-experiences-container'>
                        <div className='experience-header-container'>
                            <div className='experience-header'>Skills</div>
                            {targetUser.id === currentUser.id && (
                            <div>
                                    <OpenModalButton
                                    buttonText={<i className="fa-thin fa-plus fa-2xl"></i>}
                                    modalComponent={<CreateSkillForm />}
                                    className='add-experience-button'
                                />
                            </div>
                            )}
                        </div>
                        {targetUser.Skills.map(skill => (
                            <div className='single-experience-card-container'>
                                <div className='single-experience-left-container'>
                                    <div className='single-experience-card'>
                                        <div className='single-skill-card'>{skill.content}</div>
                                    </div>
                                </div>
                                {targetUser.id === currentUser.id && (
                                    <div className='single-experience-right-container'>
                                        <div>
                                            <OpenModalButton
                                            buttonText={<i className="fa-solid fa-pen-to-square"></i>}
                                            modalComponent={<EditSkillForm skill={skill}/>}
                                            className='single-post-edit-button'
                                            />
                                        </div>
                                        <div>
                                            <OpenModalButton
                                            buttonText={<i className="fa-regular fa-trash-can"></i>}
                                            modalComponent={<DeleteSkillConfirmation skill={skill}/>}
                                            className='single-post-delete-button'
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
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
