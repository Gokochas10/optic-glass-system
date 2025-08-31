"use server";

import { db } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  ruc: z.string().min(1, { message: "El RUC es obligatorio." }),
  fullName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Debe ser un correo válido." }).optional(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
});

export async function createClient(data: z.infer<typeof createSchema>) {
  try {
    console.log("🔄 Iniciando creación de cliente:", data);

    // Validamos los datos antes de crear
    const validatedData = createSchema.parse(data);
    console.log("✅ Datos validados:", validatedData);

    // Crear nuevo cliente en public.Client usando Prisma Raw
    const result = await db.$queryRaw<any[]>`
      INSERT INTO public."Client" ("RUC", "fullName", email, phone, address, "enterpriseId", "clientTypeId", "createdAt", "updatedAt")
      VALUES (
        ${validatedData.ruc}::TEXT,
        ${validatedData.fullName}::TEXT,
        ${validatedData.email || null}::TEXT,
        ${validatedData.phone || null}::TEXT,
        ${validatedData.address || null}::TEXT,
        '2'::TEXT,
        '1'::TEXT,
        NOW(),
        NOW()
      )
      RETURNING *
    `;

    const newClient = result[0];

    console.log("✅ Cliente creado exitosamente:", newClient);
    return { success: true, data: newClient };
  } catch (error) {
    console.error("❌ Error en createClient:", error);

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
      return { success: false, error: "Hubo un error al crear el cliente." };
    }
  }
} 