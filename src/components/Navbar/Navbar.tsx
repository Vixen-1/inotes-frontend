import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import secureLocalStorage from "react-secure-storage";

export default function Navbar({ buttonName }: { buttonName?: string }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await secureLocalStorage.removeItem("authToken");
    navigate("/");
  };
  return (
    <nav className="navbar-data fixed overflow-x-hidden animate-fadeIn">
      <div className="navbar">
        <div onClick={()=>{navigate('/')}} className="navbar-logo-heading drop-shadow-lg tracking-widest">
          INotes
          <span className="navbar-logo-desc">your notes on the cloud</span>
        </div>
        {buttonName && (
          <div>
          <button
            className="signup-button"
            onClick={handleLogout}
          >
            <span>{buttonName}</span>
          </button>
        </div>
        )}
      </div>
    </nav>
  );
}
