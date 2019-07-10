import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { postTweet } from "../../redux/actions/dataActions";
import PropTypes from "prop-types";

import styles from "./Tweet.module.scss";

import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export class PostTweet extends Component {
  state = {
    isOpen: false,
    body: "",
    errors: []
  };

  componentWillReceiveProps(nextProps) {
      if(nextProps.UI.errors) {
          this.setState({
              errors: nextProps.UI.errors
          })
      }
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.postTweet({ body: this.state.body });
    this.handleClose();
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className={styles.Profile}>
          <Tooltip
            title="Post New Tweet"
            aria-label="Post New Tweet"
            placement="bottom"
          >
            <button className={styles.Button} onClick={this.handleOpen}>
              Tweet
            </button>
          </Tooltip>
          <Dialog
            open={this.state.isOpen}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">New Tweet</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="tweet"
                type="text"
                label="Tweet"
                multiline
                rows="2"
                fullWidth
                placeholder="Vine quotes only pls"
                error={errors.body ? true : false}
                helperText={errors.body}
                onChange={this.handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                Tweet
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

PostTweet.propTypes = {
  postTweet: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postTweet }
)(PostTweet);
