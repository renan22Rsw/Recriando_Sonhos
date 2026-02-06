import { Button } from "@/components/ui/button";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

export const AboutPageSection4 = () => {
  return (
    <section className="px-4 py-24">
      <div className="relative mx-auto max-w-400 rounded-2xl bg-[#E64343] py-20 text-center lg:text-start">
        <div className="bg-primary-foreground/10 absolute top-10 left-10 h-20 w-20 rounded-full" />
        <div className="bg-primary-foreground/5 absolute right-10 bottom-10 h-32 w-32 rounded-full" />
        <div className="flex flex-col items-center space-y-6 px-4">
          <h4 className="text-primary-foreground text-3xl font-bold md:text-4xl">
            Pronto para Realizar seu Sonho?
          </h4>
          <p className="text-primary-foreground/60 font-semibold">
            Entre em contato conosco e vamos juntos criar uma celebracao
            inesquecivel.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Link href={"/#"}>
              <Button
                variant={"outline"}
                className="w-40 cursor-pointer rounded-3xl"
              >
                Fale Conosco
                <ArrowRight className="ml-2" />
              </Button>
            </Link>

            <Link href={"/products"}>
              <Button
                variant={"ghost"}
                className="text-primary-foreground/80 hover:bg-primary-foreground/10 w-40 cursor-pointer rounded-3xl border-2 font-semibold"
              >
                Ver Produtos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
