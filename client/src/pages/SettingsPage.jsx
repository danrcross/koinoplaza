import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import sampPic from "../assets/images/profile-pic-sample.png";
export default function SettingsPage() {
  const { userAll } = useOutletContext();
  const { imageLink, firstName, lastName, location, occupation } = userAll;
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
                  placeholder={imageLink}
                  readOnly
                ></input>
                <button>Edit</button>
              </div>
            </div>
          </form>
        </div>

        <div>
          <h3 className="newItemLabel">Email address</h3>
          <span>john.doe@gmail.com</span>
        </div>
        <form>
          <label className="newItemLabel">First Name</label>
          <div className="inputWrapper">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder={firstName}
              className="itemInputLong"
              readOnly
            ></input>
            <button>Edit</button>
          </div>
        </form>
        <form>
          <label className="newItemLabel">Last Name</label>
          <div className="inputWrapper">
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder={lastName}
              className="itemInputLong"
              readOnly
            ></input>
            <button>Edit</button>
          </div>
        </form>
        <form>
          <label className="newItemLabel">Location</label>
          <div className="inputWrapper">
            <input
              type="text"
              id="location"
              name="location"
              placeholder={location}
              className="itemInputLong"
              readOnly
            ></input>
            <button>Edit</button>
          </div>
        </form>
        <form>
          <label className="newItemLabel">Occupation</label>
          <div className="inputWrapper">
            <input
              type="text"
              id="fullName"
              name="occupation"
              placeholder={occupation}
              className="itemInputLong"
              readOnly
            ></input>
            <button>Edit</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
