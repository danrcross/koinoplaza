import { useState } from "react";
import { useParams, Link } from "react-router-dom";
// import { useQuery } from "@apollo/client";
import DataBar from "../components/DataBar";
import SellerBox from "../components/SellerBox";
import MakePurchaseButton from "../components/MakePurchaseButton";

import parsnipsImg from "../assets/images/parsnips.png";

export default function SingleProductPage() {
  const { productId } = useParams();
  const purchaseLink = `/products/${productId}/ordersummary`;
  const sampleData = {
    name: productId,
    description: "Fresh",
    price: "40",
    createdBy: {
      firstName: "John",
      lastName: "Doe",
      rating: 4.7,
      location: "Waynesville, OK",
      occupation: "Full-time farmer",
    },
  };
  const { name, description, price, createdBy } = sampleData;
  const [barData, setBarData] = useState([
    { id: 1, name: "Price", value: `$${price}` },
    { id: 2, name: "Condition", value: description },
  ]);

  return (
    <>
      <header>
        <Link to="/home">Back</Link>
      </header>
      <h1>{name}</h1>
      <DataBar barData={barData} />
      <img src={parsnipsImg} />
      <h4>Offered By:</h4>
      <SellerBox seller={createdBy} />

      <Link to={purchaseLink}>
        <MakePurchaseButton />
      </Link>
      <footer>
        <Link to="/home">Home</Link>
        {/* need to create functionality here */}
        <a>+ Save To Watchlist</a>
      </footer>
    </>
  );
}
