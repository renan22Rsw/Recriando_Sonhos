import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { ProductService } from "../../../services/product-service";
import { db } from "../../../database/index";

import { productMock, updateProductMock } from "../../mocks/product-mocks";

vi.mock("../../../database/index", () => ({
  db: {
    product: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe("update product", () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
    vi.clearAllMocks();
  });

  it("should update a product", async () => {
    (db.product.findUnique as Mock).mockResolvedValue(productMock);
    (db.product.update as Mock).mockResolvedValue(updateProductMock);

    const product = await productService.updateProduct(
      productMock.id,
      updateProductMock
    );

    expect(product).toEqual(updateProductMock);
    expect(db.product.update).toHaveBeenCalledWith({
      where: {
        id: productMock.id,
      },

      data: {
        ...updateProductMock,
      },
    });
  });

  it("should not update a product if product does not exist", async () => {
    (db.product.findUnique as Mock).mockResolvedValue(null);

    await expect(
      productService.updateProduct(productMock.id, updateProductMock)
    ).rejects.toThrowError("Produto nao encontrado");

    expect(db.product.update).not.toHaveBeenCalled();
  });

  it("should throw an error if database fails", async () => {
    (db.product.findUnique as Mock).mockRejectedValue(
      new Error("Database error")
    );

    (db.product.update as Mock).mockRejectedValue(new Error("Database error"));

    await expect(
      productService.updateProduct(productMock.id, updateProductMock)
    ).rejects.toThrowError("Database error");
  });
});
