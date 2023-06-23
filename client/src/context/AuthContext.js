import axios from "axios";
import { useState, createContext, useContext } from "react";
import useTheme from "../hooks/useTheme";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState(null);
  const [theme, setTheme] = useTheme();

  const login = async (credential, password) => {
    try {
      const { data: user } = await axios.post("/api/session", {
        credential,
        password,
      });
      setTheme(user.theme);
      setAuthedUser(user);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const signup = async (username, email, password) => {
    try {
      const newUserData = {
        username,
        email,
        password,
      };
      const { data } = await axios.post("/api/users", newUserData);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const googleLogin = async (response) => {
    try {
      const { data: user } = await axios.post("/api/session", {
        googleCredential: response.credential,
      });
      setTheme(user.theme);
      setAuthedUser(user);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const googleSignup = async (response) => {
    try {
      const { data } = await axios.post("/api/users", {
        googleCredential: response.credential,
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const logout = async () => {
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    await axios.delete("/api/session");
    setTheme(null);
    setAuthedUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authedUser,
        setAuthedUser,
        login,
        googleLogin,
        signup,
        googleSignup,
        logout,
        theme,
        setTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
