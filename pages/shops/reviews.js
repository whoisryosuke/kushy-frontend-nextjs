import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import Link from 'next/link'
import ShopProfile from 'layouts/Shops/ShopProfile/ShopProfile'
import KushyApi from 'utils/KushyApi'

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
                shop = results.data ? results : Router.redirect('/')
            ))
        await api.getReviews(shop.id)
            .then((results) => (
                reviews = results
            ))
    }

    return {
        csrf,
        shop,
        reviews
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
    const { csrf, shop, reviews, profile } = this.props
    return (
      <ShopProfile shop={ shop.data } profile={ profile } section="reviews">
        
        <h2 className="ui header">Leave a review</h2>
        <section id="new" className="ui segment">
            <NewReview id={ shop.data.id } csrf={ csrf } />
        </section>
        <section id="menu" className="ui basic segment">
            <h2 className="ui header">
                <div className="content">
                    Reviews
                    {reviews.meta && 'total' in reviews.meta ?
                    <span className="sub header">{ reviews.meta.total } Total reviews</span>
                    : ''}
                </div>
            </h2>
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

export default connect(mapStateToProps)(ShopReviewsPage)
