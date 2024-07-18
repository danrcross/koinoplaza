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
    <div className="itemsList">
      {myProductData.map((item, i) => {
        // ensures that, if the moreBtn value is false (initial, closed value),
        // the .map() function will only return the first item.
        // conversely, if the moreBtn is true, .map() will iterate through whole array (it is OK if i>0) (show all items)
        if (!moreBtn && i > 0) {
          return null;
        }
        return (
          <div key={item._id} className="itemSection">
            <Link to={`/products/${item._id}`} className="itemCard">
              <div className="itemData">
                <h4>{item.name}</h4>
                <ul className="itemDataList">
                  <li className="itemListItem">
                    <span className="itemProp">Price: </span>${item.price}
                  </li>
                  <li className="itemListItem">
                    <span className="itemProp">Condition:</span>{" "}
                    {item.condition}
                  </li>
                  <li className="itemListItem">
                    <span className="itemProp">Seller:</span>{" "}
                    {item?.seller?.name} {`(${item?.seller?.rating})`}
                  </li>
                </ul>
              </div>
              <div className="itemImgDiv">
                <img alt={`item-${item.id}-img`} src={item.image} />
              </div>
            </Link>
            <div className="itemOptions">
              <button
                onClick={() => onDelete(item.id, "product")}
                className="itemDeleteBtn"
              >
                <TrashIcon className="optIcon" />
              </button>
              <button className="itemEditBtn">
                <Pencil1Icon className="optIcon" />
              </button>
            </div>
          </div>
        );
      })}
      {myProductData.length ? (
        <div className="btnsDiv">
          <div className="underListBtns">
            {myProductData.length > 1 ? (
              <button onClick={moreBtnOpen} className="blackMoreBtn">
                {!moreBtn ? `Show more...` : `Show less...`}
              </button>
            ) : (
              <button onClick={moreBtnOpen} className="grayMoreBtn" disabled>
                {!moreBtn ? `Show more...` : `Show less...`}
              </button>
            )}

            <button
              className="blackMoreBtn"
              onClick={() => navigate("/newproduct")}
            >
              + Add new product
            </button>
          </div>
          <span className="listBtnSpacer"></span>
        </div>
      ) : (
        <span>No products have been added!</span>
      )}
    </div>
  );
}

export default MyProducts;
