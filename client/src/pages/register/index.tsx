import { useState } from "react";
import Input from "../../components/input";
import Toggle from "../../components/input/toggle";
import { Link } from "react-router-dom";
import { IUser } from "../../types";

const Register = () => {
  const [isSeller, setIsSeller] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // form verileri backend'a gönderilecek
    const formData = new FormData(e.currentTarget);
    // bütün inputlardaki verileri nesne haline getir
    const newUser = Object.fromEntries(formData);
    // satıcı hesabı bilgisini nesne içine kaydet
    (newUser as unknown as IUser).isSeller = isSeller;
    // apiye kaydolma isteği at
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 md:gap-10 md:pt-24">
        <div>
          <h1 className="title">Yeni Hesap Oluştur</h1>
          <Input label="İsim" required={true} name="username" />
          <Input label="Email" required={true} name="email" type="email" />
          <Input label="Fotoğraf" required={true} name="photo" type="file" />
          <Input label="Ülke" required={true} name="country" />
          <Input label="Şifre" required={true} name="password" />
        </div>
        <div>
          <h1 className="title">Satıcı Olmak İstiyorum</h1>
          <Toggle setIsSeller={setIsSeller} />
          <Input
            label="Telefon"
            type="number"
            required={isSeller}
            name="phone"
            disabled={!isSeller}
          />
          <Input
            label="Açıklama"
            type="textarea"
            required={isSeller}
            name="desc"
            disabled={!isSeller}
          />

          <button className="form-button">Hesap Oluştur</button>
          <p className="mt-5 text-gray-500">
            Hesabınız var mı?
            <Link to="/login" className="ms-3 text-blue-500">
              Giriş Yap
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
