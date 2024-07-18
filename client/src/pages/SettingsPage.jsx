import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";
import { GET_CURRENT_USER } from "../utils/queries";
import Header from "../components/Header";
import Footer from "../components/Footer";

import sampPic from "../assets/images/profile-pic-sample.png";

export default function SettingsPage() {
  const { userInfo, setUserInfo } = useOutletContext();
  const { data, loading, error } = useQuery(GET_CURRENT_USER);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
    image: "",
  });

  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    location: false,
    occupation: false,
    image: false,
  });

  useEffect(() => {
    if (data && data.currentUser) {
      setFormData({
        firstName: data.currentUser.firstName || "",
        lastName: data.currentUser.lastName || "",
        location: data.currentUser.location || "",
        occupation: data.currentUser.occupation || "",
        image: data.currentUser.image || "",
      });
      setUserInfo(data.currentUser);
    }
  }, [data, setUserInfo]);

  const [updateUser] = useMutation(UPDATE_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
    console.log("Editing:", field);
  };

  const handleSave = async (e, field) => {
    e.preventDefault();
    console.log("handleSave called");
    try {
      const { data } = await updateUser({
        variables: {
          id: userInfo._id,
          firstName: formData.firstName || "",
          lastName: formData.lastName || "",
          location: formData.location || "",
          occupation: formData.occupation || "",
          image: formData.image || "",
        },
      });
      console.log("User updated:", data.updateUser);
      setUserInfo(data.updateUser);
      setIsEditing({ ...isEditing, [field]: false });
    } catch (err) {
      console.error("Error updating user:", err);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading user data</p>;

    return (
      <div className="settingsPage">
        <Header />
        <h1 className="pageTitle">Settings</h1>
        <div className="settingsDiv">
          <div>
            {/* Below is the form to upload a new Profile Photo */}
            <form className="newItemForm" onSubmit={handleSave}>
              <h3 className="newItemLabel" htmlFor="commPic">
                Profile Picture
              </h3>
              <div className="itemPicBox">
                <img
                  className="itemPic"
                  alt="comm-pic"
                  src={formData.image || sampPic}
                ></img>
                <div className="itemPicForm">
                  <label htmlFor="image">Enter a link...</label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    className="itemInputShort"
                    placeholder="Image Url"
                    value={formData.image}
                    onChange={handleChange}
                    readOnly={!isEditing.image}
                  ></input>
                  {isEditing.image ? (
                    <button type="submit">Save Changes</button>
                  ) : (
                    <button type="button" onClick={() => handleEdit("image")}>
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div>
            <h3 className="newItemLabel">Email address</h3>
            <span>{userInfo.email}</span>
          </div>
          <form onSubmit={handleSave}>
            <label className="newItemLabel">First Name</label>
            <div className="inputWrapper">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="itemInputLong"
                value={formData.firstName}
                onChange={handleChange}
                readOnly={!isEditing.firstName}
              ></input>
              {isEditing.firstName ? (
                <button type="submit">Save Changes</button>
              ) : (
                <button type="button" onClick={() => handleEdit("firstName")}>
                  Edit
                </button>
              )}
            </div>
          </form>
          <form onSubmit={handleSave}>
            <label className="newItemLabel">Last Name</label>
            <div className="inputWrapper">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="itemInputLong"
                readOnly={!isEditing.lastName}
              ></input>
              {isEditing.lastName ? (
                <button type="submit">Save Changes</button>
              ) : (
                <button type="button" onClick={() => handleEdit("lastName")}>
                  Edit
                </button>
              )}
            </div>
          </form>
          <form onSubmit={handleSave}>
            <label className="newItemLabel">Location</label>
            <div className="inputWrapper">
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="itemInputLong"
                readOnly={!isEditing.location}
              ></input>
              {isEditing.location ? (
                <button type="submit">Save Changes</button>
              ) : (
                <button type="button" onClick={() => handleEdit("location")}>
                  Edit
                </button>
              )}
            </div>
          </form>
          <form onSubmit={handleSave}>
            <label className="newItemLabel">Occupation</label>
            <div className="inputWrapper">
              <input
                type="text"
                id="occupation"
                name="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="itemInputLong"
                readOnly={!isEditing.occupation}
              ></input>
              {isEditing.occupation ? (
                <button type="submit">Save Changes</button>
              ) : (
                <button type="button" onClick={() => handleEdit("occupation")}>
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  };
}
