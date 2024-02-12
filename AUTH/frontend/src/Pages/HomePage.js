function HomePage() {
  return (
    <div className="HomePage">
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
            <a
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>
      <h1 className="text-3xl font-bold">Welcome to Online Code Judge</h1>
    </div>
  );
}

export default HomePage;
