import React from 'react'

import UserAvatar from 'components/User/Avatar/Avatar'

export default ({ activity, user }) => {
  /**
   * Check if the user was provided in props, 
   * or inside activity query using includes/relationship
   */
  const activityUser = activity.includes.user ? activity.includes.user : null
  const owner = user ? user : activityUser

  /**
   * Generate activity msg based on section
   */
  const message = {
    bookmarks: "added a bookmark",
    reviews: "added a review"
  }
  const activityLink = <a href={`${ activity.includes.post.section }s/${ activity.includes.post.slug }`}>{ activity.includes.post.name }</a>
  const activityMessage = <span> { message[activity.section] } { activityLink }</span>;

  return (
  <div class="event">
    <div class="label">
        <UserAvatar avatar={ owner.avatar } name={ owner.name } />
    </div>
    <div class="content">
        <div class="summary">
            <a class="user">
                { owner.name }
            </a> 
            { activityMessage }
        </div>
        <div class="meta">
            <div class="date">
                {/* { nicetime(activity->created_at) } */}
            </div>
        </div>
    </div>
</div>
  )
}
