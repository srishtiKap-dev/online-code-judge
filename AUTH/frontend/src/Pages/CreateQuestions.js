import NavBar from "./NavigationBar";
import { useState } from "react";
function CreateQuestions() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleSubmit = async event => {};

  return (
    <div>
      <NavBar />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-between">
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
              className="ml-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>

            <textarea
              value={description}
              onChange={e => {
                setDescription(e.target.value);
              }}
              class="min-h-[100px] w-9/12 resize-none rounded-[7px] border border-black-600 px-3 py-2.5 font-sans text-sm font-normal focus:border-1 focus:border-gray-900 focus:outline-0"
              placeholder=" "
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="type"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Type
            </label>
            <select class="ml-4 peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
              <option value="easy">String</option>
              <option value="medium">Math</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="difficulty"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Difficulty
            </label>
            <select class="ml-4 peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create new question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateQuestions;
