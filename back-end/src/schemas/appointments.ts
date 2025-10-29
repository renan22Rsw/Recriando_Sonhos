import z from "zod";

export const appointmentSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined ? "Email é obrigatório" : "Email inválido",
  }),
  name: z.string().min(3, {
    error: (issue) =>
      issue.input === undefined
        ? "Nome é obrigatório"
        : "Nome deve ter pelo menos 3 caracteres",
  }),
  phone: z
    .string()
    .regex(/^(\+55\s?)?(\(?21\)?\s?)9\d{4}-?\d{4}$/)
    .min(10, {
      error: "Numero deve ter pelo menos 10 dígitos",
    })
    .max(13, {
      error: "O numero não pode ter mais de 13 dígitos",
    }),
  date: z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof String) {
        return new Date(arg as string);
      }
    },
    z
      .date({
        error: (issue) =>
          issue.input === undefined ? "Data é obrigatória" : "Data inválida",
      })
      .refine(
        (date) => {
          const day = date.getDay();

          return day === 0 || day === 6;
        },
        {
          error: "Apenas sábado e domingo são disponiveis para o agendamento",
        }
      )
  ),

  status: z.string().default("pending"),
});

export const appointmentUpdateSchema = z.object({
  email: z
    .email({
      error: "Email inválido",
    })
    .optional(),
  name: z
    .string()
    .min(3, {
      error: "Nome deve ter pelo menos 3 caracteres",
    })
    .optional(),
  phone: z
    .string()
    .regex(/^(\+55\s?)?(\(?21\)?\s?)9\d{4}-?\d{4}$/)
    .optional(),
  date: z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof String) {
        return new Date(arg as string);
      }
    },
    z
      .date({
        error: (issue) =>
          issue.input === undefined ? "Data é obrigatória" : "Data inválida",
      })
      .refine(
        (date) => {
          const day = date.getDay();

          return day === 0 || day === 6;
        },
        {
          error: "Apenas sábado e domingo são disponiveis para o agendamento",
        }
      )
      .optional()
  ),
});
