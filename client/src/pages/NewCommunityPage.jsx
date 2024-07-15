import Header from "../components/Header";
import Footer from "../components/Footer";

import sampPic from "../assets/images/wvlok.png";
export default function NewCommunityPage() {
  function handleUpload(e) {
    console.dir(e.target);
    console.log(e.target.files);
  }
  return (
    <div className="newCommPage">
      <Header />
      <h1 className="pageTitle">New Community</h1>
      <div className="newCommDiv">
        <div className="newCommForm">
          {/* Below is the form to upload a new Profile Photo */}
          <form>
            <label className="newCommLabel" htmlFor="commPic">
              Community Photo
            </label>
            <div className="commPicBox">
              <img className="commPic" alt="comm-pic" src={sampPic}></img>
              {/* The <div> below contains an input of type="file" */}
              {/* This will require an "onChange" event listener */}
              <div className="commPicForm">
                <label htmlFor="commPicFile"></label>
                <input
                  className="ncInputShort"
                  onChange={handleUpload}
                  type="file"
                  id="commPicFile"
                  name="commPicFile"
                ></input>
                <label htmlFor="commPicUrl">Or enter a link...</label>
                <div className="inputAndSave">
                  <input
                    type="url"
                    id="commPicUrl"
                    name="commPicUrl"
                    className="ncInputShort"
                  ></input>
                  <button className="saveBtn">Save</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <form>
          <div>
            <label className="newCommLabel">Community Name</label>
            <input
              className="ncInputLong"
              type="text"
              id="commName"
              name="commName"
            ></input>
            <button className="editBtn">Edit</button>
          </div>
          <div>
            <label className="newCommLabel">Location</label>
            <input
              className="ncInputLong"
              type="text"
              id="location"
              name="location"
            ></input>
            <button className="editBtn">Edit</button>
          </div>
          <div>
            <input type="submit" value="Create Community" />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
