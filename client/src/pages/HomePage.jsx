import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

import DataBar from "../components/DataBar";
import ListButton from "../components/ListButton";
import MyProducts from "../components/MyProducts";
import MyCommunities from "../components/MyCommunities";
import Watchlist from "../components/Watchlist";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OtherCommunities from "../components/OtherCommunities";

import sampPic from "../assets/images/profile-pic-sample.png";
import {PRODUCTS} from '../utils/queries';
import {useQuery} from '@apollo/client';

export default function HomePage() {
  const { myProductData, watchlistData, myCommunityData, otherCommunityData } =
    useOutletContext();
  const [userData, setUserData] = useState([
    { id: 1, name: "Watchlist", value: 2 },
    { id: 2, name: "My Products", value: 2 },
    { id: 3, name: "Communities", value: 8 },
    { id: 4, name: "Seller Rating", value: 4.7 },
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
  const {loading, data, error} = useQuery(PRODUCTS)
  const allProducts = data?.products || []
  console.log(allProducts)
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
      <h3 className="lbContainer">
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="myproducts"
        />
      </h3>
      {openLists.myproducts && <MyProducts myProductData={allProducts} />}
      <h3 className="lbContainer">
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="watchlist"
        />
      </h3>
      {openLists.watchlist && <Watchlist watchlistData={watchlistData} />}
      <h3 className="lbContainer">
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
