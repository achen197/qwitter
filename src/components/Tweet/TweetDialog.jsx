import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { getTweet } from "../../redux/actions/dataActions";
import PropTypes from "prop-types";

import moment from "moment";
import { Link } from "react-router-dom";

import styles from "./Tweet.module.scss";

import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Icon from "@material-ui/core/Icon";
import { CircularProgress } from "@material-ui/core";
import Comments from "./Comments";

export class TweetDialog extends Component {
  state = {
    isOpen: false
  };

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
        // tweetId,
        body,
        createdAt,
        // likeCount,
        // commentCount,
        userImage,
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props;

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
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

TweetDialog.propTypes = {
  getTweet: PropTypes.func.isRequired,
  tweetId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  tweet: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tweet: state.data.tweet,
  UI: state.UI
});

const mapActionsToProps = {
  getTweet
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TweetDialog);
