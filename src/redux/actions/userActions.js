import {
  SET_UNAUTHENTICATED,
  SET_USER,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ERRORS,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from "../types";
import axios from "axios";

export const LoginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(res => {
      setAuthHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const SignupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then(res => {
      setAuthHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then(res => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch(err => console.error(err));
};

export const updateImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const updateUserDetails = userDetails => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const markNotificatiosnAsRead = notificationId => dispatch => {
  axios.post("/notifications", notificationId)
    .then(res => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      })
    })
    .catch(err => console.log(err));
}

const setAuthHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", `Bearer ${token}`);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
