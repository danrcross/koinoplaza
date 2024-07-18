import { useState } from "react";
import { useMutation } from "@apollo/client";
import agoraImg from "../assets/images/agora.jpg";
import { LOGIN_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

import Footer from "../components/Footer";

export default function LoginPage() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      navigate("/home");
    } catch (e) {
      console.error("Login failed", e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="loginPage">
      <div className="topDiv">
        <h1 className="staticHeader">Koinoplaza</h1>
        <img alt="agora" src={agoraImg} className="agoraImgJpg"></img>
      </div>
      <div className="formDiv">
        {data ? (
          <h3>Log In</h3>
        ) : (
          <form className="loginForm" onSubmit={handleSubmit}>
            <label htmlFor="email" className="logFormLabel">
              Email
            </label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john.doe@email.com"
              className="inputField"
              value={formState.email}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="password" className="logFormLabel">
              Password
            </label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="inputField"
              value={formState.password}
              onChange={handleChange}
            />
            <br />
            <input type="submit" value="Log In" className="loginBtn" />
          </form>
        )}
        {error && <p>Error logging in</p>}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
