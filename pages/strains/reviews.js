import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import Link from "next/link";
import StrainProfile from "layouts/Strains/StrainProfile/StrainProfile";
import KushyApi from "utils/KushyApi";
import withPageCookie from "utils/withPageCookie";

import ReviewsLoop from "components/Reviews/ReviewsLoop/ReviewsLoop";
import NewReview from "components/Reviews/NewReview/NewReview";

class StrainReviews extends React.Component {
  static async getInitialProps({ reduxStore, req, query: { slug, csrf } }) {
    const api = new KushyApi();

    let strain, reviews
    if (slug) {
      await api.getProfile("strains", slug).then(results => {
        strain = results.data;
      });
      await api.getReviews(strain.id)
        .then((results) => (
          reviews = results
        ))

      if (!strain) {
        // @todo: redirect
      }
    }

    return {
      csrf, strain, reviews
    };
  }

  render() {
    const { csrf, strain, loggedIn, reviews } = this.props;
    return (
      <StrainProfile strain={strain} user={loggedIn} section="details">

        {loggedIn ?
          <div>
            <h2 className="ui header">Leave a review</h2>
            <section id="new" className="ui segment">
              <NewReview id={strain.id} csrf={csrf} />
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
      </StrainProfile>
    );
  }
}

function mapStateToProps(state) {
  const {
    users: { profile }
  } = state;
  return {
    profile
  };
}

export default compose(
  withPageCookie,
  connect(mapStateToProps)
)(StrainReviews);
