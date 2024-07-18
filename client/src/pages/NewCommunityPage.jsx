import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CURRENT_USER } from "../utils/queries";
import { CREATE_COMMUNITY } from "../utils/mutations";

import sampPic from "../assets/images/wvlok.png";
export default function NewCommunityPage() {
  const navigate = useNavigate();

  // use store the data for the form in a state
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    location: "",
    image: "",
  });

  // Define our Query and Mutation
  const { data, loading } = useQuery(GET_CURRENT_USER);
  const [createCommunity] = useMutation(CREATE_COMMUNITY);

  // Handles Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    // for later, if we want to notify users that fields can't be empty while filling out form
    if ((name === "name" || "location" || "description") && value === "") {
      console.log("field cannot be blank!");
    }
  };

  // Upon clicking "Create Community"...
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("button clicked");

    // get the current user._id, as well as the values in the form
    const userID = (await data?.currentUser._id) || [];
    const { name, description, location, image } = formState;

    // perform mutation with those values. Upon success, redirect to the users communities
    try {
      await createCommunity({
        variables: {
          name,
          description,
          location,
          image,
          createdBy: userID,
        },
      });
      window.alert(
        `New Community, ${name}, successfully created! \n Redirecting to your communities`
      );
      navigate("/communities");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newItemPage">
      <Header />
      <h1 className="pageTitle">New Community</h1>
      <div className="newItemDiv">
        {/* Below is the form to upload a new Profile Photo */}
        <form className="newItemForm">
          <label className="newItemLabel" htmlFor="commPic">
            Community Photo
          </label>
          <div className="itemPicBox">
            <img className="itemPic" alt="comm-pic" src={sampPic}></img>
            <div className="itemPicForm">
              <label htmlFor="ncPicUrl">Enter a link...</label>
              <input
                type="url"
                id="ncPicUrl"
                name="image"
                className="itemInputShort"
                value={formState.image}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <label className="newItemLabel">Community Name</label>
          <div className="inputWrapper">
            <input
              className="itemInputLong"
              type="text"
              id="commName"
              name="name"
              value={formState.name}
              onChange={handleChange}
            ></input>
          </div>

          <label className="newItemLabel">Location</label>
          <div className="inputWrapper">
            <input
              className="itemInputLong"
              type="text"
              id="location"
              name="location"
              value={formState.location}
              onChange={handleChange}
            ></input>
          </div>

          <label className="newItemLabel">Description</label>
          <div className="inputWrapper">
            <input
              className="itemInputLong"
              type="text"
              id="description"
              name="description"
              value={formState.description}
              onChange={handleChange}
            ></input>
          </div>
          <button className="submitBtn" onClick={handleClick}>
            Create Community
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
