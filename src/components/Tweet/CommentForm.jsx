import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";
import styles from "./Tweet.module.scss";
import TextField from "@material-ui/core/TextField";

class CommentForm extends Component {
  state = {
    body: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if(!nextProps.UI.errors && !nextProps.UI.loading) {
        this.setState({
            body: ''
        })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitComment(this.props.tweetId, { body: this.state.body });
  };

  render() {
    const { authenticated } = this.props;
    const { errors } = this.state;

    const commentForm = authenticated ? (
      <div className={styles.CommentFormContainer}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="body"
            variant="outlined"
            name="body"
            type="text"
            label="Tweet your reply"
            fullWidth
            error={errors.body ? true : false}
            helperText={errors.body}
            onChange={this.handleChange}
            value={this.state.body}
          />
          <div className={styles.Actions}>
            <button className={styles.Button} type="submit" disabled={!this.state.body}>
              Comment
            </button>
          </div>
        </form>
      </div>
    ) : null;
    return commentForm;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  tweetId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { submitComment }
)(CommentForm);
