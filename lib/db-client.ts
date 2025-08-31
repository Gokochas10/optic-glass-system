import { db } from "@/lib/db";

export interface ClientData {
  id: string;
  ruc: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  created_at: Date;
  updated_at: Date;
  client_type_id: string;
  enterprise_id: string;
  age: number;
  occupation: string;
}

export class ClientService {
  // READ - Usar vista directamente con Prisma
  static async getClients(): Promise<ClientData[]> {
    try {
      console.log("📋 Obteniendo todos los clientes desde la vista...");
      const result = await db.$queryRaw<ClientData[]>`
        SELECT * FROM glass_store.client_view 
        ORDER BY created_at DESC
      `;
      console.log(`✅ Se obtuvieron ${result.length} clientes`);
      return result;
    } catch (error) {
      console.error('❌ Error getting clients:', error);
      throw error;
    }
  }

  static async getClientById(id: string): Promise<ClientData | null> {
    try {
      console.log(`🔍 Buscando cliente con ID: ${id}`);
      const result = await db.$queryRaw<ClientData[]>`
        SELECT * FROM glass_store.client_view 
        WHERE id = ${id}
      `;
      if (result.length > 0) {
        console.log(`✅ Cliente encontrado: ${result[0].full_name}`);
        return result[0];
      } else {
        console.log(`❌ Cliente no encontrado con ID: ${id}`);
        return null;
      }
    } catch (error) {
      console.error('❌ Error getting client by id:', error);
      throw error;
    }
  }

  // UPDATE - Solo age y occupation usando procedimiento
  static async updateClientExtraData(id: string, data: {
    age?: number;
    occupation?: string;
  }): Promise<boolean> {
    try {
      console.log(`🔄 Actualizando cliente ${id} con datos:`, data);

      const result = await db.$queryRaw<[{ sp_update_client_extra_data: boolean }]>`
        SELECT glass_store.sp_update_client_extra_data(
          ${id}, 
          ${data.age || 0}, 
          ${data.occupation || ''}
        )
      `;

      const success = result[0].sp_update_client_extra_data;
      if (success) {
        console.log(`✅ Cliente ${id} actualizado exitosamente en glass_store.Client`);
      } else {
        console.log(`❌ Error al actualizar cliente ${id}`);
      }

      return success;
    } catch (error) {
      console.error('❌ Error updating client extra data:', error);
      throw error;
    }
  }
} 