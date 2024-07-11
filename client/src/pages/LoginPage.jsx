import agoraImg from "../assets/images/agora.jpg";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <h1 className="staticHeader">Koinoplaza</h1>
      <img alt="agora" src={agoraImg} className="agoraImgJpg"></img>
      <div className="formDiv">
        <h3>Log In</h3>
        <form className="loginForm">
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
          <input type="submit" value="Log In" />
        </form>
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
