import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";

import styles from "./Tweet.module.scss";

import { connect } from "react-redux";
import { deleteTweet } from "../../redux/actions/dataActions";
import TweetDialog from "./TweetDialog";
import { LikeButton } from "./Actions/LikeButton";

class Tweet extends Component {
  // likedTweet = () => {
  //   if (
  //     this.props.user.likes &&
  //     this.props.user.likes.find(
  //       like => like.tweetId === this.props.tweet.tweetId
  //     )
  //   )
  //     return true;
  //   else return false;
  // };

  // likeTweet = () => {
  //   this.props.likeTweet(this.props.tweet.tweetId);
  // };

  // unlikeTweet = () => {
  //   this.props.unlikeTweet(this.props.tweet.tweetId);
  // };

  deleteTweet = () => {
    this.props.deleteTweet(this.props.tweet.tweetId);
  };

  render() {
    const {
      tweet: {
        body,
        createdAt,
        userImage,
        userHandle,
        tweetId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    // const likeButton = !authenticated ? (
    //   <Link to="/login">
    //     <Icon>favorite_border</Icon>
    //   </Link>
    // ) : this.likedTweet() ? (
    //   <Tooltip title="Unlike Tweet" aria-label="Unlike Tweet" placement="top">
    //     <button className={styles.Button} onClick={this.unlikeTweet}>
    //       <Icon>favorite</Icon>
    //     </button>
    //   </Tooltip>
    // ) : (
    //   <Tooltip title="Like Tweet" aria-label="Like Tweet" placement="top">
    //     <button className={styles.Button} onClick={this.likeTweet}>
    //       <Icon>favorite_border</Icon>
    //     </button>
    //   </Tooltip>
    // );

    const deleteButton =
      authenticated && userHandle === handle ? (
        <div className={styles.Delete}>
          <Tooltip
            title="Delete Tweet"
            aria-label="Delete Tweet"
            placement="top"
          >
            <button className={styles.Button} onClick={this.deleteTweet}>
              <Icon>delete_outline</Icon>
            </button>
          </Tooltip>
        </div>
      ) : null;

    return (
      <div key={tweetId} className={styles.CardContainer}>
        <div className={styles.User}>
          <Link to={`/users/${userHandle}`}>
            <span>
              <img src={userImage} alt={userHandle} />
            </span>
            <span className={styles.UserHandle}>@{userHandle}</span>
          </Link>
        </div>
        <p className={styles.Timestamp}>{moment(createdAt).fromNow()}</p>
        <p className={styles.Body}>{body}</p>
        <div className={styles.Delete}>{deleteButton}</div>
        <div className={styles.Actions}>
          <div className={styles.Like}>
            <LikeButton tweetId={tweetId} user={authenticated}/>
            <span className={styles.LikeCount}>{likeCount}</span>
          </div>
          <div className={styles.Comment}>
            <TweetDialog tweetId={tweetId} userHandle={userHandle} />
            <span className={styles.Count}>{commentCount}</span>
          </div>
        </div>
      </div>
    );
  }
}

Tweet.propTypes = {
  user: PropTypes.object.isRequired,
  tweet: PropTypes.object.isRequired,
  deleteTweet: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapActionsToProps = {
  deleteTweet
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Tweet);
