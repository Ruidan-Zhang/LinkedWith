import { csrfFetch } from "./csrf";

const LOAD_ALL_USERS = 'users/LOAD';

//action creators
export const loadAllUserAction = (users) => {
    return {
        type: LOAD_ALL_USERS,
        users
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

//Profile reducer
const initialState = {};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_USERS: {
            const newState = { ...state };
            action.users.forEach(user => {
                newState[user.id] = user;
            });
            return newState;
        };
        default:
            return state;
    }
};

export default usersReducer;
