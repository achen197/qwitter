import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "../../static/images/logo.png";
import styles from "./Navbar.module.scss";
import Icon from "@material-ui/core/Icon";
import { postTweet } from "../../redux/actions/dataActions";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Notifications from "../Tweet/Actions/Notifications"

class Navbar extends Component {
  state = {
    isOpen: false,
    body: "",
    errors: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors) {
      this.setState({ body: "", isOpen: false });
    }
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false, errors: {} });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.postTweet({ body: this.state.body });
  };

  render() {
    const { authenticated } = this.props;
    const { errors } = this.state;

    return (
      <div>
        {authenticated ? (
          <div className={styles.NavbarContainer}>
            <img className={styles.logo} src={logo} alt="Qwitter Logo" />
            <nav>
              <ul>
                <Link to="/">
                  <li>
                    <Icon>home</Icon>
                  </li>
                </Link>
                <Link to="/">
                  <li>
                    <Notifications />                     
                  </li>
                </Link>
              </ul>
            </nav>
            <div className={styles.Profile}>
              <button className={styles.Button} onClick={this.handleOpen}>
                Tweet
              </button>
              <Dialog
                open={this.state.isOpen}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="sm"
              >
                <DialogTitle id="form-dialog-title">Compose a new Tweet</DialogTitle>
                <form onSubmit={this.handleSubmit}>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="body"
                      name="body"
                      type="text"
                      label="New Tweet"
                      multiline
                      fullWidth
                      rows="4"
                      placeholder="What's happening?"
                      error={errors.body ? true : false}
                      helperText={errors.body}
                      onChange={this.handleChange}
                      variant="outlined"
                    />
                  </DialogContent>
                  <div className={styles.Actions}>
                    <button
                      className={styles.Button}
                      type="submit"
                      disabled={!this.state.body}
                    >
                      Tweet
                    </button>
                  </div>
                </form>
              </Dialog>
            </div>
          </div>
        ) : (
          <div className={styles.NavbarContainer}>
            <img className={styles.logo} src={logo} alt="Qwitter Logo" />
          </div>
        )}
      </div>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  postTweet: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  UI: state.UI
});

const mapActionsToProps = {
  postTweet
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Navbar);
