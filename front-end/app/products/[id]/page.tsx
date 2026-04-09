import { getProductsById } from "@/lib/api/get-products";
import { ProductIdPageContainer } from "./_components/product-id-page-container";
import { ProductsIdPageMain } from "./_components/products-id-page-main";

const ProdcutsPageId = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const product = await getProductsById(id);

  return (
    <ProductIdPageContainer>
      <ProductsIdPageMain
        id={id}
        title={product.title}
        description={product.description}
        image={product.image}
        price={product.price}
        available={product.available}
        includedItems={product.includedItems}
      />
    </ProductIdPageContainer>
  );
};

export default ProdcutsPageId;
