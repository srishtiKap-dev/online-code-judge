import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function Login() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  //let { isRegistered } = useParams();
  //console.log(isRegistered);
  const queryParams = new URLSearchParams(window.location.search);
  const isRegistered = queryParams.get("isRegistered");

  useEffect(() => {
    console.log("isRegis:", isRegistered);
    if (isRegistered) {
      toast.success(`User registered successfully. Please login!`, {
        duration: 10000
      });
    }
  }, [isRegistered]);

  const handleSubmit = async event => {
    event.preventDefault();
    const request = { email, password };
    await axios
      .post(`${apiUrl}/login`, request)
      .then(res => {
        console.log(res);
        localStorage.setItem("jwtToken", res.data.token);
        localStorage.setItem("isAdmin", res.data.isAdmin);
        localStorage.setItem("firstname", res.data.firstname);
        localStorage.setItem("lastname", res.data.lastname);
        nav("/home");
      })
      .catch(error => {
        console.log("Error occurred in Login API", error);
        toast.error(error.response.data.message, {
          duration: 10000
        });
      });
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login to your Account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
            </div>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a
            href="/signUp"
            className="ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign Up Now!
          </a>
        </p>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
