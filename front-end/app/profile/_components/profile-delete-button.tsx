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

export const ProfileDeleteButton = () => {
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
            <Button className="bg-[#E64343] font-bold text-white">
              Deletar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
