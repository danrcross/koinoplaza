import { Link, useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <Link onClick={() => navigate(-1)}>Back</Link>
    </header>
  );
}

export default Header;
