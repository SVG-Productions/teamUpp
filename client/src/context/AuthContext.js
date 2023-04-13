import axios from "axios";

import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState(null);

  const login = async (credential, password) => {
    const { data: user } = await axios.post("/api/session", {
      credential,
      password,
    });
    setAuthedUser(user);
  };

  const signup = async (username, email, password) => {
    const newUserData = {
      username,
      email,
      password,
    };

    const { data: user } = await axios.post("/api/users/", newUserData);
    setAuthedUser(user);
  };

  const logout = async () => {
    await axios.delete("/api/session");
    setAuthedUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authedUser,
        setAuthedUser,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
