import React from 'react'
import { connect } from 'react-redux'
import { compose } from "recompose";
import Link from 'next/link'
import StrainProfile from 'layouts/Strains/StrainProfile/StrainProfile'
import KushyApi from 'utils/KushyApi'
import withPageCookie from "utils/withPageCookie";

class StrainDetails extends React.Component {
  static async getInitialProps({ reduxStore, req, query: { slug } }) {
    const api = new KushyApi();

    let strain;
    if (slug) {
      await api.getProfile('strains', slug)
        .then((results) => {
          console.log('query', results)
          strain = results.data
        })

      if (!strain) {
        // @todo: redirect
      }
    }

    return {
      strain
    }
  }

  render() {
    const { strain, profile } = this.props
    console.log(strain);
    return (
      <StrainProfile strain={strain} user={profile} section="details">
        <section id="details" className="ContentBox">
          <h2 className="ui header">Strain Description</h2>
          <article className="ui segment">
            <div className="content" dangerouslySetInnerHTML={{ __html: strain.description }}></div>
          </article>
        </section>
      </StrainProfile>
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
)(StrainDetails);