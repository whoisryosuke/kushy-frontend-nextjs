import React from 'react'
import PropTypes from 'prop-types';

import BrandCard from "components/Brand/BrandCard/BrandCard";
import ProductCard from "components/Product/ProductCard/ProductCard";
import ShopCard from "components/Shop/ShopCard/ShopCard";

/**
 * Card facade for section cards
 * Accepts a section and the card data
 * Returns the appropriate card
 */
const PostCard = (props) => {
  const { section, data } = props

  let card
  switch(section)
  {

      case 'brands':
        card = <BrandCard data={ data } />
        break;

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

PostCard.PropTypes = {
  section: PropTypes.string.isRequired
};

// Specifies the default values for props:
PostCard.defaultProps = {
  section: 'shops'
};

export default PostCard;