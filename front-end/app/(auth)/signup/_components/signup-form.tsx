"use client";

import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { signupSchema } from "@/schemas/auth-schema";
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

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signupSchema>) {
    const { name, email, password } = data;

    setLoading(true);

    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          router.push(`/verify-email?email=${email}`);
        },

        onError: (ctx) => {
          toast(ctx.error.message, {
            description: "Por favor Tente novamente",
          });

          setLoading(false);
        },

        onSettled: () => {
          setLoading(false);
        },
      },
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
        <Link
          className="text-muted-foreground py-2 font-semibold"
          href="/login"
        >
          Já tem uma conta?{" "}
          <span className="text-[#E64343] hover:underline">Entrar</span>
        </Link>
      </div>
    </form>
  );
};
