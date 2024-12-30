import React from "react";
import { IGig } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-toastify";
type Props = {
  item: IGig;
};
const Buttons = ({ item }: Props) => {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => api.delete(`/gigs/${item._id}`),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["my-gigs"] });
      toast.success("Hizmet başarıyla silindi!");
    },
  });
  return (
    <div className="flex justify-end px-2">
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
