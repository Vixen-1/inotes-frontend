import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import secureLocalStorage from "react-secure-storage";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    secureLocalStorage.removeItem("authToken");
    navigate("/");
  };
  return (
    <nav className="navbar-data fixed overflow-x-hidden animate-fadeIn">
      <div className="navbar">
        <div className="navbar-logo-heading drop-shadow-lg tracking-widest">
          INotes
          <span className="navbar-logo-desc">your notes on the cloud</span>
        </div>
        <div>
          <button
            className="signup-button"
            type="button"
            onClick={handleLogout}
          >
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
