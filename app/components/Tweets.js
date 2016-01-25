import React from 'react'
import { getTweets } from '../utils/helpers';

class Tweets extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tweets: []
    }
  }
  componentDidMount(){
    this.init(this.props.params.username);
  }
  componentWillReceiveProps(nextProps){
    this.init(nextProps.params.username);
  }
  componentWillUnmount(){
  }
  init(username){
    console.log(username);

    getTweets(username)
      .then(function(data){
        console.log('got data', data);
        data = (data === undefined) ? {} : data;
        console.log('Tweets.js', data);
        this.setState({
          tweets: data
        })
      }.bind(this))
  }
  // request 10 most tweets
      
  render(){
    return (
      <div className="row" style={{color: 'black'}}>
        <ul className="list-group">
          {this.state.tweets.map((tweet, index) => (
            <li className="list-group-item" key={index}>
              {tweet.user.name && <p className="list-group-item">{tweet.user.name}</p>}
              {tweet.user.screen_name && <p className="list-group-item">{tweet.user.screen_name}</p>}
              {tweet.created_at && <p className="list-group-item">{tweet.created_at}</p>}
              {tweet.text && <p className="list-group-item">{tweet.text}</p>}
              {tweet.user.profile_image_url && <img style={{width:30, height:30}}src={'tweet.user.profile_image_url'} />}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

Tweets.PropTypes = {
  tweets: React.PropTypes.object.isRequired
}

export default Tweets
