import { Link } from "react-router-dom";
export default function SingleProductPage() {
  return (
    <>
      <header>
        <Link to="/home">Back</Link>
      </header>
      <h1>Product Name</h1>
      <footer>
        <Link to="/home">Home</Link>
        {/* need to create functionality here */}
        <a>+ Add To Watchlist</a>
      </footer>
    </>
  );
}
