import { FastifyInstance } from "fastify";
import { ProductService } from "../services/product-service";
import { ProductController } from "../controllers/product-controller";
import { adminMiddleware } from "../middleware/admin-middleware";

export const productRoutes = (app: FastifyInstance) => {
  const productService = new ProductService();
  const productsController = new ProductController(productService);

  app.get("/products", async (request, reply) =>
    productsController.getAllProducts(request, reply)
  );

  app.get("/products/:id", async (request, reply) =>
    productsController.getProductsById(request, reply)
  );

  app.post(
    "/products",
    { preHandler: adminMiddleware },
    async (request, reply) => productsController.createProduct(request, reply)
  );

  app.put(
    "/products/:id",
    { preHandler: adminMiddleware },
    async (request, reply) => productsController.updateProduct(request, reply)
  );

  app.delete(
    "/products/:id",
    { preHandler: adminMiddleware },
    async (request, reply) => productsController.deleteProduct(request, reply)
  );
};
