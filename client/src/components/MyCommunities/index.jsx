import { Link } from "react-router-dom";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
function MyCommunities({ myCommunityData }) {
  return (
    <div className="myCommunitiesList">
      {myCommunityData.map((item) => (
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
            <a>
              <Pencil1Icon className="editIcon" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyCommunities;
