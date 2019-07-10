import React, { Component } from "react";
import styles from "./Pages.module.scss";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import login from "../static/images/sign-in.png";
import logo from "../static/images/logo.png";

import { connect } from "react-redux";
import { LoginUser } from "../redux/actions/userActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.LoginUser(userData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    // const {
    //   UI: { loading }
    // } = this.props;
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
                Hey there!
                <span role="img" aria-label="Wave emoji">
                  👋
                </span>
                <br />
                Good to see you again
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
                {errors.general && (
                  <p className={styles.WrongLogin}>{errors.general}</p>
                )}
                <button className={styles.Button} type="submit">
                  Login
                </button>
                <p className={styles.NewAccount}>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  LoginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  LoginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Login);
