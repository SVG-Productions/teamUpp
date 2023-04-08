import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState(
    JSON.parse(sessionStorage.getItem("sessionUser"))
  );

  useEffect(() => {
    sessionStorage.setItem("sessionUser", JSON.stringify(authedUser));
  }, [authedUser]);

  return (
    <AuthContext.Provider
      value={{
        authedUser,
        setAuthedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
