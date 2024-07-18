import { useOutletContext } from "react-router-dom";
import { useState, useEffect, createRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";
import { GET_CURRENT_USER } from "../utils/queries";
import Header from "../components/Header";
import Footer from "../components/Footer";

import sampPic from "../assets/images/profile-pic-sample.png";

export default function SettingsPage() {
  const { userAll, setUserAll } = useOutletContext();
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
      setUserAll(data.currentUser);
    }
  }, [data, setUserAll]);

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
          id: userAll._id,
          firstName: formData.firstName || "",
          lastName: formData.lastName || "",
          location: formData.location || "",
          occupation: formData.occupation || "",
          image: formData.image || "",
        },
      });
      console.log("User updated:", data.updateUser);
      setUserAll(data.updateUser);
      setIsEditing({ ...isEditing, [field]: false });
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };
  const fileInputRef = createRef();
  
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    const uploadFormData = new FormData();
    uploadFormData.append("image", file);

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: uploadFormData,
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Image uploaded:", result);
        setFormData({ ...formData, image:  `/uploads/${result.filename}` });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data</p>;

  return (
    <div className="settingsPage">
      <Header />
      <h1 className="pageTitle">Settings</h1>
      <div className="settingsDiv">
        <div>
          {/* Below is the form to upload a new Profile Photo */}
          <form
            className="newItemForm"
            onSubmit={(e) => handleSave(e, "image")}
          >
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
                <label htmlFor="imageUpload">Upload a file...</label>
                <input
                  type="file"
                  id="imageUpload"
                  name="imageUpload"
                  className="itemInputShort"
                  // placeholder="Image Url"
                  // value={formData.image}
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  // readOnly={!isEditing.image}
                ></input>
                {/* isEditing.image */}
                <button type="submit">Save Changes</button>
              </div>
            </div>
          </form>
        </div>

        <div>
          <h3 className="newItemLabel">Email address</h3>
          <span>{userAll.email}</span>
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
}
