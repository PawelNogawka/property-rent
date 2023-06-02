import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  password: string;
  email: string;
}

interface RegisterError {
  message: string;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<RegisterError | null>(null);

  const router = useRouter();

  const login = async (user: User) => {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        ...user,
        redirect: false,
      });

      if (result?.ok) {
        setIsLoading(false);
        console.log("Success");
        router.refresh();
      }

      if (result?.error) {
        setIsLoading(false);
        setError({ message: result.error });
        console.log("Error:", result.error);
      }

      return result
    } catch (error: any) {
      setError({ message: error });
      console.log("Error:", error);
    }
  };

  return { login, isLoading, error };
};
