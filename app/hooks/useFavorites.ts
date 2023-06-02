import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


interface FoavoriteError {
  message: string;
}

export const useFavorites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState< FoavoriteError | null>(null);

  const router = useRouter();

  const favorite = async (listingId: string, currentUser: any) => {
    try {
      setError(null);
      setIsLoading(true);
     console.log(currentUser)
      const list = currentUser.favoriteIds || [];
      const hasId = list.includes(listingId);
      console.log(hasId);
      if (hasId) {
        await axios.delete(`/api/favorites/${listingId}`);
      } else {
        await axios.post(`/api/favorites/${listingId}`);
      }

      router.refresh();

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

  return { favorite, isLoading, error };
};
