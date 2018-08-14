import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import { compose } from 'recompose'
import ShopProfile from 'layouts/Shops/ShopProfile/ShopProfile'
import KushyApi from 'utils/KushyApi'
import withPageCookie from "utils/withPageCookie";

import ReviewsLoop from 'components/Reviews/ReviewsLoop/ReviewsLoop'
import NewReview from "components/Reviews/NewReview/NewReview";

class ShopReviewsPage extends React.Component {
  static async getInitialProps ({ reduxStore, req, query: { slug, csrf } }) {
    const api = new KushyApi();

    let shop
    let reviews
    if(slug)
    {
        await api.getProfile('shops', slug)
            .then((results) => (
                // If we don't find a shop, redirect to site root
                shop = results.data ? results.data : Router.redirect('/')
            ))
        await api.getReviews(shop.id)
            .then((results) => (
                reviews = results
            ))
      }

    return {
        csrf,
        shop,
        reviews,
    }
  }
  constructor(props)
  {
    super(props);
    this.state = {
        section: 'reviews'
    }
  }

  render () {
    const { csrf, shop, reviews, loggedIn } = this.props
    return (
        <ShopProfile shop={shop} loggedIn={ loggedIn } section="reviews">

            {loggedIn ? 
            <div>
                <h2 className="ui header">Leave a review</h2>
                <section id="new" className="ui segment">
                    <NewReview id={ shop.id } csrf={ csrf }  />
                </section>
            </div>
            : ''}

        <h2 className="ui header">
            <div className="content">
                Reviews
                {reviews.meta && 'total' in reviews.meta ?
                    <span className="sub header">{reviews.meta.total} Total reviews</span>
                    : ''}
            </div>
        </h2>
        <section id="menu" className="ui segment">
            <ReviewsLoop reviews={ reviews.data } />
        </section>
      </ShopProfile>
    )
  }
}

function mapStateToProps (state) {
  const { users: { profile } } = state
  return {
      profile
  }
}

export default compose(
  withPageCookie,
  connect(mapStateToProps)
)(ShopReviewsPage);