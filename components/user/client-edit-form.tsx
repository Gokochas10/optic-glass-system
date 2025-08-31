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
import { updateClientExtraData } from "@/actions/updateClientExtraData"

const editFormSchema = z.object({
  age: z.coerce.number().min(0, { message: "La edad debe ser mayor o igual a 0." }),
  occupation: z.string().optional(),
});

type ClientEditFormProps = {
  client: Client;
  onSuccess?: () => void;
}

export function ClientEditForm({ client, onSuccess }: ClientEditFormProps) {
  const [loading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      age: client.age || 0,
      occupation: client.job || "",
    },
  });

  function handleSubmit(values: z.infer<typeof editFormSchema>) {
    startTransition(async () => {
      try {
        console.log("📝 Enviando datos para actualización:", values);

        const response = await updateClientExtraData(client.id, values);
        console.log("📊 Respuesta del servidor:", response);

        if (response.success && onSuccess) {
          console.log("✅ Actualización exitosa, llamando onSuccess");
          onSuccess();
        } else if (response.error) {
          console.log("❌ Error en la actualización:", response.error);
          // Mostrar errores de validación del servidor en el frontend
          if (typeof response.error === 'object') {
            Object.keys(response.error).forEach((key) => {
              form.setError(key as keyof z.infer<typeof editFormSchema>, {
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
        console.error("❌ Error al actualizar el cliente:", error);
      }
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Información del cliente (solo lectura) - 2 columnas */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Nombre Completo</label>
            <Input value={client.fullName} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="text-sm font-medium">RUC</label>
            <Input value={client.ruc} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input value={client.email} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="text-sm font-medium">Teléfono</label>
            <Input value={client.phone || ""} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="text-sm font-medium">Dirección</label>
            <Input value={client.address || ""} disabled className="bg-gray-50" />
          </div>
        </div>

        {/* Campos editables - 2 columnas */}
        <div className="grid grid-cols-2 gap-4">
          <FormItem>
            <FormLabel>Edad</FormLabel>
            <FormControl>
              <Input {...form.register("age")} type="number" placeholder="Edad" />
            </FormControl>
            <FormMessage>{form.formState.errors.age?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel>Ocupación</FormLabel>
            <FormControl>
              <Input {...form.register("occupation")} placeholder="Ocupación" />
            </FormControl>
            <FormMessage>{form.formState.errors.occupation?.message}</FormMessage>
          </FormItem>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Actualizando..." : "Actualizar Cliente"}
        </Button>
      </form>
    </FormProvider>
  )
} 