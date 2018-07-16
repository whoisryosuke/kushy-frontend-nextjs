import React from 'react'
import { Comment } from 'semantic-ui-react'

export default ({ review }) => {
  return (
    <Comment>
      <Comment.Avatar src={ review.user.avatar } />
      <Comment.Content>
        <Comment.Author as='a'>{ review.user.name }</Comment.Author>
        <Comment.Metadata>
          <div>{ review.created_at.date }</div>
        </Comment.Metadata>
        <Comment.Text>{ review.review }</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  )
}
