"use client";

import { InputSearch } from "@/components/input-search";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProductForm as NewProductButton } from "./product-form";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const AdminProductsPageHeader = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length > 0) {
        router.replace(`/admin/products?search=${search}`);
      } else {
        router.replace(pathname);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, router, pathname]);

  return (
    <header className="mx-auto max-w-400 sm:py-8">
      <div className="items-center justify-between md:flex">
        <div className="py-2">
          <div className="flex items-center gap-2">
            <ArrowLeft size={16} color="gray" />
            <Link
              href={"/admin/dashboard"}
              className="text-foreground/60 font-semibold"
            >
              Voltar para o Dashboard
            </Link>
          </div>
          <div className="py-4">
            <h3 className="text-3xl font-bold">Gerenciar Produtos</h3>
            <span className="text-foreground/60 text-lg">
              Adicione, edite ou remova produtos do catalogo
            </span>
          </div>
        </div>
        <NewProductButton />
      </div>
      <InputSearch search={search} setSearch={setSearch} />
    </header>
  );
};
