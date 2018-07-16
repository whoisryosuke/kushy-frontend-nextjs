import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import ShopProfile from 'layouts/ShopProfile/ShopProfile'
import KushyApi from 'utils/KushyApi'

import ReviewsLoop from 'components/Reviews/ReviewsLoop/ReviewsLoop'

class ShopReviewsPage extends React.Component {
  static async getInitialProps ({ reduxStore, req, query: { slug } }) {
    const api = new KushyApi();

    let shop
    let reviews
    if(slug)
    {
        await api.getProfile('shops', slug)
            .then((results) => (
                shop = results.data
            ))
        await api.getReviews(shop.id)
            .then((results) => (
                reviews = results
            ))
    }

    return {
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
      const { shop, reviews, profile } = this.props
      
    return (
      <ShopProfile shop={ shop } profile={ profile } section="details">
        <section id="menu" className="ui basic segment">
            <h2 className="ui header">
                <div className="content">
                    Reviews
                    <span className="sub header">{ reviews.meta.total } Total reviews</span>
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
