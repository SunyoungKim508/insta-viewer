import React from 'react';
import SearchInsta from './SearchInsta'

// var height = {
//   width: '100%',
//   height: '40%',
//   backgroundColor:'#FFA07A'
// };
var background = {
  'background': '-webkit-gradient(linear, left top, right top, from(#1a82f7), to(#2F2727))'
}

const Main = ({children, history}) => {
  return (
    <div style={{'fontFamily': 'Lato', color: 'white'}}>
      <div style={{width: '100%', marginTop: '-20', background: '-webkit-gradient(linear, left top, right top, from(#99aaff), to(#7ed4e1))'}}>
        <div style={{height: 70, width: 20}}></div>
        <img src={require("../img/twitter.png")} className="center-block" style={{width: 150, height: 150}}/>
        <p className="text-center" style={{'fontWeight': 300, 'fontSize': 35, paddingTop: 30}}>Twitter Viewer</p>
        <p className="text-center" style={{'fontSize': 30, 'fontWeight': 100}}>Allows searching for Instagram accounts by username/handle</p>
        <p className="text-center" style={{'fontSize': 30, 'marginTop': '-20','fontWeight': 100}}>Allows a user to click on a search result, thus showing them that users most recent 10 photos</p>
        <div className="container" style={{marginTop: '-20'}}>
          <div className="col-xs-2"></div>
          <div className="col-xs-8" style={{paddingTop: 55, paddingBottom: 10}}>
            <SearchInsta history={history}/>
          </div>
          <div className="col-xs-2"></div>
        </div>
      </div>
      <div className="container">
        {children}
      </div>
    </div>
  )
}

export default Main
