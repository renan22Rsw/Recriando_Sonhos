import { cookies } from "next/headers";
import { Session } from "@/types/session";

export const getSession = async (): Promise<Session | null> => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-session`,
      {
        method: "GET",
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      },
    );

    const data = await response.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error("Algo deu errado, tente novamente.");
  }
};
