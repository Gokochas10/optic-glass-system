"use server";

import { db } from "@/lib/db";
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Debe ser un correo válido." }).optional(),
  age: z.coerce.number().min(1, { message: "La edad es obligatoria." }),
  phone: z.string().nullable().optional(),
  job: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
});

export async function saveClient(data: z.infer<typeof formSchema>, clientId?: string) {
  try {
    console.log("Datos recibidos:", data);

    // Validamos los datos antes de guardarlos
    const validatedData = formSchema.parse(data);
    console.log("Datos validados:", validatedData);

    if (clientId) {
      // Actualizar cliente existente
      const updatedClient = await db.client.update({
        where: { id: clientId },
        data: validatedData,
      });
      console.log("Cliente actualizado:", updatedClient);
    } else {
      // Crear nuevo cliente
      const newClient = await db.client.create({
        data: validatedData,
      });
      console.log("Cliente creado:", newClient);
    }

    return { success: true };
  } catch (error) {
    console.error("Error en saveClient:", error);

    if (error instanceof z.ZodError) {
      // Manejo específico de errores de Zod
      const errors = error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      return { success: false, error: errors };
    } else if (error instanceof Error) {
      // Manejo de errores generales
      return { success: false, error: error.message };
    } else {
      // Error desconocido
      return { success: false, error: "Hubo un error al guardar el cliente." };
    }
  }
}