import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { ProductService } from "../../../services/product-service";
import { ProductController } from "../../../controllers/product-controller";
import { FastifyReply, FastifyRequest } from "fastify";
import { mockPartsIterator } from "../../mocks/parts-mock";
import { db } from "../../../database/index";
import { uploadProductImage } from "../../../utils/upload-product-image";
import { productMock } from "../../mocks/product-mocks";

vi.mock("../../../services/product-service");

vi.mock("../../../utils/upload-product-image", () => ({
  uploadProductImage: vi.fn(),
}));

vi.mock("../../../database/index", () => ({
  db: {
    product: {
      findUnique: vi.fn(),
    },
  },
}));

const mockRequest = {
  params: {
    id: "1",
  },
  parts: vi.fn().mockReturnValue(mockPartsIterator),
};

const mockReply = {
  status: vi.fn().mockReturnThis(),
  send: vi.fn(),
};

describe("update products controller", () => {
  let productService: ProductService;
  let productController: ProductController;

  beforeEach(() => {
    productService = new ProductService();
    productController = new ProductController(productService);
    vi.clearAllMocks();
  });

  it("should upload product datas", async () => {
    const imageUrl = "image-url 2";

    (uploadProductImage as Mock).mockImplementation(async (parts, formData) => {
      formData.title = "Product test 2";
      formData.description = "Description test";
      formData.price = 100;
      formData.available = true;
      formData.includedItems = JSON.stringify(["Item 1", "Item 2"]);
      return imageUrl;
    });

    (db.product.findUnique as Mock).mockResolvedValue(productMock);

    productService.updateProduct = vi.fn().mockResolvedValue(productMock);

    await productController.updateProduct(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply,
    );

    expect(uploadProductImage).toHaveBeenCalledWith(
      mockPartsIterator,
      expect.any(Object),
    );

    expect(db.product.findUnique).toHaveBeenCalledWith({
      where: {
        id: "1",
      },
    });

    expect(productService.updateProduct).toHaveBeenCalledWith("1", {
      title: "Product test 2",
      description: "Description test",
      price: 100,
      available: true,
      image: imageUrl && imageUrl.length > 0 ? imageUrl : productMock.image,
      includedItems: ["Item 1", "Item 2"],
    });

    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Produto atualizado com sucesso",
    });
  });

  it("should update product data keeping the old image when no new image is uploaded", async () => {
    (uploadProductImage as Mock).mockImplementation(async (parts, formData) => {
      formData.title = "Product test 2";
      formData.description = "Description test";
      formData.price = 100;
      formData.available = true;
      formData.includedItems = JSON.stringify(["Item 1", "Item 2"]);
      return null;
    });

    (db.product.findUnique as Mock).mockResolvedValue(productMock);

    productService.updateProduct = vi.fn().mockResolvedValue(productMock);

    await productController.updateProduct(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply,
    );

    expect(productService.updateProduct).toHaveBeenCalledWith("1", {
      title: "Product test 2",
      description: "Description test",
      price: 100,
      available: true,
      image: productMock.image,
      includedItems: ["Item 1", "Item 2"],
    });

    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Produto atualizado com sucesso",
    });
  });

  it("should not upload products if products items is invalid", async () => {
    (uploadProductImage as Mock).mockImplementation(async (parts, formData) => {
      formData.title = "Product test";
      formData.description = "Description test";
      formData.price = 100;
      formData.available = true;
      formData.includedItems = ["Invalid item"];
      return "image-url";
    });

    productService.updateProduct = vi
      .fn()
      .mockResolvedValue(uploadProductImage);

    await productController.updateProduct(
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

  it("should not update product datas if product is not found", async () => {
    (db.product.findUnique as Mock).mockResolvedValue(null);

    await productController.updateProduct(
      mockRequest as unknown as FastifyRequest,
      mockReply as unknown as FastifyReply,
    );

    expect(db.product.findUnique).toHaveBeenCalledWith({
      where: {
        id: "1",
      },
    });

    expect(mockReply.status).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Produto não encontrado",
    });
  });

  it("should throw an error if status code of 400", async () => {
    (uploadProductImage as Mock).mockImplementation(async (parts, formData) => {
      formData.title = "Product test 2";
      formData.description = "Description test";
      formData.price = 100;
      formData.available = true;
      return "image-url";
    });

    (db.product.findUnique as Mock).mockResolvedValue(productMock);

    productService.updateProduct = vi
      .fn()
      .mockRejectedValue(new Error("Error"));

    await productController.updateProduct(
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
    expect(productService.updateProduct).toHaveBeenCalled();
  });

  it("should throw an error if status code of 500", async () => {
    (uploadProductImage as Mock).mockRejectedValueOnce(
      "Error interno do servidor",
    );

    await productController.updateProduct(
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

    expect(productService.updateProduct).not.toHaveBeenCalled();
    expect(db.product.findUnique).not.toHaveBeenCalled();
    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(productService.updateProduct).not.toHaveBeenCalled();
  });
});
