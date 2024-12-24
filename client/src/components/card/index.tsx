import { Link } from "react-router-dom";
import { IGig } from "../../types";
import { FaStar } from "react-icons/fa";

type Props = {
  item: IGig;
};
const Card = ({ item }: Props) => {
  return (
    <Link
      to={`/detail/${item._id}`}
      className="p-2 rounded-md cursor-pointer flex flex-col gap-2 group"
    >
      <img src={item.coverImage} className="size-full object-cover rounded-md max-h-[200px]" />
      <div className="flex gap-2 items-center justify-center">
        <img src={item.user.photo} className="rounded-full size-8 border ring-2 ring-black " />

        <p className="">
          <span className="font-bold">{item.user.username}</span>
          <span className="text-gray-500"> tarafından oluşturuldu</span>
        </p>
      </div>
      <h2 className="line-clamp-2 group-hover:underline">{item.title}</h2>
      <div className="flex items-center gap-1 font-semibold text-lg">
        <FaStar />
        <span>4.5</span>
        <span className="font-normal text-gray-500">(1k+)</span>
      </div>
      <p className="font-semibold">
        <span>{item.package_price.toLocaleString()} ₺</span>
        <span className="text-gray-500 font-normal">'den başlayan fiyatlarla</span>
      </p>
    </Link>
  );
};

export default Card;
