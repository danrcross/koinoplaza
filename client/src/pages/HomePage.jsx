import { useState } from "react";
import { Link } from "react-router-dom";
import DataBar from "../components/DataBar";
import ListButton from "../components/ListButton";
import MyProducts from "../components/MyProducts";
import MyCommunities from "../components/MyCommunities";
import Footer from "../components/Footer";

export default function HomePage() {
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
      seller: {
        name: "John Doe",
        rating: 4.7,
      },
    },
  ]);

  // const [myWatchlistData, setMyWatchlistData] = useState([
  //   {
  //     id: 1,
  //     product: "Cabbage",
  //     condition: "Freshly harvested",
  //     price: 2,
  //     seller: {
  //       name: "Randy Gardner",
  //       rating: 4.9,
  //     },
  //   },
  //   {
  //     id: 2,
  //     product: "Big Hoss Weed Eater",
  //     condition: "Like New",
  //     price: 75,
  //     seller: {
  //       name: "Joe Homberg",
  //       rating: 4.9,
  //     },
  //   },
  // ]);
  const [myCommunityData, setMyCommunityData] = useState([
    {
      id: 1,
      name: "Scott Co. Farmers",
      membership: "Creator",
      location: "Scott County, OK",
      members: 15,
    },
    {
      id: 2,
      name: "Waynesville Community",
      membership: "Member",
      location: "Waynesville, OK",
      members: 124,
    },
  ]);
  const [openLists, setOpenLists] = useState({
    myproducts: true,
    mycommunities: true,
  });
  function handleClick(e) {
    const id = e.target.id;
    const curVal = openLists[id];
    setOpenLists({ ...openLists, [id]: !curVal });
  }
  return (
    <>
      <h1>Home</h1>
      <DataBar barData={userData} />
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
          id="mycommunities"
        />
      </h3>
      {openLists.mycommunities && (
        <MyCommunities myCommunityData={myCommunityData} />
      )}
      <Footer />
    </>
  );
}
