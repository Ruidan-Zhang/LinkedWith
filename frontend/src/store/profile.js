import { csrfFetch } from "./csrf";

const LOAD_EXPERIENCE = 'experiences/LOAD';
const CREATE_EXPERIENCE = 'experience/CREATE';
const EDIT_EXPERIENCE = 'experience/EDIT';
const DELETE_EXPERIENCE = 'experience/DELETE';

const LOAD_EDUCATION = 'educations/LOAD';
const CREATE_EDUCATION = 'education/CREATE';
const EDIT_EDUCATION = 'education/EDIT';
const DELETE_EDUCATION = 'education/DELETE';

const LOAD_SKILL = 'sklls/LOAD';
const CREATE_SKILL = 'skill/CREATE';
const EDIT_SKILL = 'skill/EDIT';
const DELETE_SKILL = 'skill/DELETE';

//action creators

//======================Experience action creators======================

export const loadUserExperienceAction = (userId, experiences) => {
    return {
        type: LOAD_EXPERIENCE,
        userId,
        experiences
    }
};

export const createExperienceAction = (userId, newExperience) => {
    return {
        type: CREATE_EXPERIENCE,
        userId,
        newExperience
    }
};

export const editExperienceAction = (userId, updatedExperience) => {
    return {
        type: EDIT_EXPERIENCE,
        userId,
        updatedExperience
    }
};

export const deleteExperienceAction = (userId, badExperienceId) => {
    return {
        type: DELETE_EXPERIENCE,
        userId,
        badExperienceId
    }
};

//======================Education action creators======================

export const loadUserEducationAction = (userId, educations) => {
    return {
        type: LOAD_EDUCATION,
        userId,
        educations
    }
};

export const createEducationAction = (userId, newEducation) => {
    return {
        type: CREATE_EDUCATION,
        userId,
        newEducation
    }
};

export const editEducationAction = (userId, updatedEducation) => {
    return {
        type: EDIT_EDUCATION,
        userId,
        updatedEducation
    }
};

export const deleteEducationAction = (userId, badEducationId) => {
    return {
        type: DELETE_EDUCATION,
        userId,
        badEducationId
    }
};

//======================Skill action creators======================

export const loadUserSkillAction = (userId, skills) => {
    return {
        type: LOAD_SKILL,
        userId,
        skills
    }
};

export const createSkillAction = (userId, newSkill) => {
    return {
        type: CREATE_SKILL,
        userId,
        newSkill
    }
};

export const editSkillAction = (userId, updatedSkill) => {
    return {
        type: EDIT_SKILL,
        userId,
        updatedSkill
    }
};

export const deleteSkillAction = (userId, badSkillId) => {
    return {
        type: DELETE_SKILL,
        userId,
        badSkillId
    }
};

//thunks

//======================Experience thunks======================

export const getUserExperienceThunk = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/profile/${userId}/experience`);

    if (response.ok) {
        const userExperiences = await response.json();
        dispatch(loadUserExperienceAction(userId, userExperiences));
        return userExperiences;
    }
};

export const createExperienceThunk = (userId, newExperience) => async dispatch => {
    const { companyName, jobTitle, startedAt, endedAt } = newExperience;
    const response = await csrfFetch(`/api/profile/${userId}/experience`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        companyName,
        jobTitle,
        startedAt,
        endedAt
      }),
    });

    if (response.ok) {
        const createdExperience = await response.json();
        dispatch(createExperienceAction(userId, createdExperience));
        return createdExperience;
    }
};

export const editExperienceThunk = (userId, experience) => async dispatch => {
    const response = await csrfFetch(`/api/profile/${userId}/experience/${experience.id}`, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(experience),
    });

    if (response.ok) {
        const updatedExperience = await response.json();
        dispatch(editExperienceAction(userId, updatedExperience));
        return updatedExperience;
    }
};

export const deleteExperienceThunk = (userId, badExperienceId) => async dispatch => {
    const response = await csrfFetch(`/api/profile/${userId}/experience/${badExperienceId}`, {
      method: "DELETE"
    });

    if (response.ok) {
        const badExperience = await response.json();
        dispatch(deleteExperienceAction(userId, badExperience.id));
        return badExperience;
    }
};

//======================Education thunks======================

export const createEducationThunk = (userId, newEducation) => async dispatch => {
    const { schoolName, startedAt, endedAt } = newEducation;
    const response = await csrfFetch(`/api/profile/${userId}/education`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        schoolName,
        startedAt,
        endedAt
      }),
    });

    if (response.ok) {
        const createdEducation = await response.json();
        dispatch(createEducationAction(userId, createdEducation));
        return createdEducation;
    }
};

export const editEducationThunk = (userId, education) => async dispatch => {
    const response = await csrfFetch(`/api/profile/${userId}/education/${education.id}`, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(education),
    });

    if (response.ok) {
        const updatedEducation = await response.json();
        dispatch(editEducationAction(userId, updatedEducation));
        return updatedEducation;
    }
};

export const deleteEducationThunk = (userId, badEducationId) => async dispatch => {
    const response = await csrfFetch(`/api/profile/${userId}/education/${badEducationId}`, {
      method: "DELETE"
    });

    if (response.ok) {
        const badEducation = await response.json();
        dispatch(deleteEducationAction(userId, badEducation.id));
        return badEducation;
    }
};

//======================Skill thunks======================

export const createSkillThunk = (userId, newSkill) => async dispatch => {
    const { content } = newSkill;
    const response = await csrfFetch(`/api/profile/${userId}/skill`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content
      }),
    });

    if (response.ok) {
        const createdSkill = await response.json();
        dispatch(createSkillAction(userId, createdSkill));
        return createdSkill;
    }
};

export const editSkillThunk = (userId, skill) => async dispatch => {
    const response = await csrfFetch(`/api/profile/${userId}/skill/${skill.id}`, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(skill),
    });

    if (response.ok) {
        const updatedSkill = await response.json();
        dispatch(editSkillAction(userId, updatedSkill));
        return updatedSkill;
    }
};

export const deleteSkillThunk = (userId, badSkillId) => async dispatch => {
    const response = await csrfFetch(`/api/profile/${userId}/skill/${badSkillId}`, {
      method: "DELETE"
    });

    if (response.ok) {
        const badSkill = await response.json();
        dispatch(deleteSkillAction(userId, badSkill.id));
        return badSkill;
    }
};

//Profile reducer
const initialState = {
    experiences: {},
    educations: {},
    skills: {}
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EXPERIENCE: {
            const newState = initialState;
            action.experiences.forEach(experience => {
                newState.experiences[experience.id] = experience;
            });
            return newState;
        };
        case CREATE_EXPERIENCE: {
            const newState = { ...state };
            newState.experiences[action.newExperience.id] = action.newExperience;
            return newState;
        };
        default:
            return state;
    }
};

export default profileReducer;
