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
  username: string;
  email: string;
  password: string;
  sessions: string[];
  answers: string[];
  imgUrl: string;
};

type ContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<null | User>>;
  setToken: Dispatch<SetStateAction<null | string>>;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  newUserSign: (
    email: string,
    password: string,
    username: string,
    lastName: string
  ) => Promise<void>;
};

type DecodedType = {
  data: User;
};
export const AuthContext = createContext<ContextType | null>(null);
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { push } = useRouter();
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse user:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const newUserSign = async (
    email: string,
    password: string,
    username: string,
    lastName: string
  ) => {
    const createdUser = await fetch("/api/sign-up", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
        lastName,
      }),
    });
    const result = await createdUser.json();

    if (!result.success) {
      toast.error("Амжилтгүй нэвтэрлээ.");
      return;
    }

    const token = result.token;
    const user = result.user;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
    push("/testSession");
    toast.success("Амжилттай бүртгүүллээ🎉");
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error("Амжилтгүй нэвтэрлээ");
        return;
      }

      const { token, user } = result;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);
      setUser(user);

      push("/");
      toast.success("Амжилттай нэвтэрлээ🎉");
    } catch (err) {
      toast.error("Login error");
      console.error(err);
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

export const useUser = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("provider dotor baih heregtei");
  }
  return authContext;
};
