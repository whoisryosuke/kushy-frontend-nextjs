import React from 'react'
import Link from 'next/link'
import { Card, Image, Rating } from 'semantic-ui-react'

export default (props) => {
    const { data: brand } = props
    return (
        <Link href={`/brands/${brand.slug}`}>
            <Card link className="BrandArchive">
                <Image src={brand.featured_img} alt={brand.name} />
                <Card.Content>
                    {brand.includes.categories && brand.includes.categories.length > 0 ?
                        <Card.Meta>
                            {brand.includes.categories[0].category.name}
                        </Card.Meta>
                        : ''}
                    <Card.Header>
                        {brand.name}
                    </Card.Header>
                    <Card.Description>
                        {brand.location.address ?
                            <span>{brand.location.address}
                                <br /></span>
                            : ''}
                        {brand.location.city || brand.location.state || brand.location.postal_code ?
                            <span>{brand.location.city}, {brand.location.state} {brand.location.postal_code}</span>
                            : ''}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {brand.distance ?
                        <span className="right floated">
                            <p className="distance">{Math.round(brand.distance * 100) / 100} miles away</p>
                        </span>
                        : ''}
                    <Rating icon='star' defaultRating={brand.rating} maxRating={5} disabled />
                    <h5 className="tiny">{brand.reviews}</h5>
                </Card.Content>
            </Card>
        </Link>
    )
}
