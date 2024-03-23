import NavBar from "./NavigationBar";
function LandingPage() {
  return (
    <div>
      <NavBar />
      <div className="pt-12 tracking-wider min-h-screen bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100">
        <br></br>
        <h1 className="mt-14 text-6xl font-bold">Skills speak louder than </h1>
        <h1 className="mt-2 text-6xl font-bold">words</h1>
        <h5 className="mt-10 tracking-wider">
          We help companies develop the strongest tech teams around.
        </h5>
        <h5 className="tracking-wider">
          We help candidates sharpen their tech skills and pursue job
          opportunities.
        </h5>
        <h5 className="pt-10 tracking-wider text-underline">
          Over 40% of developers worldwide and 3,000 companies use CodeNinja
        </h5>
        <div class="flex flex-row pl-40 ml-20">
          <img
            className="max-w-xs"
            src="https://www.hackerrank.com/wp-content/uploads/2022/10/peloton_black.png"
            alt="peloton logo"
          ></img>
          <img
            className="max-w-xs"
            src="https://www.hackerrank.com/wp-content/uploads/2022/10/atlassian_black.png"
            alt="atlassian logo"
          ></img>
          <img
            className="max-w-xs"
            src="https://www.hackerrank.com/wp-content/uploads/2022/10/bloomberg_black.png"
            alt="bloomberg logo"
          ></img>
          <img
            className="max-w-xs"
            src="https://www.hackerrank.com/wp-content/uploads/2022/10/adobe_black.png"
            alt="adobe logo"
          ></img>
          <img
            className="max-w-xs"
            src="https://www.hackerrank.com/wp-content/uploads/2022/10/vmware_black.png"
            alt="vmware logo"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
