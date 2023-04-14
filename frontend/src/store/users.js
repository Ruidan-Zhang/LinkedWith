import { csrfFetch } from "./csrf";

const LOAD_ALL_USERS = 'users/LOAD';
const LOAD_SINGLE_USER_PROFILE = 'profile/LOAD';
const CLEAN_UP_SINGLE_USER = 'profile/CLEANUP';

//action creators
export const loadAllUserAction = (users) => {
    return {
        type: LOAD_ALL_USERS,
        users
    }
};

export const loadUserProfileAction = (userId, profile) => {
    return {
        type: LOAD_SINGLE_USER_PROFILE,
        userId,
        profile
    }
};

export const cleanUpProfileAction = () => {
    return {
        type: CLEAN_UP_SINGLE_USER
    }
};

//thunks
export const getAllUserThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/users`);

    if (response.ok) {
        const allUsers = await response.json();
        dispatch(loadAllUserAction(allUsers));
        return allUsers;
    }
};

export const getUserProfileThunk = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/profile/${userId}`);

    if (response.ok) {
        const userProfile = await response.json();
        dispatch(loadUserProfileAction(userId, userProfile));
        return userProfile;
    }
};

//Profile reducer
const initialState = {};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        // case LOAD_ALL_USERS: {
        //     const newState = { ...state };
        //     action.users.forEach(user => {
        //         newState.allUsers[user.id] = user;
        //     });
        //     return newState;
        // };
        case LOAD_SINGLE_USER_PROFILE: {
            const newState = { ...state };
            newState[action.userId] = action.profile;
            return newState;
        };
        case CLEAN_UP_SINGLE_USER: {
            const newState = { ...initialState };
            return newState;
        };
        default:
            return state;
    }
};

export default usersReducer;
