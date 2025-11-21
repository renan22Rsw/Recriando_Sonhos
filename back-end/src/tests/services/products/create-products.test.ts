import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { ProductService } from "../../../services/product-service";
import { db } from "../../../database/index";

import { createProductMock } from "../../mocks/product-mocks";

vi.mock("../../../database/index", () => ({
  db: {
    product: {
      create: vi.fn(),
    },
  },
}));

describe("create product", () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
    vi.clearAllMocks();
  });

  it("should create a product", async () => {
    (db.product.create as Mock).mockResolvedValue(createProductMock);

    const product = await productService.createProduct(createProductMock);

    expect(product).toEqual(createProductMock);
    expect(db.product.create).toHaveBeenCalledWith({
      data: {
        ...createProductMock,
      },
    });
  });

  it("should throw an error if database fails", async () => {
    (db.product.create as Mock).mockRejectedValue(new Error("Database error"));

    await expect(
      productService.createProduct(createProductMock)
    ).rejects.toThrowError("Database error");
  });
});
