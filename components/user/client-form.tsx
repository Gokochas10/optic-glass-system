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
import { Client } from "@/types/user/client-types"
import { useTransition } from "react"
import { saveClient } from "@/actions/addClient"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Debe ser un correo válido." }).optional(),
  age: z.coerce.number().min(1, { message: "La edad es obligatoria." }),
  phone: z.string().nullable().optional(),
  job: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
});

type ClientFormProps = {
  client?: Client;
  onSuccess?: () => void;
}

export function ClientForm({ client, onSuccess }: ClientFormProps) {
  const [loading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: client
      ? { 
          ...client, 
          phone: client.phone?.toString(),
          email: client.email ?? undefined,
          job: client.job ?? undefined,
          address: client.address ?? undefined 
        }
      : {
          fullName: "",
          email: "",
          age: 18,
          phone: "",
          job: "",
          address: "",
        },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        console.log("values", values);
        
        const response = await saveClient(values, client?.id);
        console.log("paso save client", response);
        
        if (response.success && onSuccess) {
          onSuccess();
        } else if (response.error) {
          // Mostrar errores de validación del servidor en el frontend
          Object.keys(response.error).forEach((key) => {
            form.setError(key as keyof z.infer<typeof formSchema>, {
              type: "manual",
              message: (response.error as unknown as Record<string, string>)[key],
            });
          });
        }
      } catch (error) {
        console.error("Error al guardar el cliente:", error);
      }
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Nombre Completo */}
        <FormItem>
          <FormLabel>Nombre Completo</FormLabel>
          <FormControl>
            <Input {...form.register("fullName")} placeholder="Nombre completo" />
          </FormControl>
          <FormMessage>{form.formState.errors.fullName?.message}</FormMessage>
        </FormItem>

        {/* Email */}
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input {...form.register("email")} type="email" placeholder="correo@example.com" />
          </FormControl>
          <FormMessage>{form.formState.errors.email?.message}</FormMessage>
        </FormItem>

        {/* Edad y Teléfono en la misma fila */}
        <div className="grid grid-cols-2 gap-4">
          <FormItem>
            <FormLabel>Edad</FormLabel>
            <FormControl>
              <Input {...form.register("age")} type="number" placeholder="Edad" />
            </FormControl>
            <FormMessage>{form.formState.errors.age?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel>Teléfono</FormLabel>
            <FormControl>
              <Input {...form.register("phone")} type="text" placeholder="Teléfono" />
            </FormControl>
            <FormMessage>{form.formState.errors.phone?.message}</FormMessage>
          </FormItem>
        </div>

        {/* Trabajo y Dirección en la misma fila */}
        <div className="grid grid-cols-2 gap-4">
          <FormItem>
            <FormLabel>Ocupación</FormLabel>
            <FormControl>
              <Input {...form.register("job")} placeholder="Ocupación" />
            </FormControl>
            <FormMessage>{form.formState.errors.job?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel>Dirección</FormLabel>
            <FormControl>
              <Input {...form.register("address")} placeholder="Dirección" />
            </FormControl>
            <FormMessage>{form.formState.errors.address?.message}</FormMessage>
          </FormItem>
        </div>

        {/* Botón de guardar ocupa todo el ancho */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Guardando..." : client ? "Actualizar Cliente" : "Agregar Cliente"}
        </Button>
      </form>
    </FormProvider>
  );
}
