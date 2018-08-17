import React from 'react'
import UserDashboard from 'layouts/User/Dashboard/Dashboard'
import { getCookie } from 'utils/Cookies'
import withAuth from 'utils/withAuth'
import KushyApi from 'utils/KushyApi'

import ReviewFeedItem from "components/Reviews/Feed/Item";

class DashboardReviews extends React.Component {

    static async getInitialProps({ reduxStore, req }) {
      console.log(this.props)
      const token = getCookie('kushyFToken', req)
      
      const api = new KushyApi();
      // User endpoint requires token, 
      // attach to headers before fetching
      api.setToken(token);
      // Query API for token and get user profile
      let reviews
      await api.getUserReviews()
        .then((results) => (
          reviews = results 
        ));

      return {
        reviews
       }
    }
   render() {
     console.log(this.props.reviews);
     const { user, reviews } = this.props;
     const reviewsItems = reviews && reviews.data.length > 0 ? reviews.data.map((review) => <ReviewFeedItem review={ review } user={ user } postName />) : ''
     return (   
        <UserDashboard section="reviews" user={this.props.user}>
          <article id="reviews" class="ui segment">
              { reviewsItems ? 
                  
                  <section class="ui feed">
                    { reviewsItems }
                  </section>
              :
                <section class="content">
                  <p>No reviews found</p>
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

export default withAuth(DashboardReviews);