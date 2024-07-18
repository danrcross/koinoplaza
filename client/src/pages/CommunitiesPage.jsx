import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CURRENT_USER, GET_USER_COMMUNITIES, GET_OTHER_COMMUNITIES } from "../utils/queries";
import DataBar from "../components/DataBar";
import MyCommunities from "../components/MyCommunities";
import OtherCommunities from "../components/OtherCommunities";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ListButton from "../components/ListButton";
import { UPDATE_COMMUNITY } from "../utils/mutations";

export default function CommunitiesPage() {
  const { data: userData, loading: userLoading } = useQuery(GET_CURRENT_USER);
  const userID = userData?.currentUser?._id;

  const { data: userCommunitiesData, loading: userCommunitiesLoading, refetch: refetchUserCommunities } = useQuery(GET_USER_COMMUNITIES, {
    variables: { userID },
  });
  const { data: otherCommunitiesData, loading: otherCommunitiesLoading, refetch: refetchOtherCommunities } = useQuery(GET_OTHER_COMMUNITIES);
  
  const [updateCommunity] = useMutation(UPDATE_COMMUNITY, {
    refetchQueries: [{ query: GET_USER_COMMUNITIES, variables: { userID } }],
  });

  const [openLists, setOpenLists] = useState({
    mycommunities: true,
  });

  useEffect(() => {
    if (userCommunitiesData && otherCommunitiesData) {
      refetchUserCommunities();
      refetchOtherCommunities();
    }
  }, [userCommunitiesData, otherCommunitiesData, refetchUserCommunities, refetchOtherCommunities]);

  if (userLoading || userCommunitiesLoading || otherCommunitiesLoading) return <p>Loading...</p>;
  if (!userData || !userData.currentUser) return <p>Error loading user data</p>;

  const userName = `${userData.currentUser.firstName} ${userData.currentUser.lastName}`;

  const userCommunities = userCommunitiesData?.getUserCommunities || [];
  const otherCommunities = otherCommunitiesData?.getOtherCommunities || [];

  const createdCommunitiesCount = userCommunities.filter(community => community.membership === "Creator").length;
  const joinedCommunitiesCount = userCommunities.length - createdCommunitiesCount;

  const barData = [
    { id: 1, name: "Created", value: createdCommunitiesCount },
    { id: 2, name: "Joined", value: joinedCommunitiesCount },
  ];

  const handleEditCommunity = async (id, updatedData) => {
    try {
      await updateCommunity({
        variables: {
          id,
          ...updatedData,
        },
      });
    } catch (error) {
      console.error("Error updating community:", error);
    }
  };

  function handleClick(e) {
    const id = e.target.id;
    setOpenLists(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <>
      <Header />
      <h1 className="pageTitle">{userName}'s Communities</h1>
      <DataBar barData={barData} />
      <h3 className="lbContainer">
        <ListButton onClick={handleClick} openLists={openLists} id="mycommunities" />
      </h3>
      {openLists.mycommunities && (
        <div>
          <MyCommunities myCommunityData={userCommunities} onEdit={handleEditCommunity} />
          <OtherCommunities otherCommunityData={otherCommunities} />
        </div>
      )}
      <Footer />
    </>
  );
}
