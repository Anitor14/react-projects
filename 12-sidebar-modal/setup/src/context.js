import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // this where all our functions and state are located
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    // dont forget your children
    <AppContext.Provider
      value={{
        isModalOpen,
        isSidebarOpen,
        openModal,
        closeModal,
        closeSidebar,
        openSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom Hook
// this is to prevent numerous import when we are accessing our state and functions
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
