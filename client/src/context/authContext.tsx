import { createContext, useContext, useEffect, useState } from "react";
import { IFormUser, ILoginUser, IUser } from "../types";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  useEffect(() => {
    // eğer token yoksa çalışmasın
    const token = localStorage.getItem("token") || document.cookie;
    if (!token) return;
    api
      .get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // tokeni header'da gönder
        },
      })
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
        toast.info("Oturumunuzun süresi doldu");
      });
  }, []);

  // kaydol
  const register = (user: IFormUser) => {
    api
      .post("/auth/register", user, {
        headers: {
          "Content-Type": "multipart/form-data", // fotoğrafa erişmek istersek böyle göndeririz.
        },
      })
      .then((res) => {
        toast.info("Hesabınız Oluşturuldu");
        navigate("/login");
      })
      .catch((err) => toast.error(err.response?.data.message));
  };

  // giriş yap
  const login = (user: ILoginUser) => {
    api
      .post("/auth/login", user)
      .then((res) => {
        // kullanıcı state'ini güncelle
        setUser(res.data.user);
        // token localstorage kaydet
        localStorage.setItem("token", res.data.token);
        // bildirim göster
        toast.success("Giriş Başarılı");
        // yönlendirme
        navigate("/");
      })
      .catch((err) => toast.error(err.response?.data.message));
  };

  // çıkış yap
  const logout = () => {
    api
      .post("/auth/logout")
      .then(() => {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/login");
        toast.info("Hesaptan çıkış yapıldı");
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider value={{ user, logout, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// contexte aboneliğimizi kolaylaştıracak hook
export const useAuth = () => {
  return useContext(AuthContext);
};
