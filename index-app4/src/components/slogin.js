import React from 'react';
import './slogin.css';
import { useNavigate } from 'react-router-dom'
function Login() {
   const Navigate = useNavigate(); 
  return (
    <div className="login-box">
      <h2>Login</h2>
      <form>
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button type="submit" onClick={()=>(Navigate("/farmlog"))}>Login</button>
        <p className="signup-text">Don't have an account? <a href="#">Sign up</a></p>
      </form>
    </div>
  );
}

export default Login;
