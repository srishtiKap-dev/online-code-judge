import NavBar from "./NavigationBar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

function HomePage() {
  const nav = useNavigate();
  const [questionList, setQuestionList] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  let { title } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);

  // to load questions by default
  useEffect(() => {
    getQuestionsList();
    if (localStorage.getItem("isAdmin") == "true") {
      setIsAdmin(true);
    }
  }, []);

  const getQuestionsList = async event => {
    await axios
      .get(`${apiUrl}/questions`)
      .then(res => {
        setQuestionList(res.data.questionList);
      })
      .catch(error => {
        console.log("Error occurred in GET Questions API", error);
      });
  };

  const getProblemDescription = async question => {
    title = question.title;
    nav("/description/" + title);
  };

  const deleteProblem = async title => {
    await axios
      .post(`${apiUrl}/delete/${title}`)
      .then(res => {
        toast.success("Problem Deleted successfully!");
        getQuestionsList();
      })
      .catch(error => {
        console.log("Error occurred in DELETE Questions API", error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="relative overflow-x-auto h-screen bg-white border-b dark:bg-white-800 shadow-md sm:rounded-lg">
        <table className="mt-20 mx-auto w-3/4 text-sm text-left rtl:text-right text-gray-800">
          <thead className="text-xs text-black uppercase border">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Difficulty
              </th>
              {isAdmin && <th scope="col" className="px-6 py-3"></th>}
              {isAdmin && <th scope="col" className="px-6 py-3"></th>}
            </tr>
          </thead>
          <tbody>
            {questionList.map((question, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-300 border"
                >
                  <th
                    onClick={() => getProblemDescription(question)}
                    scope="row"
                    className="px-6 py-4 font-medium text-black cursor-pointer"
                  >
                    {question.title}
                  </th>
                  <td className="px-6 py-4">{question.type}</td>
                  <td className="px-6 py-4">{question.difficulty}</td>
                  {isAdmin && (
                    <td className="px-6 py-4">
                      <BsFillTrashFill
                        onClick={() => deleteProblem(question.title)}
                        className="cursor-pointer"
                      ></BsFillTrashFill>
                    </td>
                  )}
                  {isAdmin && (
                    <td>
                      <span className="px-6 py-4">
                        <BsFillPencilFill></BsFillPencilFill>
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <nav
          class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              1-10
            </span>{" "}
            of{" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              1000
            </span>
          </span>
          <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav> */}
      </div>
      <Toaster />
    </div>
  );
}

export default HomePage;
