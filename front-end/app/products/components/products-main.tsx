"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import UnicornParty from "@/public/unicorn-party.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { products } from "../products";

export const ProductsMain = () => {
  return (
    <main className="bg-white px-4 xl:px-32 2xl:px-44">
      <div className="relative py-10">
        <Search
          className="absolute top-1/2 left-2 -translate-y-1/2"
          size={16}
        />
        <Input
          placeholder="Buscar Produtos"
          className="h-11 w-full rounded-2xl px-8 selection:bg-[#E64343] selection:text-white placeholder:font-semibold focus-visible:ring-[#E64343] focus-visible:ring-offset-0 md:w-100"
        />
      </div>

      <div className="grid gap-8 pb-10 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="group h-full rounded-2xl border-2 bg-white shadow-2xl xl:w-120"
          >
            <div className="relative aspect-4/4 w-full max-w-120 overflow-hidden rounded-2xl">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={UnicornParty}
                  alt="Decoracao Festa Infantil - Tema Unicornio"
                  fill
                  className="object-cover py-4 transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-2xl"
                />
              </Link>

              <Link href={`/products/${product.id}`}>
                <Button
                  className={`absolute bottom-8 left-10 w-100 translate-y-2 cursor-pointer bg-[#E64343] font-semibold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#E64343]/80`}
                >
                  Ver Detalhes
                </Button>
              </Link>
            </div>

            <div className="p-4">
              <h1 className="text-foreground font-bold lg:text-xl">
                Decoracao Festa Infantil - Tema Unicornio
              </h1>
              <p className="text-foreground/60 md:text-md text-sm">
                Decoracao completa para festa infantil com tema unicornio.
                Inclui painel, baloes e mais.
              </p>
              <div className="flex flex-col py-4">
                <span className="text-foreground/60 text-xs">A parti de</span>
                <span className="text-xl font-bold text-[#E64343]">
                  R$ 99,99
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
