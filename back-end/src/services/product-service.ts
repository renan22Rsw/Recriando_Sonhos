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
        include: {
          includedItems: true,
        },
      });

      return products;
    }

    return db.product.findMany({
      include: {
        includedItems: true,
      },
    });
  }

  async getProductsById(id: string) {
    const product = await db.product.findUnique({
      where: {
        id,
      },

      include: {
        includedItems: true,
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
        includedItems: {
          create: data.includedItems.map((item, index) => ({
            text: item,
            order: index,
          })),
        },
      },
      include: {
        includedItems: true,
      },
    });

    return products;
  }

  async updateProduct(id: string, data: UpdateProductProps) {
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new Error("Produto nao encontrado");
    }

    const updatedProduct = await db.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          price: data.price,
          available: data.available,
          image: data.image,
        },
      });

      if (data.includedItems) {
        await tx.productIncludedItem.deleteMany({
          where: { productId: id },
        });

        await tx.productIncludedItem.createMany({
          data: data.includedItems.map((item, index) => ({
            productId: id,
            text: item,
            order: index,
          })),
        });
      }

      return product;
    });

    return updatedProduct;
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
