import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useOutletContext } from "react-router-dom";
import {
  GET_USER_PRODUCTS,
  GET_CURRENT_USER,
  GET_USER_WATCHLIST,
  GET_USER_COMMUNITIES,
  GET_OTHER_COMMUNITIES,
} from "../utils/queries";
import {
  UNWATCH_WATCHLIST_ITEM,
  LEAVE_COMMUNITY,
  DELETE_PRODUCT,
} from "../utils/mutations";
import DataBar from "../components/DataBar";
import ListButton from "../components/ListButton";
import MyProducts from "../components/MyProducts";
import MyCommunities from "../components/MyCommunities";
import Watchlist from "../components/Watchlist";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OtherCommunities from "../components/OtherCommunities";

import sampPic from "../assets/images/profile-pic-sample.png";
// import {PRODUCTS} from '../utils/queries';

export default function HomePage() {
  const { userID, setUserID, userInfo, setUserInfo } = useOutletContext();
  // const navigate = useNavigate();
  const [openLists, setOpenLists] = useState({
    myproducts: false,
    mycommunities: false,
    watchlist: false,
  });

  const { data: userData, loading: userLoading } = useQuery(GET_CURRENT_USER);

  // below will be modularized

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_USER_PRODUCTS, variables: { userID } }],
  });
  const [UnwatchWatchlistItem] = useMutation(UNWATCH_WATCHLIST_ITEM, {
    refetchQueries: [{ query: GET_USER_WATCHLIST, variables: { userID } }],
  });
  const [leaveCommunity] = useMutation(LEAVE_COMMUNITY, {
    refetchQueries: [{ query: GET_USER_COMMUNITIES, variables: { userID } }],
  });
  useEffect(() => {
    if (userData && userData.currentUser) {
      setUserID(userData.currentUser._id);
      setUserInfo(userData.currentUser);
      localStorage.setItem("userID", JSON.stringify(userID));
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userData, userID, userInfo, setUserID, setUserInfo]);

  if (userLoading) return <p>Loading...</p>;
  if (!userData || !userData.currentUser) return <p>Error loading user data</p>;

  const { currentUser } = userData;

  const handleDelete = async (id, type) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmation) {
      return;
    }
    try {
      if (type === "product") {
        await deleteProduct({ variables: { id } });
      } else if (type === "watchlist") {
        await UnwatchWatchlistItem({ variables: { id } });
      } else if (type === "community") {
        await leaveCommunity({
          variables: { userId: currentUser._id, communityId: id },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = (e) => {
    const { id } = e.target;
    setOpenLists((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  // temporary, as I work out this modularization
  return (
    <div className="homePage">
      <Header pageName="home" />
      <h1 className="pageTitle">{`${currentUser.firstName} ${currentUser.lastName}'s Home`}</h1>
      <div className="topBox">
        <DataBar currentUser={currentUser} />
        <img
          alt="profile-pic-home"
          className="profilePicHome"
          src={sampPic}
        ></img>
      </div>
      <h3 className="lbContainer ">
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="myproducts"
        />
      </h3>
      {openLists.myproducts && (
        <MyProducts
          userID={userID}
          onDelete={(id) => handleDelete(id, "product")}
        />
      )}
      <h3 className="lbContainer lbContainerAfter">
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="watchlist"
        />
      </h3>
      {openLists.watchlist && (
        <Watchlist
          userID={userID}
          onDelete={(id) => handleDelete(id, "watchlist")}
        />
      )}
      <h3 className="lbContainer lbContainerAfter">
        <ListButton
          onClick={handleClick}
          openLists={openLists}
          id="mycommunities"
        />
      </h3>
      {openLists.mycommunities && (
        <div>
          <MyCommunities
            userID={userID}
            onDelete={(id) => handleDelete(id, "community")}
          />
          <OtherCommunities
            userID={userID}
            onDelete={(id) => handleDelete(id, "community")}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}
