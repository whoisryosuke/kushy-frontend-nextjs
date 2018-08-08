import React from 'react'
import { connect } from 'react-redux'
import BrandProfile from 'layouts/Brands/BrandProfile/BrandProfile'
import KushyApi from 'utils/KushyApi'

class BrandDetails extends React.Component {
  static async getInitialProps ({ reduxStore, req, query: { slug } }) {
    const api = new KushyApi();

    let brand
    if(slug)
    {
        await api.getProfile('brands', slug)
            .then((results) => (
                brand = results.data
            ))
        
        if(!brand)
        {
            // @todo: redirect
        }
    }

    return {
        brand
    }
  }

  render () {
      const { brand } = this.props
    return (
      <BrandProfile brand={ brand } section="details">
        <section id="details" class="ContentBox">
            <h2 class="ui header">Brand Description</h2>
            <article class="ui segment">
                { brand.description ? brand.description : "No description for this brand yet" }    
            </article>
        </section>
      </BrandProfile>
    )
  }
}

function mapStateToProps (state) {
  const { users: { profile } } = state
  return {
      profile
  }
}

export default connect(mapStateToProps)(BrandDetails)
