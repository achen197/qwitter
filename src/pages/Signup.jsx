import React, { Component } from "react";
import styles from "./Pages.module.scss";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import login from "../static/images/sign-up.png";
import logo from "../static/images/logo.png";

import { connect } from "react-redux";
import { SignupUser } from "../redux/actions/userActions";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.SignupUser(newUserData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className={styles.Container}>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <div className={styles.Background}>
              <img src={login} alt="Login" />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={styles.LoginContainer}>
              <img src={logo} alt="Qwitter Logo" />
              <h2>
                Hey there stranger
                <span role="img" aria-label="Wave emoji">
                  👋
                </span>
                <br />
                Join the Qwitter-space.
              </h2>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  className={styles.textField}
                  value={this.state.email}
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  onChange={this.handleChange}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  className={styles.textField}
                  value={this.state.password}
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  onChange={this.handleChange}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  className={styles.textField}
                  value={this.state.confirmPassword}
                  helperText={errors.confirmPassword}
                  error={errors.confirmPassword ? true : false}
                  onChange={this.handleChange}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  id="handle"
                  name="handle"
                  type="text"
                  label="Handle"
                  className={styles.textField}
                  value={this.state.handle}
                  helperText={errors.handle}
                  error={errors.handle ? true : false}
                  onChange={this.handleChange}
                  margin="normal"
                  fullWidth
                />
                {errors.general && (
                  <p className={styles.WrongLogin}>{errors.general}</p>
                )}
                <button className={styles.Button} type="submit">
                  Register
                </button>
                <p className={styles.NewAccount}>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Signup.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { SignupUser }
)(Signup);
