import React from 'react'
import UserDashboard from 'layouts/User/Dashboard/Dashboard'
import { getCookie } from 'utils/Cookies'
import withAuth from 'utils/withAuth'
import KushyApi from 'utils/KushyApi'

import UserSettings from "components/User/UserSettings/UserSettings";

class DashboardSettings extends React.Component {

  static async getInitialProps({ reduxStore, req }) {
    // const token = getCookie('kushyFToken', req)

    // // const api = new KushyApi();
    // // // User endpoint requires token, 
    // // // attach to headers before fetching
    // // api.setToken(token);
    // // // Query API for token and get user profile
    // // let reviews
    // // await api.getUserReviews()
    // //   .then((results) => (
    // //     reviews = results
    // //   ));

    return {
      
    }
  }
  render() {
    const { user } = this.props;
    if (user.social) {
      const { facebook, instagram, tumblr, twitter } = user.social
    }


    console.log(user)
    return (
      <UserDashboard section="reviews" user={this.props.user}>
        <UserSettings user={ user } />
      </UserDashboard>
    )
  }
}

export default withAuth(DashboardSettings);