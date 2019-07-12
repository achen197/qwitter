import React, { Component } from "react";
import { deleteTweet } from "../../../redux/actions/dataActions";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "./Actions.module.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DeleteButton extends Component {
  deleteTweet = () => {
    this.props.deleteTweet(this.props.tweetId);
  };

  render() {
    return (
      <div className={styles.Delete}>
        <Tooltip title="Delete Tweet" aria-label="Delete Tweet" placement="top">
          <button className={styles.Button} onClick={this.deleteTweet}>
            <Icon>delete_outline</Icon>
          </button>
        </Tooltip>
      </div>
    );
  }
}

DeleteButton.propTypes = {
  deleteTweet: PropTypes.func.isRequired,
  tweetId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteTweet }
)(DeleteButton);
