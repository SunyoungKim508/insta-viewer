import React from 'react'

const Login = () => {
  return (
    <div className="row">
      <a href="/auth/twitter" style={{textDecoration: 'none', fontSize: 20, fontWeight: 300}}>
        <div className="alert alert-danger" style={{marginTop: 30}} role="alert">
          This user account is private. Click this to login with Twitter.
          If you are logged in already, then you are not following this user, so you can't see the timeline.
        </div>
      </a>  
    </div>
  );
}

export default Login
