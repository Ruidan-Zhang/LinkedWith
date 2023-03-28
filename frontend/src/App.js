// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllPostsComponent from "./components/Posts/AllPosts";
import Footer from "./components/Footer";

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
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route  exact path='/feed'>
            <AllPostsComponent />
          </Route>
          <Route exact path="/">
            <LoginFormPage />
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
      <Footer />
    </div>
  );
}

export default App;
