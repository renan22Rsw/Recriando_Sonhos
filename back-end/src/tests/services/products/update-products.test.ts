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

    $transaction: vi.fn(),
  },
}));

describe("update product", () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
    vi.clearAllMocks();
  });

  it("should update a product", async () => {
    const txMock = {
      product: {
        update: vi.fn().mockResolvedValue(productMock),
      },
      productIncludedItem: {
        deleteMany: vi.fn().mockResolvedValue({}),
        createMany: vi.fn().mockResolvedValue({}),
      },
    };

    (db.product.findUnique as Mock).mockResolvedValue(productMock);
    (db.$transaction as Mock).mockImplementation(async (callback) => {
      return callback(txMock);
    });

    const result = await productService.updateProduct(
      productMock.id,
      updateProductMock,
    );

    expect(txMock.product.update).toHaveBeenCalledWith({
      where: { id: productMock.id },
      data: {
        title: updateProductMock.title,
        description: updateProductMock.description,
        price: updateProductMock.price,
        available: updateProductMock.available,
        image: updateProductMock.image,
      },
    });

    expect(txMock.productIncludedItem.deleteMany).toHaveBeenCalledWith({
      where: { productId: productMock.id },
    });

    expect(txMock.productIncludedItem.createMany).toHaveBeenCalledWith({
      data: updateProductMock.includedItems.map((item, index) => ({
        productId: productMock.id,
        text: item,
        order: index,
      })),
    });

    expect(result).toEqual(productMock);
  });

  it("should not update a product if product does not exist", async () => {
    (db.product.findUnique as Mock).mockResolvedValue(null);

    await expect(
      productService.updateProduct(productMock.id, updateProductMock),
    ).rejects.toThrowError("Produto nao encontrado");

    expect(db.product.update).not.toHaveBeenCalled();
  });

  it("should throw an error if database fails", async () => {
    (db.product.findUnique as Mock).mockResolvedValue(productMock);

    const txMock = {
      product: {
        update: vi.fn().mockRejectedValue(new Error("Database error")),
      },
      productIncludedItem: {
        deleteMany: vi.fn(),
        createMany: vi.fn(),
      },
    };

    (db.$transaction as Mock).mockImplementation(async (cb) => cb(txMock));

    await expect(
      productService.updateProduct(productMock.id, updateProductMock),
    ).rejects.toThrowError("Database error");
  });
});
