"use server"

import { db } from "@/lib/db"
import { Client } from "@/types/user/client-types";

export async function getClients() {
  try {
    console.log("📋 Obteniendo todos los clientes desde la vista...");

    // Usar Prisma Raw para ejecutar la vista
    const result = await db.$queryRaw<any[]>`
            SELECT * FROM glass_store.client_view 
            ORDER BY created_at DESC
        `;

    // Mapear los resultados al tipo Client
    const clients: Client[] = result.map(row => {
      const client = {
        id: row.id,
        ruc: row.ruc || '',
        fullName: row.full_name || '',
        email: row.email || '',
        age: row.age,
        phone: row.phone || '',
        job: row.occupation || '',
        address: row.address || ''
      };
      return client;
    });

    console.log(`✅ Se obtuvieron ${clients.length} clientes`);
    return clients;
  } catch (error) {
    console.error('❌ Error getting clients:', error);
    throw error;
  }
}