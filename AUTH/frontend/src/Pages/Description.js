import NavBar from "./NavigationBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import axios from "axios";
function Description() {
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
  const [sampleInput, setSampleInput] = useState();
  const [sampleOutput, setSampleOutput] = useState();
  let { title } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;

  // to load description page by default
  useEffect(() => {
    getQuestionDescription();
  }, []);

  const setDefaultCode = async event => {
    console.log(event);
    if (event == "cpp") {
      setCode(` // Include the input/output stream library
      #include <iostream> 
    
      // Define the main function
      int main() { 
          // Output "Hello World!" to the console
          std::cout << "Hello World!"; 
          
          // Return 0 to indicate successful execution
          return 0; 
      }`);
    } else if (event == "java") {
      setCode(`// Your First Program

      class HelloWorld {
          public static void main(String[] args) {
              System.out.println("Hello, World!"); 
          }
      }`);
    } else {
      setCode(`# This program prints Hello World
print('Hello, world!')
            `);
    }
  };
  const getQuestionDescription = async event => {
    await axios
      .get(`${apiUrl}/question/description/${title}`)
      .then(res => {
        console.log(res);
        setQuestionDesc(res.data.questionDesc[0].description);
        setSampleInput(res.data.questionDesc[0].sampleInput);
        setSampleOutput(res.data.questionDesc[0].sampleOutput);
        console.log("Here::", questionDesc);
      })
      .catch(error => {
        console.log("Error occurred in GET Question Description API", error);
      });
  };

  const handleRun = async event => {
    const req = { language, code, input };
    await axios
      .post(`${apiUrl}/run`, req)
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
      .post(`${apiUrl}/submit`, req)
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
    <div className="h-screen text-sm text-black dark:text-black">
      <NavBar />
      <div className="grid grid-cols-2 text-left m-8 font-mono">
        <div className="leading-10">
          <div className="decoration-solid underline text-2xl">
            <h5>{title}</h5>
          </div>

          {questionDesc}
          <div className="mt-4">
            <label>Sample Input</label>
            <br></br>
            <textarea
              value={sampleInput}
              class="cursor-not-allowed min-h-[50px] w-9/12 rounded-[7px] border border-black-600 px-3 py-2.5 font-sans text-sm font-normal focus:outline-0 bg-gray-300 dark:text-black border-b dark:bg-gray-300 resize-none"
              placeholder=" "
            ></textarea>
          </div>
          <div className="mt-4">
            <label>Sample Output</label>
            <br></br>
            <textarea
              value={sampleOutput}
              class="cursor-not-allowed min-h-[50px] w-9/12 rounded-[7px] border border-black-600 px-3 py-2.5 font-sans text-sm font-normal focus:outline-0 bg-gray-300 dark:text-black border-b dark:bg-gray-300 resize-none"
              placeholder=" "
            ></textarea>
          </div>
          <div className="mt-4">
            <label>Custom Input</label>
            <br></br>
            <textarea
              value={input}
              onChange={e => {
                setinput(e.target.value);
              }}
              class="min-h-[100px] w-9/12 resize-none rounded-[7px] border border-black-600 px-3 py-2.5 font-sans text-sm font-normal focus:outline-0 bg-gray-300 dark:text-black border-b dark:bg-gray-300"
              placeholder=" "
            ></textarea>
          </div>
        </div>
        <div>
          <select
            onChange={e => {
              setLanguage(e.target.value);
              setOutput("");
              setDefaultCode(e.target.value);
            }}
            className="select-box border border-black rounded-lg py-1.5 px-4 mb-2 focus:outline-none border-b dark:bg-white"
          >
            <option value="cpp">C++</option>
            <option value="py">Python</option>
            <option value="java">Java</option>
          </select>
          <button
            onClick={handleRun}
            class="ml-4 bg-blue-500 text-black py-2 px-4 rounded-lg border border-blue-300 py-1.5 px-4"
          >
            Run
          </button>
          <button
            onClick={handleSubmit}
            class=" mx-4 bg-blue-500 text-black py-2 px-4 rounded-lg border border-blue-300 py-1.5 px-4"
          >
            Submit
          </button>
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
              backgroundColor: "#FDEBA5",
              height: "80%",
              overflowY: "scroll"
            }}
          />
          <div>
            {output && (
              <div className="mt-4">
                Output:
                <div className="text-black rounded-md p-3 text-sm bg-gray-300 dark:text-black border-b dark:bg-gray-300">
                  {output}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
