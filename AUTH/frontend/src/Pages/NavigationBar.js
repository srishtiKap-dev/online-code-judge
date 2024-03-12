import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const nav = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("jwtToken") != null) {
      setLoggedIn(true);
    }
    console.log("isAdmin is:", localStorage.getItem("isAdmin"));
    if (localStorage.getItem("isAdmin")) {
      console.log("isetting true");
      setIsAdmin(true);
    }
  }, []);

  return (
    <header className="bg-black">
      <nav
        className="mx-auto flex max-w-7xl items-start justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Platform Logo */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12 text-white">
          <button
            onClick={() => {
              nav("/home");
            }}
            className="text-sm font-semibold leading-6 text-white-900"
          >
            Home
          </button>
          {isAdmin && (
            <button
              onClick={() => {
                nav("/createQuestions");
              }}
              className="text-sm font-semibold leading-6 text-white-900 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              data-ripple-light="true"
              data-popover-target="menu"
            >
              Questions
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
          {!isLoggedIn && (
            <a
              href="/signUp"
              className="text-sm font-semibold leading-6 text-white-900"
            >
              Sign up
            </a>
          )}
          {isLoggedIn ? (
            <button
              onClick={() => {
                setLoggedIn(false);
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("isAdmin");
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
