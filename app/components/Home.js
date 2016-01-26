import React from 'react';

export default function Home () {
  let styles = {
    color: '#99aaff',
    marginTop: 50,
    fontWeight: 300,
    fontSize: 30
  }

  return (
    <h4 className="text-center vertical-center center-block" style={styles} >
      <img src={require("../img/search.png")} className="search-img" style={{width: 80, height: 80, marginTop: 15}} />
      <p style={{marginTop: 10}} className="search-info">Search With Twitter Viewer</p>
    </h4>
  )

}
