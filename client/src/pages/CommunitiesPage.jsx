import { useState } from "react";
import { Link } from "react-router-dom";
import DataBar from "../components/DataBar";
import MyCommunities from "../components/MyCommunities";

export default function CommunitiesPage() {
  const [userData, setUserData] = useState([
    { id: 1, name: "Watchlist", value: 2 },
    { id: 2, name: "My Products", value: 2 },
    { id: 3, name: "Communities", value: 8 },
    { id: 4, name: "Seller Rating", value: 4.7 },
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
  return (
    <>
      <header>
        <Link to="/home">Back</Link>
      </header>
      <h1>Communities</h1>
      <DataBar userData={userData} />
      <h3>Communities</h3>
      <MyCommunities myCommunityData={myCommunityData} />
      <footer>
        <Link to="/home">Home</Link>
        <Link to="/newcommunity">+Create Community</Link>
        <Link to="/joincommunity">+Join Community</Link>
      </footer>
    </>
  );
}
