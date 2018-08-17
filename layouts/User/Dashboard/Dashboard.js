import React from 'react'
import PropTypes from 'prop-types'
import Main from 'layouts/Main/Main'
import config from 'config/config'

import './Dashboard.css'
import DashboardMenu from './Menu'

const UserDashboard = ({ section, user, children }) => {
  const s3 = config.assets.root + config.assets.site;

  return (
    
    <Main className="App pt2">
        <section className="UserProfile ui container aligned center">
            <section className="ui grid">

                <section className="UserProfile__Sidebar five wide computer sixteen wide mobile column">
                        { user.profile_pic ?
                          <img src={user.profile_pic} alt={user.name} className="ui medium circular image" />
                        :
                          <img src={`${s3}Icons/avatar-default-leaf.jpg`} alt="Your profile pic" className="ui medium circular image" />
                        }
                    <h2 className="ui header">{user.name}</h2>
                    <h4 className="ui header">{user.email}</h4>

                    {user.location_lat ?
                    <h5 className="ui header">{user.location_lat}</h5>
                    : '' }

                    {user.location_lng ?
                      <h5 className="ui header">{user.location_lng}</h5>
                    : '' }
                    
                    {user.social && user.social.twitter ?
                      <a href={`http://twitter.com/${user.social.twitter}`}>
                          <i className="Icon icon-twitter"></i>
                      </a>
                    : '' }
                    {user.social && user.social.instagram ?
                            <a href={`http://instagram.com/${ user.social.instagram }`}>
                                <i className="Icon icon-instagram"></i>
                            </a>
                    : '' }
                    {user.social && user.social.tumblr ?
                            <a href={`http://${ user.social.tumblr }.tumblr.com/`}>
                                <i className="Icon icon-tumblr"></i>
                            </a>
                    : '' }
                    {user.social && user.social.facebook ?
                            <a href={`http://facebook.com/${ user.social.facebook }`}>
                                <i className="Icon icon-facebook"></i>
                            </a>
                    : '' }
                </section>

                <section className="UserProfile__Main eleven wide computer sixteen wide mobile column">

                  <DashboardMenu selected={ section } />

                  <main className="UserProfile__Content">
                      
                      { children }

                  </main>
                    
                </section>
            </section>
        </section>
    </Main>
  )
}

UserDashboard.propTypes = {
    section: PropTypes.string
}

UserDashboard.defaultProps =  {
    section: 'activity'
}

export default UserDashboard