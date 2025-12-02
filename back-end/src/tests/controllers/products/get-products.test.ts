import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { ProductService } from "../../../services/product-service";
import { ProductController } from "../../../controllers/product-controller";
import { FastifyReply, FastifyRequest } from "fastify";
import { productMock } from "../../mocks/product-mocks";

vi.mock("../../../services/product-service");

describe("get products controller", () => {
  let productService: ProductService;
  let productController: ProductController;

  const mockRequest = {
    query: {
      search: "",
    },
  };

  const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
  };

  beforeEach(() => {
    productService = new ProductService();
    productController = new ProductController(productService);
    vi.clearAllMocks();
  });

  it("should return all products", async () => {
    productService.getAllProducts = vi.fn().mockResolvedValue(productMock);

    await productController.getAllProducts(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(mockReply.status).toBeCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith(productMock);
  });

  it("should return product by query search", async () => {
    mockRequest.query.search = "Product 1";

    productService.getAllProducts = vi.fn().mockResolvedValue(productMock);

    await productController.getAllProducts(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(productService.getAllProducts).toHaveBeenCalledWith("Product 1");
    expect(mockReply.status).toBeCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith(productMock);
  });

  it("should throw an error if status code of 400 ", async () => {
    productService.getAllProducts = vi
      .fn()
      .mockRejectedValue(new Error("Error"));

    await productController.getAllProducts(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(mockReply.status).toBeCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({ message: "Error" });
  });

  it("should throw an error if status code of 500 ", async () => {
    productService.getAllProducts = vi
      .fn()
      .mockRejectedValueOnce("Error interno do servidor");

    await productController.getAllProducts(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(mockReply.status).toBeCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Error interno do servidor",
    });
  });
});

describe("get product by id controller", () => {
  let productService: ProductService;
  let productController: ProductController;

  const mockRequest = {
    params: {
      id: "1",
    },
  };

  const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
  };

  beforeEach(() => {
    productService = new ProductService();
    productController = new ProductController(productService);
    vi.clearAllMocks();
  });

  it("should return product by id", async () => {
    productService.getProductsById = vi.fn().mockResolvedValue(productMock);

    await productController.getProductsById(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(productService.getProductsById).toHaveBeenCalledWith("1");
    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith(productMock);
  });

  it("should throw an error if product is not found", async () => {
    productService.getProductsById = vi.fn().mockResolvedValue(null);

    await productController.getProductsById(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(mockReply.status).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith("Produto nao encontrado");
  });

  it("should throw an error if status code of 400", async () => {
    productService.getProductsById = vi
      .fn()
      .mockRejectedValueOnce(new Error("Error"));

    await productController.getProductsById(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({ message: "Error" });
  });

  it("should throw an error if status code of 500", async () => {
    productService.getProductsById = vi
      .fn()
      .mockRejectedValueOnce("Error interno do servidor");

    await productController.getProductsById(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply
    );

    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Error interno do servidor",
    });
  });
});
