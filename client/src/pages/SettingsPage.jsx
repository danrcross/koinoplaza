import { Link } from "react-router-dom";
import proPicSample from "../assets/images/profile-pic-sample.png";
export default function SettingsPage() {
  return (
    <>
      <header>
        <Link to="/home">Back</Link>
      </header>
      <h1>Settings</h1>
      <div className="settingsDiv">
        <div>
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
              <div className="proPicForm">
                <label htmlFor="profilePicFile"></label>
                <input
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
        <div>
          <form>
            <label>
              <h3>Full Name</h3>
            </label>
            <input type="text" id="fullName" name="fullName"></input>
            <button>Edit</button>
          </form>
        </div>
        <div>
          <form>
            <label>
              <h3>Location</h3>
            </label>
            <input type="text" id="location" name="location"></input>
            <button>Edit</button>
          </form>
        </div>
        <div>
          <form>
            <label>
              <h3>Occupation</h3>
            </label>
            <input type="text" id="fullName" name="occupation"></input>
            <button>Edit</button>
          </form>
        </div>
      </div>
      <footer>
        <Link to="/home">Home</Link>
        <a>Delete Account</a>
        <a>Save Changes</a>
      </footer>
    </>
  );
}
