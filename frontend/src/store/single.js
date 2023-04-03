import { csrfFetch } from "./csrf";

const LOAD_SINGLE_POST = 'singPost/LOAD';

export const loadSinglePostAction = (post) => {
    return {
        type: LOAD_SINGLE_POST,
        post
    }
};

export const loadSinglePostThunk = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}`);

    if (response.ok) {
        const foundPost = await response.json();
        dispatch(loadSinglePostAction(foundPost));
        return foundPost;
    }
};

//Single post reducer
const initialState = {};

const singlePostReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SINGLE_POST: {
            const newState = { ...state };
            newState[action.post.id] = action.post;
            return newState;
        }
        default:
            return state;
    }
};

export default singlePostReducer;
