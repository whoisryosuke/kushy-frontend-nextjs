import React from 'react'
import { Table } from 'semantic-ui-react'

export default ({ section }) => {

  const headerItemsCollection = {
    'topicals': [
      'Name',
      'List Price',
      'Sales Price',
    ],
    'edibles': [
      'Name',
      'List Price',
      'Sales Price',
    ],
    'concentrates': [
      'Name',
      '1/2 Gram',
      '1 Gram',
    ],
    'flowers': [
      'Name',
      'Gram',
      '1/8',
      '1/4',
      '1/2',
      'Ounce',
    ],
  }

  const headerItems = headerItemsCollection[section].map(headerItem => (
    <Table.HeaderCell key={ headerItem }>{ headerItem }</Table.HeaderCell>
  ))

  return (
      <React.Fragment>
        <Table.Row>
          <Table.HeaderCell colSpan={ headerItems.length }>
            { section }
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
            { headerItems }
        </Table.Row>
      </React.Fragment>
  )
}
