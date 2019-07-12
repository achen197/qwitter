import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getTweet } from "../../redux/actions/dataActions";
import PropTypes from "prop-types";

import moment from "moment";
import { Link } from "react-router-dom";

import styles from "./Tweet.module.scss";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Icon from "@material-ui/core/Icon";
import { CircularProgress } from "@material-ui/core";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import LikeButton from "./Actions/LikeButton";
import DeleteButton from "./Actions/DeleteButton";

class TweetDialog extends Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    if (this.props.openDialog) {
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

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteButton tweetId={tweetId} />
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
          <div className={styles.Actions}>
            <div className={styles.Like}>
              <LikeButton tweetId={tweetId} />
              <span className={styles.LikeCount}>{likeCount}</span>
            </div>
            <div className={styles.Comment}>
              <Icon>comment</Icon>
              <span className={styles.LikeCount}>{commentCount}</span>
            </div>
            {deleteButton}
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
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tweet: state.data.tweet,
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  getTweet
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TweetDialog);
