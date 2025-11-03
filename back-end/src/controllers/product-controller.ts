import { FastifyReply, FastifyRequest } from "fastify";
import { ProductService } from "../services/product-service";
import { productSchema, updateProductSchema } from "../schemas/products";
import { uploadProductImage } from "../utils/upload-product-image";
import { db } from "../database";

export class ProductController {
  constructor(private productService: ProductService) {}

  async getAllProducts(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { search } = request.query as { search: string };
      const products = await this.productService.getAllProducts(search);

      return reply.status(200).send(products);
    } catch (err) {
      if (err instanceof Error) {
        return reply.status(400).send({ message: err.message });
      }
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  async getProductsById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const product = await this.productService.getProductsById(id);

      if (!product?.id) {
        return reply.status(404).send("Produto nao encontrado");
      }

      return reply.status(200).send(product);
    } catch (err) {
      if (err instanceof Error) {
        return reply.status(400).send({ message: err.message });
      }
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  async createProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const parts = request.parts();
      const formData: Record<string, any> = {};

      const productImageUrl = await uploadProductImage(parts, formData);

      if (!productImageUrl) {
        return reply.status(400).send("Nenhuma imagem foi enviada");
      }

      const { title, description, price, available } =
        productSchema.parse(formData);

      const product = await this.productService.createProduct({
        title,
        description,
        image: productImageUrl as string,
        price,
        available,
      });

      return reply.status(201).send(product);
    } catch (err) {
      if (err instanceof Error) {
        return reply.status(400).send({ message: err.message });
      }
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  async updateProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const formData: Record<string, any> = {};

      const parts = request.parts();
      const productImageUrl = await uploadProductImage(parts, formData);

      const oldProductImage = await db.product.findUnique({
        where: {
          id,
        },
      });

      if (!oldProductImage) {
        return reply.status(404).send("Produto nao encontrado");
      }

      const { title, description, price, available } =
        updateProductSchema.parse(formData);

      await this.productService.updateProduct(id, {
        title,
        description,
        image:
          productImageUrl && productImageUrl.length > 0
            ? productImageUrl
            : oldProductImage?.image,
        price,
        available,
      });

      return reply
        .status(200)
        .send({ message: "Produto atualizado com sucesso" });
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  async deleteProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };

      await this.productService.deleteProduct(id);

      return reply
        .status(200)
        .send({ message: "Produto deletado com sucesso" });
    } catch (err) {
      if (err instanceof Error) {
        return reply.status(400).send({ message: err.message });
      }
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  }
}
