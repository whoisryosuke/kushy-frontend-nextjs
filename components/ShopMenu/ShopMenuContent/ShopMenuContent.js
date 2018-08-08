import React from 'react'

import Flowers from '../ShopMenuRows/Flowers'

/**
 * <ShopMenuContent section="flowers" data={ data } />
 * This component accepts an array of Inventory objects
 * then uses the section prop to determine which row component to show
 */
export default ({ data, section }) => {
  let ProductTableRow
  switch(section) {
    case 'flowers':
      ProductTableRow = Flowers
      break;
    default:
      ProductTableRow = Flowers
      break;
  }


  return data.map(product => (
    <ProductTableRow key={product.id} data={product} />
  ))
}
