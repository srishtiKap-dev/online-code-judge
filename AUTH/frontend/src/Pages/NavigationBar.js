import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const nav = useNavigate();
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
          {isLoggedIn && (
            <button
              onClick={() => {
                nav("/home");
              }}
              className="text-sm font-semibold leading-6 text-white-900"
            >
              Home
            </button>
          )}
          {isAdmin && (
            <button
              onClick={() => {
                nav("/createQuestions");
              }}
              className="text-sm font-semibold leading-6 text-white-900 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              data-ripple-light="true"
              data-popover-target="menu"
            >
              Create Questions
            </button>
          )}
          {isLoggedIn && (
            <button
              onClick={() => {
                nav("/submissionHistory");
              }}
              className="text-sm font-semibold leading-6 text-white-900"
            >
              Submission History
            </button>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12 text-white">
          {!isLoggedIn && (
            <a
              href="/signUp"
              className="text-sm font-semibold leading-6 text-white-900"
            >
              Sign up
            </a>
          )}
          {isLoggedIn && (
            <div className="text-sm font-semibold leading-6 text-white-900">
              {firstname} {lastname}
            </div>
          )}
          {isLoggedIn ? (
            <button
              onClick={() => {
                setLoggedIn(false);
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("isAdmin");
                localStorage.removeItem("firstname");
                localStorage.removeItem("lastname");
                nav("/");
              }}
              className="text-sm font-semibold leading-6 text-white-900"
            >
              Logout <span aria-hidden="true">&rarr;</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setLoggedIn(true);
                nav("/login");
              }}
              className="text-sm font-semibold leading-6 text-white-900"
            >
              Login <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
