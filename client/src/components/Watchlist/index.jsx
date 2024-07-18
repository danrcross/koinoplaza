import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";

import { GET_USER_WATCHLIST } from "../../utils/queries";

import { MinusCircledIcon } from "@radix-ui/react-icons";

function Watchlist({ userID, onDelete }) {
  const [moreBtn, setMoreBtn] = useState(false);
  const navigate = useNavigate();

  const { data: watchlistData, loading: watchlistLoading } = useQuery(
    GET_USER_WATCHLIST,
    {
      variables: { userID },
      skip: !userID,
    }
  );

  if (watchlistLoading) return <p>Loading...</p>;

  const moreBtnOpen = () => {
    setMoreBtn(!moreBtn);
  };
  const listData = watchlistData.getUserWatchlist;
  return (
    <div className="itemsList">
      {listData.map((item, i) => {
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
      {listData.length ? (
        <div className="btnsDiv">
          <div className="underListBtns">
            {listData.length > 1 ? (
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
