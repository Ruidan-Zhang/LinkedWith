// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const EDIT_USER_PROFILE = 'session/EDIT';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const editUserProfileAction = (user) => {
  return {
    type: EDIT_USER_PROFILE,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const signup = (user) => async (dispatch) => {
    const { firstName, lastName, email, occupation, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        occupation,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const editUserProfileThunk = (user) => async dispatch => {
  const { image, firstName, lastName, occupation } = user;

  const formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('occupation', occupation);

  if (image) formData.append('image', image);

  const response = await csrfFetch(`/api/session`, {
    method: "PUT",
    headers: {"Content-Type": "multipart/form-data"},
    body: formData
  });

  if (response.ok) {
      const updatedUserProfile = await response.json();
      dispatch(editUserProfileAction(updatedUserProfile));
      return updatedUserProfile;
  }
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case EDIT_USER_PROFILE:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
