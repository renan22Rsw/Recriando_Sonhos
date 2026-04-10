"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { DeleteProductButton } from "./delete-product-button";
import { EditProductButton } from "./edit-product-button";
import { Products } from "@/types/products";
import { getProducts } from "@/lib/api/get-products";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdminProductsPageMainProps {
  products: Products[];
}

export const AdminProductsPageMain = ({
  products,
}: AdminProductsPageMainProps) => {
  const isMobile = useIsMobile();

  const search = useSearchParams().get("search") ?? "";

  const { data: filteredProducts, isLoading } = useQuery<Products[]>({
    queryKey: ["products", search],
    queryFn: () => getProducts(search),
    enabled: search.length > 0,
  });

  const productsToShow = search ? (filteredProducts ?? []) : products;

  if (isLoading) return <p>Carregando...</p>;

  return (
    <>
      {productsToShow.map(
        ({
          id,
          title,
          description,
          available,
          image,
          price,
          includedItems,
        }) => (
          <section className="my-8 rounded-2xl bg-white shadow-2xl" key={id}>
            <div className="gap-4 md:flex">
              {isMobile ? (
                <div className="relative aspect-4/4 w-full max-w-120 overflow-hidden rounded-2xl">
                  <Image
                    src={image}
                    alt="Product image"
                    fill
                    className="object-cover py-4"
                  />
                </div>
              ) : (
                <>
                  <Image
                    src={image}
                    alt="Product image"
                    width={150}
                    height={150}
                  />
                </>
              )}

              <div className="flex w-full flex-col justify-center space-y-2 px-2 py-4">
                <div className="flex w-full items-center justify-between gap-2">
                  <h6 className="text-xl font-bold">
                    {title}

                    <span className="ml-2">
                      {available ? (
                        <Badge className="bg-green-200 font-bold text-green-700">
                          Disponivel
                        </Badge>
                      ) : (
                        <Badge className="bg-red-200 font-bold text-red-700">
                          Indisponivel
                        </Badge>
                      )}
                    </span>
                  </h6>

                  <div className="flex items-center gap-2 px-4">
                    <EditProductButton
                      id={id}
                      title={title}
                      description={description}
                      price={price}
                      available={available}
                      includedItems={includedItems}
                    />

                    <DeleteProductButton id={id} />
                  </div>
                </div>
                <span className="text-foreground/60 xl:text-lg">
                  {description}
                </span>
                <span className="text-2xl font-bold text-[#E64343]">
                  R$ {price.toFixed(2)}
                </span>
              </div>
            </div>
          </section>
        ),
      )}
    </>
  );
};
