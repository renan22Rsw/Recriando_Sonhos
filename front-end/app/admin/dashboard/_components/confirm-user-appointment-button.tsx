"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const ConfirmUserAppointmentButton = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleConfirmUserAppointment = async (id: string) => {
    try {
      setIsLoading(true);

      if (!id) {
        toast.error("Agendamento nao encontrado", {
          description: "Por favor Tente novamente",
        });
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/appointments/${id}/confirm`,
        {
          credentials: "include",
          method: "PATCH",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          description: "Por favor Tente novamente",
        });
      }

      toast.error("Ocorreu um erro ao confirmar o agendamento", {
        description: "Por favor Tente novamente",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="rounded-lg bg-[#E64343] font-bold hover:bg-[#E64343]/90"
      onClick={() => handleConfirmUserAppointment(id)}
    >
      {isLoading ? "Confirmando..." : "Confirmar"}
    </Button>
  );
};
