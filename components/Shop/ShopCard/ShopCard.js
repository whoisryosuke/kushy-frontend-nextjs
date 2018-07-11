import React from 'react'
import Link from 'next/link'
import { Card, Image, Rating } from 'semantic-ui-react'

export default (props) => {
  const { data:shop } = props
  return (
      <Link href={`/shops/${ shop.slug }`}>
        <Card link className="ShopArchive">
            <Image src={ shop.featured_img } alt={ shop.name } />
            <Card.Content>
                { shop.categories.length > 0 ?
                <Card.Meta>
                    {  shop.categories[0].category.name }
                </Card.Meta> 
                : '' }
                <Card.Header>
                    { shop.name }
                </Card.Header>
                <Card.Description>
                    { shop.location.address ?
                        <span>{ shop.location.address }
                        <br /></span> 
                    : '' }
                    { shop.location.city || shop.location.state || shop.location.postal_code ?
                    <span>{ shop.location.city }, { shop.location.state } { shop.location.postal_code }</span>
                    : '' }
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                { shop.distance ?
                <span className="right floated">
                    <p className="ShopArchive_distance">{ Math.round(shop.distance * 100) / 100 } miles away</p>
                </span>
                : '' }
                <Rating icon='star' defaultRating={ shop.rating } maxRating={5} disabled />
                <h5 className="tiny">{ shop.reviews }</h5>
            </Card.Content>
        </Card>
    </Link>
  )
}
