import React, { createContext, useContext, useState } from 'react';

// Create Context
const DataContext = createContext();

// Custom hook to access context data
export const useData = () => useContext(DataContext);

// DataProvider component that wraps the app and provides the context
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null); // state to hold the data

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
