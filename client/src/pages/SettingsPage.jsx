// NOTE TO MICHAEL:
// If we decide that we don't want to fuss with the file upload handling and storage, we can allow users to simply add a link to an image URL

import { Link } from "react-router-dom";
import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import sampPic from "../assets/images/profile-pic-sample.png";
export default function SettingsPage() {
  return (
    <div className="settingsPage">
      <Header />
      <h1 className="pageTitle">Settings</h1>
      <div className="settingsDiv">
        <div>
          {/* Below is the form to upload a new Profile Photo */}
          <form className="newItemForm">
            <h3 className="newItemLabel" htmlFor="commPic">
              Profile Picture
            </h3>
            <div className="itemPicBox">
              <img className="itemPic" alt="comm-pic" src={sampPic}></img>
              <div className="itemPicForm">
                <label htmlFor="ncPicUrl">Enter a link...</label>
                <input
                  type="url"
                  id="ncPicUrl"
                  name="ncPicUrl"
                  className="itemInputShort"
                ></input>
                <button>Edit</button>
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
      <Footer />
    </div>
  );
}
