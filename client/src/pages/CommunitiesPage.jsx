import { useState } from "react";
import { Link } from "react-router-dom";
import DataBar from "../components/DataBar";
import MyCommunities from "../components/MyCommunities";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ListButton from "../components/ListButton";
import OtherCommunities from "../components/OtherCommunities";

import goatPic from "../assets/images/goat.jpg";

export default function CommunitiesPage() {
  const user = "John Doe";
  const [userData, setUserData] = useState([
    { id: 1, name: "Created", value: 1 },
    { id: 2, name: "Joined", value: 2 },
  ]);
  const [myCommunityData, setMyCommunityData] = useState([
    {
      id: 1,
      name: "Scott Co. Farmers",
      membership: "Creator",
      image: goatPic,
      location: "Scott County, OK",
      members: 15,
    },
    {
      id: 2,
      name: "Waynesville Community",
      membership: "Member",
      image: goatPic,
      location: "Waynesville, OK",
      members: 124,
    },
  ]);
  const [otherCommunityData, setOtherCommunityData] = useState([
    {
      id: 1,
      name: "Waynesville Community",
      membership: "Member",
      image: goatPic,
      location: "Waynesville, OK",
      members: 124,
    },
    {
      id: 2,
      name: "Oklahoma City Produce",
      membership: "Member",
      image: goatPic,
      location: "Oklahoma City, OK",
      members: 853,
    },
  ]);
  const [openLists, setOpenLists] = useState({
    mycommunities: true,
  });
  function handleClick(e) {
    const id = e.target.id;
    const curVal = openLists[id];
    setOpenLists({ ...openLists, [id]: !curVal });
  }
  return (
    <>
      <Header />
      <h1 className="pageTitle">{user}'s Communities</h1>
      <DataBar barData={userData} />
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
    </>
  );
}
