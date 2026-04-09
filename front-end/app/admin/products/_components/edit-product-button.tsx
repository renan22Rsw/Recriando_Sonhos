"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { MoneyInput } from "./money-input";
import { productSchema } from "@/schemas/product.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

import { GripVertical, Pencil, Plus, X } from "lucide-react";
import { IncludeItems } from "@/types/products";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditProductButtonProps {
  id: string;
  title: string;
  description: string;
  price: number;
  available: boolean;
  includedItems: IncludeItems[];
}

export const EditProductButton = ({
  id,
  title,
  description,
  price,
  available,
  includedItems,
}: EditProductButtonProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title,
      description,
      price,
      available,
      image: undefined,
      includedItems: includedItems.map((item) => ({
        value: item.text,
      })),
    },
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "includedItems",
  });

  async function onSubmit(data: z.infer<typeof productSchema>) {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("available", data.available.toString());
      formData.append("image", data.image!);
      formData.append(
        "includedItems",
        JSON.stringify(data.includedItems.map((item) => item.value)),
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`,
        {
          credentials: "include",
          method: "PUT",
          body: formData,
        },
      );

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message, {
          description: "Por favor Tente novamente",
        });
        return;
      }

      toast.success("Produto atualizado com sucesso");
      form.reset();
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          description: "Por favor Tente novamente",
        });
      } else {
        toast.error("Ocorreu um erro ao atualizar o produto", {
          description: "Por favor Tente novamente",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleItems = () => {
    if (!inputValue) return;

    append({ value: inputValue });
    setInputValue("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-4/5 overflow-y-auto">
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
                    className="min-h-30 resize-none"
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

            <Card>
              <CardHeader>
                <CardTitle>
                  <FieldLabel style={{ fontWeight: "bold" }}>
                    Oque está incluido
                  </FieldLabel>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Input
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    placeholder="Ex: Mesa de cerimonia"
                  />
                  <Button
                    onClick={handleItems}
                    variant={"outline"}
                    className="text-muted-foreground hover:text-muted-foreground/80 font-bold"
                    type="button"
                  >
                    <Plus /> Adicionar
                  </Button>
                </div>

                <div className="max-h-40 space-y-1 overflow-y-auto">
                  {fields.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-muted-foreground/10 my-4 flex items-center justify-between rounded-lg px-2"
                    >
                      <div className="flex">
                        <GripVertical size={20} />
                        <p className="text-foreground mb-2 px-2 text-sm">
                          {item.value}
                        </p>
                      </div>
                      <div className="my-4 px-4">
                        <X size={16} onClick={() => remove(index)} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="w-2/4 cursor-pointer bg-[#E64343] font-semibold hover:bg-[#E64343]/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Editando..." : "Salvar"}
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
