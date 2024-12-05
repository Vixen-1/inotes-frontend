import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Main from "./pages/Main";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout/Layout";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <BrowserRouter basename="inotes-frontend">
      <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainpage" element={<Layout />} />
          <Route path="/errorpage" element={<ErrorPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
