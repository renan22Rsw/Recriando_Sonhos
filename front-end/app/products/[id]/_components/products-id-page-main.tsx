import { ArrowLeft, Star, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Products } from "@/types/products";

export const ProductsIdPageMain = ({
  id,
  title,
  description,
  image,
  price,
  available,
}: Products) => {
  return (
    <div className="space-y-8 px-4">
      <div className="flex items-center space-x-2">
        <ArrowLeft size={16} color="gray" />
        <Link href={"/products"}>
          <span className="text-foreground/60 font-semibold">
            Voltar ao Catalogo
          </span>
        </Link>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="bg-muted relative aspect-square overflow-hidden rounded-3xl">
          <Image
            src={image}
            alt="unicorn-party"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <span className="w-80 rounded-2xl bg-[#F6E5E4] px-3 py-1 font-semibold text-[#E85555]">
            {available
              ? "Disponivel para agendamento"
              : "Indisponivel para agendamento"}
          </span>
          <h2 className="py-4 text-3xl font-semibold lg:text-4xl">{title}</h2>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="fill-amber-300 text-black" />
            ))}
            <span className="font-semibold">5.0 </span>
          </div>
          <p className="text-foreground/60 font-semibold lg:text-lg">
            {description}
          </p>

          <p className="text-foreground/60 text-sm">
            A parti de{" "}
            <span className="text-4xl font-bold text-[#E64343]">
              R$ {price + ",00"}
            </span>
          </p>

          {/*A new component will be put here */}

          <div className="flex items-center space-x-8 py-8">
            <div className="flex gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Clock size={20} />
              </div>
              <div>
                <h5 className="text-sm font-bold">Montagem</h5>
                <span className="text-foreground/60 text-sm">
                  2-3 horas antes
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Calendar size={20} />
              </div>
              <div>
                <h5 className="text-sm font-bold">Antecedencia</h5>
                <span className="text-foreground/60 text-sm">
                  15 dias minimo
                </span>
              </div>
            </div>
          </div>

          <Link href={`/appointment/${id}`}>
            <Button className="w-full cursor-pointer bg-[#E64343] py-6 text-lg font-bold hover:bg-[#E85555]/90">
              Agendar Agora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
