import React from 'react'
import UserDashboard from 'layouts/User/Dashboard/Dashboard'
import withAuth from 'utils/withAuth'
import { userActions } from '../actions';

class Dashboard extends React.Component {

    static async getInitialProps({ reduxStore, req }) {

      return { }
    }
   render() {
     return (   
        <UserDashboard user={this.props.user}>
          <main>
              <h3>
                Recent Events
              </h3>
              <p>
                List of recent events here
              </p>
          </main> 
        </UserDashboard>
     )
   }
}

export default withAuth(Dashboard);