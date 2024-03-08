import NavBar from "./NavigationBar";
function LandingPage() {
  return (
    <div className="HomePage">
      <NavBar />
      <body className="bg-blue-200 text-5xl font-bold h-screen">
        <br></br>
        <br></br>
        <br></br>
        <h2 className="text-green-700 text-5xl font-bold">Welcome</h2>
        <br></br>
        <h2 className="text-green-700 text-5xl font-bold">to</h2>
        <br></br>
        <h2 className="text-green-700 text-5xl font-bold">Online Code Judge</h2>
      </body>
    </div>
  );
}

export default LandingPage;
