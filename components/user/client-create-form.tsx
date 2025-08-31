"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useTransition } from "react"
import { createClient } from "@/actions/createClient"


const createFormSchema = z.object({
  ruc: z.string().min(1, { message: "El RUC es obligatorio." }),
  fullName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Debe ser un correo válido." }).optional(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
});

type ClientCreateFormProps = {
  onSuccess?: () => void;
}

export function ClientCreateForm({ onSuccess }: ClientCreateFormProps) {
  const [loading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      ruc: "",
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  function handleSubmit(values: z.infer<typeof createFormSchema>) {
    startTransition(async () => {
      try {
        console.log("📝 Creando nuevo cliente:", values);

        const response = await createClient(values);
        console.log("📊 Respuesta del servidor:", response);

        if (response.success && onSuccess) {
          console.log("✅ Cliente creado exitosamente");
          form.reset();
          onSuccess();
        } else if (response.error) {
          console.log("❌ Error al crear cliente:", response.error);
          // Mostrar errores de validación del servidor en el frontend
          if (typeof response.error === 'object') {
            Object.keys(response.error).forEach((key) => {
              form.setError(key as keyof z.infer<typeof createFormSchema>, {
                type: "manual",
                message: (response.error as unknown as Record<string, string>)[key],
              });
            });
          } else {
            // Error general
            console.error("Error general:", response.error);
          }
        }
      } catch (error) {
        console.error("❌ Error al crear el cliente:", error);
      }
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormItem>
          <FormLabel>RUC</FormLabel>
          <FormControl>
            <Input {...form.register("ruc")} placeholder="Ingrese el RUC" />
          </FormControl>
          <FormMessage>{form.formState.errors.ruc?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel>Nombre Completo</FormLabel>
          <FormControl>
            <Input {...form.register("fullName")} placeholder="Nombre completo" />
          </FormControl>
          <FormMessage>{form.formState.errors.fullName?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input {...form.register("email")} type="email" placeholder="Email" />
          </FormControl>
          <FormMessage>{form.formState.errors.email?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel>Teléfono</FormLabel>
          <FormControl>
            <Input {...form.register("phone")} placeholder="Teléfono" />
          </FormControl>
          <FormMessage>{form.formState.errors.phone?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel>Dirección</FormLabel>
          <FormControl>
            <Input {...form.register("address")} placeholder="Dirección" />
          </FormControl>
          <FormMessage>{form.formState.errors.address?.message}</FormMessage>
        </FormItem>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creando..." : "Crear Cliente"}
        </Button>
      </form>
    </FormProvider>
  )
} 