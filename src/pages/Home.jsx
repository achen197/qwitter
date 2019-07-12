import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Tweet from "../components/Tweet/Tweet";
import Profile from "../components/Profile/Profile";

import { connect } from "react-redux";
import { getTweets } from "../redux/actions/dataActions";

class Home extends Component {
  componentDidMount() {
    this.props.getTweets();
  }

  render() {
    const { tweets, loading } = this.props.data;
    let tweetMarkup = !loading ? (
      tweets.map(tweet => <Tweet key={tweet.tweetId} tweet={tweet} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={0}>
        <Grid item md={3} sm={12}>
          <Profile />
        </Grid>
        <Grid item md={6} sm={12}>
          <div>{tweetMarkup}</div>
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getTweets: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getTweets }
)(Home);
