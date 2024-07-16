import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

function MyCommunities({ myCommunityData, onDelete }) {
  const [moreBtn, setMoreBtn] = useState(false);
  const navigate = useNavigate();

  const moreBtnOpen = () => {
    setMoreBtn(!moreBtn);
  };
  return (
    <div className="myCommunitiesList">
      {myCommunityData.map((item, i) => {
        if (!moreBtn && i > 0) {
          return null;
        }
        return (
          <div key={item.id} className="commSection">
            <Link to={`/communities/${item.id}`}>
              <div className="commCard">
                <div className="commData">
                  <h4>{item.name}</h4>
                  <ul className="commDataList">
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
                <div className="commImgDiv">
                  <img alt={`item-${item.id}-img`} src={item.image} />
                </div>
              </div>
            </Link>
            <div className="commOptions">
              <button onClick={() => onDelete(item.id, 'community')} className="deleteBtn">
                <TrashIcon className="editIcon" />
              </button>
              <a>
                <Pencil1Icon className="editIcon" />
              </a>
            </div>
          </div>
        );
      })}
      <div className="btnsDiv">
        <div className="underListBtns">
          <button onClick={moreBtnOpen}>
            {!moreBtn ? `Show more...` : `Show less...`}
          </button>
          <button onClick={() => navigate('/newcommunity')} >Create new community</button>
        </div>
        <span className="listBtnSpacer"></span>
      </div>
    </div>
  );
}

export default MyCommunities;
