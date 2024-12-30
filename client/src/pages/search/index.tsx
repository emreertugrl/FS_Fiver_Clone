import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import api from "../../api";
import Title from "../detail/title";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "../../components/card";
import { IGig } from "../../types";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  // const search = searchParams.get("query") ? query : category;
  // api'a gönderilecek parametreleri oluştur
  const params = {
    category,
    search: query, // backend tarafında search parametresi olarak alıyoruz.
  };
  // api^den verileri al
  const { isLoading, error, data, refetch } = useQuery<IGig[]>({
    queryKey: ["gigs", params],
    queryFn: () => api.get("/gigs", { params }).then((res) => res.data.gigs),
  });
  console.log(data);
  return (
    <div>
      <Title query={query} category={category} />
      {isLoading ? (
        <Loader designs="mt-20 size-8" />
      ) : error ? (
        <Error error={error} refetch={refetch} />
      ) : (
        data && (
          <div className="layout">
            {data.map((item) => (
              <Card item={item} key={item._id} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Search;
