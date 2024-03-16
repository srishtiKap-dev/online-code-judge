import NavBar from "./NavigationBar";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function CreateQuestions() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [file, setFile] = useState("");
  const [fileStatus, setFileStatus] = useState("");
  const [outputFileStatus, setOutputFileStatus] = useState("");
  const [inputFilePath, setInputFilePath] = useState("");
  const [outputFilePath, setOutputFilePath] = useState("");
  const fileInputRef = useRef();
  const fileOutputRef = useRef();
  const [fileType, setFileType] = useState("");

  useEffect(() => {
    const getFile = async event => {
      console.log(fileType);
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        const response = await axios
          .post(`${apiUrl}/upload`, data)
          .then(res => {
            if (fileType === "Input") {
              setFileStatus("Input file uploaded successfully!");
              setInputFilePath(res.data.path);
            } else if (fileType === "Output") {
              setOutputFileStatus("Output file uploaded successfully!");
              setOutputFilePath(res.data.path);
            }
            console.log(res);
          })
          .catch(error => {
            console.log("Error occurred in Uploading input/output file", error);
            if (fileType === "Input") {
              setFileStatus("Input file upload failed!");
            } else if (fileType === "Output") {
              setOutputFileStatus("Output file upload failed!");
            }
          });
      }
    };
    getFile();
  }, [file]);

  const onUploadFile = async event => {
    fileInputRef.current.click();
  };

  const onUploadOutputFile = async event => {
    fileOutputRef.current.click();
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const req = {
      title,
      description,
      type,
      difficulty,
      inputFilePath,
      outputFilePath
    };
    console.log(type);
    await axios
      .post(`${apiUrl}/questions`, req)
      .then(res => {
        console.log(res);
        toast.success(res.data.message, {
          duration: 10000
        });
      })
      .catch(error => {
        console.log("Error occurred in Create Questions API", error);
        toast.error(error.response.data, {
          duration: 10000
        });
      });
  };

  return (
    <div>
      <NavBar />
      <form
        className="space-y-6"
        action="#"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 text-left m-8 font-mono">
          <div className="leading-10 mt-8">
            <div className="mt-4 flex items-center justify-between">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="title"
                required
                className="ml-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-black-600 sm:text-sm sm:leading-6 focus:border-2 focus:border-gray-900 focus:outline-0"
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <label
                htmlFor="type"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Type
              </label>
              <select
                onChange={e => setType(e.target.value)}
                class="ml-4 w-2/4 peer rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option value="">Select Type</option>
                <option value="string">String</option>
                <option value="math">Math</option>
                <option value="array">Array</option>
              </select>
              <label
                htmlFor="difficulty"
                className="ml-8 block text-sm font-medium leading-6 text-gray-900"
              >
                Difficulty
              </label>
              <select
                onChange={e => setDifficulty(e.target.value)}
                class="ml-4 peer w-2/4 rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <label>Add Testcase:</label>
            </div>
            <div>
              <button
                type="button"
                onClick={onUploadFile}
                className="bg-white-500 text-black py-2 px-4 rounded-lg border border-gray-300 py-1.5 px-4 mt-2"
              >
                Upload Input file
              </button>
              <label className="ml-4">{fileStatus}</label>
              <input
                type="file"
                ref={fileInputRef}
                className="invisible"
                onChange={e => {
                  setFileType("Input");
                  setFile(e.target.files[0]);
                }}
              ></input>
            </div>
            <div>
              <button
                type="button"
                onClick={onUploadOutputFile}
                className="bg-white-500 text-black py-2 px-4 rounded-lg border border-gray-300 py-1.5 px-4 mt-2"
              >
                Upload Output file
              </button>
              <label className="ml-4">{outputFileStatus}</label>
              <input
                type="file"
                ref={fileOutputRef}
                className="invisible"
                onChange={e => {
                  setFileType("Output");
                  setFile(e.target.files[0]);
                }}
              ></input>
            </div>
          </div>
          <div className="ml-10">
            <label>Description</label>
            <br></br>
            <textarea
              value={description}
              onChange={e => {
                setDescription(e.target.value);
              }}
              className="mt-4 min-h-[400px] w-full resize-none rounded-[7px] border border-black-600 px-3 py-2.5 font-sans text-sm font-normal focus:border-2 focus:border-gray-900 focus:outline-0"
              placeholder=" "
            ></textarea>

            <button className=" mx-4 bg-blue-500 text-black py-2 px-4 rounded-lg border border-blue-300 py-1.5 px-4 mt-2">
              Create new question
            </button>
            <br></br>
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default CreateQuestions;
