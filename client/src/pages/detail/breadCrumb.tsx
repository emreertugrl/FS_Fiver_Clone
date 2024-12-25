import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

type Props = {
  category: string;
};
const BreadCrumb = ({ category }: Props) => {
  return (
    <div>
      <p className="flex gap-3 items-center text-gray-500 my-5">
        <Link to="/">
          <AiOutlineHome />
        </Link>
        <span>/</span>
        <Link to={`/search?category=${category}`} className="hover:underline">
          {category}
        </Link>
      </p>
    </div>
  );
};

export default BreadCrumb;
