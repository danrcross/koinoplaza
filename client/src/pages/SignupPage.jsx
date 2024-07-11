import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <>
      <header className="appHeader">
        <h5>
          <Link to="/">Back</Link>
        </h5>
      </header>
      <h1 className="staticHeader">Koinoplaza</h1>
      <div className="formDiv">
        <form className="loginForm">
          <label htmlFor="firstName">First Name</label>
          <br />
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="John"
            className="inputField"
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
          />
          <br />
          <input type="submit" value="Sign up" />
        </form>
      </div>
    </>
  );
}
