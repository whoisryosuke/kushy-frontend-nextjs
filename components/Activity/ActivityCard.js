import React from 'react'
import Link from 'next/link'
import nicetime from 'utils/nicetime'
import UserAvatar from 'components/User/Avatar/Avatar'
import config from 'config/config'

export default function ActivityCard({ activity, user }) {
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
  const activityLink = <a href={`${activity.includes.post.section}s/${activity.includes.post.slug}`}>{activity.includes.post.name}</a>
  const activityMessage = <span> {message[activity.section]} {activityLink}</span>;

  // Image CDN
  const s3 = config.assets.public;

  return (
    <div class="ActivityCard ui card">
      <div class="content">
      <UserAvatar avatar={owner.avatar} name={owner.name} classes="left floated" />
      
      <h3 class="ui header">
        {owner.name}
      </h3>
      <span class="ActivityCard__msg meta">
        {activityMessage}
      </span>
      </div>
      {activity.includes.post ?
        <Link
          href={`/${activity.includes.post.section}s/${activity.includes.post.slug}`}
        >
          <a className="ActivityCard__img image">
            <img src={`${s3}${activity.includes.post.featured_img}`} />
          </a>
        </Link>
      : ''}
      <div class="content">
        <h4>
          <a href={`/${activity.includes.post.section}s/${activity.includes.post.slug}`}>
            {activity.includes.post.name}
          </a>
        </h4>
        <div class="ui rating" data-rating="{{ $activity->bookmarks->post->rating }}" data-max-rating="5"></div>
        <span class="right floated meta">
              { nicetime(activity.created_at.date) }
        </span>
      </div>
    </div>
  )
}
