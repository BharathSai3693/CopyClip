// UserContext.js
import React, { createContext, useEffect, useState } from "react";

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {

  const storedItems = JSON.parse(localStorage.getItem("userItems")) || [];
  const [items, setItems] = useState(storedItems);

  // Store the items in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("userItems", JSON.stringify(items));
  }, [items]);



  return (
    <UserContext.Provider value={{ items, setItems }}>
      {children}
    </UserContext.Provider>
  );
};
