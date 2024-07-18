import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { useQuery, useMutation } from "@apollo/client";

import { GET_OTHER_COMMUNITIES } from "../../utils/queries";

function OtherCommunities({ userID, onDelete }) {
  const [moreBtn, setMoreBtn] = useState(false);
  // const [isEditing, setIsEditing] = useState(null);
  // const [updatedData, setUpdatedData] = useState({ name: "", location: "" });
  const navigate = useNavigate();
  const { data: otherCommunitiesData, loading: otherCommunitiesLoading } =
    useQuery(GET_OTHER_COMMUNITIES, {
      skip: !userID,
    });
  const moreBtnOpen = () => {
    setMoreBtn(!moreBtn);
  };
  // const handleEditClick = (id, name, location) => {
  //   setIsEditing(id);
  //   setUpdatedData({ name, location });
  // };
  if (otherCommunitiesLoading) return <p>Loading...</p>;
  const otherListData = otherCommunitiesData.getOtherCommunities;
  return (
    <div className="itemsList">
      {otherListData.map((item, i) => {
        // ensures that, if the moreBtn value is false (initial, closed value),
        // the .map() function will only return the first item.
        // conversely, if the moreBtn is true, .map() will iterate through whole array (it is OK if i>0) (show all items)
        if (!moreBtn && i > 0) {
          return <div key={i}></div>;
        }
        return (
          <div key={item._id} className="itemSection">
            <Link to={`/communities/${item._id}`} className="itemCard">
              <div className="itemData">
                <h4>{item.name}</h4>
                <ul className="itemDataList">
                  <li>
                    <span>Membership:</span> {item.membership}
                  </li>
                  <li>
                    <span>Location:</span> {item.location}
                  </li>
                  <li>
                    <span>Members:</span> {item.members}
                  </li>
                </ul>
              </div>
              <div className="itemImgDiv">
                <img alt={`item-${item.id}-img`} src={item.image} />
              </div>
            </Link>
            <div className="itemOptions">
              <button className="itemDeleteBtn">
                <TrashIcon className="optIcon" />
              </button>
            </div>
          </div>
        );
      })}
      {otherListData.length ? (
        <div className="btnsDiv">
          <div className="underListBtns">
            {otherListData.length > 1 ? (
              <button onClick={moreBtnOpen} className="blackMoreBtn">
                {!moreBtn ? `Show more...` : `Show less...`}
              </button>
            ) : (
              <button onClick={moreBtnOpen} className="grayMoreBtn">
                {!moreBtn ? `Show more...` : `Show less...`}
              </button>
            )}

            <button
              onClick={() => navigate("/newcommunity")}
              className="blackMoreBtn"
            >
              + Join new community
            </button>
          </div>
          <span className="listBtnSpacer"></span>
        </div>
      ) : (
        <span>No communities have been joined!</span>
      )}
    </div>
  );
}

export default OtherCommunities;
