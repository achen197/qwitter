import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import styles from "./Tweet.module.scss";
import { connect } from "react-redux";
import TweetDialog from "./TweetDialog";
import LikeButton from "./Actions/LikeButton";
import DeleteButton from "./Actions/DeleteButton";

class Tweet extends Component {

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

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteButton tweetId={tweetId} />
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
            <LikeButton tweetId={tweetId} />
            <span className={styles.LikeCount}>{likeCount}</span>
          </div>
          <div className={styles.Comment}>
            <TweetDialog
              tweetId={tweetId}
              userHandle={userHandle}
              openDialog={this.props.openDialog}
            />
            <span className={styles.Count}>{commentCount}</span>
          </div>
        </div>
      </div>
    );
  }
}

Tweet.propTypes = {
  // likeTweet: PropTypes.func.isRequired,
  // unlikeTweet: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  tweet: PropTypes.object.isRequired,
  tweetId: PropTypes.string,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps
)(Tweet);
