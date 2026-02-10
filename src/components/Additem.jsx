import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../UserContext.jsx";

export const Additem = () => {
  const { items, setItems } = useContext(UserContext);
  // State for name and text
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  // Create a ref for the name input field
  const nameInputRef = useRef(null);

  // Handle change for name input
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle change for text input
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle form submission (optional)
  const handleSubmit = (e) => {
    e.preventDefault();
    const createId = () =>
      `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

    // Create new item object
    const newItem = {
      id: createId(),
      name: name,
      text: text,
    };

    setItems((prevItems) => [...prevItems, newItem]);

    // Clear the input fields after submitting
    setName("");
    setText("");

    nameInputRef.current.focus();
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="flex p-2">
          {/* Name input */}
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            ref={nameInputRef}
            placeholder="Enter the Question (Ex: First Name)"
            className="border m-2 w-[25rem] placeholder:text-[1rem] text-[2rem] sm:text-xl px-4 py-2 text-black placeholder-black border-1 border-blue rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          {/* Text input */}
          <input
            id="text"
            name="text"
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter the Answer (Ex: John Doe)"
            className="border m-2 w-[25rem] placeholder:text-[1rem] text-[2rem] sm:text-xl px-4 py-2 text-black placeholder-black border-1 border-blue rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          {/* Add button */}
          <button
            type="submit"
            className="m-2 bg-blue-600 rounded px-4 py-1 text-white"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
