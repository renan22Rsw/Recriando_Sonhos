import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { ProductService } from "../../../services/product-service";
import { db } from "../../../database/index";

import { productMock } from "../../mocks/product-mocks";

vi.mock("../../../database/index", () => ({
  db: {
    product: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));
describe("get all products", () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
    vi.clearAllMocks();
  });

  it("should return all prodcuts", async () => {
    (db.product.findMany as Mock).mockResolvedValue(productMock);
    const products = await productService.getAllProducts("");
    expect(products).toEqual(productMock);
  });

  it("should return a product by its title", async () => {
    (db.product.findMany as Mock).mockResolvedValue(productMock);
    const products = await productService.getAllProducts("Product 1");
    expect(products).toEqual(productMock);
  });

  it("should throw an error if no products are found", async () => {
    (db.product.findMany as Mock).mockResolvedValue([]);

    await expect(
      productService.getAllProducts("Product 2")
    ).rejects.toThrowError("Produto nao encontrado");
  });

  it("should throw an error if database fails", async () => {
    (db.product.findMany as Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(productService.getAllProducts("")).rejects.toThrowError(
      "Database error"
    );
  });
});

describe("get products by id", () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
    vi.clearAllMocks();
  });

  it("should return a product by its id", async () => {
    (db.product.findUnique as Mock).mockResolvedValue(productMock);

    const prodcut = await productService.getProductsById(productMock.id);

    expect(prodcut).toEqual(productMock);
    expect(prodcut).toHaveProperty("id", productMock.id);
  });

  it("should throw an error if no product is found", async () => {
    (db.product.findUnique as Mock).mockResolvedValue(null);

    await expect(
      productService.getProductsById(productMock.id)
    ).rejects.toThrowError("Produto nao encontrado");
  });

  it("should throw an error if database fails", async () => {
    (db.product.findUnique as Mock).mockRejectedValue(
      new Error("Database error")
    );

    await expect(
      productService.getProductsById(productMock.id)
    ).rejects.toThrowError("Database error");
  });
});
