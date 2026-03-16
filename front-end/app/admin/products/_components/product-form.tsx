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
import { Plus, X } from "lucide-react";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { MoneyInput } from "./money-input";
import { productSchema } from "@/schemas/product.schema";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { GripVertical } from "lucide-react";

export const ProductForm = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

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

  {
    /* All this functions will be replaced by the API actions*/
  }

  function onSubmit(data: z.infer<typeof productSchema>) {
    console.log(data);
    form.reset();
    setItems([]);
  }

  const handleItems = () => {
    if (!inputValue) return;

    setItems((prev) => [...prev, inputValue]);
    setInputValue("");
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer rounded-2xl bg-[#E64343] font-semibold hover:bg-[#E64343]/90">
          <Plus />
          Novo Produto
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
          <FieldGroup className="space-y-4">
            <div className="flex justify-between gap-4">
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
            </div>

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
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    style={{ fontWeight: "bold" }}
                  >
                    Imagem do Produto
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
                    onClick={() => handleItems()}
                    variant={"outline"}
                    className="text-muted-foreground hover:text-muted-foreground/80 font-bold"
                    type="button"
                  >
                    <Plus /> Adicionar
                  </Button>
                </div>

                <div className="max-h-40 space-y-1 overflow-y-auto">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-muted-foreground/10 my-4 flex items-center justify-between rounded-lg px-2"
                    >
                      <div className="flex">
                        <GripVertical size={20} />
                        <p className="text-foreground mb-2 px-2 text-sm">
                          {item}
                        </p>
                      </div>
                      <div className="my-4 px-4">
                        <X size={16} onClick={() => removeItem(index)} />
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
                  <div className="flex justify-between space-y-2">
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
                >
                  Criar Produto
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
