import React from 'react'
import { connect } from 'react-redux'
import { compose } from "recompose";
import BrandProfile from 'layouts/Brands/BrandProfile/BrandProfile'
import KushyApi from 'utils/KushyApi'
import withPageCookie from "utils/withPageCookie";

import ReviewsLoop from "components/Reviews/ReviewsLoop/ReviewsLoop";
import NewReview from "components/Reviews/NewReview/NewReview";

class BrandReviews extends React.Component {
  static async getInitialProps({ reduxStore, req, query: { slug, csrf } }) {
    const api = new KushyApi();

    let brand
    let reviews
    if (slug) {
      await api.getProfile('brands', slug)
        .then((results) => (
          brand = results.data
        ))

      await api.getReviews(brand.id)
        .then((results) => (
          reviews = results
        ))  
    }

    return {
      brand,
      csrf,
      reviews
    }
  }

  render() {
    const { brand, csrf, loggedIn, reviews } = this.props
    return (
      <BrandProfile brand={brand} user={loggedIn} section="details">

        {loggedIn ?
          <div>
            <h2 className="ui header">Leave a review</h2>
            <section id="new" className="ui segment">
              <NewReview id={brand.id} csrf={csrf} />
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
          <ReviewsLoop reviews={reviews.data} />
        </section>
      </BrandProfile>
    )
  }
}

function mapStateToProps(state) {
  const { users: { profile } } = state
  return {
    profile
  }
}

export default compose(
  withPageCookie,
  connect(mapStateToProps)
)(BrandReviews);