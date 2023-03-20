import { csrfFetch } from "./csrf";

const LOAD_ALL_COMMENTS = 'comments/LOAD';
const CREATE_COMMENT = 'comment/CREATE';
const EDIT_COMMENT = 'comment/EDIT';
const DELETE_COMMENT = 'comment/DELETE';

//action creators
export const loadAllCommentsAction = (comments, postId) => {
    return {
        type: LOAD_ALL_COMMENTS,
        comments,
        postId
    }
};

export const createCommentAction = (postId, newComment) => {
    return {
        type: CREATE_COMMENT,
        postId,
        newComment
    }
};

export const editCommentAction = (updatedComment) => {
    return {
        type: EDIT_COMMENT,
        updatedComment
    }
};

export const deleteCommentAction = (badCommentId) => {
    return {
        type: DELETE_COMMENT,
        badCommentId
    }
};

//thunks
export const loadAllCommentsThunk = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}/comments`);

    if (response.ok) {
        const allComments = await response.json();
        dispatch(loadAllCommentsAction(postId, allComments));
        return allComments;
    }
};

export const createCommentThunk = (postId, newComment) => async dispatch => {
    const { content } = newComment;
    const response = await csrfFetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content
      }),
    });

    if (response.ok) {
        const createdComment = await response.json();
        dispatch(createCommentAction(postId, createdComment));
        return createdComment;
    }
};

export const editCommentThunk = (comment) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${comment.id}`, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(comment),
    });

    if (response.ok) {
        const updatedComment = await response.json();
        dispatch(editCommentAction(updatedComment));
        return updatedComment;
    }
};

export const deleteCommentThunk = (badCommentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${badCommentId}`, {
      method: "DELETE"
    });

    if (response.ok) {
        const badComment = await response.json();
        dispatch(deleteCommentAction(badComment.id));
        return badComment;
    }
};

//comments reducer
const initialState = {};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_COMMENTS: {
            const newState = { ...state };
            action.postId.commentArr.forEach(comment => {
                newState[comment.id] = comment;
            });
            return newState;
        };
        case CREATE_COMMENT: {
            const newState = { ...state };
            newState[action.newComment.id] = action.newComment;
            return newState;
        };
        case EDIT_COMMENT: {
            const newState = { ...state };
            newState[action.updatedComment.id] = action.updatedComment;
            return newState;
        };
        case DELETE_COMMENT: {
            const newState = { ...state };
            delete newState[action.badCommentId];
            return newState;
        };
        default:
            return state;
    }
};

export default commentsReducer;
