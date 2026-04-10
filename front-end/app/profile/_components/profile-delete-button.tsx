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

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const ProfileDeleteButton = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteAppointment = async (id: string) => {
    try {
      setIsLoading(true);

      if (!id) {
        toast.error("Agendamento nao encontrado", {
          description: "Por favor Tente novamente",
        });
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/appointments/${id}`,

        {
          credentials: "include",
          method: "DELETE",
        },
      );

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message, {
          description: "Por favor Tente novamente",
        });
        return;
      }

      toast.success(responseData.message);

      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          description: "Por favor Tente novamente",
        });
      } else {
        toast.error("Ocorreu um erro ao deletar o agendamento", {
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
        <Button variant={"outline"} className="font-semibold">
          <Trash />
          Deletar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você tem certeza que deseja deletar este produto?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Este produto será permanentemente
            deletado.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center">
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="bg-[#E64343] font-bold text-white hover:bg-[#E64343]/90"
              onClick={() => handleDeleteAppointment(id)}
              disabled={isLoading}
            >
              {isLoading ? "Deletando..." : "Deletar"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
