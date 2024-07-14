import Header from "../components/Header";
import Footer from "../components/Footer";

import sampPic from "../assets/images/wvlok.png";
export default function NewCommunityPage() {
  function handleUpload(e) {
    console.dir(e.target);
    console.log(e.target.files);
  }
  return (
    <>
      <Header />
      <h1>New Community</h1>
      <div className="newCommDiv">
        <div>
          {/* Below is the form to upload a new Profile Photo */}
          <form>
            <label htmlFor="commPic">
              <h3>Community Photo</h3>
            </label>
            <div className="commPicBox">
              <img className="commPic" alt="comm-pic" src={sampPic}></img>
              {/* The <div> below contains an input of type="file" */}
              {/* This will require an "onChange" event listener */}
              <div className="commPicForm">
                <label htmlFor="commPicFile"></label>
                <input
                  onChange={handleUpload}
                  type="file"
                  id="commPicFile"
                  name="commPicFile"
                ></input>
                <label htmlFor="commPicUrl">Or enter a link...</label>
                <div className="inputAndSave">
                  <input type="url" id="commPicUrl" name="commPicUrl"></input>
                  <button>Save</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <form>
          <div>
            <label>
              <h3>Community Name</h3>
            </label>
            <input type="text" id="commName" name="commName"></input>
            <button>Edit</button>
          </div>
          <div>
            <label>
              <h3>Location</h3>
            </label>
            <input type="text" id="location" name="location"></input>
            <button>Edit</button>
          </div>
          <div>
            <input type="submit" value="Create Community" />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
