import { IGigDetail } from "../../types";
import { FaArrowRight, FaRegClock } from "react-icons/fa";
import { GiRecycle } from "react-icons/gi";
import { IoIosArrowDown, IoMdCheckmark } from "react-icons/io";
type Props = {
  data: IGigDetail;
};
const PackageInfo = ({ data }: Props) => {
  return (
    <div className="h-fit flex flex-col gap-8 border shadow rounded-md p-5 mb-20 md:mt-20 md:sticky top-20">
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl capitalize">{data?.package_title}</h2>
        <p className="text-lg">{data.package_price.toLocaleString()} ₺</p>
      </div>
      <p className="text-gray-600">{data.package_description}</p>
      <div className="flex gap-10 text-sm font-semibold whitespace-nowrap">
        <p className="flex items-center gap-2  ">
          <FaRegClock className="text-lg" />
          {data.package_duration} günde teslimat
        </p>
        <p className="flex items-center gap-2 font-semibold">
          <GiRecycle className="text-lg" />
          {data.package_revisions} revizyon hakkı
        </p>
      </div>
      <ul>
        {data.package_features.map((i) => (
          <li className="flex gap-2 items-center">
            <IoMdCheckmark className="text-black" />
            <span className="text-gray-600">{i}</span>
          </li>
        ))}
      </ul>
      <button className="flex items-center bg-black text-white p-2 rounded-md hover:bg-zinc-700 transition">
        <span className="flex-1 font-semibold">Devam Et</span>
        <FaArrowRight />
      </button>
      <button className="gap-2 flex items-center justify-center border p-2 rounded-md hover:bg-zinc-200 transition">
        <span className="font-semibold">İletişime Geç</span>
        <IoIosArrowDown />
      </button>
    </div>
  );
};

export default PackageInfo;
