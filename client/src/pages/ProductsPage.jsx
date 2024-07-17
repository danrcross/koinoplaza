import { useState } from "react";
import { Link } from "react-router-dom";
import DataBar from "../components/DataBar";
import ListButton from "../components/ListButton";
import MyProducts from "../components/MyProducts";
import Watchlist from "../components/Watchlist";
import Header from "../components/Header";
import Footer from "../components/Footer";

import goatPic from "../assets/images/goat.jpg";
import {useQuery} from '@apollo/client';
import {PRODUCTS} from '../utils/queries';

// TODO: see if this is being used of not!
export default function ProductsPage() {
  const user = "John Doe";
  const [userData, setUserData] = useState([
    { id: 1, name: "My Products", value: 2 },
    { id: 2, name: "Watchlist", value: 2 },
  ]);
  const {loading, data, error} = useQuery(PRODUCTS)
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
      image: goatPic,
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
      image: goatPic,
      seller: {
        name: "Joe Homberg",
        rating: 4.9,
      },
    },
  ]);
  const [openLists, setOpenLists] = useState({
    myproducts: true,
    watchlist: true,
  });
  function handleClick(e) {
    const id = e.target.id;
    const curVal = openLists[id];
    setOpenLists({ ...openLists, [id]: !curVal });
  }
  
  const allProducts = data?.products || []
  console.log(allProducts)
  return (
    <>
      <Header />
      <h1>{user}'s Products</h1>
      <DataBar barData={userData} />
      <h3 className="lbContainer">
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="myproducts"
        />
      </h3>
      {allProducts && <MyProducts myProductData={allProducts} />}
      <h3 className="lbContainer">
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="watchlist"
        />
      </h3>
      {/* {openLists.watchlist && <Watchlist watchlistData={watchlistData} />} */}
      <Footer />
    </>
  );
}
