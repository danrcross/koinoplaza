import { useState } from "react";
import { Link } from "react-router-dom";

import DataBar from "../components/DataBar";
import ListButton from "../components/ListButton";
import MyProducts from "../components/MyProducts";
import MyCommunities from "../components/MyCommunities";
import Watchlist from "../components/Watchlist";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OtherCommunities from "../components/OtherCommunities";

import sampPic from "../assets/images/profile-pic-sample.png";
import goatPic from "../assets/images/goat.jpg";

export default function HomePage() {
  const user = "John Doe";
  const [userData, setUserData] = useState([
    { id: 1, name: "Watchlist", value: 2 },
    { id: 2, name: "My Products", value: 2 },
    { id: 3, name: "Communities", value: 8 },
    { id: 4, name: "Seller Rating", value: 4.7 },
  ]);
  const [myProductData, setMyProductData] = useState([
    {
      id: 1,
      product: "Billy Goat (1)",
      condition: "Healthy, 1 year old",
      price: 50,
      image: goatPic,
      seller: {
        name: "John Doe",
        rating: 4.7,
      },
    },
    {
      id: 2,
      product: "Parsnips (1 Bushel)",
      condition: "Freshly harvested",
      price: 40,
      image: goatPic,
      seller: {
        name: "John Doe",
        rating: 4.7,
      },
    },
  ]);

  const [watchlistData, setWatchlistData] = useState([
    {
      id: 1,
      product: "Cabbage",
      condition: "Freshly harvested",
      price: 2,
      seller: {
        name: "Randy Gardner",
        rating: 4.9,
      },
    },
    {
      id: 2,
      product: "Big Hoss Weed Eater",
      condition: "Like New",
      price: 75,
      seller: {
        name: "Joe Homberg",
        rating: 4.9,
      },
    },
  ]);
  const [myCommunityData, setMyCommunityData] = useState([
    {
      id: 1,
      name: "Scott Co. Farmers",
      membership: "Creator",
      location: "Scott County, OK",
      members: 15,
    },
  ]);
  const [otherCommunityData, setOtherCommunityData] = useState([
    {
      id: 1,
      name: "Waynesville Community",
      membership: "Member",
      location: "Waynesville, OK",
      members: 124,
    },
    {
      id: 2,
      name: "Oklahoma City Produce",
      membership: "Member",
      location: "Oklahoma City, OK",
      members: 853,
    },
  ]);
  const [openLists, setOpenLists] = useState({
    myproducts: true,
    mycommunities: true,
    watchlist: true,
  });
  function handleClick(e) {
    const id = e.target.id;
    const curVal = openLists[id];
    setOpenLists({ ...openLists, [id]: !curVal });
  }
  return (
    <div className="homePage">
      <Header pageName="home" />
      <h1 className="pageTitle">John Doe's Home</h1>
      <div className="topBox">
        <DataBar barData={userData} />
        <img
          alt="profile-pic-home"
          className="profilePicHome"
          src={sampPic}
        ></img>
      </div>
      <h3>
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="myproducts"
        />
      </h3>
      {openLists.myproducts && <MyProducts myProductData={myProductData} />}
      <h3>
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="watchlist"
        />
      </h3>
      {openLists.watchlist && <Watchlist watchlistData={watchlistData} />}
      <h3>
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="mycommunities"
        />
      </h3>
      {openLists.mycommunities && (
        <div>
          <MyCommunities myCommunityData={myCommunityData} />
          <OtherCommunities otherCommunityData={otherCommunityData} />
        </div>
      )}
      <Footer />
    </div>
  );
}
