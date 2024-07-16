import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_USER_PRODUCTS, DELETE_PRODUCT, GET_CURRENT_USER, GET_USER_WATCHLIST, GET_USER_COMMUNITIES } from "../utils/queries";
import DataBar from "../components/DataBar";
import ListButton from "../components/ListButton";
import MyProducts from "../components/MyProducts";
import MyCommunities from "../components/MyCommunities";
import Watchlist from "../components/Watchlist";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OtherCommunities from "../components/OtherCommunities";



export default function HomePage() {
  const navigate = useNavigate();
  const [openLists, setOpenLists] = useState({
    myproducts: false,
    mycommunities: false,
    watchlist: false,
  });

  const { data: userData, loading: userLoading } = useQuery(GET_CURRENT_USER);
  const { data: productsData, loading: productsLoading } = useQuery(GET_USER_PRODUCTS);
  const { data: watchlistData, loading: watchlistLoading } = useQuery(GET_USER_WATCHLIST);
  const { data: communitiesData, loading: communitiesLoading } = useQuery(GET_USER_COMMUNITIES);
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_USER_PRODUCTS }],
  });

  if (userLoading || productsLoading || watchlistLoading || communitiesLoading) return <p>Loading...</p>;
  if (!userData || !userData.currentUser) return <p>Error loading user data</p>;

  const { currentUser } = userData;

  const handleDelete = async (productId) => {
    try {
      await deleteProduct({ variables: { id: productId } });
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = (e) => {
    const { id } = e.target;
    setOpenLists((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const productCount = productsData ? productsData.getUserProducts.length : 0;
  const watchlistCount = watchlistData ? watchlistData.getUserWatchlist.length : 0;
  const communityCount = communitiesData ? communitiesData.getUserCommunities.length : 0;


  return (
    <div className="homePage">
      <Header pageName="home" />
      <h1 className="pageTitle">John Doe's Home</h1>
      <div className="topBox">
        <DataBar barData={userData} />
        <img
          alt="profile-pic-home"
          className="profilePicHome"
          src={sampPic}
        ></img>
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
          id="watchlist"
        />
      </h3>
      {openLists.watchlist && <Watchlist watchlistData={watchlistData} />}
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
    </div>
  );
}
