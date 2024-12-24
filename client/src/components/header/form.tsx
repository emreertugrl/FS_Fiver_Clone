import { FormEvent } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const defaultText = params.get("query") || undefined;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // inputa yazılan değere erişme
    const text = (e.currentTarget[0] as HTMLFormElement).value;
    navigate(`/search?query=${text}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 flex border rounded overflow-hidden max-w-[500px] "
    >
      <input
        defaultValue={defaultText}
        type="text"
        className="size-full px-3 outline-none"
        placeholder="Hizmet Ara..."
      />
      <button className="bg-black p-2 text-white text-xl max-sm:hidden">
        <IoSearch />
      </button>
    </form>
  );
};

export default Form;
