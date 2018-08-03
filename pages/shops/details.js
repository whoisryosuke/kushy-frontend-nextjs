import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import ShopProfile from 'layouts/ShopProfile/ShopProfile'
import KushyApi from 'utils/KushyApi'

class ShopDetails extends React.Component {
  static async getInitialProps ({ reduxStore, req, query: { slug } }) {
    const api = new KushyApi();

    let shop
    if(slug)
    {
        await api.getProfile('shops', slug)
            .then((results) => (
                shop = results.data[0]
            ))
        
        if(!shop)
        {
            // @todo: redirect
        }
    }

    return {
        shop
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
      const { shop } = this.props
      
    return (
      <ShopProfile shop={ shop } section="details">
        <section id="details" class="ContentBox">
            <h2 class="ui header">Shop Description</h2>
            <article class="ui segment">
                { shop.description }    
            </article>
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

export default connect(mapStateToProps)(ShopDetails)
