import React from 'react';
import SearchInsta from './SearchInsta'

// var height = {
//   width: '100%',
//   height: '40%',
//   backgroundColor:'#FFA07A'
// };

const Main = ({children, history}) => {
  return (
    <div className="container">
      <div className="main-container" style={{backgroundColor: '#FFA07A', marginTop: '-20'}}>
        <div className="col-xs-2"></div>
        <div className="col-xs-8" style={{paddingTop: 55}}>
          <SearchInsta history={history}/>
        </div>
        <div className="col-xs-2"></div>
      </div>
      <div className="container row" style={{backgroundColor: 'red', display: 'block'}}>
        {children}
      </div>
    </div>
  )
}

export default Main
