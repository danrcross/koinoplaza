import { Link } from "react-router-dom";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
function MyProducts({ myProductData }) {
  return (
    <div className="myProductsList">
      {myProductData.map((item) => (
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
      ))}
      <div>
        <button>Show More...</button>
        <button>Add New Product</button>
      </div>
    </div>
  );
}

export default MyProducts;
