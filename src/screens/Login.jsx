import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import swapgala from '../picture/swapgala.png';
import emailPic from '../picture/emailPic.png';
import passwordPic from '../picture/passwordPic.png';
import hidepass from '../picture/hidepass.png';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: email,
        password: password,
      }, {
        withCredentials: true,
      });
      
      const authToken = response.data.token;

      localStorage.setItem('authToken', authToken);

      navigate('/');

    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="loginpage">
      <div className="login">
        <div className="headlogin">
          SWAPGALA<img src={swapgala} alt="swapgala" />
        </div>
        <div>
          <img src={emailPic} alt="email icon" />
          <input
            className="username"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Use e.target.value to capture input
          />
          <div className='underline-login'></div>
        </div>
        <div>
          <img src={passwordPic} alt="password icon" />
          <input
            type="password"
            className="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Use e.target.value to capture input
          />
          <div className='underline-login'></div>
        </div>

        <div className='forgotpass'><a href="/">Forgot password?</a></div>
        <div className="loginbutton" onClick={handleLogin}>Login</div>

        <Link to="/register">
          <div className='register'>
            Don't have an account? <a href="/">Sign up</a>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Login;
