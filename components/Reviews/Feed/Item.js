import React from 'react'
import UserAvatar from 'components/User/Avatar/Avatar'

export default ({ review, postName, user }) => {
  /**
   * Check if the user was provided in props, 
   * or inside review query using includes/relationship
   */
  const reviewUser = 'user' in review.includes ? review.includes.user : null
  const owner = user ? user : reviewUser

  const reviewName = postName ?
          <a href={`/${review.includes.post.section }s/${ review.includes.post.slug }`} class="author">
              { review.includes.post.name }
          </a>
          :
          <a href={`/user/${ owner.name }`} class="author">{ owner.name }</a>



  return (
    <article class="Review comment divided">
      <figure class="avatar">
        <UserAvatar avatar={owner.avatar} name={owner.name} />
      </figure>
      <section class="content">
        { reviewName }
        <section class="metadata">
            {/* <span class="date">{ nicetime(review.updated_at) }</span> */}
        </section>
        <div class="text">
            <div class="ui rating" data-rating={ review.rating } data-max-rating="5"></div>
            { review.review }
        </div>
        <nav class="actions">
            <a 
                href={`/dashboard/reviews/upvote/${ review.id }`}
                class="ReviewUpvote icon mini"
                title="Upvote this review"
            >
                <i class="Icon icon-heart"></i>
                Like
            </a> 
            <a href="#" class="mini icon">
                <i class="Icon icon-share-2"></i>
                Share
            </a> 
            { owner && owner.id === review.user_id ?
              <a 
                  name="deleteReview"
                  href={`/dashboard/reviews/delete/${ review.id }`}
                  class="delete icon mini"
              >
                  <i class="Icon icon-trash"></i>
                  Delete
              </a>
            : '' }
        </nav>
      </section>
  </article>
  )
}
