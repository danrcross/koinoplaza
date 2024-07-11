import { useState } from "react";
import { Link } from "react-router-dom";
import DataBar from "../components/DataBar";
import ListButton from "../components/ListButton";
import MyProducts from "../components/MyProducts";

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
  const [openLists, setOpenLists] = useState({
    myproducts: true,
  });
  function handleClick(e) {
    const id = e.target.id;
    const curVal = openLists[id];
    setOpenLists({ [id]: !curVal });
  }
  return (
    <>
      <h1>Home</h1>
      <DataBar userData={userData} />
      <h3>
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="myproducts"
        />
      </h3>
      {openLists.myproducts && <MyProducts myProductData={myProductData} />}

      <footer>
        <Link to="/settings">Settings</Link>
      </footer>
    </>
  );
}
