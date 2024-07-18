import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import DataBar from "../components/DataBar";
import MyCommunities from "../components/MyCommunities";
import OtherCommunities from "../components/OtherCommunities";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ListButton from "../components/ListButton";
import { UPDATE_COMMUNITY } from "../utils/mutations";

export default function CommunitiesPage() {
  const userID = JSON.parse(localStorage.getItem("userID"));
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));

  // const [updateCommunity] = useMutation(UPDATE_COMMUNITY, {
  //   refetchQueries: [{ query: GET_USER_COMMUNITIES, variables: { userID } }],
  // });

  const [openLists, setOpenLists] = useState({
    mycommunities: true,
  });

  // const handleEditCommunity = async (id, updatedData) => {
  //   try {
  //     await updateCommunity({
  //       variables: {
  //         id,
  //         ...updatedData,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error updating community:", error);
  //   }
  // };

  function handleClick(e) {
    const id = e.target.id;
    setOpenLists((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <>
      <Header />
      <h1 className="pageTitle">{currentUser.firstName}'s Communities</h1>
      <DataBar currentUser={currentUser} />
      <h3 className="lbContainer">
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="mycommunities"
        />
      </h3>
      {openLists.mycommunities && (
        <>
          <MyCommunities
            userID={userID}
            // onEdit={handleEditCommunity}
          />
          <OtherCommunities userID={userID} />
        </>
      )}
      {/* commenting out actual code to use test code above */}
      {/* {openLists.mycommunities && (
        <div>
          <MyCommunities
            myCommunityData={userCommunities}
            onEdit={handleEditCommunity}
          />
          <OtherCommunities otherCommunityData={otherCommunities} />
        </div>
      )} */}
      <Footer />
    </>
  );
}
