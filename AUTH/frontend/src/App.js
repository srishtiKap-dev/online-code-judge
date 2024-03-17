import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp.js";
import Login from "./Pages/Login.js";
import LandingPage from "./Pages/LandingPage.js";
import HomePage from "./Pages/HomePage.js";
import Description from "./Pages/Description.js";
import SubmissionHistory from "./Pages/SubmissionHistory.js";
import CreateQuestions from "./Pages/CreateQuestions.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/signUp" element={<SignUp />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/home" element={<HomePage />}></Route>
        <Route
          exact
          path="/description/:title"
          element={<Description />}
        ></Route>
        <Route
          exact
          path="/submissionHistory"
          element={<SubmissionHistory />}
        ></Route>
        <Route
          exact
          path="/createQuestions"
          element={<CreateQuestions />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
