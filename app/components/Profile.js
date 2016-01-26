import React from 'react'
import UserProfile from './UserProfile/UserProfile';
import { getUserInfo } from '../utils/helpers';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      profile: {}
    }
  }
  componentDidMount(){
    this.init(this.props.params.username)
  }
  componentWillReceiveProps(nextProps){
    this.init(nextProps.params.username);
  }

  init(username){
    getUserInfo(username)
      .then(function(data){
        data = (data === undefined) ? {} : data;
        this.setState({
          profile: data
        })
      }.bind(this))
  }
  render(){
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <UserProfile history={this.props.history} username={this.props.params.username} profile={this.state.profile}/>
        </div>
        <div className="col-md-3"></div> 
      </div>
    )
  }
}

export default Profile
