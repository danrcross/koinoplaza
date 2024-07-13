import { useState } from "react";
import { useParams, Link } from "react-router-dom";
// import { useQuery } from "@apollo/client";
import DataBar from "../components/DataBar";
import ListButton from "../components/ListButton";
import MyProducts from "../components/MyProducts";
import CommunityProducts from "../components/CommunityProducts";

//just a sample image
import wvlokImg from "../assets/images/wvlok.png";

// Just a placeholder/template
// import { QUERY_SINGLE_COMMUNITY } from "../utils/queriesDANIEL";

export default function SingleCommunityPage() {
  const { communityId } = useParams();
  console.log(communityId);
  const sampleData = {
    name: communityId,
    description: "A Cool Community",
    location: "Waynesville, OK",
    members: 124,
  };
  const { name, description, location, members } = sampleData;
  const [barData, setBarData] = useState([
    { id: 1, name: "Location", value: location },
    { id: 2, name: "Members", value: members },
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
  const [commProductData, setCommProductData] = useState([
    {
      id: 1,
      product: "Laying Chicken (1)",
      condition: "1.5 years old",
      price: 25,
      seller: {
        name: "Jimmy Cox",
        rating: 4.4,
      },
    },
    {
      id: 2,
      product: "Cabbage (1 Head)",
      condition: "Fresh",
      price: 2,
      seller: {
        name: "Randy Gardner",
        rating: 4.9,
      },
    },
  ]);
  const [openLists, setOpenLists] = useState({
    myproducts: true,
    commproducts: true,
  });

  // Just a placeholder/template
  // const { loading, data } = useQuery(QUERY_SINGLE_COMMUNITY, {
  //   // pass URL parameter
  //   variables: { communityId: communityId },
  // });

  function handleClick(e) {
    const id = e.target.id;
    const curVal = openLists[id];
    setOpenLists({ ...openLists, [id]: !curVal });
  }
  return (
    <>
      <header>
        <Link to="/home">Back</Link>
      </header>
      <h1> {name} Community</h1>
      <DataBar barData={barData} />
      <div className="imgAndDesc">
        <img className="commImg" src={wvlokImg} />
        <p>{description}</p>
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
          id="commproducts"
        />
      </h3>
      {openLists.commproducts && (
        <CommunityProducts commProductData={commProductData} />
      )}
      <footer>
        <Link to="/home">Home</Link>
        <Link to="/newproduct">+ Add New Product</Link>
      </footer>
    </>
  );
}
