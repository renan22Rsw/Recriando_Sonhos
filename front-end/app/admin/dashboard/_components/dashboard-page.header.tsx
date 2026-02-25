import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

export const DashBoardPageHeader = () => {
  return (
    <header className="mx-auto max-w-400 py-8">
      <div className="items-center justify-between md:flex">
        <div className="py-2">
          <h3 className="text-3xl font-bold">Dashboard</h3>
          <p className="text-foreground/60 text-lg">
            Bem-vindo de volta! Aqui esta o resumo de hoje.
          </p>
        </div>

        <div>
          <Button className="rounded-2xl bg-[#E64343] hover:bg-[#E64343]/80">
            <Package /> Gerenciar Produtos
          </Button>
        </div>
      </div>
    </header>
  );
};
