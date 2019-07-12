import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import "../index.css";
import AuthRoute from "../components/AuthRoute";
import jwtDecode from "jwt-decode";
import { SET_AUTHENTICATED } from "../redux/types";
import { logoutUser, getUserData } from "../redux/actions/userActions";
import store from "../redux/store";
import axios from "axios";
import User from "./User";

// axios.defaults.baseURL =
//   'https://us-central1-qwitter-644ec.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class Routes extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          <Route exact path="/users/:handle" component={User} />
          <Route exact path ="/users/:handle/tweet/:tweetId" component={User}/>
        </Switch>
      </div>
    );
  }
}

export default Routes;
