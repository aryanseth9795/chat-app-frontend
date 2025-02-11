import { useEffect } from "react";
import toast from "react-hot-toast";

export const useError = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ error, isError, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        toast.error(error || "Something get Wrong !");
      }
    });
  }, [errors]);
};
