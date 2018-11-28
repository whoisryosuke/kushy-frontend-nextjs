import React from 'react'
import Link from 'next/link'
import { Card, Image, Rating, Label } from 'semantic-ui-react'

export default (props) => {
  const { data:product } = props
  let categories
  if('categories' in product) { 
      categories = product.categories;
  }
  if('includes' in product) { 
      if('categories' in product.includes) {
        categories = product.categories;
      }
  }
  return (
    <Card className="ProductArchive">
        <Link href={`/products/${ product.slug }`}>
            <a><Image src={ product.featured_img } alt={ product.name } /></a>
        </Link>
        <Card.Content>
            { product.brand ?
            <Card.Meta>
                {  product.brand }
            </Card.Meta> 
            : '' }
            <Card.Header>
                <Link href={`/products/${ product.slug }`}>
                    { product.name }
                </Link>
            </Card.Header>
        </Card.Content>
        <Card.Content extra>
            { categories && categories.length > 0 ?
            <aside className="right floated">

                { categories.map((category) => (
                    <Label>
                        { category.name }
                    </Label>
                ))}
            </aside>
            : '' }
            <aside>
                <Rating icon='star' defaultRating={ product.rating } maxRating={5} disabled />
                <h5 className="tiny">{ product.reviews }</h5>
            </aside>
        </Card.Content>
    </Card>
  )
}
