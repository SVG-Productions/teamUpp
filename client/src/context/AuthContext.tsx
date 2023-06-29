import axios from "axios";
import React, {
  useState,
  createContext,
  useContext,
  SetStateAction,
  Dispatch,
  ReactElement,
} from "react";
import useTheme from "../hooks/useTheme";
import { CredentialResponse } from "@react-oauth/google";

interface AuthedUserType {
  avatar: string;
  email: string;
  id: string;
  photo: string;
  theme: string;
  username: string;
}

interface AuthContextType {
  authedUser: AuthedUserType | null;
  setAuthedUser: Dispatch<SetStateAction<AuthedUserType | null>>;
  login: (credential: string, password: string) => void;
  googleLogin: (response: CredentialResponse) => void;
  signup: (username: string, email: string, password: string) => Promise<any>;
  googleSignup: (response: CredentialResponse) => Promise<any>;
  logout: () => void;
  theme: string | null;
  setTheme: Dispatch<SetStateAction<string>>;
}

interface AuthProviderProps {
  children: ReactElement;
}

const initialState: AuthContextType = {
  authedUser: null,
  setAuthedUser: () => null,
  login: async () => null,
  googleLogin: async () => null,
  signup: async () => null,
  googleSignup: async () => null,
  logout: () => null,
  theme: null,
  setTheme: () => null,
};

const AuthContext = createContext<AuthContextType>(initialState);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authedUser, setAuthedUser] = useState<AuthedUserType | null>(null);
  const [theme, setTheme] = useTheme();

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

  const googleLogin = async (response: CredentialResponse) => {
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

  const googleSignup = async (response: CredentialResponse) => {
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
    await axios.delete("/api/auth");
    setTheme("");
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
