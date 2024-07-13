import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import { SIGNUP_USER } from "../graphql/mutations";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signup, { data, loading, error }] = useMutation(SIGNUP_USER);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ variables: { name, email, password } });
      navigate("/"); // Redirect to login page after successful signup
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <header className="appHeader">
        <h5>
          <Link to="/">Back</Link>
        </h5>
      </header>
      <h1 className="staticHeader">Koinoplaza</h1>
      <div className="formDiv">
        <form className="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <br />
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="John"
            className="inputField"
            value={name}
            onChange={handleNameChange}
          />
          <br />
          <label htmlFor="lastName">Last Name</label>
          <br />
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Doe"
            className="inputField"
            value={name}
            onChange={handleNameChange}
          />
          <br />
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
          <label htmlFor="password">Re-enter Password</label>
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
          <input type="submit" value="Sign up" disabled={loading} />
        </form>
        {error && <p>Error signing up</p>}
      </div>
    </>
  );
}
