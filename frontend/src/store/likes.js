import { csrfFetch } from "./csrf";

const LOAD_USER_LIKES = 'userLikes/LOAD';
const LOAD_POST_LIKES = 'postLikes/LOAD';
const CREATE_LIKES = 'likes/CREATE';
const DELETE_LIKES = 'likes/DELETE';

//action creators
export const loadUserLikesAction = (userId, likes) => {
    return {
        type: LOAD_USER_LIKES,
        userId,
        likes
    }
};

export const loadPostLikesAction = (postId, likes) => {
    return {
        type: LOAD_POST_LIKES,
        postId,
        likes
    }
};

export const createLikeAction = (postId, newLike) => {
    return {
        type: CREATE_LIKES,
        postId,
        newLike
    }
};

export const deleteLikeAction = (badLikeId) => {
    return {
        type: DELETE_LIKES,
        badLikeId
    }
};

//thunks
export const loadUserLikesThunk = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/users/${userId}`);

    if (response.ok) {
        const allLikes = await response.json();
        dispatch(loadUserLikesAction(userId, allLikes));
        return allLikes;
    }
};

export const loadPostLikesThunk = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/posts/${postId}`);

    if (response.ok) {
        const allLikes = await response.json();
        dispatch(loadPostLikesAction(postId, allLikes));
        return allLikes;
    }
};

export const createLikeThunk = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/${postId}`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        const createdLike = await response.json();
        dispatch(createLikeAction(postId, createdLike));
        return createdLike;
    }
};

export const deleteLikeThunk = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/${postId}`, {
      method: "DELETE"
    });

    if (response.ok) {
        const badLike = await response.json();
        dispatch(deleteLikeAction(badLike.id));
        return badLike;
    }
};

//likes reducer
const initialState = {};

const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_LIKES: {
            const newState = { ...state };
            action.likes.Likes.forEach(like => {
                newState[like.id] = like;
            });
            return newState;
        };
        case CREATE_LIKES: {
            const newState = { ...state };
            newState[action.newLike.id] = action.newLike;
            return newState;
        };
        case DELETE_LIKES: {
            const newState = { ...state };
            delete newState[action.badLikeId];
            return newState;
        };
        default:
            return state;
    }
};

export default likesReducer;
