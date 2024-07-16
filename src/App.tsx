import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./components/Navbar"
// import Layout from "./Layout/Layout"


function App() {

  return (
    <BrowserRouter
     basename="inotes"
     >
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          {/* <Route path="/note" element={<Layout />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />  
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />           
          </Routes>
          </div>
      </BrowserRouter>
  )
}

export default App
