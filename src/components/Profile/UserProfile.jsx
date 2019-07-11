import React from "react";
import PropTypes from "prop-types";
import styles from "./Profile.module.scss";
import Icon from "@material-ui/core/Icon";
import moment from "moment";

const UserProfile = props => {
  const { profile: {handle, createdAt, imageUrl, bio, location, website} } = props;

  return (
    <div className={styles.ProfileContainer}>
        <div className={styles.ProfileImage}>
          <img src={imageUrl} alt="profile" />
        </div>
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
    </div>
  );
};

UserProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default UserProfile;
