import React, { createContext, useState } from 'react';

const LoginDialogueContext = createContext();

const LoginDialogueProvider = ({ children }) => {
    const [showLoginDialogue, setShowLoginDialogue] = useState(false);
  
    const toggleLoginDialogue = () => {
        setShowLoginDialogue((prev) => !prev);
    };
  
    return (
      <LoginDialogueContext.Provider value={{ showLoginDialogue, toggleLoginDialogue }}>
        {children}
      </LoginDialogueContext.Provider>
    );
  };
  
  export { LoginDialogueContext, LoginDialogueProvider };