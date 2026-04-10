"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InputSearch } from "@/components/input-search";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/get-products";
import { ProductsSkeleton } from "./products-skeleton";
import { Products } from "@/types/products";

export const ProductsMain = ({ products }: { products: Products[] }) => {
  const searchQuery = useSearchParams().get("search");
  const [search, setSearch] = useState<string>((searchQuery as string) || "");

  const router = useRouter();
  const pathname = usePathname();

  const { data: filteredProducts, isLoading } = useQuery<Products[]>({
    queryKey: ["products", search],
    queryFn: () => getProducts(search),
    enabled: search.length > 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length > 0) {
        router.replace(`/products?search=${search}`);
      } else {
        router.replace(pathname);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, router, pathname]);

  return (
    <main className="bg-white px-4 xl:px-32 2xl:px-44">
      <div className="py-10">
        <InputSearch search={search} setSearch={setSearch} />
      </div>

      {isLoading && <ProductsSkeleton />}

      {search.length > 0 ? (
        <>
          {filteredProducts?.length === 0 ? (
            <div>
              <h1 className="text-3xl font-bold">Nenhum produto encontrado</h1>
            </div>
          ) : (
            <div className="grid gap-8 pb-10 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts?.map((fieltedProduct) => (
                <div
                  key={fieltedProduct.id}
                  className="group h-full rounded-2xl border-2 bg-white shadow-2xl xl:w-120"
                >
                  <div className="relative aspect-4/4 w-full max-w-120 overflow-hidden rounded-2xl">
                    <Link href={`/products/${fieltedProduct.id}`}>
                      <Image
                        src={fieltedProduct.image}
                        alt="Decoracao Festa Infantil - Tema Unicornio"
                        fill
                        className="object-cover py-4 transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-2xl"
                      />
                    </Link>

                    <Link href={`/products/${fieltedProduct.id}`}>
                      <Button
                        className={`absolute bottom-8 left-10 w-100 translate-y-2 cursor-pointer bg-[#E64343] font-semibold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#E64343]/80`}
                      >
                        Ver Detalhes
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-4 p-4">
                    <h1 className="text-foreground font-bold lg:text-xl">
                      {fieltedProduct.title}
                    </h1>
                    <p className="text-foreground/60 lg:text-md">
                      {fieltedProduct.description}
                    </p>
                    <div className="flex flex-col py-4">
                      <span className="text-foreground/60 text-xs">
                        A parti de
                      </span>
                      <span className="text-xl font-bold text-[#E64343]">
                        R$ {fieltedProduct.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="grid gap-8 pb-10 md:grid-cols-2 xl:grid-cols-3">
          {products?.map((product) => (
            <div
              key={product.id}
              className="group h-full rounded-2xl border-2 bg-white shadow-2xl xl:w-120"
            >
              <div className="relative aspect-4/4 w-full max-w-120 overflow-hidden rounded-2xl">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image}
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

              <div className="space-y-4 p-4">
                <h1 className="text-foreground font-bold lg:text-xl">
                  {product.title}
                </h1>
                <p className="text-foreground/60 lg:text-md">
                  {product.description}
                </p>

                <div className="flex flex-col py-4">
                  <span className="text-foreground/60 text-xs">A parti de</span>
                  <span className="text-xl font-bold text-[#E64343]">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
