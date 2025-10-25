import { FastifyRequest } from "fastify";
import { uploadProductImageStream } from "./upload-product-image-stream";

export const uploadProductImage = async (
  parts: ReturnType<FastifyRequest["parts"]>,
  formData: Record<string, any>
) => {
  let productImageUrl = "";

  try {
    for await (const part of parts) {
      if (part.type === "file") {
        const fileName = `${Date.now()}-${part.filename}`;
        const chunks: Buffer[] = [];

        for await (const chunk of part.file) {
          chunks.push(chunk);
        }

        const buffer = Buffer.concat(chunks);
        const result = await uploadProductImageStream(buffer, fileName);
        productImageUrl = result.secure_url;
      } else {
        formData[part.fieldname] = part.value;
      }
    }
    return productImageUrl;
  } catch (err) {
    if (err instanceof Error) {
      throw Error(err.message);
    }
    throw new Error("Erro ao processar a imagem do produto");
  }
};
