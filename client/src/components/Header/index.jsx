import { Link, useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  return (
    <header className="headerComp">
      <Link onClick={() => navigate(-1)}>Back</Link>
      <a>Logout</a>
    </header>
  );
}

export default Header;
