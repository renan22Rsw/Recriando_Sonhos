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

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const { email, password } = data;

    setLoading(true);

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          router.refresh();
        },

        onError: (ctx) => {
          toast(
            ctx.error.message.startsWith("Invalid email or password")
              ? "Email ou senha inválidos"
              : ctx.error.message,
            {
              description: "Por favor Tente novamente",
            },
          );

          setLoading(false);
        },

        onSettled: () => {
          setLoading(false);
        },
      },
    );
  }

  useEffect(() => {
    if (!session) return;

    if (session.user.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/profile");
    }
  }, [session, router]);

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
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
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
