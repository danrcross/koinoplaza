import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import agoraImg from "../assets/images/agora.jpg";
import { LOGIN_USER } from "../utils/mutations";
import AuthService from '../utils/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });
      const token = data.login.token;
      AuthService.login(token); // Use AuthService to handle login
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1 className="staticHeader">Koinoplaza</h1>
      <img alt="agora" src={agoraImg} className="agoraImgJpg"></img>
      <div className="formDiv">
        <h3>Log In</h3>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john.doe@email.com"
            className="inputField"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            className="inputField"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <input type="submit" value="Log In" disabled={loading} />
        </form>
        {error && <p>Error logging in</p>}
      </div>
      <div>
        <footer>
          <span>New User? </span>
          <Link to="/signup">Sign up</Link>
        </footer>
      </div>
    </>
  );
}