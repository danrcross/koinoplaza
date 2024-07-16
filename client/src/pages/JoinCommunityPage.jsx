import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function JoinCommunityPage() {
  return (
    <div className="joinCommPage">
      <Header />
      <h1 className="pageTitle">Join Community</h1>
      <form className="newItemForm">
        <label className="newItemLabel" htmlFor="commCode">
          Enter Community Code
        </label>
        <div className="inputWrapper">
          <input
            type="text"
            id="commCode"
            name="commCode"
            className="itemInputLong"
          ></input>
        </div>
        <input className="submitBtn" type="submit" value="Join Community" />
      </form>
      <Footer />
    </div>
  );
}
