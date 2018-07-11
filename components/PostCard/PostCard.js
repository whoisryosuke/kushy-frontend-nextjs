import React from 'react'

import ShopCard from '../Shop/ShopCard/ShopCard'
import ProductCard from '../Product/ProductCard/ProductCard'

/**
 * Card facade for section cards
 * Accepts a section and the card data
 * Returns the appropriate card
 */
export default (props) => {
  const { section, data } = props

  let card
  switch(section)
  {
      case 'shops':
        card = <ShopCard data={ data } />
        break;

      case 'products':
        card = <ProductCard data={ data } />
        break;

      default:
        card = null;
        break;
  }

  return (
    card
  )

}
