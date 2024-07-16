import { Link } from "react-router-dom";
import { useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
function OtherCommunities({ otherCommunityData }) {
  const [moreBtn, setMoreBtn] = useState(false);

  const moreBtnOpen = () => {
    setMoreBtn(!moreBtn);
  };
  return (
    <div className="otherCommunitiesList">
      {otherCommunityData.map((item, i) => {
        // ensures that, if the moreBtn value is false (initial, closed value),
        // the .map() function will only return the first item.
        // conversely, if the moreBtn is true, .map() will iterate through whole array (it is OK if i>0) (show all items)
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
              <a>
                <TrashIcon className="editIcon redIcon" />
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
          <button>Join new community</button>
        </div>
        <span className="listBtnSpacer"></span>
      </div>
    </div>
  );
}

export default OtherCommunities;
