import {
  SET_TWEETS,
  SET_TWEET,
  LIKE_TWEET,
  UNLIKE_TWEET,
  LOADING_DATA,
  DELETE_TWEET,
  POST_TWEET,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  tweets: [],
  tweet: {},
  isLoading: false
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case LOADING_DATA:
      return {
        ...state,
        isLoading: true
      };
    case SET_TWEETS:
      return {
        ...state,
        tweets: actions.payload,
        isLoading: false
      };
    case SET_TWEET:
      return {
        ...state,
        tweet: actions.payload,
        isLoading: false
      };
    case LIKE_TWEET:
    case UNLIKE_TWEET:
      let index = state.tweets.findIndex(
        tweet => tweet.tweetId === actions.payload.tweetId
      );
      state.tweets[index] = actions.payload;
      if (state.tweet.tweetId === actions.payload.tweetId) {
        state.tweet = actions.payload;
      }
      return {
        ...state
      };
    case DELETE_TWEET:
      let deleteIndex = state.tweets.findIndex(
        tweet => tweet.tweetId === actions.payload
      );
      state.tweets.splice(deleteIndex, 1);
      return {
        ...state
      };
    case POST_TWEET:
      return {
        ...state,
        tweets: [actions.payload, ...state.tweets]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        tweet: {
          ...state.tweet,
          comments: [actions.payload, ...state.tweet.comments]
        }
      };
    default:
      return state;
  }
}
