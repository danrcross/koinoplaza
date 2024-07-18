import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MinusCircledIcon } from "@radix-ui/react-icons";

function Watchlist({ watchlistData, onDelete }) {
  const [moreBtn, setMoreBtn] = useState(false);

  const moreBtnOpen = () => {
    setMoreBtn(!moreBtn);
  };
  const navigate = useNavigate();
  return (
    <div className="itemsList">
      {watchlistData.map((item, i) => {
        if (!moreBtn && i > 0) {
          return null;
        }
        return (
          <div key={item._id} className="itemSection">
            <Link to={`/products/${item._id}`} className="itemCard">
              <div className="itemData">
                <h4>{item.name}</h4>
                <ul className="itemDataList">
                  <li>
                    <span>Price: </span>${item.price}
                  </li>
                  <li>
                    <span>Condition: </span>
                    {item.condition}
                  </li>
                  <li>
                    <span>Seller:</span> {item?.seller?.name}{" "}
                    {`(${item?.seller?.rating})`}
                  </li>
                </ul>
              </div>
              <div className="itemImgDiv">
                <img alt={`item-${item.id}-img`} src={item.image} />
              </div>
            </Link>
            <div className="itemOptions">
              <button
                onClick={() => onDelete(item.id, "watchlist")}
                className="itemRemoveBtn"
              >
                <MinusCircledIcon className="optIcon" />
              </button>
            </div>
          </div>
        );
      })}
      {watchlistData.length ? (
        <div className="btnsDiv">
          <div className="underListBtns">
            {watchlistData.length > 1 ? (
              <button onClick={moreBtnOpen} className="blackMoreBtn">
                {!moreBtn ? `Show more...` : `Show less...`}
              </button>
            ) : (
              <button onClick={moreBtnOpen} className="grayMoreBtn" disabled>
                {!moreBtn ? `Show more...` : `Show less...`}
              </button>
            )}
          </div>
          <span className="listBtnSpacer"></span>
        </div>
      ) : (
        <span>No products have been added to watchlist!</span>
      )}
    </div>
  );
}

export default Watchlist;
