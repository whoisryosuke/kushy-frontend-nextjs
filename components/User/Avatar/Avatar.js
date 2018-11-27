import React from 'react'
import config from 'config/config'

export default ({ avatar, name, classes, linkClass }) => {
  const s3 = config.assets.root + config.assets.site;
  return (
       avatar ? 
        <a href={`/user/${ name }`} className={`author ${linkClass ? linkClass : ''}`}>
          <img src={ avatar } className={`ui image medium avatar ${classes ? classes : ''}`} alt={`${ name } avatar`} />
        </a>
      :
        <a href={`/user/${ name }`} className={`author ${linkClass ? linkClass : ''}`}>
          <img src={`${ s3 }Icons/icon-user.svg`} className={`ui image medium avatar ${ classes ? classes : ''}`} alt={`${name} avatar`} />
        </a>
  )
}
