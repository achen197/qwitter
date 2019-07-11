import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import { CircularProgress } from "@material-ui/core";
import Tweet from "../components/Tweet/Tweet";
import UserProfile from "../components/Profile/UserProfile";

export class User extends Component {
  state = {
    profile: null,
    tweetIdParam: null,
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const tweetId = this.props.match.params.tweetId;

    if(tweetId) this.setState({tweetIdParam: tweetId})

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { tweets, loading } = this.props.data;
    const { tweetIdParam } = this.state;

    const tweetMarkup = loading ? (
      <CircularProgress size={30} />
    ) : tweets === null ? (
      <p>There are no tweets from this user</p>
    ) : !tweetIdParam ? (
        tweets.map(tweet => <Tweet key={tweet.tweetId} tweet={tweet} />)
    ) : (
        tweets.map(tweet => {
            if(tweet.tweetId !== tweetIdParam) return <Tweet key={tweet.tweetId} tweet={tweet} />
            else return <Tweet key={tweet.tweetId} tweet={tweet} openDialog/>
        })
    );

    return (
      <Grid container spacing={0}>
        <Grid item md={3} sm={12}>
          {this.state.profile === null ? (
            <p>Loading profile...</p>
          ) : (
            <UserProfile profile={this.state.profile} />
          )}
        </Grid>
        <Grid item md={6} sm={12}>
            {/* <p>{tweets}</p> */}
          <div>{tweetMarkup}</div>
        </Grid>
      </Grid>
    );
  }
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(User);
