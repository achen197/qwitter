import React, { Component } from "react";
import styles from "./Actions.module.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import Icon from "@material-ui/core/Icon";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { markNotificatiosnAsRead } from "../../../redux/actions/userActions";
import { Badge } from "@material-ui/core";

class Notifications extends Component {
  state = {
    anchorEl: null
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.target });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onMenuOpen = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter(not => !not.read)
      .map(not => not.notificationId);
    this.props.markNotificatiosnAsRead(unreadNotificationsIds);
  };

  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    let notificationIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter(not => not.read === false).length > 0
        ? (notificationIcon = (
            <Badge
              badgeContent={
                notifications.filter(not => not.read === false).length
              }
              color="secondary"
            >
              <Icon>notifications</Icon>
            </Badge>
          ))
        : (notificationIcon = <Icon>notifications</Icon>);
    } else {
      notificationIcon = <Icon>notifications</Icon>;
    }

    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map(not => {
          const verb = not.type === "like" ? "liked" : "commented on";
          const time = moment(not.createdAt).fromNow();
          const iconColor = not.read ? "primary" : "secondary";
          const icon =
            not.type === "like" ? (
              <Icon color={iconColor}>favorite</Icon>
            ) : (
              <Icon color={iconColor}>comment</Icon>
            );
          return (
            <Link to={`/users/${not.recipient}/tweet/${not.tweetId}`}  key={not.createdAt}>
              <MenuItem onClick={this.handleClose}>
                {icon}
                <div className={styles.Notifications}>
                  <p>
                    {not.sender} {verb} your tweet
                    <span className={styles.Timestamp}>{time}</span>
                  </p>
                </div>
              </MenuItem>
            </Link>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications
        </MenuItem>
      );
    return (
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleOpen}
        >
          {notificationIcon}
        </Button>
        <Menu
          id="simple-menu"
          getContentAnchorEl={null}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpen}
        >
          {notificationsMarkup}
        </Menu>
      </div>
    );
  }
}

Notifications.propTypes = {
  markNotificatiosnAsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  notifications: state.user.notifications
});

export default connect(
  mapStateToProps,
  { markNotificatiosnAsRead }
)(Notifications);
