import React from 'react'
import config from 'config/config'

export default ({ avatar, name, classes }) => {
  const s3 = config.assets.root + config.assets.site;
  return (
    <div>
      { avatar ? 
        <a href={`/user/${ name }`} className="author">
          <img src={ avatar } className={`ui image medium avatar ${classes ? classes : ''}`} alt={`${ name } avatar`} />
        </a>
      :
        <a href={`/user/${ name }`} className="author">
          <img src={`${ s3 }img/Icons/icon-user.svg`} className={`ui image medium avatar ${ classes ? classes : ''}`} alt={`${name} avatar`} />
        </a>
      }
    </div>
  )
}
