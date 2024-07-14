import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

export default function SignupPage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    if (formState.password !== formState.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      navigate("/");
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
            value={formState.firstName}
            onChange={handleChange}
            required
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
            value={formState.lastName}
            onChange={handleChange}
            required
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
            value={formState.email}
            onChange={handleChange}
            required
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
            value={formState.password}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="password">Re-enter Password</label>
          <br />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="********"
            className="inputField"
            value={formState.confirmPassword}
            onChange={handleChange}
            required
          />
          <br />
          <input type="submit" value="Sign up" />
        </form>

        {error && <p>Error signing up</p>}
      </div>
    </>
  );
}
