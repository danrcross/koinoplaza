import { useState } from "react";
import { Link } from "react-router-dom";
import DataBar from "../components/DataBar";
import MyCommunities from "../components/MyCommunities";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OtherCommunities from "../components/OtherCommunities";

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
  return (
    <>
      <Header />
      <h1>{user}'s Communities</h1>
      <DataBar barData={userData} />
      <h3>Communities</h3>
      <MyCommunities myCommunityData={myCommunityData} />
      <OtherCommunities otherCommunityData={otherCommunityData} />
      <Footer />
    </>
  );
}
