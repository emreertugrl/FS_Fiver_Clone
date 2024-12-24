type Props = {
  info?: string;
  refetch?: () => void;
};
const Error = ({ info, refetch }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-center my-20 bg-red-500/80 px-5  py-10 rounded-lg text-white">
      <p>{info || "Üzgünüz bir sorun oluştu"}</p>
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
  );
};

export default Error;
