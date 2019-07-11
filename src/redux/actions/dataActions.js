import {
  SET_TWEETS,
  LOADING_DATA,
  LIKE_TWEET,
  UNLIKE_TWEET,
  DELETE_TWEET,
  LOADING_UI,
  POST_TWEET,
  SET_ERRORS,
  SET_TWEET,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from "../types";
import axios from "axios";

export const getTweets = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/tweets")
    .then(res => {
      dispatch({
        type: SET_TWEETS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_TWEETS,
        payload: []
      });
    });
};

export const getTweet = tweetId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/tweet/${tweetId}`)
    .then(res => {
      dispatch({
        type: SET_TWEET,
        payload: res.data
      });
      dispatch({
        type: STOP_LOADING_UI
      });
    })
    .catch(err => console.error(err));
};

export const postTweet = newTweet => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/tweet", newTweet)
    .then(res => {
      dispatch({
        type: POST_TWEET,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const likeTweet = tweetId => dispatch => {
  axios
    .get(`/tweet/${tweetId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_TWEET,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const unlikeTweet = tweetId => dispatch => {
  axios
    .get(`/tweet/${tweetId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_TWEET,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const submitComment = (tweetId, commentData) => dispatch => {
  axios
    .post(`tweet/${tweetId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteTweet = tweetId => dispatch => {
  axios
    .delete(`/tweet/${tweetId}`)
    .then(() => {
      dispatch({ type: DELETE_TWEET, payload: tweetId });
    })
    .catch(err => console.log(err));
};

export const getUserData = userHandle => dispatch => {
    dispatch({type: LOADING_DATA});
    axios.get(`/user/${userHandle}`)
    .then(res => {
        dispatch({
            type: SET_TWEETS,
            payload: res.data.tweets
        })
    })
    .catch(() => {
        dispatch({
            type: SET_TWEETS,
            payload: null
        })
    })
}