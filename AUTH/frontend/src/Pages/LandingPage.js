import NavBar from "./NavigationBar";
function LandingPage() {
  return (
    <div>
      <NavBar />
      <div className="bg-neutral-300 h-screen">
        <body className="text-5xl font-bold">
          <br></br>
          <br></br>
          <br></br>
          <h2 className="text-green-700 text-5xl font-bold">Welcome</h2>
          <br></br>
          <h2 className="text-green-700 text-5xl font-bold">to</h2>
          <br></br>
          <h2 className="text-green-700 text-5xl font-bold">
            Online Code Judge
          </h2>
        </body>
      </div>
    </div>
  );
}

export default LandingPage;
