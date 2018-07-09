import React from 'react'
import withAuth from '../utils/withAuth'
import { userActions } from '../actions';

import Header from '../containers/header';

class Dashboard extends React.Component {

    static async getInitialProps({ reduxStore, req }) {

      return { }
    }
   render() {
     return (   
        <div>
          <Header />
          <main>
              <h3>
                Recent Events
              </h3>
              <p>
                List of recent events here
              </p>
          </main> 
        </div>
     )
   }
}

export default withAuth(Dashboard);