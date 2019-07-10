import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Tooltip from "@material-ui/core/Tooltip";

import styles from "./Profile.module.scss";
import PropTypes from "prop-types";
import moment from "moment";
import Icon from "@material-ui/core/Icon";

import { logoutUser, updateImage } from "../../redux/actions/userActions";
import EditDetails from "./EditDetails";

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();

    formData.append("image", image, image.name);
    this.props.updateImage(formData);
  }

  handleUpdateImage = () => {
    const fileInput = document.getElementById("imageUpdate");
    fileInput.click();
  }

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      user: {
        credentials: { handle, createdAt, imageUrl, bio, location, website },
        loading,
        authenticated
      }
    } = this.props;

    let ProfileCard = !loading ? (
      authenticated ? (
        <div className={styles.ProfileContainer}>
          <Tooltip
            title="Update Profile Picture"
            aria-label="Update Profile Picture"
            placement="top"
          >
            <div
              className={styles.ProfileImage}
              onClick={this.handleUpdateImage}
            >
              <img src={imageUrl} alt="profile" />
            </div>
          </Tooltip>
          <input
            type="file"
            id="imageUpdate"
            onChange={this.handleImageChange}
            hidden="hidden"
          />
          <h3 className={styles.UserHandle}>@{handle}</h3>
          <p>{bio}</p>
          <p className={styles.Links}>
            <a href={website} target="_blank" rel="noopener noreferrer">
              <Icon>link</Icon>
              {website}
            </a>
          </p>
          <br />
          <p className={styles.Links}>
            <Icon>location_on</Icon>
            {location}
          </p>
          <br />
          <p className={styles.Links}>
            <Icon>calendar_today</Icon>Joined{" "}
            {moment(createdAt).format("MMMM YYYY")}
          </p>
          <br />
          <EditDetails />
          <button className={styles.Button} onClick={this.handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className={styles.ProfileContainer}>
          <h2>No profile found</h2>
          <Link to="/login">
            <button className={styles.Button}>Login</button>
          </Link>
          <Link to="/signup">
            <button className={styles.Button}>Sign up</button>
          </Link>
        </div>
      )
    ) : (
      <p>Loading...</p>
    );

    return ProfileCard;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = { logoutUser, updateImage };

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  updateImage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Profile);
