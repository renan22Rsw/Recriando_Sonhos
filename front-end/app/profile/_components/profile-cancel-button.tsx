"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const ProfileCancelButton = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCancelAppointment = async (id: string) => {
    try {
      setIsLoading(true);

      if (!id) {
        toast.error("Agendamento nao encontrado", {
          description: "Por favor Tente novamente",
        });
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/appointments/${id}/cancel`,
        {
          credentials: "include",
          method: "PUT",
        },
      );

      if (!res.ok) {
        toast.error("Ocorreu um erro ao cancelar o agendamento", {
          description: "Por favor Tente novamente",
        });
        return;
      }

      toast.success("Agendamento cancelado com sucesso");

      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          description: "Por favor Tente novamente",
        });
      } else {
        toast.error("Ocorreu um erro ao cancelar o agendamento", {
          description: "Por favor Tente novamente",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className="font-semibold text-red-600">
          <X />
          Cancelar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você tem certeza que deseja cancelar este produto?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Este produto será cancelado.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center">
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="bg-[#E64343] font-bold text-white hover:bg-[#E64343]/90"
              onClick={() => handleCancelAppointment(id)}
              disabled={isLoading}
            >
              {isLoading ? "Cancelando..." : "Confirmar"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
