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
          <div key={item.id} className="commItemAndOpts">
            <div className="commItem">
              <Link to={`/communities/${item.id}`}>
                <div>
                  <h4>{item.name}</h4>
                  <ul>
                    <li>Membership: {item.membership}</li>
                    <li>Location: {item.location}</li>
                    <li>Members: {item.members}</li>
                  </ul>
                </div>
              </Link>
            </div>
            <div className="commOptions">
              <a>
                <TrashIcon className="editIcon" />
              </a>
            </div>
          </div>
        );
      })}
      <div>
        <button onClick={moreBtnOpen}>
          {!moreBtn ? `Show more...` : `Show less...`}
        </button>
        <button>Join new community</button>
      </div>
    </div>
  );
}

export default OtherCommunities;
