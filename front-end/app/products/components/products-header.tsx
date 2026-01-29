import { Sparkles } from "lucide-react";

export const ProductsHeader = () => {
  return (
    <header className="h-80 bg-[#F4F3F1]">
      <div className="flex flex-col items-center space-y-6 px-4 pt-20">
        <span className="flex w-55 items-center gap-2 rounded-3xl bg-[#F6E5E4] px-3 py-2 font-semibold text-[#E85555]">
          <Sparkles />
          Festas Inesqueciveis
        </span>
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
