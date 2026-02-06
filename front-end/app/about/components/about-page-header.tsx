import { Heart } from "lucide-react";

export const AboutPageHeader = () => {
  {
    /* All the text gonna be replaced, it's just a model*/
  }

  return (
    <header className="h-145 bg-[#F4F3F1] px-4 lg:h-120">
      <div className="flex flex-col items-center space-y-4 pt-20">
        <span className="flex items-center gap-2 rounded-3xl bg-[#F6E5E4] px-3 py-2 font-semibold text-[#E85555]">
          <Heart size={16} />
          Nossa Historia
        </span>
        <h1 className="max-w-160 text-center text-3xl font-bold lg:text-5xl 2xl:text-6xl">
          Transformando <span className="text-[#E85555]">Sonhos</span> em
          Realidade
        </h1>
        <p className="text-foreground/60 max-w-190 text-center text-xl md:text-2xl">
          Ha mais de 8 anos, a Recriando Sonhos tem o privilegio de fazer parte
          dos momentos mais especiais de nossos clientes, criando decoracoes que
          encantam e emocionam.
        </p>
      </div>
    </header>
  );
};
