import { Link, useLocation } from "react-router-dom";

// Got advice regarding switch statements in a React component here:
// https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component
function Footer() {
  const location = useLocation();
  const pageSelect = () => {
    switch (true) {
      case location.pathname === "/communities":
        return (
          <>
            <Link to="/home">Home</Link>
            <Link to="/newcommunity">+Create Community</Link>
            <Link to="/joincommunity">+Join Community</Link>
          </>
        );
      case location.pathname === "/products":
        return (
          <>
            <Link to="/home">Home</Link>
            <Link to="/communities">Communities</Link>
            <Link to="/newproduct">+ Add New Product</Link>
          </>
        );
      case location.pathname === "/home":
        return (
          <>
            <Link to="/home">Home</Link>
            <Link to="/communities">+ Communities</Link>
            <Link to="/products">+ Products</Link>
            <Link to="/settings">Settings</Link>
          </>
        );
      case location.pathname === "/settings":
        return (
          <>
            <Link to="/home">Home</Link>
            {/* Need to create functionality for these */}
            <a>Delete Account</a>
            <a>Save Changes</a>
          </>
        );
      case location.pathname === "/joincommunity":
        return (
          <>
            <Link to="/home">Home</Link>
          </>
        );
      case location.pathname === "/":
        return (
          <>
            <span>New User? </span>
            <Link to="/signup">Sign up</Link>
          </>
        );
      case location.pathname === "/newcommunity":
        return (
          <>
            <Link to="/home">Home</Link>
            <a>Reset Form</a>
            <Link to="/communities">+ Communities</Link>
          </>
        );
      case location.pathname === "/newproduct":
        return (
          <>
            <Link to="/home">Home</Link>
            <a>Reset Form</a>
            <Link to="/products">+ Products</Link>
          </>
        );
      case location.pathname.includes("/products/") &&
        !location.pathname.includes("/ordersummary"):
        return (
          <>
            <Link to="/home">Home</Link>
            <a>+ Save to Watchlist</a>
          </>
        );
      case location.pathname.includes("/communities/"):
        return (
          <>
            <Link to="/home">Home</Link>
            <Link to="/newproduct">+ Add New Product</Link>
          </>
        );
      case location.pathname.includes("/ordersummary"):
        return (
          <>
            <Link to="/home">Home</Link>
            <a>Reset Form</a>
            <Link to="/products">+ Products</Link>
          </>
        );
      default:
        return (
          <>
            <Link to="/home">Home</Link>
          </>
        );
    }
  };
  return <footer className="footerComp">{pageSelect()}</footer>;
}

export default Footer;
