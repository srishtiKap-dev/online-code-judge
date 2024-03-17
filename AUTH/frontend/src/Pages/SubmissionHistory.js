import NavBar from "./NavigationBar";
import { useEffect, useState } from "react";
import axios from "axios";
import dateFormat from "../util.js";

function SubmissionHistory() {
  const [submissionHistoryList, setSubmissionHistoryList] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  // to load questions by default
  useEffect(() => {
    getSubmissionHistory();
  }, []);

  const getSubmissionHistory = async event => {
    await axios
      .get(`${apiUrl}/submissionHistory`)
      .then(res => {
        setSubmissionHistoryList(res.data.submissionHistory);
        console.log("Submission list", res.data.submissionHistory);
      })
      .catch(error => {
        console.log("Error occurred in GET Questions API", error);
      });
  };
  return (
    <div className="HomePage">
      <NavBar />
      <div className="relative overflow-x-auto h-screen bg-white border-b dark:bg-gray-800">
        <table className="mx-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Problem
              </th>
              <th scope="col" className="px-6 py-3">
                Language
              </th>
              <th scope="col" className="px-6 py-3">
                Submitted At
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {submissionHistoryList.map((submission, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {submission.userId.firstname} {submission.userId.lastname}
                  </th>
                  <td className="px-6 py-4">{submission.problemId.title}</td>
                  <td className="px-6 py-4">{submission.language}</td>
                  <td className="px-6 py-4">
                    {dateFormat(submission.submittedAt)}
                  </td>
                  {submission.status == "Passed" && (
                    <td className="px-6 py-4">{submission.status}</td>
                  )}
                  {submission.status == "Failed" && (
                    <td className="px-6 py-4 text-red-600">
                      Failed at testcase {submission.failedAtTestCase}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubmissionHistory;
