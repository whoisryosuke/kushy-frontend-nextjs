import React from 'react'
import { Comment } from 'semantic-ui-react'
import nicetime from 'utils/nicetime'
import UserAvatar from 'components/User/Avatar/Avatar'

export default ({ review }) => {
  return (
    <Comment>
      <UserAvatar avatar={review.includes.user.avatar} name={review.includes.user.name} linkClass="avatar" />
      <Comment.Content>
        <Comment.Author as='a'>{ review.includes.user.name }</Comment.Author>
        <Comment.Metadata>
          <div>{ nicetime(review.created_at.date) }</div>
        </Comment.Metadata>
        <Comment.Text>{ review.review }</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  )
}
