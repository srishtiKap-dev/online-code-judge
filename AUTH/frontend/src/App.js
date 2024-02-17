import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp.js";
import Login from "./Pages/Login.js";
import LandingPage from "./Pages/LandingPage.js";
import HomePage from "./Pages/HomePage.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/signUp" element={<SignUp />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/home" element={<HomePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
