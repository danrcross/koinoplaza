import { Link } from "react-router-dom";
import { useState } from "react";
import { MinusCircledIcon } from "@radix-ui/react-icons";

function Watchlist({ watchlistData, onDelete }) {
  const [moreBtn, setMoreBtn] = useState(false);

  const moreBtnOpen = () => {
    setMoreBtn(!moreBtn);
  };
  return (
    <div className="watchlistList">
      {watchlistData.map((item, i) => {
        if (!moreBtn && i > 0) {
          return null;
        }
        return (
          <div key={item.id} className="wlSection">
            <Link to={`/products/${item.id}`}>
              <div className="wlCard">
                <div className="wlData">
                  <h4>{item.product}</h4>
                  <ul className="wlDataList">
                    <li>
                      <span>Price: </span>${item.price}
                    </li>
                    <li>
                      <span>Condition: </span>
                      {item.condition}
                    </li>
                    <li>
                      <span>Seller:</span> {item.seller.name}{" "}
                      {`(${item.seller.rating})`}
                    </li>
                  </ul>
                </div>
                <div className="wlImgDiv">
                  <img alt={`item-${item.id}-img`} src={item.image} />
                </div>
              </div>
            </Link>
            <div className="wlOptions">
              <button
                onClick={() => onDelete(item.id, "watchlist")}
                className="deleteBtn"
              >
                <MinusCircledIcon className="editIcon redIcon" />
              </button>
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

export default Watchlist;
