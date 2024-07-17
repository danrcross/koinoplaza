import { Link, useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";

function Header({ pageName }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    Auth.logout();
    navigate('/');

  };
  return (
    <>
      <div>
        {pageName !== "home" ? (
          <header className="headerComp">
            <Link onClick={() => navigate(-1)}>Back</Link>
            <a onClick={handleLogout}>Logout</a>
          </header>
        ) : (
          <header className="headerCompHome">
            <a onClick={handleLogout}>Logout</a>
          </header>
        )}
      </div>
    </>
  );
}

export default Header;
