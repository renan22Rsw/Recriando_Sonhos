import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ProductsHeader = () => {
  return (
    <header className="h-100 bg-[#F4F3F1]">
      <div className="flex flex-col items-center space-y-6 px-4 pt-20">
        <Badge className="bg-[#F6E5E4] px-3 py-2 text-lg font-semibold text-[#E85555]">
          <Sparkles />
          Festas Inesqueciveis
        </Badge>
        <h1 className="text-3xl font-bold lg:text-5xl 2xl:text-6xl">
          Nossos Produtos
        </h1>
        <p className="text-foreground/60 text-md max-w-127.5 text-center lg:text-xl">
          Explore nossa colecao exclusiva de decoracoes para todos os tipos de
          eventos e celebracoes
        </p>
      </div>
    </header>
  );
};
