import { Appointments } from "@/types/appointments";
import { cookies } from "next/headers";

export const getUserAppointments = async (): Promise<Appointments[]> => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/appointments`,
      {
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
      },
    );

    const data: Appointments[] = await response.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error("Algo deu errado, tente novamente.");
  }
};
