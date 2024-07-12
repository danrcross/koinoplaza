import { Link } from "react-router-dom";
export default function JoinCommunityPage() {
  return (
    <>
      <header>
        <Link to="/home">Back</Link>
      </header>
      <h1>Join Community</h1>
      <form>
        <div>
          <label>
            <h3>Enter Community Code</h3>
          </label>
          <div className="inputAndJoin">
            <input type="text" id="commCode" name="commCode"></input>
            <button>Join Community</button>
          </div>
        </div>
      </form>
    </>
  );
}
