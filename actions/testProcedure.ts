"use server";

import { db } from "@/lib/db";

export async function testProcedure(clientId: string) {
  try {
    console.log("🧪 Probando procedimiento almacenado para cliente:", clientId);

    // Primero, verificar que el cliente existe
    const clientExists = await db.$queryRaw<any[]>`
      SELECT id, "fullName" FROM public."Client" WHERE id = ${clientId}
    `;

    if (clientExists.length === 0) {
      console.log("❌ Cliente no encontrado en public.Client");
      return { success: false, error: "Cliente no encontrado" };
    }

    console.log("✅ Cliente encontrado:", clientExists[0]);

    // Probar el procedimiento almacenado
    const result = await db.$queryRaw<[{ sp_update_client_extra_data: boolean }]>`
      SELECT glass_store.sp_update_client_extra_data(
        ${clientId}::TEXT, 
        25::INTEGER, 
        'Tester'::TEXT
      ) as sp_update_client_extra_data
    `;

    console.log("📊 Resultado del procedimiento:", result);

    const success = result[0]?.sp_update_client_extra_data;

    if (success) {
      // Verificar que los datos se actualizaron correctamente
      const updatedData = await db.$queryRaw<any[]>`
        SELECT * FROM glass_store.client_view WHERE id = ${clientId}
      `;

      console.log("✅ Datos actualizados:", updatedData[0]);
      return { success: true, data: updatedData[0] };
    } else {
      return { success: false, error: "El procedimiento retornó false" };
    }
  } catch (error) {
    console.error("❌ Error probando procedimiento:", error);
    return { success: false, error: error instanceof Error ? error.message : "Error desconocido" };
  }
} 