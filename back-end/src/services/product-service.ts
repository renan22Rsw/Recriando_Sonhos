import { db } from "../database";
import { CreateProductProps, UpdateProductProps } from "../types/product-types";

export class ProductService {
  async getAllProducts(search: string) {
    if (search) {
      const products = await db.product.findMany({
        where: {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
      });

      return products;
    }

    return db.product.findMany();
  }

  async getProductsById(id: string) {
    const product = await db.product.findUnique({
      where: {
        id,
      },
    });

    if (!product?.id) {
      throw new Error("Produto nao encontrado");
    }

    return product;
  }

  async createProduct(data: CreateProductProps) {
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
  }

  async updateProduct(id: string, data: UpdateProductProps) {
    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct?.id) {
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
  }

  async deleteProduct(id: string) {
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
  }
}
