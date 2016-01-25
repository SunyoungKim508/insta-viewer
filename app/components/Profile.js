import React from 'react'
import Repos from './Github/Repos';
import UserProfile from './Github/UserProfile';
import { getUserInfo } from '../utils/helpers';
import Rebase from 're-base';

const base = Rebase.createClass('https://github-note-taker.firebaseio.com/')

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bio: {},
      repos: []
    }
  }
  componentDidMount(){
    this.init(this.props.params.username)
  }
  componentWillReceiveProps(nextProps){
    base.removeBinding(this.ref);
    this.init(nextProps.params.username);
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  init(username){
    this.ref = base.bindToState(username, {
      context: this,
      asArrray: true,
      state: 'notes'
    });

    getUserInfo(username)
      .then(function(data){
        console.log('profile.js', data);
        this.setState({
          bio: data
        })
      }.bind(this))
  }
  render(){
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos}/>
        </div>
      </div>
    )
  }
}

export default Profile
