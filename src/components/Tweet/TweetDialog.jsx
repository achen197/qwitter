import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getTweet } from "../../redux/actions/dataActions";
import PropTypes from "prop-types";

import moment from "moment";
import { Link } from "react-router-dom";

import styles from "./Tweet.module.scss";
import {
  likeTweet,
  unlikeTweet,
  deleteTweet
} from "../../redux/actions/dataActions";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Icon from "@material-ui/core/Icon";
import { CircularProgress } from "@material-ui/core";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

export class TweetDialog extends Component {
  state = {
    isOpen: false,
    oldPath: '',
    newPath: ''
  };

  componentDidMount() {
      if(this.props.openDialog) {
          this.handleOpen();
      }
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
    this.props.getTweet(this.props.tweetId);
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  likedTweet = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.tweetId === this.props.tweet.tweetId
      )
    )
      return true;
    else return false;
  };

  likeTweet = () => {
    this.props.likeTweet(this.props.tweet.tweetId);
  };

  unlikeTweet = () => {
    this.props.unlikeTweet(this.props.tweet.tweetId);
  };

  deleteTweet = () => {
    this.props.deleteTweet(this.props.tweet.tweetId);
  };

  render() {
    const {
      tweet: {
        tweetId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      user: {
        authenticated,
        credentials: { handle }
      },
      UI: { loading }
    } = this.props;

    const likeButton = !authenticated ? (
      <Link to="/login">
        <Icon>favorite_border</Icon>
      </Link>
    ) : this.likedTweet() ? (
      <Tooltip title="Unlike Tweet" aria-label="Unlike Tweet" placement="top">
        <button className={styles.Button} onClick={this.unlikeTweet}>
          <Icon>favorite</Icon>
        </button>
      </Tooltip>
    ) : (
      <Tooltip title="Like Tweet" aria-label="Like Tweet" placement="top">
        <button className={styles.Button} onClick={this.likeTweet}>
          <Icon>favorite_border</Icon>
        </button>
      </Tooltip>
    );

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

    const dialogMarkup = loading ? (
      <div className={styles.Loading}>
        <CircularProgress size={30} />
      </div>
    ) : (
      <div className={styles.DialogContainer}>
        <div className={styles.User}>
          <Link to={`/users/${userHandle}`}>
            <img src={userImage} alt={userHandle} />
            <h3>@{userHandle}</h3>
          </Link>
        </div>
        <div className={styles.Body}>
          <p className={styles.Tweet}>{body}</p>
          <p className={styles.Timestamp}>
            {moment(createdAt).format("H:mm - D MMM YYYY")}
          </p>
          <div className={styles.Like}>
            {likeButton}
            <span className={styles.LikeCount}>{likeCount}</span>
            {deleteButton}
            <span className={styles.LikeCount}>{commentCount}</span>
          </div>
          <CommentForm tweetId={tweetId} />
        <hr />
        </div>
        <Comments comments={comments} />
      </div>
    );
    return (
      <Fragment>
        <Tooltip title="Comment" aria-label="Comment" placement="top">
          <button onClick={this.handleOpen} className={styles.Button}>
            <Icon>comment</Icon>
          </button>
        </Tooltip>
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogContent>{dialogMarkup}</DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

TweetDialog.propTypes = {
  getTweet: PropTypes.func.isRequired,
  tweetId: PropTypes.string.isRequired,
  tweet: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  likeTweet: PropTypes.func.isRequired,
  unlikeTweet: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteTweet: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tweet: state.data.tweet,
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  likeTweet,
  unlikeTweet,
  deleteTweet,
  getTweet
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TweetDialog);
