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
            <Link to="/home" className="blackLink">
              Home
            </Link>
            <Link to="/newcommunity" className="greenLink">
              +Create Community
            </Link>
            <Link to="/joincommunity" className="greenLink">
              +Join Community
            </Link>
          </>
        );
      case location.pathname === "/products":
        return (
          <>
            <Link to="/home" className="blackLink">
              Home
            </Link>
            <Link to="/communities" className="blackLink">
              Communities
            </Link>
            <Link to="/newproduct" className="greenLink">
              + Add New Product
            </Link>
          </>
        );
      case location.pathname === "/home":
        return (
          <>
            <Link to="/home" className="blackLink">
              Home
            </Link>
            <Link to="/communities" className="blackLink">
              + Communities
            </Link>
            <Link to="/products" className="blackLink">
              + Products
            </Link>
            <Link to="/settings" className="blackLink">
              Settings
            </Link>
          </>
        );
      case location.pathname === "/settings":
        return (
          <>
            <Link to="/home" className="blackLink">
              Home
            </Link>
            {/* Need to create functionality for these */}
            <a className="redLink">Delete Account</a>
          </>
        );
      case location.pathname === "/joincommunity":
        return (
          <>
            <Link to="/home" className="blackLink">
              Home
            </Link>
          </>
        );
      case location.pathname === "/":
        return (
          <>
            <span>New User? </span>
            <Link to="/signup" className="greenLink">
              Sign up
            </Link>
          </>
        );
      case location.pathname === "/newcommunity":
        return (
          <>
            <Link to="/home" className="blackLink">
              Home
            </Link>
            <a className="redLink">Reset Form</a>
            <Link to="/communities" className="blackLink">
              + Communities
            </Link>
          </>
        );
      case location.pathname === "/newproduct":
        return (
          <>
            <Link to="/home" className="blackLink">
              Home
            </Link>
            <a className="redLink">Reset Form</a>
            <Link to="/products" className="blackLink">
              + Products
            </Link>
          </>
        );
      case location.pathname.includes("/products/") &&
        !location.pathname.includes("/ordersummary"):
        return (
          <>
            <Link to="/home" className="blackLink">
              Home
            </Link>
            <a className="greenLink">+ Save to Watchlist</a>
          </>
        );
      case location.pathname.includes("/communities/"):
        return (
          <>
            <Link to="/home" className="blackLink">
              Home
            </Link>
            <Link to="/newproduct" className="greenLink">
              + Add New Product
            </Link>
          </>
        );
      case location.pathname.includes("/ordersummary"):
        return (
          <>
            <Link to="/home" className="blackLink">
              Home
            </Link>
            <a className="redLink">Reset Form</a>
            <Link to="/products" className="blackLink">
              + Products
            </Link>
          </>
        );
      default:
        return (
          <>
            <Link to="/home" className="blackLink">
              Home
            </Link>
          </>
        );
    }
  };
  return <footer className="footerComp">{pageSelect()}</footer>;
}

export default Footer;
