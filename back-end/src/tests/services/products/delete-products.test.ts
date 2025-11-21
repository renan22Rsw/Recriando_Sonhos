import { beforeEach, vi, describe, it, expect, Mock } from "vitest";
import { ProductService } from "../../../services/product-service";
import { db } from "../../../database/index";

import { productMock } from "../../mocks/product-mocks";

vi.mock("../../../database/index", () => ({
  db: {
    product: {
      findUnique: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe("delete product", () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
    vi.clearAllMocks();
  });

  it("should delete a product", async () => {
    (db.product.findUnique as Mock).mockResolvedValue(productMock);
    (db.product.delete as Mock).mockResolvedValue(productMock);

    const product = await productService.deleteProduct(productMock.id);
    expect(product).toEqual({ message: "Produto deletado com sucesso" });
  });

  it("should not delete a product if product does not exist", async () => {
    (db.product.findUnique as Mock).mockResolvedValue(null);

    await expect(
      productService.deleteProduct(productMock.id)
    ).rejects.toThrowError("Produto nao encontrado");

    expect(db.product.delete).not.toHaveBeenCalled();
  });

  it("should throw an error if database fails", async () => {
    (db.product.findUnique as Mock).mockRejectedValue(
      new Error("Database error")
    );

    (db.product.delete as Mock).mockRejectedValue(new Error("Database error"));

    await expect(
      productService.deleteProduct(productMock.id)
    ).rejects.toThrowError("Database error");
  });
});
