import proPic from "../../assets/images/profile-pic-sample.png";

function SellerBox({ seller }) {
  const { firstName, lastName, rating, location, occupation } = seller;
  const name = `${firstName} ${lastName}`;
  return (
    <div className="sellerBoxFlex">
      <div>
        <span>{name}</span>
        <br />

        <ul>
          <li>
            <span>Location: </span>
            {location}
          </li>
          <li>
            <span>Rating: </span>
            {rating}
          </li>
          <li>
            <span>Occupation: </span>
            {occupation}
          </li>
        </ul>
      </div>
      <div>
        <img className="sbProPic" src={proPic} />
      </div>
    </div>
  );
}

export default SellerBox;
