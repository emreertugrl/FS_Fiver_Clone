import { FormEvent } from "react";
import Input from "../../components/input";
import Select from "../../components/input/select";
import { categories, inputs } from "../../utils/constants";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

const Create = () => {
  const navigate = useNavigate();
  const { mutate, error, isPending } = useMutation({
    mutationFn: (data: FormData) =>
      api.post("/gigs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    // başarılı işlemler için
    onSuccess: (res) => {
      toast.success("Hizmet başarıyla oluşturuldu!");
      navigate(`/detail/${res.data.gig._id}`);
    },
    // hata işlemleri
    onError: (err) => {
      toast.error("Hizmet oluşturulurken hata oluştu");
    },
  });
  // form gönderilince
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // inputlardaki verileri al
    const data = new FormData(e.currentTarget);
    // api'ye post isteği at
    mutate(data);
  };
  return (
    <div>
      <h1 className="font-bold text-3xl my-5">Yeni Hizmet Oluştur</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          {inputs.map((props, key) => (
            <Input key={key} {...props} />
          ))}
          {/* select alanı  */}
          <Select label="Kategori" name="category" options={categories} />
        </div>
        <div className="text-center my-5 ">
          <button
            disabled={isPending}
            className="form-button disabled:opacity-80 flex justify-center  bg-green-500 hover:bg-green-600 w-full "
          >
            {isPending ? <Loader /> : <span className="m-1">Oluştur</span>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
