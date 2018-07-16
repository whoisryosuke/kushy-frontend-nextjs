import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export default ({ photo }) => {
  return (
    <Card>
        <Image src={ photo.image } />
    </Card>
  )
}
