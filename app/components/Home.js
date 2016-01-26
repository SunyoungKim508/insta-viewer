import React from 'react';

export default function Home () {
  
  let styles = {
    color: '#99aaff',
    fontFamily: 'Lato',
    marginTop: 50,
    fontWeight: 300,
    fontSize: 30
  }

  return (
    <h4 className="text-center vertical-center center-block" style={styles} >
      <i className='ion-ios-search' style={{fontSize: 60}}></i>
      <p>Search With Twitter Viewer</p>
    </h4>
  )

}
