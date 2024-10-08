import { useNavigate } from "react-router-dom";
// import "../shared/shared.css";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="main-container">
      <div className="login-form">
        <form action="/login" method="post">
        <h1 className="form-heading">Login</h1>
          <div className="form-data">
            <div className="form-fields">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-input" id="email" name="email" />
            </div>
            <div className="form-fields">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-input" id="password" name="password" />
            </div>
            <button type="submit">Login</button>
          </div>
          <p className="text-lg p-4">
            Don't have an account?{" "}
            <span
              className="font-bold text-blue-700 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
