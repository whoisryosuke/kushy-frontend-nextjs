import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import ShopProfile from 'layouts/ShopProfile/ShopProfile'
import KushyApi from 'utils/KushyApi'

import PhotoGrid from 'components/Photos/PhotoGrid/PhotoGrid'

class ShopPhotoPage extends React.Component {
  static async getInitialProps ({ reduxStore, req, query: { slug } }) {
    const api = new KushyApi();

    let shop
    let photos
    if(slug)
    {
        await api.getProfile('shops', slug)
            .then((results) => (
                shop = results.data
            ))
        await api.getPhotos(shop.id)
            .then((results) => (
                photos = results
            ))
    }

    return {
        shop,
        photos
    }
  }
  constructor(props)
  {
    super(props);
    this.state = {
        section: 'photos'
    }
  }

  render () {
      const { shop, photos, profile } = this.props
      
    return (
      <ShopProfile shop={ shop } profile={ profile } section="details">
        <section id="menu" className="ui basic segment">
            <h2 className="ui header">
                <div className="content">
                    Photo Gallery
                    <span className="sub header">{ photos.meta.total } Total images</span>
                </div>
            </h2>
            <PhotoGrid photos={ photos.data } />
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

export default connect(mapStateToProps)(ShopPhotoPage)
