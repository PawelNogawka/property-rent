import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios, { CancelTokenSource } from "axios";


interface RegisterError {
  message: string;
}

export const useDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<RegisterError | null>(null);
  const cancelTokenSourceRef = useRef<CancelTokenSource | null>(null);

  const router = useRouter()

  const deleteReservation = async (url: string, reservationId: string) => {
    try {
      setError(null);
      setIsLoading(true);

      cancelTokenSourceRef.current = axios.CancelToken.source();
      const response = await axios.delete(`${url}/${reservationId}`);
      const data = response.data;
      router.refresh()

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          setError({ message: errorMessage });
        } else {
          setError({ message: "A query error occurred" });
        }
      } else {
        console.log(error);
        setError({ message: "An unknown error occurred." });
      }
    }
  };

  useEffect(() => {
    return () => {
      if (cancelTokenSourceRef.current) {
        cancelTokenSourceRef.current.cancel("Request canceled due to component unmount");
        console.log("Request canceled due to component unmount")
      }
    };
  }, []);

  return { deleteReservation, isLoading, error };
};
