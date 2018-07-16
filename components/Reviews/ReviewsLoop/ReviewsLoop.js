import React from 'react'
import { Comment } from 'semantic-ui-react'

import ReviewComment from '~/components/Reviews/ReviewComment/ReviewComment'

export default ({ reviews }) => {
    const reviewLoop = reviews ? reviews.map(review => (
        <ReviewComment key={ review.id } review={ review } />
    )) : ''

  return (
    <Comment.Group>
      { reviewLoop }
    </Comment.Group>
  )
}
