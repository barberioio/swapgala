import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import swapgala from "../picture/swapgala.png";
import emailPic from "../picture/emailPic.png";
import passwordPic from "../picture/passwordPic.png";
import hidepass from "../picture/hidepass.png";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', {
        email: email,
        password: password,
      });
      // Check the status code
    console.log(response)
    } catch (error) {
      console.log("gunnnnnnnnnnn")
    }
  };

  return (
    <div className="registerpage">
      <div className="register">
        <div className="headregis">Register</div>
        <div>
          <img src={emailPic}></img>
          <input
            className="username"
            placeholder="   Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="underline-register"></div>
        </div>
        <div>
          <img src={passwordPic}></img>
          <input
            type="password"
            className="password"
            placeholder="    Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="underline-register"></div>

          <img src={passwordPic}></img>
          <input
            type="password"
            className="password"
            placeholder="    Re-Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />

          <div className="underline-register"></div>
        </div>
        {isError && <div>error</div>}
        <div
          className="regisbutton"
          onClick={() => {
            if (password === rePassword) {
              setIsError(false);
              handleRegister();
            } else {
              setIsError(true);
            }
          }}
        >
          Create Account
        </div>
      </div>
    </div>
  );
}

export default Register;
