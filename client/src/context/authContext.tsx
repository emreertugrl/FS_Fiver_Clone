import { createContext, useState } from "react";
import { IFormUser, ILoginUser, IUser } from "../types";
import api from "../api";

type ContextType = {
  user: IUser | null;
  register: (user: IFormUser) => void;
  login: (user: ILoginUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<ContextType>({
  user: null,
  register: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUser | null>(null);

  // kaydol
  const register = (user: IFormUser) => {
    api
      .post("/auth/register", user, {
        headers: {
          "Content-Type": "multipart/form-data", // fotoğrafa erişmek istersek böyle göndeririz.
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // giriş yap
  const login = () => {};

  // çıkış yap
  const logout = () => {};

  return (
    <AuthContext.Provider value={{ user, logout, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
