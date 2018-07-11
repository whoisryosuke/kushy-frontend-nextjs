import React from 'react'
import Link from 'next/link'
import { Card, Image, Rating, Label } from 'semantic-ui-react'

export default (props) => {
  const { data:product } = props
  return (
    <Card className="ProductArchive">
        <Link href={`/products/${ product.slug }`}>
            <Image src={ product.featured_img } alt={ product.name } />
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
            { product.categories.length > 0 ?
            <aside className="right floated">

                { product.categories.map((category) => (
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
