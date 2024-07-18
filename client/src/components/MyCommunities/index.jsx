import { Link } from "react-router-dom";
import { useState } from "react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

function MyCommunities({ myCommunityData, onEdit }) {
  const [moreBtn, setMoreBtn] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: "", location: "" });

  const moreBtnOpen = () => {
    setMoreBtn(!moreBtn);
  };

  const handleEditClick = (id, name, location) => {
    setIsEditing(id);
    setUpdatedData({ name, location });
  };

  const handleSaveClick = (id) => {
    onEdit(id, updatedData);
    setIsEditing(null);
    setUpdatedData({ name: "", location: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="myCommunitiesList">
      {myCommunityData.map((item, i) => {
        if (!moreBtn && i > 0) {
          return null;
        }
        return (
          <div key={item.id} className="commSection">
            <div className="commCard">
              <div className="commData">
                {isEditing === item.id ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={updatedData.name}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="location"
                      value={updatedData.location}
                      onChange={handleInputChange}
                    />
                    <button onClick={() => handleSaveClick(item.id)}>
                      Save
                    </button>
                    <button onClick={() => setIsEditing(null)}>Cancel</button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
              <div className="commImgDiv">
                <img alt={`item-${item.id}-img`} src={item.image} />
              </div>
              <div className="commOptions">
                <Pencil1Icon
                  className="editIcon redIcon"
                  onClick={() =>
                    handleEditClick(item.id, item.name, item.location)
                  }
                />
                <TrashIcon className="editIcon blueIcon" />
              </div>
            </div>
          </div>
        );
      })}
      <div className="btnsDiv">
        <div className="underListBtns">
          <button onClick={moreBtnOpen}>
            {!moreBtn ? `Show more...` : `Show less...`}
          </button>
        </div>
        <span className="listBtnSpacer"></span>
      </div>
    </div>
  );
}

export default MyCommunities;
