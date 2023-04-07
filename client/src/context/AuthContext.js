import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUsername, setCurrentUsername] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        currentUserId,
        setCurrentUserId,
        currentUsername,
        setCurrentUsername,
        currentUserEmail,
        setCurrentUserEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
