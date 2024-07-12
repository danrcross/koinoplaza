function MyCommunities({ myCommunityData }) {
  return (
    <div className="myCommunitiesList">
      {myCommunityData.map((item) => (
        <div key={item.id}>
          <div>
            <h4>{item.name}</h4>
            <ul>
              <li>Membership: {item.membership}</li>
              <li>Location: {item.location}</li>
              <li>Members: {item.members}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyCommunities;
