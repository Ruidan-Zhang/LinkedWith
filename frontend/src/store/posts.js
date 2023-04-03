import { csrfFetch } from "./csrf";

const LOAD_ALL_POSTS = 'posts/LOAD';
const CREATE_POST = 'post/CREATE';
const EDIT_POST = 'post/EDIT';
const DELETE_POST = 'post/DELETE';

//action creators
export const loadAllPostsAction = (posts) => {
    return {
        type: LOAD_ALL_POSTS,
        posts
    }
};

export const createPostAction = (newPost) => {
    return {
        type: CREATE_POST,
        newPost
    }
};

export const editPostAction = (updatedPost) => {
    return {
        type: EDIT_POST,
        updatedPost
    }
};

export const deletePostAction = (badPostId) => {
    return {
        type: DELETE_POST,
        badPostId
    }
};

//thunks
export const getAllPostsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/posts');

    if (response.ok) {
        const allPosts = await response.json();
        dispatch(loadAllPostsAction(allPosts));
        return allPosts;
    }
};

export const createPostThunk = (post) => async dispatch => {
    const { content, image } = post;

    const formData = new FormData();
    formData.append('content', content);

    if (image) formData.append('image', image);

    const response = await csrfFetch("/api/posts", {
      method: "POST",
      headers: {"Content-Type": "multipart/form-data"},
      body: formData
    });

    if (response.ok) {
        const createdPost = await response.json();
        dispatch(createPostAction(createdPost));
        return createdPost;
    }
};

export const editPostThunk = (post) => async dispatch => {
    const { content, image } = post;

    const formData = new FormData();
    formData.append('content', content);

    if (image) formData.append('image', image);

    const response = await csrfFetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: {"Content-Type": "multipart/form-data"},
      body: formData
    });

    if (response.ok) {
        const updatedPost = await response.json();
        dispatch(editPostAction(updatedPost));
        return updatedPost;
    }
};

export const deletePostThunk = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}`, {
      method: "DELETE"
    });

    if (response.ok) {
        const badPost = await response.json();
        dispatch(deletePostAction(postId));
        return badPost;
    }
};

//Posts reducer
const initialState = {};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_POSTS: {
            const newState = { ...state };
            action.posts.forEach(post => {
                newState[post.id] = post;
            });
            return newState;
        };
        case CREATE_POST: {
            const newState = { ...state };
            newState[action.newPost.id] = action.newPost;
            return newState;
        };
        case EDIT_POST: {
            const newState = { ...state };
            newState[action.updatedPost.id] = action.updatedPost;
            return newState;
        };
        case DELETE_POST: {
            const newState = { ...state };
            delete newState[action.badPostId];
            return newState;
        };
        default:
            return state;
    }
};

export default postsReducer;
