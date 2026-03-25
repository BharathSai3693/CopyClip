import React, { useEffect, useState } from "react";
import { Deletebutton } from "./Deletebutton.jsx";
import { motion, AnimatePresence } from "framer-motion";

export const Copyclip = ({
  item,
  isArrange,
  isDragging,
  setDragRef,
  dragStyle,
  dragAttributes,
  dragListeners,
  handleDelete,
  handleUpdate,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(item.name);
  const [draftText, setDraftText] = useState(item.text);

  useEffect(() => {
    if (isArrange) {
      setIsEditing(false);
    }
  }, [isArrange]);

  useEffect(() => {
    if (!isEditing) {
      setDraftName(item.name);
      setDraftText(item.text);
    }
  }, [item.name, item.text, isEditing]);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(item.text);
      setCopied(true);

      // Hide alert after 1 second
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      alert("Failed to Copy");
    }
  };

  const handleCardClick = () => {
    if (isEditing || isArrange) {
      return;
    }
    handleClick();
  };

  const handleEditToggle = (event) => {
    event.stopPropagation();
    if (isArrange) {
      return;
    }
    setIsEditing(true);
    setDraftName(item.name);
    setDraftText(item.text);
  };

  const handleSave = (event) => {
    event.stopPropagation();
    handleUpdate(item.id, { name: draftName, text: draftText });
    setIsEditing(false);
  };

  const handleCancel = (event) => {
    event.stopPropagation();
    setDraftName(item.name);
    setDraftText(item.text);
    setIsEditing(false);
  };

  const dragProps = isArrange
    ? { ...(dragAttributes || {}), ...(dragListeners || {}) }
    : {};

  const transitionClass =
    isArrange || isDragging ? "transition-none" : "transition duration-300";

  return (
    <div
      ref={isArrange ? setDragRef : undefined}
      style={isArrange ? dragStyle : undefined}
      {...dragProps}
      onClick={handleCardClick}
      className={`m-2 px-6 py-3 bg-blue-500 text-white font-semibold text-left rounded-lg shadow-md hover:bg-blue-600 ${transitionClass} ${
        isArrange ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
      }`}
    >
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
          >
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-start justify-between gap-2">
        <div className="text-sm flex items-start">
          {isEditing ? "Editing:" : `${item.name}:`}
        </div>
        <div className="flex items-center gap-2">
          {!isEditing && (
            <button
              type="button"
              onClick={handleEditToggle}
              onPointerDown={(event) => event.stopPropagation()}
              disabled={isArrange}
              className={`bg-white group p-2 rounded-lg shadow-lg flex items-center justify-center transition-all duration-300 transform ${
                isArrange
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : "hover:bg-yellow-500 hover:scale-105 cursor-pointer"
              }`}
              aria-label="Edit card"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`size-4 transition-all duration-300 ${
                  isArrange
                    ? "text-yellow-400"
                    : "text-yellow-600 group-hover:text-white"
                }`}
              >
                <path d="m5.433 13.917 1.262-3.154a1 1 0 0 1 .22-.344L14.2 3.134a1 1 0 0 1 1.414 0l1.252 1.252a1 1 0 0 1 0 1.414l-7.285 7.285a1 1 0 0 1-.345.22l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                <path d="M3 17.25A.75.75 0 0 1 3.75 16.5h12.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 17.25Z" />
              </svg>
            </button>
          )}
          <Deletebutton onClick={() => handleDelete(item.id)} disabled={isArrange} />
        </div>
      </div>

      {isEditing && !isArrange ? (
        <div className="mt-2 flex flex-col gap-2">
          <input
            type="text"
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
            onClick={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
            placeholder="Enter the Question"
            className="border w-full placeholder:text-[1rem] text-[1rem] sm:text-base px-3 py-2 text-black placeholder-black border-1 border-blue rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <textarea
            value={draftText}
            onChange={(event) => setDraftText(event.target.value)}
            onClick={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
            placeholder="Enter the Answer"
            rows={4}
            className="border w-full min-h-28 resize-y placeholder:text-[1rem] text-[1rem] sm:text-base px-3 py-2 text-black placeholder-black border-1 border-blue rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              onPointerDown={(event) => event.stopPropagation()}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              onPointerDown={(event) => event.stopPropagation()}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="text-lg whitespace-pre-wrap break-words">{item.text}</div>
      )}
    </div>
  );
};
