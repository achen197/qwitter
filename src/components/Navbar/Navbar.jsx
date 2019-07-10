import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "../../static/images/logo.png";
import styles from "./Navbar.module.scss";
import Icon from "@material-ui/core/Icon";
import { postTweet, clearErrors } from "../../redux/actions/dataActions";

import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

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
    this.props.clearErrors();
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
                    <Icon>home</Icon> Home
                  </li>
                </Link>
                <Link to="/">
                  <li>
                    <Icon>notifications</Icon> Notifications
                  </li>
                </Link>
              </ul>
            </nav>
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
                fullWidth
                maxWidth="sm"
              >
                <DialogTitle id="form-dialog-title">New Tweet</DialogTitle>
                <form onSubmit={this.handleSubmit}>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="body"
                      name="body"
                      type="text"
                      label="Tweet"
                      multiline
                      fullWidth
                      rows="2"
                      placeholder="Vine quotes only pls"
                      error={errors.body ? true : false}
                      helperText={errors.body}
                      onChange={this.handleChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      type="button"
                      onClick={this.handleClose}
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" color="primary">
                      Tweet
                    </Button>
                  </DialogActions>
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
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  UI: state.UI
});

const mapActionsToProps = {
  postTweet,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Navbar);
