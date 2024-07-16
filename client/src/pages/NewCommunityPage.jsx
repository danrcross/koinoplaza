import Header from "../components/Header";
import Footer from "../components/Footer";

import sampPic from "../assets/images/wvlok.png";
export default function NewCommunityPage() {
  return (
    <div className="newCommPage">
      <Header />
      <h1 className="pageTitle">New Community</h1>
      <div className="newCommDiv">
        {/* Below is the form to upload a new Profile Photo */}
        <form className="newCommForm">
          <label className="newCommLabel" htmlFor="commPic">
            Community Photo
          </label>
          <div className="ncPicBox">
            <img className="ncPic" alt="comm-pic" src={sampPic}></img>
            <div className="ncPicForm">
              <label htmlFor="ncPicUrl">Enter a link...</label>
              <input
                type="url"
                id="ncPicUrl"
                name="ncPicUrl"
                className="ncInputShort"
              ></input>
            </div>
          </div>
          <label className="newCommLabel">Community Name</label>
          <div className="inputWrapper">
            <input
              className="ncInputLong"
              type="text"
              id="commName"
              name="commName"
            ></input>
          </div>

          <label className="newCommLabel">Location</label>
          <div className="inputWrapper">
            <input
              className="ncInputLong"
              type="text"
              id="location"
              name="location"
            ></input>
          </div>
          <input className="submitBtn" type="submit" value="Create Community" />
        </form>
      </div>
      <Footer />
    </div>
  );
}
