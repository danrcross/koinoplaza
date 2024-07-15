import { Link } from "react-router-dom";
import { useState } from "react";
import { MinusCircledIcon } from "@radix-ui/react-icons";
function Watchlist({ watchlistData }) {
  const [moreBtn, setMoreBtn] = useState(false);

  const moreBtnOpen = () => {
    setMoreBtn(!moreBtn);
  };
  return (
    <div className="myProductsList">
      {watchlistData.map((item, i) => {
        if (!moreBtn && i > 0) {
          return null;
        }
        return (
          <div key={item.id} className="prodItemAndOpts">
            <div className="prodItem">
              <Link to={`/products/${item.id}`}>
                <div>
                  <h4>{item.product}</h4>
                  <ul>
                    <li>Price: ${item.price}</li>
                    <li>Condition: {item.condition}</li>
                    <li>
                      Seller: {item.seller.name} {`(${item.seller.rating})`}
                    </li>
                  </ul>
                </div>
              </Link>
            </div>
            <div className="prodOptions">
              <a>
                <MinusCircledIcon className="editIcon" />
              </a>
            </div>
          </div>
        );
      })}
      <div>
        <button onClick={moreBtnOpen}>
          {!moreBtn ? `Show more...` : `Show less...`}
        </button>
      </div>
    </div>
  );
}

export default Watchlist;
