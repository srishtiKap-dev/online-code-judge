import NavBar from "./NavigationBar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import axios from "axios";
function Description() {
  const nav = useNavigate();
  const [input, setinput] = useState();
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(`
  // Include the input/output stream library
  #include <iostream> 

  // Define the main function
  int main() { 
      // Output "Hello World!" to the console
      std::cout << "Hello World!"; 
      
      // Return 0 to indicate successful execution
      return 0; 
  }`);
  const [output, setOutput] = useState("");
  const [questionDesc, setQuestionDesc] = useState([]);
  let { title } = useParams();
  const getDescriptionApi = `http://localhost:8080/question/description/${title}`;
  const runApi = "http://localhost:8080/run";
  const submitApi = "http://localhost:8080/submit";

  // to load description page by default
  useEffect(() => {
    getQuestionDescription();
  }, []);

  const getQuestionDescription = async event => {
    await axios
      .get(getDescriptionApi)
      .then(res => {
        setQuestionDesc(res.data.questionDesc[0].description);
        console.log("Here::", questionDesc);
      })
      .catch(error => {
        console.log("Error occurred in GET Question Description API", error);
      });
  };

  const handleRun = async event => {
    const req = { language, code, input };
    await axios
      .post(runApi, req)
      .then(res => {
        setOutput(res.data.output);
      })
      .catch(error => {
        if (error.response.data.error.includes("Command failed")) {
          setOutput("Mismatch in language selected & code provided");
        }
        console.log("Error occurred in Run API", error.response.data.error);
      });
  };

  const handleSubmit = async event => {
    var token = localStorage.getItem("jwtToken");
    const req = { title, language, code, token };
    await axios
      .post(submitApi, req)
      .then(res => {
        setOutput(res.data.output);
      })
      .catch(error => {
        if (error.response.data.error.includes("Command failed")) {
          setOutput("Mismatch in language selected & code provided");
        }
        console.log("Error occurred in Submit API", error.response.data.error);
      });
  };
  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-2 text-left m-8 font-mono">
        <div className="leading-10">
          <div className="decoration-solid underline text-2xl font-bold">
            <h5>{title}</h5>
          </div>

          {questionDesc}
          <div class="mt-60">
            <label>Input</label>
            <br></br>
            <textarea
              value={input}
              onChange={e => {
                setinput(e.target.value);
              }}
              class="min-h-[100px] w-9/12 resize-none rounded-[7px] border border-black-600 px-3 py-2.5 font-sans text-sm font-normal focus:border-1 focus:border-gray-900 focus:outline-0"
              placeholder=" "
            ></textarea>
          </div>
        </div>
        <div>
          <select
            onChange={e => {
              setLanguage(e.target.value);
            }}
            className="select-box border border-gray-300 rounded-lg py-1.5 px-4 mb-2 focus:outline-none "
          >
            <option value="cpp">C++</option>
            <option value="py">Python</option>
            <option value="java">Java</option>
          </select>
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              outline: "none",
              border: "none",
              backgroundColor: "#EADDCA",
              height: "100%",
              overflowY: "scroll"
            }}
          />
          <button
            onClick={handleRun}
            class="bg-white-500 text-black py-2 px-4 rounded-lg border border-gray-300 py-1.5 px-4 mt-2"
          >
            Run
          </button>
          <button
            onClick={handleSubmit}
            class=" mx-4 bg-blue-500 text-black py-2 px-4 rounded-lg border border-blue-300 py-1.5 px-4 mt-2"
          >
            Submit
          </button>
          <br></br>
          {output && (
            <div className="mt-8">
              Output:
              <div className="outputbox mt-4 bg-gray-100 rounded-md shadow-md p-4">
                <p
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12
                  }}
                >
                  {output}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Description;
