"use client";

import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { appointmentSchema } from "@/schemas/appointment-schema";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const AppointmentPageForm = ({ productId }: { productId: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  type AppointmentFormData = z.input<typeof appointmentSchema>;

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      date: new Date(),
    },
  });

  async function onSubmit(data: z.input<typeof appointmentSchema>, id: string) {
    try {
      setIsLoading(true);

      if (!id) {
        toast.error("Produto nao encontrado", {
          description: "Por favor Tente novamente",
        });
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/appointments/${id}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message, {
          description: "Por favor Tente novamente",
        });
        return;
      }

      toast.success("Agendamento criado com sucesso");
      router.push("/profile");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          description: "Por favor Tente novamente",
        });
      } else {
        toast.error("Ocorreu um erro ao editar o agendamento", {
          description: "Por favor Tente novamente",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(() => onSubmit(form.getValues(), productId))}
    >
      <FieldGroup className="space-y-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} style={{ fontWeight: "bold" }}>
                Nome
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Seu nome"
                className="rounded-2xl selection:bg-[#E64343] focus-visible:ring-[#E64343]"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} style={{ fontWeight: "bold" }}>
                Email
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="example@example.com"
                className="rounded-2xl selection:bg-[#E64343] focus-visible:ring-[#E64343]"
                type="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} style={{ fontWeight: "bold" }}>
                Telefone
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="(21) 99999-9999"
                className="rounded-2xl selection:bg-[#E64343] focus-visible:ring-[#E64343]"
                type="tel"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="date"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} style={{ fontWeight: "bold" }}>
                Escolha a data
              </FieldLabel>

              <Input
                type="date"
                name={field.name}
                ref={field.ref}
                value={
                  field.value instanceof Date
                    ? field.value.toISOString().split("T")[0]
                    : (field.value as string)
                }
                onChange={(e) => field.onChange(e.target.value)}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FieldLabel className="text-muted-foreground font-semibold">
          Decoracao Festa Infantil - Tema Unicornio
        </FieldLabel>
      </FieldGroup>

      <div className="mt-8 flex flex-col items-center">
        <Button
          type="submit"
          className="w-4/5 cursor-pointer rounded-2xl bg-[#E64343] font-bold hover:bg-[#E64343]/90"
        >
          {isLoading ? "Carregando..." : "Realizar Agendamento"}
        </Button>
      </div>
    </form>
  );
};
