type ExtendedError = {
  response?: {
    data?: { message: string };
  };
} & Error;
type Props = {
  error?: Error;
  refetch?: () => void;
};
const Error = ({ error, refetch }: Props) => {
  return (
    <>
      {(error as ExtendedError)?.response?.data?.message === "Hizmet bulunamadı" ? (
        <div className="py-10 px-5 rounded-lg bg-orange-500/80 text-white text-center font-semibold my-20">
          Aradığınız koşullara uygun hizmet bulunamadı
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2 text-center my-20 bg-red-500/80 px-5  py-10 rounded-lg text-white">
          <p>{error?.message || "Üzgünüz bir sorun oluştu"}</p>
          <p>Lütfen daha sonra tekrar deneyin.</p>
          {refetch && (
            <button
              onClick={refetch}
              className="border py-1 px-3 rounded-md hover:bg-gray-200/20 transition"
            >
              Tekrar dene
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Error;
