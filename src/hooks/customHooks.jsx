import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useError = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ error, isError, fallback }) => {
      if (isError) {
        if (fallback) fallback();
       else toast.error(error?.data?.message || "Something get Wrong !");
      }
    });
  }, [errors]);
};

export const useAsyncMutation = (mutationhook) => {
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState(null);

  const [mutate] = mutationhook();
  const execution = async (toastMessage, ...args) => {
    setIsloading(true);
    const toastId = toast.loading(toastMessage || "Updating Data...");
    try {
      const res = await mutate(...args);
      if (res?.data) {
        toast.success(res?.data?.message || "Updated Data Successfully... ", {
          id: toastId,
        });
        setData(res.data);
      } else {
        toast.error(res?.error?.data?.message || "Something went Wrong!", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      setIsloading(false);
    }
  };
  return [execution, isLoading, data];
};
