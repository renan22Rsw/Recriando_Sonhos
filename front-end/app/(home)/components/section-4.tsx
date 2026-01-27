import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Section4 = () => {
  return (
    <section className="relative bg-[#E64343]">
      <div className="py-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
          <div className="border-primary-foreground absolute top-10 left-10 h-40 w-40 rounded-full border-2"></div>
          <div className="border-primary-foreground absolute right-10 bottom-10 h-60 w-60 rounded-full border-2"></div>
          <div className="border-primary-foreground absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"></div>
        </div>
        <div className="space-y-4 px-6 text-center">
          <h3 className="text-3xl font-bold text-white lg:text-5xl">
            Pronto Para Realizar Seus Sonhos?
          </h3>
          <p className="text-primary-foreground/80 mx-auto max-w-200 text-xl md:text-2xl">
            Entre em contato conosco e descubra como podemos tornar seu evento
            extraordinario e inesquecivel
          </p>
          <Link href="/products">
            <Button
              variant={"outline"}
              className="text-foreground h-12 w-65 cursor-pointer rounded-3xl text-lg font-semibold md:w-70"
            >
              Ver Catalago Completo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
