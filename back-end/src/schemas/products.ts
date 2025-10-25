import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 characters"),
  description: z
    .string()
    .min(10, "A descrição do produto deve ter pelo menos 10 characters"),
  price: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().positive("O preço deve ser maior que zero")
  ),
  available: z.preprocess((val) => val === "true" || val === true, z.boolean()),
});

export const updateProductSchema = z.object({
  title: z
    .string()
    .min(1, "O título deve ter pelo menos 3 character")
    .optional(),
  description: z
    .string()
    .min(10, "A descrição do produto deve ter pelo menos 10 characters")
    .optional(),
  price: z
    .preprocess(
      (val) => (typeof val === "string" ? Number(val) : val),
      z.number().positive("O preço deve ser maior que zero")
    )
    .optional(),

  available: z
    .preprocess((val) => val === "true" || val === true, z.boolean())
    .optional(),
});
