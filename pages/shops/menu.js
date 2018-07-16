import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import ShopProfile from 'layouts/ShopProfile/ShopProfile'
import KushyApi from 'utils/KushyApi'

import ShopMenu from 'components/ShopMenu/ShopMenu'

class ShopMenuPage extends React.Component {
  static async getInitialProps ({ reduxStore, req, query: { slug } }) {
    const api = new KushyApi();

    let shop
    let inventory
    if(slug)
    {
        await api.getProfile('shops', slug)
            .then((results) => (
                shop = results.data
            ))
        await api.getInventory(slug)
            .then((results) => (
                inventory = results
            ))
    }

    return {
        shop,
        inventory
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
      const { shop, inventory, profile } = this.props
      
    return (
      <ShopProfile shop={ shop } profile={ profile } section="details">
        <section id="menu" className="ui basic segment">
            <h2 className="ui header">
                <div className="content">
                    Menu
                    <span className="sub header">Last updated { inventory.menuLastUpdated }</span>
                </div>
            </h2>
           <ShopMenu inventory={ inventory } />
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

export default connect(mapStateToProps)(ShopMenuPage)
