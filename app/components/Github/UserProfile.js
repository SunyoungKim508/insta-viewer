import React from 'react'

const UserProfile = ({bio}) => {
  return (
    <div>
      {bio.profile_image_url && <li className="list-group-item"> <img src={bio.profile_image_url} className="img-rounded img-responsive"/></li>}
      {bio.name && <li className="list-group-item">Name: {bio.name}</li>}
      {bio.id && <li className="list-group-item">Username: {bio.id}</li>}
      {bio.screen_name && <li className="list-group-item">{bio.screen_name}</li>}
      {bio.protected && <li className="list-group-item">{bio.protected}</li>}
    </div>
  )
}

UserProfile.propTypes = {
  user: React.PropTypes.string.isRequired,
  bio: React.PropTypes.object.isRequired
}

export default UserProfile
