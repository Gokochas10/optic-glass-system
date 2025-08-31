"use server";

import { ClientService } from "@/lib/db-client";
import { z } from "zod";

const updateSchema = z.object({
  age: z.coerce.number().min(0, { message: "La edad debe ser mayor o igual a 0." }),
  occupation: z.string().optional(),
});

export async function updateClientExtraData(clientId: string, data: z.infer<typeof updateSchema>) {
  try {
    console.log("Datos recibidos para actualización:", data);

    // Validamos los datos antes de actualizar
    const validatedData = updateSchema.parse(data);
    console.log("Datos validados:", validatedData);

    // Actualizar solo age y occupation usando el procedimiento almacenado
    const success = await ClientService.updateClientExtraData(clientId, {
      age: validatedData.age,
      occupation: validatedData.occupation || '',
    });

    if (success) {
      console.log("Cliente actualizado exitosamente");
      return { success: true };
    } else {
      return { success: false, error: "No se pudo actualizar el cliente." };
    }
  } catch (error) {
    console.error("Error en updateClientExtraData:", error);

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
      return { success: false, error: "Hubo un error al actualizar el cliente." };
    }
  }
} 