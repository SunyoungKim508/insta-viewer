import React from 'react';
import Router from 'react-router';

class SearchTwitter extends React.Component {
  getRef(ref){
    this.usernameRef = ref;
  }
  handleSubmit(){
    const username = this.usernameRef.value;
    this.usernameRef.value = '';
    this.props.history.pushState(null, "/profile/" + username);
  }
  render(){
    return (
      <div className="col-sm-12">
        <form onSubmit={() => this.handleSubmit()}>
          <div className="form-group col-sm-7">
            <input type="text" className="form-control" ref={(ref) => this.getRef(ref)} />
          </div>
          <div className="form-group col-sm-5">
            <button type="submit" className="btn btn-primary btn-block btn-lg outline">Search User</button>
          </div>
        </form>
      </div>
    )
  }
}

SearchTwitter.PropTypes = {
  history: React.PropTypes.object.isRequired
}

export default SearchTwitter;
