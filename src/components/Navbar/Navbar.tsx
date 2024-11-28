import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar-data">
      <div className="navbar">
        <div className="navbar-logo-heading">
          INotes
          <span className="navbar-logo-desc">your notes on the cloud</span>
        </div>
        {/* <div>
          <ul className="navbar-pages">
            <li onClick={() => navigate("/home")}>Home</li>
            <li onClick={() => navigate("/about")}>About</li>
          </ul>
        </div> */}
        <div>
          <button
            className="signup-button"
            type="button"
            onClick={() => navigate(`/signup`)}
          >
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
