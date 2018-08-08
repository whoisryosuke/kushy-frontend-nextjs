import React from 'react'
import Link from 'next/link'
import { Table } from 'semantic-ui-react'

export default ({ data }) => {
  return (
    <Table.Row>
        <Table.Cell>
            <h4 className="ui image header">
                <img src={ data.product.featured_img } className="ui mini rounded image" />
                <Link href={`/products/${ data.product.slug }`}>
                    <a className="content">
                        { data.product.name }
                    </a>
                </Link>
            </h4>
        </Table.Cell>
        <Table.Cell> 
            <span className="editable" data-value="{ data.one_gram }" data-type="one_gram">
                { data.pricing.one_gram }
            </span>
        </Table.Cell>
        <Table.Cell>
            <span className="editable" data-value="{ data.eighth_ounce }" data-type="eighth_ounce">
                { data.pricing.eighth_ounce }
            </span>
        </Table.Cell>
        <Table.Cell>
            <span className="editable" data-value="{ data.quarter_ounce }" data-type="quarter_ounce">
                { data.pricing.quarter_ounce }
            </span>
        </Table.Cell>
        <Table.Cell>
            <span className="editable" data-value="{ data.half_ounce }" data-type="half_ounce">
                { data.pricing.half_ounce }
            </span>
        </Table.Cell>
        <Table.Cell>
            <span className="editable" data-value="{ data.ounce }" data-type="ounce">
                { data.pricing.ounce }
            </span>
        </Table.Cell>
    </Table.Row>
  )
}
