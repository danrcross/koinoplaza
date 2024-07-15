import { Link, useNavigate } from "react-router-dom";
function Header({ pageName }) {
  const navigate = useNavigate();
  return (
    <>
      <div>
        {pageName !== "home" ? (
          <header className="headerComp">
            <Link onClick={() => navigate(-1)}>Back</Link>
            <a>Logout</a>
          </header>
        ) : (
          <header className="headerCompHome">
            <a>Logout</a>
          </header>
        )}
      </div>
    </>
  );
}

export default Header;
