import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { GET_CURRENT_USER, GET_USER_COMMUNITIES } from "../utils/queries";
import { ADD_PRODUCT } from "../utils/mutations";

import sampPic from "../assets/images/parsnips.png";

export default function NewProductPage() {
  const navigate = useNavigate();

  const [addProduct] = useMutation(ADD_PRODUCT);

  const { data, loading } = useQuery(GET_CURRENT_USER);
  // const { data: allUserComs, loading: loadingComs } = useQuery(GET_USER_COMMUNITIES, {
  //   variables: { userID: data.currentUser._id }
  // })

  const [commState, setCommState] = useState([]);

  // upon loading the page, get and set all of the user's communities
  // useEffect(() => {
  //   async function populateCommunities() {
  //     const userComs = await allUserComs
  //     console.log("list of communities= " + userComs);
  //     setCommState(userComs);
  //   }
  //   populateCommunities();
  //   console.log(commState);
  // }, []);

  // store the data for the form in a state
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    image: "",
    condition: "",
    price: "",
    communityId: "",
  });

  // Handles form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Upon clicking "Add New Product"...
  const handleClick = async (e) => {
    e.preventDefault();

    // Get current user._id, then get the form state values
    const userId = (await data?.currentUser._id) || [];
    const userComs = (await data?.currentUser.communities) || [];
    const { name, description, image, price, condition, communityId } =
      formState;
    const priceNum = parseInt(price);

    try {
      console.log(
        `userId: ${userId}
        name: ${name}
        description: ${description}
        image: ${image}
        price: ${priceNum}
        condition: ${condition}
        communityId: ${communityId}
        `
      );
      await addProduct({
        variables: {
          name,
          description,
          image,
          price: priceNum,
          condition,
          communityId,
          userId,
        },
      });
      window.alert(
        `New Community, ${name}, successfully created in community ${communityId}! \n Redirecting to your products`
      );
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newItemPage">
      <Header />
      <h1 className="pageTitle">New Product</h1>
      <div className="newItemDiv">
        {/* Below is the form to upload a new Profile Photo */}
        <form className="newItemForm">
          <label className="newItemLabel" htmlFor="prodPic">
            Product Photo
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
          <label className="newItemLabel">Product Name</label>
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

          <label className="newItemLabel">Price</label>
          <div className="inputWrapper">
            <input
              className="itemInputLong"
              type="text"
              id="price"
              name="price"
              value={formState.price}
              onChange={handleChange}
            ></input>
          </div>
          <label className="newItemLabel">Condition</label>
          <div className="inputWrapper">
            <input
              className="itemInputLong"
              type="text"
              id="condition"
              name="condition"
              value={formState.condition}
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
          <label className="newItemLabel">Community ID</label>
          <div className="inputWrapper">
            <input
              className="itemInputLong"
              type="text"
              id="communityId"
              name="communityId"
              value={formState.communityId}
              onChange={handleChange}
            ></input>
          </div>
          {/*}
            This was a failed attempt at rendering a drop down list of communities

          <label className="newItemLabel">Choose a community:</label>
          <select className="inputWrapper" name="community" id="community">
            {commState.map((community) => (
              <option value={community._id}>{community.name}</option>
            ))} 
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
          </select> 

          */}
          <button className="submitBtn" onClick={handleClick}>
            Add New Product
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
