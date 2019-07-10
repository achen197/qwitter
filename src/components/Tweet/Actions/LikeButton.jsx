import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "./Actions.module.scss";
import { connect } from "react-redux";
import { likeTweet, unlikeTweet } from "../../../redux/actions/dataActions";

export class LikeButton extends Component {
  likedTweet = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.tweetId === this.props.tweetId)
    )
      return true;
    else return false;
  };

  likeTweet = () => {
    this.props.likeTweet(this.props.tweetId);
  };

  unlikeTweet = () => {
    this.props.unlikeTweet(this.props.tweetId);
  };

  render() {
    const { authenticated } = this.props.user;
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
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  tweetId: PropTypes.string.isRequired,
  likeTweet: PropTypes.func.isRequired,
  unlikeTweet: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeTweet,
  unlikeTweet
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
