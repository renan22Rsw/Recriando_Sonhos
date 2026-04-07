import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; //5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const MIN_IMAGE_SIZE = { width: 200, height: 200 };
const MAX_IMAGE_SIZE = { width: 4096, height: 4096 };

export const productSchema = z.object({
  title: z
    .string()
    .min(5, "O titulo do produto deve ter mais de 3 characters")
    .max(32, "O titulo do produto é muito grande, maximo: 32 characters"),
  description: z
    .string()
    .min(20, "A descrição deve ter no minimo 20 characters.")
    .max(100, "A descrição é muito grande, maximo: 100 characters."),

  price: z.number("Preencha o preço").positive(),

  image: z
    .instanceof(File, {
      message: "Por favor selecione uma imagem",
    })

    .refine((file) => MAX_FILE_SIZE > file.size, {
      message: "A imagem é muito grande",
    })
    .refine((file) => SUPPORTED_FORMATS.includes(file?.type), {
      message: "Por favor envie imagens com os formatos (JPEG, PNG, or WebP)",
    })
    .refine(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const meetsDimensions =
                img.width >= MIN_IMAGE_SIZE.width &&
                img.height >= MIN_IMAGE_SIZE.height &&
                img.width <= MAX_IMAGE_SIZE.width &&
                img.height <= MAX_IMAGE_SIZE.height;
              resolve(meetsDimensions);
            };
            img.src = e.target?.result as string;
          };
          reader.readAsDataURL(file);
        }),
      {
        message: `O tamanho da imagem é invalida`,
      },
    )
    .optional(),

  available: z.boolean(),

  includedItems: z.array(
    z.object({
      value: z.string(),
    }),
  ),
});
