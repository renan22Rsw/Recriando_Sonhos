"use client";

import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { appointmentSchema } from "@/schemas/appointment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface UserAppointment {
  user: {
    name: string;
    email: string;
  };
  date: string;
}

export const ProfileEditButton = ({ user, date }: UserAppointment) => {
  type AppointmentFormData = z.input<typeof appointmentSchema>;

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: "",
      date: new Date(date),
    },
  });

  function onSubmit(data: z.input<typeof appointmentSchema>) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="font-semibold">
          <Pencil />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Agendamento</DialogTitle>

          <DialogDescription>
            Inisira as informacoes do agendamento
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    style={{ fontWeight: "bold" }}
                  >
                    Nome
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Seu nome"
                    className="rounded-2xl selection:bg-[#E64343] focus-visible:ring-[#E64343]"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    style={{ fontWeight: "bold" }}
                  >
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    style={{ fontWeight: "bold" }}
                  >
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    style={{ fontWeight: "bold" }}
                  >
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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <FieldLabel className="text-muted-foreground pb-2 font-semibold">
              Decoracao Festa Infantil - Tema Unicornio
            </FieldLabel>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                className="bg-[#E55555] font-semibold hover:bg-[#E55555]/90"
              >
                Salvar
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
