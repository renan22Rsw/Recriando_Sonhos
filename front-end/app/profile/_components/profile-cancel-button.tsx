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

export const CancelProfileButton = () => {
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
            <Button className="bg-[#E64343] font-bold text-white">
              Continuar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
