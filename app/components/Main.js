import React from 'react';
import SearchInsta from './SearchInsta'

const Main = ({children, history}) => {
  return (
    <div>
      <div className="main-container" style={{backgroundColor: '#a4c5d6', marginTop: '-20'}}>
        <div className="col-xs-2"></div>
        <div className="col-xs-8" style={{paddingTop: 55}}>
          <SearchInsta history={history}/>
        </div>
        <div className="col-xs-2"></div>
      </div>

      <div className="container row" style={{display: 'block'}}>
        {children}
      </div>
    </div>
  )
}

export default Main
