import { Link } from "react-router-dom";
import { IUser } from "../../types";
type Props = {
  data: IUser;
  logout: () => void;
};
const User = ({ data, logout }: Props) => {
  return (
    <>
      <img src={data.photo} className="size-10 rounded-full object-cover" />
      <span>{data.username}</span>
      <div className="w-[150px] text-sm flex-col hidden group-hover:flex text-center absolute top-10 left-0 transition duration-500 bg-gray-200 rounded-md ">
        {data.isSeller && (
          <>
            <Link to="/my-gigs" className="px-5 py-2 hover:bg-gray-100 hover:rounded-t-md">
              Hizmetler
            </Link>
            <Link to="/add-gig" className="px-5 py-2 hover:bg-gray-100 text-nowrap">
              Hizmet Ekle
            </Link>
          </>
        )}
        <Link to="/" className="px-5 py-2 hover:bg-gray-100 text-nowrap">
          Siparişler
        </Link>
        <Link to="/" className="px-5 py-2 hover:bg-gray-100 text-nowrap">
          Mesajlar
        </Link>
        <button
          onClick={logout}
          className="px-5 py-2 hover:bg-gray-100 text-nowrap hover:rounded-b-lg"
        >
          Çıkış Yap
        </button>
      </div>
    </>
  );
};

export default User;
