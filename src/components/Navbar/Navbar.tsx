import { useNavigate } from "react-router-dom";
import "./Navbar.css";
// import secureLocalStorage from "react-secure-storage";

export default function Navbar({ buttonName, handleLogout }: { buttonName?: string, handleLogout: ()=> void }) {
  const navigate = useNavigate();

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
            className="absolute top-2 right-4 bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-white hover:text-black"
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
