import React from 'react'
import UserProfile from './UserProfile/UserProfile';
import { getUserInfo } from '../utils/helpers';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      profile: {}
    }
    console.log('profile.js router', this.props.history);
  }
  componentDidMount(){
    this.init(this.props.params.username)
  }
  componentWillReceiveProps(nextProps){
    this.init(nextProps.params.username);
  }
  componentWillUnmount(){
  }
  init(username){
    console.log(username);

    getUserInfo(username)
      .then(function(data){
        console.log('got data', data);
        data = (data === undefined) ? {} : data;
        console.log('profile.js', data);
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
