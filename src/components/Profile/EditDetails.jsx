import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { updateUserDetails } from "../../redux/actions/userActions";
import PropTypes from "prop-types";

import styles from "./EditDetails.module.scss";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    isOpen: false
  };

  handleOpen = () => {
    this.setState({
      isOpen: true
    });
    this.setUserDetails(this.props.credentials);
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };
    this.props.updateUserDetails(userDetails);
    this.handleClose();
  };

  setUserDetails = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : ""
    });
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.setUserDetails(credentials);
  }
  render() {
    return (
      <div>
        <button className={styles.Button} onClick={this.handleOpen}>
          Edit Profile
        </button>
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tell us a little bit about yourself, don't worry you can change this whenever you want.
            </DialogContentText>
            <div className={styles.TextField}>
              <TextField
                autoFocus
                id="bio"
                type="text"
                name="bio"
                label="Bio"
                placeholder="Do you like long walks on the beach?"
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
            </div>
            <div className={styles.TextField}>
              <TextField
                autoFocus
                id="website"
                type="text"
                name="website"
                label="Website"
                placeholder="Got a website that you want to share?"
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
            </div>
            <div className={styles.TextField}>
              <TextField
                autoFocus
                id="location"
                type="text"
                name="location"
                label="Location"
                placeholder="Where do you live?"
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

EditDetails.propTypes = {
  updateUserDetails: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { updateUserDetails }
)(EditDetails);
