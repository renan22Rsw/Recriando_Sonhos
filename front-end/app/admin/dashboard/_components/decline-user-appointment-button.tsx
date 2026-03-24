import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const DeclineUserAppointmentButton = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDeclineUserAppointment = async (id: string) => {
    try {
      setIsLoading(true);

      if (!id) {
        toast.error("Agendamento nao encontrado", {
          description: "Por favor Tente novamente",
        });
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/appointments/${id}/decline`,
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className="font-semibold">
          Recusar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Voce tem certeza que deseja recusar este agendamento?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acao nao pode ser desfeita. Este agendamento sera
            permanentemente deletado.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeclineUserAppointment(id)}
            disabled={isLoading}
            className="cursor-pointer bg-[#E64343] font-bold hover:bg-[#E64343]/90"
          >
            {isLoading ? "Recusando..." : "Recusar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
