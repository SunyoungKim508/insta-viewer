import React from 'react'

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      profile: {}
    }
    // console.log('profile.js router', this.props.history);
  }
  componentDidMount(){
    // this.init(this.props.params.username)
  }
  componentWillReceiveProps(nextProps){
    // this.init(nextProps.params.username);
  }
  componentWillUnmount(){
  }
  init(username){
    // console.log(username);

    // getUserInfo(username)
    //   .then(function(data){
    //     console.log('got data', data);
    //     data = (data === undefined) ? {} : data;
    //     console.log('profile.js', data);
    //     this.setState({
    //       profile: data
    //     })
    //   }.bind(this))
  }
  render(){
    return (
      <div className="row">
        <h3 className="text-center" style={{color: '#AF8CDE', marginTop: 30, fontFamily: 'Lato', fontWeight: 300}}>
          This user account is private.
          <p>You need to sign in with Twitter</p>
        </h3>
      </div>
    )
  }
}

export default Login
