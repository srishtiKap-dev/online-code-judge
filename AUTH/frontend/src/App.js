import logo from "./logo.svg";
import "./App.css";
import signup from "./SignUp.js";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header class="bg-white">
        <nav
          class="mx-auto flex max-w-7xl items-start justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          {/* Platform Logo */}
          <div class="flex lg:flex-1">
            <a Link to="/signup" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12">
            <a
              href="signup"
              class="text-sm font-semibold leading-6 text-gray-900"
            >
              Sign up
            </a>
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>
      <h1 className="text-3xl font-bold">Welcome to Online Code Judge</h1>
    </div>
  );
}

export default App;
