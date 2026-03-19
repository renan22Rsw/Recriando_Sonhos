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
    .regex(
      /^(\+55\s?)?(\(?21\)?\s?)9\d{4}-?\d{4}$/,
      "Numero de telefone inválido, apenas DDD 21 ",
    )
    .min(10, {
      error: "Numero deve ter pelo menos 10 dígitos",
    })
    .max(13, {
      error: "O numero não pode ter mais de 13 dígitos",
    }),
  date: z.preprocess(
    (arg) => {
      if (typeof arg === "string") {
        const [year, month, day] = arg.split("-").map(Number);
        return new Date(year, month - 1, day);
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
        },
      )
      .refine(
        (date) => {
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          return date >= now;
        },
        {
          error: "Data deve ser maior ou igual a data atual",
        },
      ),
  ),

  status: z.string().default("pending"),
});

export const editAppointmentSchema = z.object({
  email: z
    .email({
      error: (issue) =>
        issue.input === undefined ? "Email é obrigatório" : "Email inválido",
    })
    .optional(),
  name: z
    .string()
    .min(3, {
      error: (issue) =>
        issue.input === undefined
          ? "Nome é obrigatório"
          : "Nome deve ter pelo menos 3 caracteres",
    })
    .optional(),

  phone: z
    .string()
    .regex(
      /^(\+55\s?)?(\(?21\)?\s?)9\d{4}-?\d{4}$/,
      "Numero de telefone inválido, apenas DDD 21 ",
    )
    .min(10, {
      error: "Numero deve ter pelo menos 10 dígitos",
    })
    .max(13, {
      error: "O numero não pode ter mais de 13 dígitos",
    })
    .optional(),

  date: z
    .preprocess(
      (arg) => {
        if (typeof arg === "string") {
          const [year, month, day] = arg.split("-").map(Number);
          return new Date(year, month - 1, day);
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
          },
        )
        .refine(
          (date) => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            return date >= now;
          },
          {
            error: "Data deve ser maior ou igual a data atual",
          },
        ),
    )
    .optional(),

  status: z.string().default("pending"),
});
