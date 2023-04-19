import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import postsReducer from "./posts";
import commentsReducer from "./comments";
import profileReducer from "./profile";
import usersReducer from "./users";
import likesReducer from "./likes";

const rootReducer = combineReducers({
  session: sessionReducer,
  posts: postsReducer,
  comments: commentsReducer,
  profile: profileReducer,
  users: usersReducer,
  likes: likesReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
