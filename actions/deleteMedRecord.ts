"use server"
import { db } from "@/lib/db";

export async function deleteMedRecord (id: string) {
  const deletedMedRecord = await db.medicalRecord.delete({
    where: {
      id,
    },
  });

  return deletedMedRecord;
}