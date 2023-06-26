import axios from "axios";
import React, { useState, createContext, useContext } from "react";
import useTheme from "../hooks/useTheme";

interface AuthContextType {
  authedUser: any;
  setAuthedUser?: React.SetStateAction<void>;
  login?: (credential: string, password: string) => void;
  googleLogin?: (response: any) => void;
  signup?: (username: string, email: string, password: string) => void;
  googleSignup?: (response: any) => void;
  logout?: () => void;
  theme?: string;
  setTheme?: React.SetStateAction<undefined>;
}

const initialState = {
  authedUser: null,
};

const AuthContext = createContext<AuthContextType>(initialState);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: any) => {
  const [authedUser, setAuthedUser] = useState<any>(null);
  const [theme, setTheme] = useTheme() as any;

  const login = async (credential: string, password: string) => {
    try {
      const { data: user } = await axios.post("/api/auth", {
        credential,
        password,
      });
      setTheme(user.theme);
      setAuthedUser(user);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const newUserData = {
        username,
        email,
        password,
      };
      const { data } = await axios.post("/api/users", newUserData);
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };

  const googleLogin = async (response: any) => {
    try {
      const { data: user } = await axios.post("/api/auth", {
        googleCredential: response.credential,
      });
      setTheme(user.theme);
      setAuthedUser(user);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };

  const googleSignup = async (response: any) => {
    try {
      const { data } = await axios.post("/api/users", {
        googleCredential: response.credential,
      });
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };

  const logout = async () => {
    // if (window.google) {
    //   window.google.accounts.id.disableAutoSelect();
    // }
    await axios.delete("/api/auth");
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
