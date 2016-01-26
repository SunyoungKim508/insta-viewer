import React from 'react'

class UserProfile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      init: true
    }
  }
  componentWillReceiveProps(nextProps){
    if (this.state.init) {
      this.setState({
        init: false
      });
    }
  }
  handleClick() {
    this.props.history.pushState(null, "/tweets/" + this.props.profile.screen_name);
  }

  render() {
    let { profile } = this.props;
    return (
      <div>
        <div className="center-block">
          { (!this.state.init && profile.id === undefined) && 
            <div className="alert alert-danger" style={{marginTop: 50}} role="alert">
            <p style={{fontSize: 20, fontFamily: 'Lato', fontWeight: 300}}>
              No user matches for specified terms
            </p>
            </div> }
        </div>
        {profile.id && <div onClick={()=>this.handleClick()} className="center-block" style={{color: 'black'}}>
          <ul className="list-group" style={{marginTop: 30}}>
            <li className="list-group-item" key={profile.id} style={{paddingTop: 20}}>
              {profile.profile_image_url && <img src={profile.profile_image_url} className="img-rounded pull-left"/>}
              {profile && 
                <div style={{display: 'inline-block', paddingLeft: 20}}>
                  <p style={{fontWeight: 600, fontSize: 20}}>{profile.name}</p>
                  <p style={{color: '#b6b6b6', marginTop: '-10'}}>@{profile.screen_name}</p>
                </div>}
              {profile.id && <span className="pull-right" style={{fontWeight: 300, fontSize: 20, paddingTop: 10}}>ID: {profile.id}</span>}
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
