import React from 'react'
import UserDashboard from 'layouts/User/Dashboard/Dashboard'
import { getCookie } from 'utils/Cookies'
import withAuth from 'utils/withAuth'
import KushyApi from 'utils/KushyApi'
import { userActions } from '../actions';

import ActivityFeedItem from 'components/Activity/Feed/Item'

class Dashboard extends React.Component {

    static async getInitialProps({ reduxStore, req }) {

      const token = getCookie('kushyFToken', req)
      
      const api = new KushyApi();
      // User endpoint requires token, 
      // attach to headers before fetching
      api.setToken(token);
      // Query API for token and get user profile
      let activity
      await api.getUserActivity()
        .then((results) => (
          activity = results
        ));

      return {
        activity
       }
    }
   render() {
     console.log(this.props.activity);
     const { user, activity } = this.props;
     const activityItems = activity && activity.data.length > 0 ? activity.data.map((activity) => <ActivityFeedItem activity={ activity } user={ user } />) : ''
     return (   
        <UserDashboard user={this.props.user}>
          <article id="activity" class="ui segment">
              { activityItems ? 
                  
                  <section class="ui feed">
                    { activityItems }
                  </section>
              :
                <section class="content">
                  <p>No activity found</p>
                  <p>
                      <em>
                          Try reviewing your favorite <a href="/shops/">shops</a>, <a href="/strains/">strains</a>, <a href="/brands/">brands</a>, and <a href="/products/">products</a>.
                      </em>
                  </p>
              </section>
              }
          </article>
        </UserDashboard>
     )
   }
}

export default withAuth(Dashboard);