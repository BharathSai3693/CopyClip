// UserContext.jsx
import React, { createContext, useEffect, useState } from "react";

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const createId = () =>
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  const storedItems = JSON.parse(localStorage.getItem("userItems")) || [];
  const initialItems = storedItems.map((item) =>
    item.id ? item : { ...item, id: createId() }
  );
  const [items, setItems] = useState(initialItems);

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
