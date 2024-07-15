import { Link } from "react-router-dom";
import { useState } from "react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
function MyProducts({ myProductData }) {
  const [moreBtn, setMoreBtn] = useState(false);

  const moreBtnOpen = () => {
    setMoreBtn(!moreBtn);
  };
  return (
    <div className="myProductsList">
      {myProductData.map((item, i) => {
        // ensures that, if the moreBtn value is false (initial, closed value),
        // the .map() function will only return the first item.
        // conversely, if the moreBtn is true, .map() will iterate through whole array (it is OK if i>0) (show all items)
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
                <TrashIcon className="editIcon" />
              </a>
              <a>
                <Pencil1Icon className="editIcon" />
              </a>
            </div>
          </div>
        );
      })}
      <div>
        <button onClick={moreBtnOpen}>
          {!moreBtn ? `Show more...` : `Show less...`}
        </button>
        <button>Add New Product</button>
      </div>
    </div>
  );
}

export default MyProducts;
