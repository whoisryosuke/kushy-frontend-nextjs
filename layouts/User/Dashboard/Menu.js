import React from 'react'

export default ({ selected }) => {
  return (
    <nav className="UserProfile__Menu ui secondary menu">
      <a href="/dashboard/activity" className={`item ${selected == 'activity' ? 'active' : ''}`}>
          Activity
      </a>
      <a href="/dashboard/reviews/" className={`item ${selected == 'reviews' ? 'active' : ''}`}>
          Reviews
      </a>
      <a href="/dashboard/settings/" className={`item ${selected == 'settings' ? 'active' : ''}`}>
          Settings
      </a>
      <a href="/dashboard/bookmarks/" className={`item ${selected == 'bookmarks' ? 'active' : ''}`}>
          Bookmarks
      </a>
      <a href="/dashboard/verify/" className={`item ${selected == 'verify' ? 'active' : ''}`}>
          Verify
      </a>
    </nav>
  )
}
