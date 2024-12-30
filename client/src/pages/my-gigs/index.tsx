import { useAuth } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "../../components/card";
import { IGig } from "../../types";

const MyGigs = () => {
  // kullanıcı bilgileri alınır
  const { user } = useAuth();
  //   kullanıcıya ait hizmetleri alırız
  const { data, error, isLoading, refetch } = useQuery<IGig[]>({
    queryKey: ["my-gigs", user],
    queryFn: () =>
      api.get("/gigs", { params: { userID: user?._id } }).then((res) => {
        return res.data.gigs;
      }),
  });
  return (
    <div>
      <h1 className="font-bold text-3xl mb-5 text-gray-600">Hizmetlerim</h1>
      <div>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error error={error} refetch={refetch} />
        ) : (
          data && (
            <div className="layout">
              {data?.map((item) => (
                <Card item={item} key={item._id} expand />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyGigs;
