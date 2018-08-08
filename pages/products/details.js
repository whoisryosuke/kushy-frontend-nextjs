import React from 'react'
import { connect } from 'react-redux'
import ProductProfile from 'layouts/Products/ProductProfile/ProductProfile'
import KushyApi from 'utils/KushyApi'

class ProductDetails extends React.Component {
  static async getInitialProps ({ reduxStore, req, query: { slug } }) {
    const api = new KushyApi();

    let product
    if(slug)
    {
        await api.getProfile('products', slug)
            .then((results) => (
                product = results.data
            ))
        
        if(!product)
        {
            // @todo: redirect
        }
    }

    return {
        product
    }
  }

  render () {
      const { product } = this.props
    return (
      <ProductProfile product={ product } section="details">
        <section id="details" class="ContentBox">
            <h2 class="ui header">Product Description</h2>
            <article class="ui segment">
                { product.description ? product.description : "No description for this product yet" }    
            </article>
        </section>
      </ProductProfile>
    )
  }
}

function mapStateToProps (state) {
  const { users: { profile } } = state
  return {
      profile
  }
}

export default connect(mapStateToProps)(ProductDetails)
