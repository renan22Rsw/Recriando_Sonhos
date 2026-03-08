"use client";

import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { loginSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log(data);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="space-y-4">
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
                placeholder="seu@email.com"
                className="rounded-2xl selection:bg-[#E64343] focus-visible:ring-[#E64343]"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} style={{ fontWeight: "bold" }}>
                Senha
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Digite sua senha"
                type="password"
                className="rounded-2xl selection:bg-[#E64343] focus-visible:ring-[#E64343]"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-8 flex flex-col items-center">
        <Button
          type="submit"
          className="w-4/5 cursor-pointer rounded-2xl bg-[#E64343] font-bold hover:bg-[#E64343]/90"
        >
          Entrar
        </Button>
        <Link
          className="text-muted-foreground py-2 font-semibold"
          href="/signup"
        >
          Não tem uma conta?{" "}
          <span className="text-[#E64343] hover:underline">Cadastre-se</span>
        </Link>
      </div>
    </form>
  );
};
