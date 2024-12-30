import React from "react";
import { IGig } from "../../types";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";
type Props = {
  item: IGig;
};
const Buttons = ({ item }: Props) => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => api.delete(`/gigs/${item._id}`),
  });
  return (
    <div className="flex justify-between px-2">
      <button className="button bg-blue-400">Düzenle</button>
      <button
        onClick={() => {
          if (confirm("Silmeyi onaylıyor musunuz?")) mutate();
        }}
        disabled={isPending}
        className="button bg-red-400"
      >
        Sil
      </button>
    </div>
  );
};

export default Buttons;
