import React, { useState } from "react";
import { Deletebutton } from "./Deletebutton";
import { motion, AnimatePresence } from "framer-motion";

export const Copyclip = ({ item, handleDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = async ()=>{
    try {
    await navigator.clipboard.writeText(item.text);
    setCopied(true);

    // Hide alert after 1 second
    setTimeout(() => setCopied(false), 1000);
    }
    catch(err){
      alert("Failed to Copy")
    }

  }
  return (
    <div onClick={()=>{handleClick()}} className="m-2 px-6 py-3 bg-blue-500 text-white font-semibold text-left rounded-lg shadow-md hover:bg-blue-600 transition duration-300 cursor-pointer">
      
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
      
      <div className="flex items-between justify-between">
      <div className="text-sm flex items-start">{item.name}:</div>
      <Deletebutton onClick={()=> handleDelete(item.name)}  />
      </div>
      {/* Small font for item.name */}
      <div className="text-lg truncate">{item.text}</div>
      {/* Larger font for item.text */}
    </div>
  );
};
