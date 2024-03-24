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
      <div className="relative overflow-x-auto h-screen bg-white border-b dark:bg-white-800 shadow-md sm:rounded-lg">
        <table className="mt-20 mx-auto w-3/4 text-sm text-left rtl:text-right text-gray-800">
          <thead className="text-xs text-black uppercase border">
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
                  className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-300 border"
                >
                  <th scope="row" className="px-6 py-4 font-medium text-black">
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
