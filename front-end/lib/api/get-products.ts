export const getProducts = async (search?: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?search=${search}`,
    );

    const data = await response.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw Error(err.message);
    }

    throw Error("Algo deu errado, tente novamente.");
  }
};
