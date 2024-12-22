import { Link } from "react-router-dom";
import Input from "../../components/input";
import { FormEvent } from "react";
import { ILoginUser } from "../../types";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const { login } = useAuth();

  // form gönderilince
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // form verileri alınır.
    const formData = new FormData(e.target as HTMLFormElement);
    // entries ile diziye, fromentries ile nesneye çevirir.
    const user = Object.fromEntries(formData.entries());
    // user tip değişimi yapılır
    login(user as unknown as ILoginUser);
  };
  return (
    <div className="pt-24 max-w-[500px] mx-auto sm:min-w-[400px] max-sm:w-full">
      <h1 className="title mb-10">Hesabınıza Giriş Yapın</h1>
      <form onSubmit={handleSubmit}>
        <Input label="İsim" required={true} name="username" />
        <Input label="Şifre" required={true} name="password" />
        <button className="form-button">Giriş Yap</button>
      </form>

      <p className="mt-5 text-gray-500">
        Hesabınız yok mu?
        <Link to={"/register"} className="ms-1 text-blue-500">
          Kaydol
        </Link>
      </p>
    </div>
  );
};

export default Login;
