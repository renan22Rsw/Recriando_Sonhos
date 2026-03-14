import { Products } from "@/types/products";

export const getProducts = async (search?: string): Promise<Products[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?search=${search}`,
    );

    const data: Products[] = await response.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw Error(err.message);
    }

    throw Error("Algo deu errado, tente novamente.");
  }
};

export const getProductsById = async (id: string): Promise<Products> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`,
    );

    const data: Products = await response.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw Error(err.message);
    }
    throw Error("Algo deu errado, tente novamente.");
  }
};
