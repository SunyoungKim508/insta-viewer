import React from 'react'

class UserProfile extends React.Component{
  componentWillReceiveProps(nextProps){
    console.log('newProps', nextProps);
    // this.init(nextProps.params.username);
  }
  render() {
    let { profile } = this.props;
    console.log('profile got here');
    console.log(profile);
    console.log('id', profile.id);
    return (
      <div>
        <div className="center-block">
          { (profile.id === undefined) && <h3 className="text-center" style={{color: '#ff98f0', marginTop: 30, fontFamily: 'Lato', fontWeight: 300}}> No user matches for specified terms </h3> }
        </div>
        {profile.id && <div onClick={()=>{console.log('clicked')}} className="center-block" style={{color: 'black'}}>
          <h3> User Found </h3>
          <ul className="list-group">
            <li className="list-group-item" key={profile.id}>
              {profile.profile_image_url && <img src={profile.profile_image_url} className="img-rounded img-responsive" style={{display: 'inline-block'}}/>}
              {profile.id && <span style={{marginLeft: 30}}>ID: {profile.id}</span>}
              {profile.screen_name && <p>@{profile.screen_name}</p>}
              {profile.name && <p>Name: {profile.name}</p>}
            </li>
          </ul>
        </div>}
      </div>
    )
  }
} 

UserProfile.propTypes = {
  username: React.PropTypes.string.isRequired,
  profile: React.PropTypes.object.isRequired
}

export default UserProfile
