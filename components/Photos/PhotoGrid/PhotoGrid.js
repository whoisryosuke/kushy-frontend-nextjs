import React from 'react'
import { Grid } from 'semantic-ui-react'

import PhotoCard from 'components/Photos/PhotoCard/PhotoCard'

export default ({ photos }) => {
    console.log(photos)
    const photoLoop = photos.length > 0 ? photos.map((photo) => (
      <Grid.Column>
        <PhotoCard photo={ photo } />
      </Grid.Column>
    )) : ''
  return (
    <Grid columns={5}>
      { photoLoop }
    </Grid>
  )
}
