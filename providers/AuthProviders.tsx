"use client";

import {
  createContext,
  PropsWithChildren,
  useState,
  Dispatch,
  useContext,
  SetStateAction,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  sessions: string[];
  answers: string[];
};

type ContextType = {
  user: User | null;
};

type DecodedType = {
  data: User;
};
export const AuthContext = createContext<ContextType | null>(null);
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { push } = useRouter();

  const newUserSign = async (
    email: string,
    password: string,
    username: string
  ) => {
    const createdUser = await fetch("http://localhost:3000/api/sign-up", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });
    if (createdUser.ok) {
      const signUpUser = await createdUser.json();
      localStorage.setItem("token", signUpUser);

      const decodedToken: DecodedType = jwtDecode(signUpUser);
      setUser(decodedToken.data);
      setToken(signUpUser);
      //   push("/login");
      toast.success("Successfully registered");
    } else {
      toast.error("User is already registered");
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      const localToken = await response.json();
      localStorage.setItem("token", localToken);
      setToken(localToken);
      const decodedToken: DecodedType = jwtDecode(localToken);
      setUser(decodedToken.data);
      push("/");
      toast.success("Login successfully bro :))");
    } else {
      toast.error("Login failed bro :((");
    }
  };
  const values = {
    user,
    setUser,
    login,
    newUserSign,
    token,
    setToken,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
