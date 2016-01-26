import React from 'react'

const Login = () => {
  return (
    <div className="row">
      <a href="/auth/twitter" style={{textDecoration: 'none', fontSize: 20, fontFamily: 'Lato', fontWeight: 300}}>
        <div className="alert alert-danger" style={{marginTop: 30}} role="alert">
          This user account is private. Click this to login with Twitter
        </div>
      </a>  
    </div>
  );
}

export default Login
