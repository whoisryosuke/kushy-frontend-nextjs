import React from 'react'
import { connect } from 'react-redux'
import { compose } from "recompose";
import ProductProfile from 'layouts/Products/ProductProfile/ProductProfile'
import KushyApi from 'utils/KushyApi'
import withPageCookie from "utils/withPageCookie";

import ReviewsLoop from "components/Reviews/ReviewsLoop/ReviewsLoop";
import NewReview from "components/Reviews/NewReview/NewReview";

class ProductReviews extends React.Component {
  static async getInitialProps({ reduxStore, req, query: { slug, csrf } }) {
    const api = new KushyApi();

    let product
    let reviews
    if (slug) {
      await api.getProfile('products', slug)
        .then((results) => (
          product = results.data
        ))
      await api.getReviews(product.id)
        .then((results) => (
          reviews = results
        ))
    }

    return {
      csrf,
      product,
      reviews
    }
  }

  render() {
    const { csrf, loggedIn, product, reviews } = this.props
    return (
      <ProductProfile product={product} user={loggedIn} section="details">

        {loggedIn ?
          <div>
            <h2 className="ui header">Leave a review</h2>
            <section id="new" className="ui segment">
              <NewReview id={product.id} csrf={csrf} />
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
      </ProductProfile>
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
)(ProductReviews);