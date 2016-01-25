import React from 'react'

class Tweets extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bio: {},
      repos: []
    }
  }
  render(){
    return (
      <div className="row">
        <div className="col-md-4" style={{backgroundColor: 'red'}}>
          <UserTweets username={this.props.params.username} bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos}/>
        </div>
      </div>
    )
  }
}

export default Tweets
