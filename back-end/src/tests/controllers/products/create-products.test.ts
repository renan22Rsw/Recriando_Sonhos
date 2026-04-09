import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { ProductService } from "../../../services/product-service";
import { ProductController } from "../../../controllers/product-controller";
import { FastifyReply, FastifyRequest } from "fastify";
import { uploadProductImage } from "../../../utils/upload-product-image";
import { createProductMock } from "../../mocks/product-mocks";
import { mockPartsIterator } from "../../mocks/parts-mock";

vi.mock("../../../services/product-service");

vi.mock("../../../utils/upload-product-image", () => ({
  uploadProductImage: vi.fn(),
}));

const mockRequest = {
  parts: vi.fn().mockReturnValue(mockPartsIterator),
};

const mockReply = {
  status: vi.fn().mockReturnThis(),
  send: vi.fn(),
};

describe("create products controller", () => {
  let productService: ProductService;
  let productController: ProductController;

  beforeEach(() => {
    productService = new ProductService();
    productController = new ProductController(productService);
    vi.clearAllMocks();
  });

  it("should create a product", async () => {
    (uploadProductImage as Mock).mockImplementation(async (parts, formData) => {
      formData.title = "Product test";
      formData.description = "Description test";
      formData.price = 100;
      formData.available = true;
      formData.includedItems = JSON.stringify(["Item 1", "Item 2"]);
      return "image-url";
    });

    productService.createProduct = vi.fn().mockResolvedValue(createProductMock);

    await productController.createProduct(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply,
    );

    expect(uploadProductImage).toHaveBeenCalledWith(
      mockPartsIterator,
      expect.any(Object),
    );

    expect(productService.createProduct).toHaveBeenCalledWith({
      title: "Product test",
      description: "Description test",
      price: 100,
      available: true,
      image: "image-url",
      includedItems: ["Item 1", "Item 2"],
    });

    expect(mockReply.status).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith(createProductMock);
  });

  it("should not create a product if product image is not sent", async () => {
    (uploadProductImage as Mock).mockImplementation(async (parts, formData) => {
      formData.title = "Product test";
      formData.description = "Description test";
      formData.price = 100;
      formData.available = true;
      formData.includedItems = JSON.stringify(["Item 1", "Item 2"]);
      return null;
    });

    productService.createProduct = vi.fn().mockResolvedValue(createProductMock);

    await productController.createProduct(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply,
    );

    expect(uploadProductImage).toHaveBeenCalledWith(
      mockPartsIterator,
      expect.any(Object),
    );

    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Nenhuma imagem foi enviada",
    });
    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(productService.createProduct).not.toHaveBeenCalled();
  });

  it("should not create a product if product items is invalid", async () => {
    (uploadProductImage as Mock).mockImplementation(async (parts, formData) => {
      formData.title = "Product test";
      formData.description = "Description test";
      formData.price = 100;
      formData.available = true;
      formData.includedItems = ["Invalid item"];
      return "image-url";
    });

    productService.createProduct = vi.fn().mockResolvedValue(createProductMock);

    await productController.createProduct(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply,
    );

    expect(uploadProductImage).toHaveBeenCalledWith(
      mockPartsIterator,
      expect.any(Object),
    );

    expect(mockReply.send).toHaveBeenCalledWith({
      message: "items do produto inválido",
    });
    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(productService.createProduct).not.toHaveBeenCalled();
  });

  it("should throw an error if status code of 400", async () => {
    (uploadProductImage as Mock).mockImplementation(async (parts, formData) => {
      formData.title = "Product test";
      formData.description = "Description test";
      formData.price = 100;
      formData.available = true;
      formData.includedItems = JSON.stringify(["Item 1", "Item 2"]);
      return "image-url";
    });

    productService.createProduct = vi
      .fn()
      .mockRejectedValue(new Error("Error"));

    await productController.createProduct(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply,
    );

    expect(uploadProductImage).toHaveBeenCalledWith(
      mockPartsIterator,
      expect.any(Object),
    );

    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Error",
    });
    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(productService.createProduct).toHaveBeenCalled();
  });

  it("should throw an error if status code of 500", async () => {
    (uploadProductImage as Mock).mockRejectedValueOnce(
      "Error interno do servidor",
    );

    await productController.createProduct(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply,
    );

    expect(uploadProductImage).toHaveBeenCalledWith(
      mockPartsIterator,
      expect.any(Object),
    );

    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Error interno do servidor",
    });
    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(productService.createProduct).not.toHaveBeenCalled();
  });
});
