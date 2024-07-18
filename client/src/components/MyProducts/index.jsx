import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

function MyProducts({ myProductData, onDelete }) {
  const [moreBtn, setMoreBtn] = useState(false);
  const navigate = useNavigate();

  const moreBtnOpen = () => {
    setMoreBtn(!moreBtn);
  };
  console.log(myProductData);
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
          <div key={item._id} className="prodSection">
            <Link to={`/products/${item._id}`} className="prodCard">
              <div className="pcFlex">
                <div className="prodData">
                  <h4>{item.product}</h4>
                  <ul className="prodDataList">
                    <li>
                      <span>Price: </span>${item.price}
                    </li>
                    <li>
                      <span>Condition:</span> {item.condition}
                    </li>
                    <li>
                      <span>Seller:</span> {item?.seller?.name}{" "}
                      {`(${item?.seller?.rating})`}
                    </li>
                  </ul>
                </div>
                <div className="prodImgDiv">
                  <img alt={`item-${item.id}-img`} src={item.image} />
                </div>
              </div>
            </Link>
            <div className="prodOptions">
              <button
                onClick={() => onDelete(item.id, "product")}
                className="deleteBtn"
              >
                <TrashIcon className="editIcon redIcon" />
              </button>
              <a>
                <Pencil1Icon className="editIcon blueIcon" />
              </a>
            </div>
          </div>
        );
      })}
      <div className="btnsDiv">
        <div className="underListBtns">
          <button onClick={moreBtnOpen}>
            {!moreBtn ? `Show more...` : `Show less...`}
          </button>
          <button onClick={() => navigate("/newproduct")}>
            + Add New Product
          </button>
        </div>
        <span className="listBtnSpacer"></span>
      </div>
    </div>
  );
}

export default MyProducts;
