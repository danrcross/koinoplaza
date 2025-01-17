import { useState } from "react";
import { useParams, Link } from "react-router-dom";
// import { useQuery } from "@apollo/client";
import DataBar from "../components/DataBar";
import ListButton from "../components/ListButton";
import MyProducts from "../components/MyProducts";
import CommunityProducts from "../components/CommunityProducts";
import Header from "../components/Header";
import Footer from "../components/Footer";

//just a sample image
import wvlokImg from "../assets/images/wvlok.png";
import goatPic from "../assets/images/goat.jpg";

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
  const [commProductData, setCommProductData] = useState([
    {
      id: 1,
      product: "Laying Chicken (1)",
      condition: "1.5 years old",
      price: 25,
      image: goatPic,
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
      image: goatPic,
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
      <Header />
      <h1> {name} Community</h1>
      <DataBar barData={barData} />
      <div className="imgAndDesc">
        <img className="commImg" src={wvlokImg} />
        <p>{description}</p>
      </div>
      <h3 className="lbContainer">
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="myproducts"
        />
      </h3>
      {openLists.myproducts && <MyProducts myProductData={myProductData} />}
      <h3 className="lbContainer">
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="commproducts"
        />
      </h3>
      {openLists.commproducts && (
        <CommunityProducts commProductData={commProductData} />
      )}
      <Footer />
    </>
  );
}
