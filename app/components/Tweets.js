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

  init(username){
    getTweets(username)
      .then(function(data){
        data = (data === undefined) ? {} : data;
        if (data.error) {
          this.props.history.pushState(null, "/login");
        } else {
          this.setState({
            tweets: data
          })
        }
      }.bind(this))
  }
      
  render(){
    return (
      <div className="row" style={{color: 'black'}}>
        <div className="col-md-2"></div>
        <ul className="list-group col-md-8" style={{paddingLeft: 15, paddingTop: 30}}>
          {!this.state.tweets.error && this.state.tweets.map((tweet, index) => (
            <li className="list-group-item" key={index} style={{padding: 20}}>
              {tweet.user.profile_image_url && <img src={tweet.user.profile_image_url} style={{width: 47, height: 47}} className="pull-left" />}
              {tweet.user && 
                <div style={{display: 'inline-block', paddingLeft: 20}}>
                  <p style={{fontWeight: 600, fontSize: 20}}>{tweet.user.name}</p>
                  <p style={{color: '#b6b6b6', marginTop: '-10'}}>@{tweet.user.screen_name}</p>
                </div>}
              {tweet && <img src={require("../img/logo.png")} style={{width: 47, height: 47}} className='pull-right'/>}
              {tweet.text && <p style={{fontSize: 25, fontWeight: 300}}>{tweet.text}</p>}
              {tweet.created_at && <p style={{color: '#b6b6b6', marginBottom: -5}}>{tweet.created_at.replace(/\+0000/, '')}</p>}
            </li>
          ))}
        </ul>
        <div className="col-md-2"></div>
      </div>
    )
  }
}

Tweets.PropTypes = {
  tweets: React.PropTypes.object.isRequired
}

export default Tweets
