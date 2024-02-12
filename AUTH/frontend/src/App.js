import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp.js";
import Login from "./Pages/Login.js";
import HomePage from "./Pages/HomePage.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route exact path="/signUp" element={<SignUp />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
