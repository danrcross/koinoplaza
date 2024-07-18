import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import DataBar from "../components/DataBar";
import ListButton from "../components/ListButton";
import MyProducts from "../components/MyProducts";
import Watchlist from "../components/Watchlist";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useQuery } from "@apollo/client";
import { PRODUCTS } from "../utils/queries";

// TODO: see if this is being used of not!
export default function ProductsPage() {
  const id = localStorage.getItem("userID");
  const userInfo = localStorage.getItem("userInfo");
  const userID = JSON.parse(id);
  const currentUser = JSON.parse(userInfo);

  const [openLists, setOpenLists] = useState({
    myproducts: true,
    watchlist: true,
  });
  function handleClick(e) {
    console.log(e.target);
    const { id } = e.target;
    setOpenLists((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  // const allProducts = data?.products || [];

  return (
    <>
      <Header />
      <h1 className="pageTitle">{currentUser.firstName}'s Products</h1>
      <DataBar currentUser={currentUser} />
      {/* this is test/dev code */}
      <h3 className="lbContainer">
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="myproducts"
        />
      </h3>
      {openLists.myproducts && <MyProducts userID={userID} />}
      <h3 className="lbContainer lbContainerAfter">
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="watchlist"
        />
      </h3>
      {openLists.watchlist && <Watchlist userID={userID} />}
      {/* commenting out code that will be used for actual user data population */}
      {/* <h3 className="lbContainer">
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="watchlist"
        />
      </h3>
      {openLists.myproducts && <MyProducts myProductData={myProductData} />}
      <h3 className="lbContainer">
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="watchlist"
        />
      </h3>
      {openLists.watchlist && <Watchlist watchlistData={watchlistData} />} */}
      <Footer />
    </>
  );
}
