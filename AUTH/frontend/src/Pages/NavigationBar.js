import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

function NavBar() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [firstname, setFirstname] = useState(false);
  const [lastname, setLastname] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("jwtToken") != null) {
      setLoggedIn(true);
      setFirstname(localStorage.getItem("firstname"));
      setLastname(localStorage.getItem("lastname"));
    }
    if (localStorage.getItem("isAdmin") == "true") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <header className="bg-black">
      <nav
        className="mx-auto flex items-start justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="hidden lg:flex lg:flex-1 lg:justify-start lg:gap-x-12 text-white">
          <label className="text-xl font-bold leading-6 text-white-900">
            CodeNinja
          </label>
          {isLoggedIn && <NavLink to="/home">Home</NavLink>}
          {isAdmin && <NavLink to="/createQuestions">Create Questions</NavLink>}
          {isLoggedIn && (
            <NavLink to="/submissionHistory">Submission History</NavLink>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12 text-white">
          {!isLoggedIn && <NavLink to="/signUp">Sign Up</NavLink>}
          {isLoggedIn && (
            <div className="text-sm font-semibold leading-6 text-white-900">
              {firstname} {lastname}
            </div>
          )}
          {isLoggedIn ? (
            <NavLink
              to="/"
              onClick={() => {
                setLoggedIn(false);
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("isAdmin");
                localStorage.removeItem("firstname");
                localStorage.removeItem("lastname");
              }}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink to="/login" onClick={() => setLoggedIn(true)}>
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
