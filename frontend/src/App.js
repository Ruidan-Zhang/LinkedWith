// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllPostsComponent from "./components/Posts/AllPosts";
import UserProfileComponent from "./components/Profiles/SingleUserProfile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="whole-page-container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && currentUser && (
        <Switch>
          <Route exact path="/">
            <AllPostsComponent />
          </Route>
          <Route exact={true} path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/feed'>
            <AllPostsComponent />
          </Route>
          <Route path='/profile/:userId'>
            <UserProfileComponent />
          </Route>
        </Switch>
      )}
      {!currentUser && isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/">
            <LoginFormPage />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
