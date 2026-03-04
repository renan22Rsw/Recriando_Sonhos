"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Plus } from "lucide-react";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { MoneyInput } from "./money-input";
import { productSchema } from "@/schemas/product.schema";

export const ProductForm = () => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 100,
      image: undefined,
      available: true,
    },
  });

  function onSubmit(data: z.infer<typeof productSchema>) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer rounded-2xl bg-[#E64343] font-semibold hover:bg-[#E64343]/90">
          <Plus />
          Novo Produto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Novo Produto</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para adicionar um novo produto ao catalogo
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-6">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    style={{ fontWeight: "bold" }}
                  >
                    Titulo do Produto
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex: Decoração infantil"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-textarea-about"
                    style={{ fontWeight: "bold" }}
                  >
                    Descrição
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="form-rhf-textarea-about"
                    aria-invalid={fieldState.invalid}
                    placeholder="Descreva o produto e o oque esta incluido"
                    className="min-h-[120px] resize-none"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    style={{ fontWeight: "bold" }}
                  >
                    Preço (R$)
                  </FieldLabel>

                  <MoneyInput
                    placeholder="Ex:100.00"
                    value={field.value}
                    onValueChange={({ floatValue }) =>
                      field.onChange(floatValue)
                    }
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    style={{ fontWeight: "bold" }}
                  >
                    Titulo do Produto
                  </FieldLabel>

                  <Input
                    onChange={(e) => {
                      const file = e.target.files?.[0] as File;
                      field.onChange(file);
                    }}
                    type="file"
                    id="product-image"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="available"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex justify-between">
                    <div>
                      <FieldLabel
                        htmlFor="form-rhf-demo-price"
                        style={{ fontWeight: "bold" }}
                      >
                        Disponivel para agendamento
                      </FieldLabel>

                      <FieldDescription>
                        O produto estara visivel e disponivel para reserva
                      </FieldDescription>
                    </div>

                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter className="py-2">
            <div className="r flex w-full justify-center space-x-4">
              <DialogClose asChild>
                <Button variant={"outline"} className="w-2/4 cursor-pointer">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-2/4 cursor-pointer bg-[#E64343] font-semibold hover:bg-[#E64343]/90"
              >
                Criar Produto
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
