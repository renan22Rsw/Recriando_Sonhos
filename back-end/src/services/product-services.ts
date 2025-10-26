import { db } from "../database";
import { CreateProductProps, UpdateProductProps } from "../types/product-types";

export class ProductsServices {
  async getAllProductsService(search: string) {
    try {
      if (search) {
        const products = await db.product.findMany({
          where: {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
        });

        if (products.length === 0) {
          throw new Error("Produto nao encontrado");
        }

        return products;
      }

      const products = await db.product.findMany();
      return products;
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }

      throw new Error("Erro ao buscar produtos");
    }
  }

  async getProductsById(id: string) {
    try {
      const product = await db.product.findUnique({
        where: {
          id,
        },
      });

      if (product?.id) {
        throw new Error("Produto nao encontrado");
      }

      return product;
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }

      throw new Error("Erro ao buscar produto");
    }
  }

  async createProductService(data: CreateProductProps) {
    try {
      const { title, description, price, image, available } = data;

      const products = await db.product.create({
        data: {
          title,
          description,
          image,
          price,
          available,
        },
      });

      return products;
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }

      throw new Error("Erro ao criar produto");
    }
  }

  async updateProductService(id: string, data: UpdateProductProps) {
    try {
      const product = await db.product.findUnique({
        where: {
          id,
        },
      });

      if (!product?.id) {
        throw new Error("Produto nao encontrado");
      }

      const uploadProduct = await db.product.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      });

      return uploadProduct;
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }

      throw new Error("Erro ao atualizar produto");
    }
  }

  async deleteProductService(id: string) {
    try {
      const product = await db.product.findUnique({
        where: {
          id,
        },
      });

      if (!product) {
        throw Error("Produto nao encontrado");
      }

      await db.product.delete({
        where: {
          id,
        },
      });

      return { message: "Produto deletado com sucesso" };
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }

      throw new Error("Erro ao deletar produto");
    }
  }
}
