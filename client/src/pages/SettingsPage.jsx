// NOTE TO MICHAEL:
// If we decide that we don't want to fuss with the file upload handling and storage, we can allow users to simply add a link to an image URL

import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import proPicSample from "../assets/images/profile-pic-sample.png";
export default function SettingsPage() {
  // created a testing function for the 'change' event of the file upload
  function handleUpload(e) {
    console.dir(e.target);
    console.log(e.target.files);
  }
  return (
    <>
      <Header />
      <h1>Settings</h1>
      <div className="settingsDiv">
        <div>
          {/* Below is the form to upload a new Profile Photo */}
          <form>
            <label htmlFor="profilePic">
              <h3>Profile Photo</h3>
            </label>
            <div className="proPicBox">
              <img
                className="profilePic"
                alt="profile-pic"
                src={proPicSample}
              ></img>
              {/* The <div> below contains an input of type="file" */}
              {/* This will require an "onChange" event listener */}
              <div className="proPicForm">
                <label htmlFor="profilePicFile"></label>
                <input
                  onChange={handleUpload}
                  type="file"
                  id="profilePicFile"
                  name="profilePicFile"
                ></input>
                <label htmlFor="profilePicUrl">Or enter a link...</label>
                <div className="inputAndSave">
                  <input
                    type="url"
                    id="profilePicUrl"
                    name="profilePicUrl"
                  ></input>
                  <button>Save</button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div>
          <h3>Email address</h3>
          <span>john.doe@gmail.com</span>
        </div>
        <form>
          <div>
            <label>
              <h3>Full Name</h3>
            </label>
            <input type="text" id="fullName" name="fullName"></input>
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
            <label>
              <h3>Occupation</h3>
            </label>
            <input type="text" id="fullName" name="occupation"></input>
            <button>Edit</button>
          </div>
        </form>
      </div>
      <footer>
        <Link to="/home">Home</Link>
        {/* Need to create functionality for these */}
        <a>Delete Account</a>
        <a>Save Changes</a>
      </footer>
    </>
  );
}
