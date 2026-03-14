import { getProducts } from "@/lib/api/get-products";
import { ProductsHeader } from "./components/products-header";
import { ProductsMain } from "./components/products-main";
import { Products } from "@/types/products";

const ProductsPage = async () => {
  const products: Products[] = await getProducts("");

  return (
    <>
      <ProductsHeader />
      <ProductsMain products={products} />
    </>
  );
};

export default ProductsPage;
