import React from 'react';
import SearchTwitter from './SearchTwitter'

let background = {
  background: '-webkit-gradient(linear, left top, right top, from(#99aaff), to(#7ed4e1))',
  background: '#99aaff', /* Old browsers */
  background: '-moz-linear-gradient(left, #99aaff 0%, #7ed4e1 100%)', /* FF3.6-15 */
  background: '-webkit-linear-gradient(left, #99aaff 0%,#7ed4e1 100%)', /* Chrome10-25,Safari5.1-6 */
  background: 'linear-gradient(to right, #99aaff 0%,#7ed4e1 100%)', /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#99aaff", endColorstr="#7ed4e1",GradientType=1 )', /* IE6-9 */
  width: '100%',
  marginTop: '-20'
}

class Main extends React.Component {
  goToHome() {
    this.props.history.pushState(null, "/");
  }

  render() {
    return (
      <div style={{color: 'white'}}>
        <div style={background}>
          <div style={{marginTop: 20, paddingTop: 5, marginLeft: 10}}>
            <a href="/logout" style={{textDecoration: 'none', color: '#f9ffd8',fontSize: 20, fontWeight: 300}}>Logout</a>
          </div>
          <div style={{height: 60, width: 20}}></div>
          <img src={require("../img/twitter.png")} onClick={() => this.goToHome()} className="center-block" style={{width: 150, height: 150}}/>
          <p className="text-center twitter-head" style={{'fontWeight': 300, 'fontSize': 35, paddingTop: 30}}>
            Twitter Viewer
          </p>
          <p className="text-center main-info" style={{'fontSize': 30, 'fontWeight': 100}}>
            Allows searching for Instagram accounts by username/handle
          </p>
          <p className="text-center main-info" style={{'fontSize': 30, 'marginTop': '-20', 'marginBottom': 55,'fontWeight': 100}}>
            Allows a user to click on a search result, thus showing them that users most recent 10 photos
          </p>
          <div className="container" style={{marginTop: '-20'}}>
            <div className="col-xs-2"></div>
            <div className="col-xs-8" style={{paddingBottom: 10}}>
              <SearchTwitter history={this.props.history}/>
            </div>
            <div className="col-xs-2"></div>
          </div>
        </div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}


export default Main
