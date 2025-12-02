import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { ProductService } from "../../../services/product-service";
import { ProductController } from "../../../controllers/product-controller";
import { FastifyReply, FastifyRequest } from "fastify";

const mockRequest = {
  params: {
    id: "1",
  },
};

const mockReply = {
  status: vi.fn().mockReturnThis(),
  send: vi.fn(),
};

describe("delete product controller", () => {
  let productService: ProductService;
  let productController: ProductController;

  beforeEach(() => {
    productService = new ProductService();
    productController = new ProductController(productService);
    vi.clearAllMocks();
  });

  it("should delete a product", async () => {
    productService.deleteProduct = vi.fn().mockResolvedValue({
      message: "Produto deletado com sucesso",
    });

    await productController.deleteProduct(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(productService.deleteProduct).toHaveBeenCalledWith("1");
    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Produto deletado com sucesso",
    });
  });

  it("should throw an error if status code of 400", async () => {
    productService.deleteProduct = vi
      .fn()
      .mockRejectedValue(new Error("Error"));

    await productController.deleteProduct(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(productService.deleteProduct).toHaveBeenCalledWith("1");
    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Error",
    });
  });

  it("should throw an error if status code of 500", async () => {
    productService.deleteProduct = vi
      .fn()
      .mockRejectedValueOnce("Error interno do servidor");

    await productController.deleteProduct(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(productService.deleteProduct).toHaveBeenCalledWith("1");
    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Error interno do servidor",
    });
  });
});
