import { csrfFetch } from "./csrf";

const LOAD_USER_PROFILE = 'profile/LOAD';

//action creators
export const loadUserProfileAction = (proile) => {
    return {
        type: LOAD_USER_PROFILE,
        proile
    }
};

//thunks
export const getUserProfileThunk = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/profile/${userId}`);

    if (response.ok) {
        const userProfile = await response.json();
        dispatch(loadUserProfileAction(userProfile));
        return userProfile;
    }
};

//Profile reducer
const initialState = {};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_PROFILE: {
            const newState = { ...state };
            // action.posts.forEach(post => {
            //     newState[post.id] = post;
            // });
            return newState;
        };
        default:
            return state;
    }
};

export default profileReducer;
