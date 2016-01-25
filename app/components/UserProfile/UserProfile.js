import React from 'react'

class UserProfile extends React.Component{
  componentWillReceiveProps(nextProps){
    console.log('newProps', nextProps);
    // this.init(nextProps.params.username);
  }
  handleClick() {
    console.log(this.props.profile.protected);
    var isPrivate = this.props.profile.protected;
    if (isPrivate) {
      // redirect to login page
    } else {
      // change route to tweets
      console.log('change route to tweets');
      console.log(this.props.history);
      this.props.history.pushState(null, "/tweets/" + this.props.profile.screen_name);
    }
  }
  render() {
    let { profile } = this.props;
    return (
      <div>
        <div className="center-block">
          { (profile.id === undefined) && <h3 className="text-center" style={{color: '#ff98f0', marginTop: 30, fontFamily: 'Lato', fontWeight: 300}}> No user matches for specified terms </h3> }
        </div>
        {profile.id && <div onClick={()=>this.handleClick()} className="center-block" style={{color: 'black'}}>
          <ul className="list-group" style={{marginTop: 30}}>
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
