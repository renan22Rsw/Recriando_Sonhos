import { Badge } from "@/components/ui/badge";

import UnicornParty from "@/public/unicorn-party.png";
import Image from "next/image";

import { DeleteProductButton } from "./delete-product-button";
import { EditProductButton } from "./edit-product-button";

export const AdminProductsPageMain = () => {
  return (
    <section className="my-8 rounded-2xl bg-white shadow-2xl">
      <div className="gap-4 md:flex">
        <div className="flex h-40 items-center">
          <Image
            src={UnicornParty}
            alt="unicorn-party"
            className="h-full w-full"
          />
        </div>

        <div className="flex w-full flex-col justify-center space-y-2 px-2 py-4">
          <div className="flex w-full items-center justify-between gap-2">
            <h6 className="text-xl font-bold">
              Decoracao Festa Infantil - Tema Unicornio{" "}
              <Badge className="bg-green-200 font-bold text-green-700">
                Disponivel
              </Badge>
            </h6>

            <div className="flex items-center gap-2 px-4">
              <EditProductButton />

              <DeleteProductButton />
            </div>
          </div>
          <span className="text-foreground/60 text-lg">
            Decoracao completa para festa infantil com tema unicornio
          </span>
          <span className="text-2xl font-bold text-[#E64343]">R$ 1.000,00</span>
        </div>
      </div>
    </section>
  );
};
