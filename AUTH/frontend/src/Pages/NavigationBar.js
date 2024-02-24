import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const nav = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  console.log(isLoggedIn);

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-start justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Platform Logo */}
        <div className="flex lg:flex-1">
          <a className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12">
          <a
            href="/signUp"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Sign up
          </a>
          {isLoggedIn ? (
            <button
              onClick={() => {
                setLoggedIn(false);
                nav("/");
              }}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Logout <span aria-hidden="true">&rarr;</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setLoggedIn(true);
                nav("/login");
              }}
              className="text-sm font-semibold leading-6 text-gray-900"
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
