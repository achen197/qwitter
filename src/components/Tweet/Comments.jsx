import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Tweet.module.scss";

export class Comments extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div className={styles.CommentContainer}>
        {comments.map(comment => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <div key={createdAt} className={styles.Comment}>
              <div className={styles.User}>
                <Link to={`/users/${userHandle}`}>
                  <img src={userImage} alt={userHandle} />
                  <h3>@{userHandle}</h3>
                </Link>
              </div>
              <p className={styles.Body}>{body}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default Comments;
