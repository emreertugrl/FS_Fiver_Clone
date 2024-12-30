import { ISellerUser } from "../../types";
import Rating from "../../components/rating";
import { PiStarFourFill } from "react-icons/pi";
import { now } from "moment";

type Props = {
  user: ISellerUser;
};
const UserInfo = ({ user }: Props) => {
  return (
    <div>
      <h1 className="font-bold text-lg mt-10 mb-3">{user.username}'i tanıyalım</h1>

      <div className="flex flex-col items-center gap-3 ">
        <img src={user.photo} className="ring-zinc-400 ring-4 size-28 rounded-full object-cover" />

        <h4 className="font-semibold">{user.username}</h4>

        <p className="text-gray-600 font-light text-center">{user.desc}</p>

        <div className="flex gap-5">
          <Rating rating={4.7} reviews={"128 yorum"} designs="font-semibold text-lg" />

          <div className="flex items-center">
            <span className="text-sm font-semibold me-1">Level 2</span>
            <PiStarFourFill />
            <PiStarFourFill />
            <PiStarFourFill className="text-gray-500" />
          </div>
        </div>
      </div>
      <div className="flex gap-8 mt-5 ">
        <button className="py-2 px-5 border rounded-md hover:bg-gray-200">İletişime Geç</button>
        <button className="py-2 px-5 border rounded-md hover:bg-gray-200">Toplantı Ayarla</button>
      </div>
      <div className="border rounded-lg my-10 p-5 grid md:grid-cols-2 gap-5">
        <Field label={"Nereden"} value={user.country} />
        <Field label={"Üyelik Tarihi"} value={user.createdAt} />
        <Field label={"Telefon"} value={user.phone} />
        <Field label={"Email"} value={user.email} />
      </div>
    </div>
  );
};
type FieldProps = {
  label: string;
  value: string;
};
const Field = ({ label, value }: FieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-gray-500">{label}</span>
      <span className="text-zinc-700 font-semibold">{value}</span>
    </div>
  );
};

export default UserInfo;
