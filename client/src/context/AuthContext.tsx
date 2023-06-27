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
  setAuthedUser?: Dispatch<SetStateAction<AuthedUserType | null>>;
  login?: (credential: string, password: string) => void;
  googleLogin?: (response: GoogleResponse) => void;
  signup?: (username: string, email: string, password: string) => void;
  googleSignup?: (response: GoogleResponse) => void;
  logout?: () => void;
  theme?: string;
  setTheme?: Dispatch<SetStateAction<string>>;
}

interface GoogleResponse {
  clientId: string;
  credential: string;
  select_by: string;
}

interface AuthProviderProps {
  children: ReactElement;
}

const initialState = {
  authedUser: null,
};

const AuthContext = createContext<AuthContextType>(initialState);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authedUser, setAuthedUser] = useState<AuthedUserType | null>(null);
  const [theme, setTheme] = useTheme();

  console.log(authedUser);

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

  const googleLogin = async (response: GoogleResponse) => {
    console.log(response);
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

  const googleSignup = async (response: GoogleResponse) => {
    console.log(response);
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
