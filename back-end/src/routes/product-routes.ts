import { FastifyInstance } from "fastify";
import { ProductsServices } from "../services/product-services";
import { ProductsController } from "../controllers/product-controllers";
import { adminMiddleware } from "../middleware/adim-middleware";

export const productRoutes = (app: FastifyInstance) => {
  const productsServices = new ProductsServices();
  const productsController = new ProductsController(productsServices);

  app.get("/products", async (request, reply) =>
    productsController.getAllProductsController(request, reply)
  );

  app.get("/products/:id", async (request, reply) =>
    productsController.getProductsByIdController(request, reply)
  );

  app.post(
    "/products",
    { preHandler: adminMiddleware },
    async (request, reply) =>
      productsController.createProductController(request, reply)
  );

  app.put(
    "/products/:id",
    { preHandler: adminMiddleware },
    async (request, reply) =>
      productsController.updateProductController(request, reply)
  );

  app.delete(
    "/products/:id",
    { preHandler: adminMiddleware },
    async (request, reply) =>
      productsController.deleteProductController(request, reply)
  );
};
