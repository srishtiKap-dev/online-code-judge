import NavBar from "./NavigationBar";
function HomePage() {
  const url = "http://localhost:8080/questions";
  return (
    <div className="HomePage">
      <NavBar />
      Welcome to home!
    </div>
  );
}

export default HomePage;
